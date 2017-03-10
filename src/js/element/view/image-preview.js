import Backbone from 'backbone'
import iSlider from '../../../../node_modules/islider.js/build/iSlider.js'
import Tpl from '../template/image-preview.tpl'


const View = (current, images)=> {
  let $template = $(Tpl());
  let list = [];
  let iSliderElem = $template.find('.iSlider-wrapper');
  if ($('.iSlider-view').length == 0) {
    $('body').append($template);
  }
  let initIndex = 0;
  if (images) {
    _.each(images, function (item, idx) {
      if (_.isString(current) && current == item) {
        initIndex = idx;
      }
      list.push({
        content: (function () {
          var frag = document.createDocumentFragment();
          var img = new Image()
          img.src = item;
          frag.appendChild(img);
          return frag;
        })()
      })
    });
  }
  if (!_.isString(current)) {
    initIndex = current;
  }
  return {
    preview(){
      var S = new iSlider(iSliderElem[0], list, {
        isAutoplay: false,
        isLooping: 0,
        initIndex: initIndex,
        isOverspread: 1,
        animateTime: 800,
        isTouchable: true,
        animateType: 'zoomout'
      });
      let closeClick = (e)=> {
        S.destroy();
        $template.remove();
      }
      $template.one('click', closeClick);
      $template.find('img').on('click', function (e) {
        e.stopPropagation();
      });
      $template.find('.iSlider-close').one('click', closeClick);
      window.iSliderView = S;
      window.iSliderViewTemplate = $template;
    }
  }
};

export default View;