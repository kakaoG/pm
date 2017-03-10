<#if(data.title){#>
<div class="live">
	<div class="header clearfix">
		<span class="title fl">TA的直播</span>
		<span class="num fr"><i class="iconfont icon-iconjiangtou"></i></span>
		<span class="history fr">历史直播</span>
	</div>
	<div class="article clearfix">
	    <div class="article-bg">
	        <img src="<#=data.imgBigUrl#>">
	    </div>
	    <div class="article-con">
	        <div class="living">直播中</div>
            		<div class="live-title"><#=data.title#></div>
            		<div class="live-time">/<#=data.estimatedStartDate#>/</div>
            		<div class="live-person clearfix">
            			<div class="person-img fl">
            				<img src="<#=data.userPicUrl#>" alt="">
            		    </div>
            		<div class="person-name fl"><#=data.realName#></div>
            </div>
	    </div>
	</div>
</div>
<#}#>