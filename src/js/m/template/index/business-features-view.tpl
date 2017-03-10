<div class="header">
    商户特色
</div>
<ul>
    <#for(var i = 0; i<data.length; i++){#>
    <li><#=data[i].tagName#></li>
    <#}#>
</ul>