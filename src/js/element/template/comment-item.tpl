<ul <#=SiteCatalogUtil.output(data._site_)#>>
    <li class="li-head">
        <img data-src="<#=data.extendColumnOne || ''#>" src="/img/m/toux.png">
        <div class="info">
            <div class="name">
                <div class="nick-name"><#=data.nickName || ''#></div>
                <#if(data.showStar) {#>
                    <div class="score">
                        <div class="sum-score" data-score="<#=data.score#>"></div>
                    </div>
                <#}#>
            </div>
            <#if(data.createDate){#>
            <div class="date"><#=new Date(Date.parse(data.createDate.replace(/-/g,'/'))).format('yyyy-MM-dd')#></div>
            <#}#>
        </div>
        <#if(data.auth && !data.readonly && data.hasAction) {#>
        <div class="action">
            <span class="del">删除</span>
        </div>
        <#}#>
    </li>
    <li class="content"><#=data.comment#></li>
    <#if(false && !data.showContent){#>
    <li class="slide"><span class="up">全文</span></li>
    <#}#>
    <li class="li-img">
        <#for(var i=0;data._pics && i<data._pics.length;i++){
            var curPicData = data._pics[i];
            echo('<img src="'+ curPicData + '">');
        }
        #>
    </li>
    <li class="time">
        <#if(data.showTarget && data.target){#>
        <div class="target">
            <span class="name"><#=data.target.name#></span>
        </div>
        <#}#>
        <div class="div-other">
        </div>
    </li>
    <#if(data.showReply && data.redstarReviewReplies.length > 0){#>
    <li class="review-replies">
        <div class="text">商家回复: <#=data.redstarReviewReplies[0].content#></div>
    </li>
    <#}#>
</ul>
