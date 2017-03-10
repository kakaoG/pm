<div class="header">金牌导购(TOP10)</div>
<div class="tip">下载APP,在家也能享受在线导购服务</div>
<ul class="conductor-list">
    <#if(data&&data.length>0){#>
    <#for(var i=0;i<data.length;i++){#>
        <#if(!(data[i].img == '' && data[i].name == '')){#>
        <li class="item" <#=SiteCatalogUtil.output(data._site_[i])#> data-site_p_action_pos=<#=i#> data-site_p_action_total=<#=data.length#>>
        <a href="#shopGuide/<#=data[i].openId#>">
            <div class="img">
                <img src="<#=data[i].img#>" alt=""/>
            </div>
            <div class="name">
                <#=data[i].name#><span class="coupon" style='display:none'>券</span>
            </div>
        </a>
        </li>
        <#}#>
    <#}}#>
</ul>