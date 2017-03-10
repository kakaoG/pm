var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var spriter = require('gulp-css-spriter');
var del = require('del');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var uglify = require('gulp-uglify')
var api = require('./api/api');

var model = 'debug',
  md5 = false,
  condition = true,
  autoreload = false,
  watch = false;
var indexFileName = './src/index.html';
var indexReleaseFileName = './dist/index-release.html';

var ENV = {
  release: model == 'release',
  debug: model == 'debug',

}

gulp.task('clean', function (cb) {
  return del([
    'dist/*',
    'rev/*'
  ], cb);
});
gulp.task('clean:dist', function (cb) {
  return del([
    'dist/*'
  ], cb);
});
gulp.task('copy', function () {
  var b = gulp.src('./img/**')
    .pipe(gulp.dest('./dist/img'));
    //.pipe(gulp.src('./img/icon'))
    //.pipe(gulp.dest('./dist/img'));
  return b;
});

var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe($.rename('bundle.css'))
    .pipe($.if(model == 'release', $.minifyCss()))
    .pipe($.if(md5, $.rev()))
    .pipe($.if(model == 'debug', $.sourcemaps.write('./')))
    .pipe(gulp.dest('./dist'))
    .pipe($.if(autoreload, reload({stream: true})))
    .pipe($.if(md5, $.rev.manifest()))
    .pipe($.if(md5, gulp.dest('./rev/css')));
});

gulp.task('styles', function () {
  return gulp.src('./src/app.scss')
    .on('error', handleErrors)
    .pipe($.if(model == 'debug', $.sourcemaps.init({loadMaps: true})))
    // .pipe($.less())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.base64({
      baseDir: 'img',
      maxImageSize: 2 * 1024, // bytes
      debug: false
    }))
    .pipe($.rename('bundle.css'))
    .pipe($.if(model == 'release', $.minifyCss()))
    .pipe($.if(md5, $.rev()))
    .pipe($.if(model == 'debug', $.sourcemaps.write('./')))
    .pipe(gulp.dest('./dist'))
    .pipe($.if(autoreload, reload({stream: true})))
    .pipe($.if(md5, $.rev.manifest()))
    .pipe($.if(md5, gulp.dest('./rev/css')));
});

var bundler = _.memoize(function (watch) {
  var options = {
    debug: true,
    entry: true,
    entries: ['./src/app.js'],
  };

  if (watch) {
    console.log(options)
    _.extend(options, watchify.args);
  }

  var b = browserify(options)
    .transform(babelify)
    .transform({
      global: true
    }, 'browserify-shim');
  if (watch) {
    b = watchify(b);
  }

  return b;
});

var handleErrors = function () {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  $.util.log.apply(null, args);
  this.emit('end');
};

function bundle(cb, watch) {
   return bundler(watch).bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.if(model == 'release', $.uglify()))
    .pipe($.if(md5, $.rev()))
    .pipe($.if(model == 'debug', $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(model == 'debug', $.sourcemaps.write('./')))
    .pipe(gulp.dest('./dist'))
    .pipe($.if(md5, $.rev.manifest()))
    .pipe($.if(md5, gulp.dest('./rev/js')))
    .on('end', cb)
    .pipe($.if(autoreload, reload({stream: true})));
}

gulp.task('scripts', function (cb) {
  bundle(cb, watch);
});

gulp.task('jshint', function () {
  return gulp.src(['./src/app.js', './src/js/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

var reporter = 'spec';

gulp.task('mocha', ['jshint'], function () {
  return gulp.src([
      './test/setup/node.js',
      './test/setup/helpers.js',
      './test/unit/**/*.js'
    ], {read: false})
    .pipe($.plumber())
    .pipe($.mocha({reporter: reporter}));
});

//
gulp.task('html', [], function () {
  return gulp.src(indexFileName)
    .pipe($.plumber());
});
const jsFilter = $.filter('**/*.js', {restore: true});
gulp.task('usemin', ['clean', 'styles', 'scripts', 'html'], function (cb) {
  var useminParam = {};
  if(model == 'release') {
    useminParam['js'] = [$.if(md5, $.rev()), $.uglify()]
    useminParam['css'] = [$.if(md5, $.rev()), $.minifyCss()]
  }
  return gulp.src(['./rev/**/*.json', indexFileName])
    .pipe($.usemin(useminParam))
    //.pipe(jsFilter)
    //.pipe($.if(md5, $.rev()))
    //.pipe(jsFilter.restore)
    .pipe($.if(md5, $.revCollector()))
    .pipe(gulp.dest('dist'));
});
gulp.task('others', function () {
  gulp.src(indexReleaseFileName)
    .pipe($.rename('index.html'))
    .pipe(gulp.dest('dist'))
    .on('end', function () {
      del(indexReleaseFileName);
    })
})
gulp.task('build', $.sequence('clean',[
    //'clean',
    //'html',
    'styles',
    'usemin',
    'copy',
    //'test'
  ])
);

gulp.task('test', [
  'jshint',
  'mocha'
]);
// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
  return gulp.src('./dist/bundle.css')
    .pipe(spriter({
      // The path and file name of where we will save the sprite sheet
      'spriteSheet': './dist/img/spritesheet.png',
      // Because we don't know where you will end up saving the CSS file at this point in the pipe,
      // we need a litle help identifying where it will be.
      'pathToSpriteSheetFromCSS': './dist/img/spritesheet.png'
    }))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * 生产环境配置
 */
gulp.task('setEnv', function () {
  gulp.src('./src/app.js')
    .pipe($.replace(/\/\*window.resource.image\*\//, "window.resource = {image: './img1',  upload: './upload1'}"))
    .pipe(gulp.dest('bin'));
});

gulp.task('watch:autoreload', function () {
  autoreload = true;
  gulp.start('watch');
})

gulp.task('setWatchEnv', function () {
  watch = true;
});
gulp.task('watch:styles', ['styles'], function () {
  gulp.watch(['./src/app.sass', './src/sass/**/*.scss', './src/sass/**/*.css'], ['styles']);
})
gulp.task('watch', ['setWatchEnv', 'build', 'watch:styles'], function () {
  console.log('watching start..');
  browserSync.init({
    server: {
      baseDir: 'dist',
      middleware: function (req, res, next) {
        api(req, res, next);
      }
    }
  });

  reporter = 'dot';
  bundler(true).on('update', function () {
    gulp.start('scripts');
    //gulp.start('test');
  });
  //gulp.watch('./test/**/*.js', ['test']);
  //gulp.watch(['./src/js/**/*.js'], ['scripts']);
  //gulp.watch(['./src/app.less', './src/less/**/*.less', './src/less/**/*.css'], ['styles']);
  gulp.watch(['./src/**/*.tpl'], ['scripts'])
  gulp.watch([indexFileName], ['html']);
});
var setEnv = function(){
  indexFileName = './src/index-release.html'
  ENV.release = model == 'release';
}
gulp.task('release', function () {
  model = 'release';
  md5 = true;
  setEnv();
  gulp.start($.sequence('build', 'others'));
});
gulp.task('release-nomd5', function () {
  model = 'release';
  md5 = false;
  setEnv();
  gulp.start($.sequence('build', 'others'));
});
gulp.task('default', ['watch']);
