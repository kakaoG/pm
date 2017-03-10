<div class="header-img"></div>
<div class="info">
    <div class="info-img">
        <img src="<#=data.picUrl#>" alt="">
        <div class="info-ab"></div>
    </div>
    <div class="info-name"><#=data.fullName#></div>
    <div class="info-star"></div>
    <div class="info-attr"><#=data.tags#></div>
    <#if(data.showCateList){#>
    <div class="info-goods">
         <#for(var i=0;i<data.showCateList.length;i++){#>
        <span><#=data.showCateList[i].categoryName#></span>
         <#}#>
    </div>
    <#}#>
    <div class="info-introduce"><#=data.introduction#></div>
</div>
