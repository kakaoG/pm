// 优惠券类型 51：无门槛现金抵用券 52：满减券 53：每满减券 54：阶梯满减券 55：折扣券 56：赠品券
const Regular = {
  //'折扣券'
  '55' : {
    cupontypeId: 55,
    code: '<#=code#>',
    title: '<#=amount * 10#> 折',
    ownerName: '<#=ownerName#>',
    subTitle: '',
    condition: '活动商品订单满<#=condition#>元可用',
    region: '<#=startT#>-<#=endT#>'
  },
  //'无门槛现金抵用券'
  '51': {
    cupontypeId: 51,
    code: '<#=code#>',
    title: '<#=amount#> 元',
    ownerName: '<#=ownerName#>',
    subTitle: '',
    condition: '无门槛使用',
    region: '<#=startT#>-<#=endT#>'
  },
  //'每满减券',  
  '53': {
    cupontypeId: 53,
    code: '<#=code#>',
    title: '<#=amount#> 元',
    ownerName: '<#=ownerName#>',
    subTitle: '每满<#=condition#>元减<#=amount#>元',
    condition: '每满<#=condition#>元减<#=amount#>元',
    region: '<#=startT#>-<#=endT#>'
  },
  //'满减券'
  '52': {
    cupontypeId: 52,
    code: '<#=code#>',
    ownerName: '<#=ownerName#>',
    title: '<#=amount#> 元',
    subTitle: '满<#=condition#>元减<#=amount#>元',
    condition: '满<#=condition#>元减<#=amount#>元',
    region: '<#=startT#>-<#=endT#>'
  },
  //'赠品券'
  '56' : {
    cupontypeId: 56,
    code: '<#=code#>',
    title: '赠品',
    ownerName: '<#=ownerName#>',
    subTitle: '<#=giftSkuid#>',
    condition: '订单满<#=condition#>元可用',
    region: '<#=startT#>-<#=endT#>'
  },
  //'阶梯满减券'
  '54': {
    cupontypeId: 54,
    code: '<#=code#>',
    ownerName: '<#=ownerName#>',
    title: '<#=name#>',
    subTitle: '<#=amount1#>元至<#=amount2#>元',
    condition: '订单金额满<#=condition1#>元至<#=condition2#>元',
    region: '<#=startT#>-<#=endT#>'
  }
}
const CouponDateFormat = 'yyyy.MM.dd';
class Coupon {
  /**
   *
   * @param data
   *
   */
  constructor(data) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
    this.startT = data.startT;
    this.endT = data.endT;
    this.promotionType = data.promotionType;
    this.status = data.status;
    this.bindingUrl = data.bindingUrl;
    this.ownerId = data.ownerId;
    this.ownerType = data.ownerType;
    this.ownerName = data.ownerName;
    this.crossUse = data.crossUse;
    this.cupontypeId = data.cupontypeId;
    this.promotionConditionResults = [];
    let promotionConditionResults = this.promotionConditionResults
    _.each(data.promotionConditionResults, function (item) {
      promotionConditionResults.push(new PromotionCondition(item));
    });
  }
  getCouponData() {
    let template = Regular[this.cupontypeId];
    if(template) {
      let tplData = {
        amount: '',
        condition: '',
        giftSkuid: '',
        condtion1: '',
        condtion2: '',
        amount1: '',
        amount2: '',
        startT: '',
        endT: '',
        ownerName: '',
        code: '',
      };
      let promotionAmount = 0;
      let condition = 0;
      let giftSkuid = '';
      let amount1 = 0;
      let amount2 = 0;
      let condition1 = 0;
      let condition2 = 0;

      tplData.code = this.code;
      tplData.ownerName = this.ownerName;
      switch(template.cupontypeId) {
        case 55:
          // 折扣券
          // TODO:条件需要再确认(与IOS一样仅仅处理金额条件).
          //"只展示一个限制条件，展示优先级：订单金额条件>件数条件>封顶条件；
          //1、订单金额条件显示“活动商品订单满xx元可用”
          //2、购买件数条件显示“活动商品满两件可用”；
          //3、封顶条件显示“最多减扣xx元”"
          if(this.promotionConditionResults.length > 0){
            promotionAmount = this.promotionConditionResults[0].promotionAmount;
            condition = this.promotionConditionResults[0].condition;
          }

          tplData.amount = promotionAmount;
          tplData.condition = condition;
          tplData.startT = new Date(this.startT).format(CouponDateFormat);
          tplData.endT = new Date(this.endT).format(CouponDateFormat);
          break;
        case 51:
          // 无门槛现金抵用券
          if(this.promotionConditionResults.length > 0){
            promotionAmount = this.promotionConditionResults[0].promotionAmount;
          }

          tplData.amount = promotionAmount;
          tplData.startT = new Date(this.startT).format(CouponDateFormat);
          tplData.endT = new Date(this.endT).format(CouponDateFormat);
          break;
        case 53:
          // 每满减券
          if(this.promotionConditionResults.length > 0){
            promotionAmount = this.promotionConditionResults[0].promotionAmount;
            condition = this.promotionConditionResults[0].condition;
          }

          tplData.amount = promotionAmount;
          tplData.condition = condition;
          tplData.startT = new Date(this.startT).format(CouponDateFormat);
          tplData.endT = new Date(this.endT).format(CouponDateFormat);
          break;
        case 52:
          // 满减券
          if(this.promotionConditionResults.length > 0){
            promotionAmount = this.promotionConditionResults[0].promotionAmount;
            condition = this.promotionConditionResults[0].condition;
          }

          tplData.amount = promotionAmount;
          tplData.condition = condition;
          tplData.startT = new Date(this.startT).format(CouponDateFormat);
          tplData.endT = new Date(this.endT).format(CouponDateFormat);
          break;
        case 56:
          // 赠品
          if(this.promotionConditionResults.length > 0){
            condition = this.promotionConditionResults[0].condition;
            giftSkuid = this.promotionConditionResults[0].giftSkuid;
          }

          tplData.giftSkuid = giftSkuid;
          tplData.condition = condition;
          tplData.startT = new Date(this.startT).format(CouponDateFormat);
          tplData.endT = new Date(this.endT).format(CouponDateFormat);
          tplData.ownerName = this.ownerName;
          break;
        case 54:
          // 阶梯满减券
          if(this.promotionConditionResults.length > 0){
            let len = this.promotionConditionResults.length-1;
            amount1 = this.promotionConditionResults[0].promotionAmount;
            amount2 = this.promotionConditionResults[len].promotionAmount;
            condition1 = this.promotionConditionResults[0].condition.split(',')[0];
            condition2 = this.promotionConditionResults[len].condition.split(',')[0];
          }

          tplData.amount1 = amount1;
          tplData.amount2 = amount2;
          tplData.condition1 = condition1;
          tplData.condition2 = condition2;
          tplData.startT = new Date(this.startT).format(CouponDateFormat);
          tplData.endT = new Date(this.endT).format(CouponDateFormat);
          break;
      }
      return JSON.parse(tpl(JSON.stringify(template), tplData));
    } else {
      return {};
    }
  }
}

class PromotionCondition {
  //var condition = data.0;//订单金额条件。阶梯满减是格式为金额高值，金额低值，其它类型格式为订单金额
  //var promotionAmount = data.0//促销金额
  //var giftSkuId = data.0; //赠品ID

  constructor(data) {
    this.condition = data.condition;
    this.promotionAmount = data.promotionAmount;
    this.giftSkuId = data.giftSkuId;
  }
}
//1 未使用 2 已失效  4 已使用
export const CouponStatus = {
  unused: '1',
  invalid: '2',
  used: '3'
}
export default Coupon;
