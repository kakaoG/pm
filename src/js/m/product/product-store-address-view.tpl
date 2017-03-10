<div class="title">体验店地址</div>
<div class="good-box clearfix">
    <div class="bg-pic">
        <#if(data.shopPic){#>
        <img data-src=<#=data.shopPic#>>
        <#}#>
    </div>
    <div class="good-detail">
        <div class="good-tit">
            <h3><#=data.shopName#></h3>
            <#if(data.hasPromotionCoupon){#>
            <span class="sign">领卷</span>
            <#
            }
            if(data.hasPromotion){
            #>
            <span class="sign">促销</span>
            <#}#>
        </div>
        <p class="good-detail-con"><#=data.marketName#><#=data.marketShort#></p>
        <p class="good-detail-con"><#=data.address#></p>
    </div>
</div>