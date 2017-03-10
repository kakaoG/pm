<div class="aside-l shop-list">
    <div class="item">
        <div class="title">购物清单</div>
        <p>随时记录</p>
    </div>
    <img src="/img/m/index/mall_shop1.jpg" alt=""/>
</div>
<div class="aside-r">
    <#if(data.type == 'merchant'){#>
    <div class="item conductor-manual merchant">
        <div class="title">导购手册</div>
        <p>一键领取</p>
    </div>
    <#}else{#>
    <div class="item conductor-manual market">
        <div class="title">商场导览</div>
        <p>查看平面图</p>
    </div>
    <#}#>
    <div class="item coupon">
        <div class="title">优惠券</div>
        <p>万元福利优惠券随你领</p>
    </div>
</div>