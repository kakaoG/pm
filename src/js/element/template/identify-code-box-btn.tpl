<span class="text <#
if(data.counter > 0) {
    echo('disabled')
}
#>">获取验证码<#
if(data.counter > 0){
    echo('(' + (data.countDown - data.counter) + ')');
}
#></span>