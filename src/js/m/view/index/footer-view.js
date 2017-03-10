import Backbone from 'backbone'

import Tpl from '../../template/index/footer.tpl'

const View = Backbone.View.extend({
  template: Tpl(),
  render(){
    this.$el.html(tpl(this.template));
    return this;
  }
});

export default View;