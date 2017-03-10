<#for(var i=0; i<data.length; i++){#>
    <div class="item" <#=SiteCatalogUtil.output(data[i]._site_)#>>
           <#
           var hasPrice = false;
           if(data[i].costPrice != null && data[i].costPrice != undefined){
              hasPrice = true;
           }
           if(hasPrice){
              echo('<a href="#product/'+data[i].id+'">')
           }else{
              echo('<a href="#article/'+data[i].id+'">')
           }
           #>

            <div class="goods-img">
                <img data-src="<#=data[i].img#>" alt="广告图" data-width="500" data-height="500"/>
            </div>
            <div class="goods-text"><#=data[i].title#></div>
            <div class="goods-price">
             <#
             if(hasPrice){
               echo('<span class="current-price">￥'+data[i].costPrice+'</span>')
               //echo('<del class="cost-price">￥'+data[i].currentPrice+'</del>')
             }
             #>
            </div>
            <#

                 echo('</a>')

            #>
    </div>
<#}#>
