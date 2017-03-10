<#if(data){#>
<a href="<#=data.link || "javascript:void(0);"#>" <#=SiteCatalogUtil.output(data._site_)#>>
    <div class="info">
        <img src="<#=data.img#>" alt="广告图"/>
        <div class="detail">
            <h4>今日导购</h4>
            <p><#=data.name#></p>
        </div>
    </div>
</a>
<#}#>
