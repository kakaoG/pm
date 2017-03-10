<div class="header clearfix">
	<span class="title">TA的评价</span>
</div>
<div class="label-name">
<#for(var i = 0; i<data.labelList.length; i++){#>
<span><#=data.labelList[i].name#></span>
<#}#>
</div>
<div class="list-view-wrapper"></div>
<#if(data.totalElements!=0) {#>
<a class="more" <#=SiteCatalogUtil.output(data._site_)#>>查看全部评价</a>
<#}#>