<div class="bg"></div>
<div class="article">
    <div class="title">
        <div class="name">
            <img src="<#=data.logo#>" alt=logo""/>
            <span><#=data.name#></span>
        </div>
        <div class="flag">
            [<#=data.typeName#>]
        </div>
    </div>
    <div class="divider"></div>
    <div class="content">
        <div class="info">
            <div class="price"><#=data.title#></div>
            <div class="tip"><#data.onSale#></div>
            <div class="time"><span class="label">有效期:</span><#=data.startT#>-<#=data.endT#></div>
        </div>
        <div class="options">
            <div class="option"><span class="label">使用范围:</span><#=data.range#></div>
            <div class="option"><span class="label">使用条件:</span><#=data.option#></div>
            <div class="option"><span class="label">补充说明:</span><#=data.desc#></div>
        </div>
    </div>
    <div class="divider"></div>
    <div class="qrcode">
      <#if(data.couponCode){#>
        <img src="<#=data.qrcodeUrl#>" alt="二维码"/>
        <p>编号: <#=data.couponCode#></p>
      <#}#>
    </div>
</div>
<div class="footer">当面付款时请出示此二维码</div>
