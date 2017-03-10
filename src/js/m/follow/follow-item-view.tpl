<#if(data.info){#>
    <#if(data.sourceType == 13){#>
        <div class="img"><img data-src="<#=data.info.shopPic#>" alt=""/></div>
        <div class="info">
            <h4><#=data.info.brandName#></h4>
            <div class="address"><i class="icon-iconmap iconfont"></i><#=data.info.shopAddress#></div>
            <div class="tel"><i class="icon-icontel iconfont"></i><#=data.info.shopTel#></div>
        </div>
    <#} else if(data.sourceType == 11){#>
        <div class="img"><img data-src="<#=data.info.marketPic#>" alt=""/></div>
        <div class="info">
            <h4><#=data.info.marketName#></h4>
            <div class="address"><i class="icon-iconmap iconfont"></i><#=data.info.marketAddress#></div>
            <div class="tel"><i class="icon-icontel iconfont"></i><#=data.info.telePhone#></div>
        </div>
    <#}#>
<#}#>