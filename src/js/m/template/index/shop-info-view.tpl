<div class="shop-info-head">
    <img data-src="<#=data.storeImg#>">
    <i class="iconfont icon-dianpingwo personal"></i>
</div>
<div class="shop-info-dimension">
    <div class="aside-l">
        <img data-src="<#=data.brandLogo#>" alt=""/>
    </div>
    <div class="info aside-r">
        <h4><#=data.storeName#></h4>
        <div>
            <span class="label">展位：<#for (var i =0; i<data.stand.length; i++){#><#=data.stand[i]#> <#}#></span>
            <span class="score"></span>
        </div>
        <div class="label-list">
        </div>
    </div>
</div>
<div class="shop-info-classification">
    <div class="aside-l follow">
    </div>
    <div class="aside-r">
        <#if(data.shopOperationClassification&&data.shopOperationClassification.length){#>
        <#for(var i = 0; i<data.shopOperationClassification.length; i++){#>
        <span><#=data.shopOperationClassification[i].tagName#></span>
        <#}}#>
    </div>
</div>