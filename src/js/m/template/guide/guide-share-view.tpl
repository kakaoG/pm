<div class="share">
	<div class="header clearfix">
    <span class="title fl">TA的分享</span>
    </div>


    <div class="article clearfix">
        <#for(var i = 0; i<data.shareList.length; i++){#>
    	<div class="share-list clearfix">
    		<div class="fl share-img">
    			<img alt=""  src="<#=data.shareList[i].sharePic#>">
    		</div>
    		<div class="fl share-info">
    			<div class="share-info-text"><#=data.shareList[i].shareArticel#></div>
    			<div class="share-info-time"><#=data.shareList[i].shareTime#></div>
    		</div>
    	</div>
        <#}#>
    </div>
</div>
