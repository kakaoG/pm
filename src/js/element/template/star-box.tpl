<div class="star-box" id="<#=data._id#>">
    <div class="stars">
        <#for(var i = 0; i < data.count; i++){#>
        <div class="star" idx="<#=i#>">
        <#
                echo('<i class="iconfont icon-iconxin dark"></i>');
                if(i < data.brightStars) {
                    if(1 > data.brightStars - i) {
                        echo('<div class="half">')
                        echo('<i class="iconfont icon-iconxin bright"></i>');
                        echo('</div>')
                    } else {
                        echo('<i class="iconfont icon-iconxin bright"></i>');
                    }
                }
        #>
        </div>
        <#}#>
    </div>
    <div class="clear-both"></div>
</div>