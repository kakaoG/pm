<div class="goods-name"><#=data.pdtName#>
</div>
<div class="price-box">
    <div class="price-box-l">
      <#if(data.salePrice != null && data.salePrice != undefined && data.salePrice != data.accountPrice){#>
        <span class="mark">￥</span><span class="price"><#=data.accountPrice#></span>
        <del>￥<#=data.salePrice#></del>
        <span class="account-tag">
          <span class="tag-left"><em class="tag-point"></em></span>
          <span class="tag-main">促 销 价</span>
        </span>
      <#}else{#>
        <span class="mark">￥</span><span class="price"><#=data.salePrice#></span>
      <#}#>
    </div>
    <p class="stock"><#=data.stock>0?'活动库存':'库存'#>: <#=data.stock>0?data.stock:data.inventory#></p>
</div>
