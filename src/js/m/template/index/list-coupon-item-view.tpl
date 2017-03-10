<ul class="<#=data.disabled#>">
    <li class="instruction">
        <div class="bg-top">&nbsp;</div>
        <div class="bg-bottom">&nbsp;</div>
        <div class="title"><#=data.title#></div>
        <div class="condition"><#=data.condition#></div>
        <div class="expiry-date">有效期<#=new Date(data.expiryDate.from).format('yyyy.MM.dd')#>-<#=new Date(data.expiryDate.to).format('yyyy.MM.dd')#></div>
    </li>
    <li class="concat"></li>
    <li class="action">
        <div class="bg-top">&nbsp;</div>
        <div class="bg-bottom">&nbsp;</div>
        <span class="action-text"><#=data.actionText#></span>
    </li>
</ul>
