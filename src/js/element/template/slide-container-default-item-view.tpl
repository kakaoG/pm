<div class="title"><#=data.title#></div>
<#
if(_.isString(data.content)){
    echo('<div class="content">' + data.content + '</div>');
} else {
    data.content = data.content || {};
    var className = data.content.className || '';
    var text = data.content.text || '';

    echo('<div class="content ' + className + '">' + text + '</div>');
}
#>
<#if(data.linkText){#>
<div class="link">
    <#=data.linkText#>
</div>
<#}#>
<#if(data.btnText){#>
<div class="button">
    <button><#=data.btnText#></button>
</div>
<#}#>
<div class="btn-close">
    <i class="iconfont icon-iconcolse icon-close"></i>
</div>