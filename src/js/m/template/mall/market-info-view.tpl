<div class="info">
    <h2><#=data.title#></h2>
    <div class="visit">
        <span>人气<#=data.visits#></span>
        <span class="star-wrapper"></span>
    </div>
        <div class="label-list">
        </div>
    <div class="follow">
        <div class="btn like"><i class="icon-icon iconfont"></i>收藏</div>
    </div>
</div>
<div class="theme">
    <#if(data.marketTheme&&(data.marketTheme.length>0)){#>
        <#for(var i=0; i<data.marketTheme.length; i++){#>
        <div class="item">
            <a href="<#=data.marketTheme[i].link#>">
                <img src="<#=data.marketTheme[i].img#>" alt=""/>
                <div class="label">
                    <div class="name"><#=data.marketTheme[i].text1#></div>
                    <div class="floor"><#=data.marketTheme[i].text2#></div>
                </div>
            </a>
        </div>
        <#}}#>
</div>