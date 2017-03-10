<#if(data.list.length>0){#>
<div class="header">
    设计美图
</div>
<div class="article">
    <#for(var i=0; i<data.list.length; i++){#>
        <a href="#shopAlbum/<#=data.list[i].id#><#=data.merchantId#>/<#=data.list[i].albumId#>" class="img"><img data-src="<#=data.list[i].picUrl#>" alt=""/></a>
    <#}#>
</div>
<a class="more">查看更多美图</a>
<#}#>