<div class="header">
    <#=data.title#>(<#=data.totalElements#>)
    <#if(data.hasAction) {#>
    <a class="fr"><i class="icon-iconbianji iconfont"></i>我要点评</a>
    <#}#>
</div>
<div class="list-view-wrapper"></div>
<#if(data.totalElements!=0) {#>
<a class="more" <#=SiteCatalogUtil.output(data._site_)#>>查看全部评价</a>
<#}#>