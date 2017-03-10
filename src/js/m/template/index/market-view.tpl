<div class="header clearfix">
    <span class="title fl">所在商场</span>
    <span class="num fr"><i class="iconfont icon-iconjiangtou"></i></span>
</div>
<div class="article clearfix">
    <div class="fl logo">
        <img src="<#=data.img#>" alt=""/>
    </div>
    <div class="market-info">
        <h4>
            <#=data.title#>
            <#if(data.hasCoupon){#>
            <span class="tag">券</span>
            <#}#>
        </h4>
        <div class="score"></div>
        <div class="address"><i class="icon-iconmap iconfont"></i><#=data.address#></div>
    </div>
</div>