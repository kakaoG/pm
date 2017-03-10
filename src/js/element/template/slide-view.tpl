<div class="carousel slide">
    <ol class="carousel-indicators">
        <#
                for(var i=0; i<data.length; i++){
                    var active = '';
                    if(i == 0){
                        active = 'active';
                    }
                    echo('<li data-slide-to="' + i + '" class="' + active + '"></li>');
                }
        #>
    </ol>
    <div class="carousel-inner" role="listbox">
        <#
            for(var i=0; i<data.length; i++){
                var active = '';
                if(i == 0){
                active = 'active';
                }
        #>
                <div class="item <#=active#>" <#=SiteCatalogUtil.output(data[i]._site_)#>>
                    <#
                    if(data[i].link) {
                    #>
                    <a href="<#=data[i].link#>">
                        <img data-src="<#=data[i].img#>"/>
                    </a>
                    <#} else {#>
                        <img data-src="<#=data[i].img#>"/>
                    <#}#>
                </div>
        <#}#>
    </div>
</div>