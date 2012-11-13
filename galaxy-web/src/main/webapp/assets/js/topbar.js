(function($){
    if(!$) return;
    var curHref = document.URL;
    var curHostname = location.hostname;
    var search = 'http://s.mall.360.cn/search.html';
    var curKey ;
    var defKey = 'def';
    var baseBiz = {
        'def':{feature:'360.cn',regTag:'search',search:search,tag:'def',title:'电商平台'},
        's':{feature:'s.mall.360.cn search.daogou.360.cn',regTag:'search',search:'/search.html',kwName:'query',tag:'search',title:'购物导航',
            suggest:{
                ellipsis:9,
                nameSpace:'eTopbarSuggest',
                offset:{width:25},
                url:'/suggestdict_get.html?count=5&py=',
                style:'#eTopbarSuggest .e_suggest_box .base{text-indent:20px;}',
                tpls:{ 'link -a':'<a href="http://s.mall.360.cn/search.html?query=%enq">搜索"<strong>%q</strong>"相关的<em>商品</em></a>',
                    'base':'{0}',
                    'link -b':'<a target="_blank" href="http://mall.360.cn/mall_dealersearch.html?query=%enq">搜索"<strong>%q</strong>"相关的<em>商家</em></a>',
                    'link -c':'<a  target="_blank" href="http://tuan.360.cn/index.php?do=search&kw=%enq">搜索"<strong>%q</strong>"相关的<em>团购</em></a>'
                }
            }
        },
        't':{feature:'t.360.cn',regTag:'t',search:search,tag:'t',title:'淘宝皇冠店'},
        'tao':{feature:'tao.mall.360.cn',regTag:'mall',search:search,tag:'tao',title:'特供机'},
        'tejia':{feature:'tejia.youhui.360.cn',regTag:'youhui',search:search,tag:'tejia',title:'天天特价'},
        'biz':{feature:'biz.360.cn biz.daogou.360.cn',regTag:'biz',search:search,tag:'biz',title:'商户营销平台'},
        'mall':{feature:'mall.360.cn',regTag:'mall',search:search,tag:'mall',title:'商家导航',
            info:'<a href="http://mall.360.cn/mall_reviewlist.html" >个人中心</a>'
        },
        'chujian':{feature:'chujian.360.cn daogou.360.cn',regTag:'chujian',search:search,tag:'chujian',title:'初见'},
        'youhui':{feature:'youhui.360.cn',regTag:'youhui',search:search,tag:'quan',title:'特惠区',
            info:'<a href="http://youhui.360.cn/mycouponlist.html?aname=my" >我的优惠券</a>'
        },
        'youhui_hd':{feature:'youhui.360.cn/huodong',regTag:'youhui',search:search,tag:'huodong',title:'特惠区',
            info:'<a href="http://youhui.360.cn/mycouponlist.html?aname=my" >我的优惠券</a>'
        },
        'pk':{feature:'pk.youhui.360.cn',regTag:'youhui',search:search,tag:'pk',title:'特惠区',
            info:'<a href="http://youhui.360.cn/mycouponlist.html?aname=my" >我的优惠券</a>'
        },
        'lux':{feature:'lux.mall.360.cn lux.360.cn',regTag:'lux',search:search,tag:'lux',title:'奢侈品'},
        'huodong':{feature:'huodong.360.cn',regTag:'huodong',search:search,tag:'search',title:'奢侈品'},
        'tuan':{feature:'tuan.360.cn',regTag:'tuan',search:search,tag:'tuan',title:'团购导航'}
    }
    var getKey = function(hostname){
        for(var key in baseBiz){
            var featureArr = baseBiz[key].feature.split(' ');
            if($.inArray(hostname,featureArr) > -1){
                curKey = key;
                if(/^youhui/.test(hostname)){
                    if(curHref.indexOf('/huodong') > -1){
                        curKey = 'youhui_hd';
                    }
                }
                return curKey;
            }
        }
        if(!curKey){
            if((hostname.split('.')).length > 3){
                hostname = hostname.substr(hostname.indexOf('.')+1);
            }else{
                return;
            }
            return getKey(hostname);
        }
    }
    curKey = getKey(curHostname) || defKey;
    var data = baseBiz[curKey];
    var topbarCss = '<style> \
        .tp-hd{display:none;position:relative;height:37px;border:1px solid #b6b6b6;border-width:1px 0;background-color:#ffffe1;}\
        .tp-hd p{padding:8px 0 0;text-align:center;}\
        .tp-hd span{color:#ff0000;}\
        .tp-hd strong{font-size:14px;font-weight:bold;}\
        .tp-hd em{color:#52ad00;font-size:14px;font-weight:bold;}\
        .tp-hd .go{display:inline-block;width:88px;height:24px;overflow:hidden;background:url("http://p4.qhimg.com/t018aae9a6bd55c000e.png") no-repeat;text-indent:-200px;vertical-align:middle;}\
        .tp-hd .close{position:absolute;right:0;top:0;width:30px;height:26px;color:#888;font:bold 14px/30px "tahoma","airal","simsun";text-align:center;}\
        .tp-hd .close:hover{color:#ff0000;}\
        .topbar, .channel-box a:hover,\
        .channel-box a:hover span,\
        .channel-box .current,\
        .channel-box .current span,\
        .search-box-inner,\
        .search-trigger .search-box-inner,\
        .search-box button span,\
        .search-trigger .search-box button span\
        {background:url(http://p2.qhimg.com/t01e425b0030680a6c5.png) no-repeat 0 0;}\
        .topbar{position:relative;z-index:10;height:36px;margin:0 0 -2px;background-repeat:repeat-x;}\
        .topbar .fill{width:1000px;margin:0 auto;}\
        .channel-box{float:left;margin:0 30px 0 0;}\
        .channel-box li{float:left; margin:0 1px;}\
        .channel-box a{display:block;float:left;height:34px;padding-right:10px;line-height:34px;}\
        .channel-box a span{display:block;float:left;padding-left:10px;color:#cfcfcf;font-size:14px;cursor:pointer;}\
        .channel-box a:hover{background-color:#4b4b4b;background-position:100% -156px;text-decoration:none;}\
        .channel-box a:hover span{background-position:0 -156px;color:#fff;}\
        .channel-box a.current{background-color:#383838;background-position:100% -40px;}\
        .channel-box a.current span{background-position:0 -40px;color:#fff;font-weight:bold;}\
        .search-box{position:relative;float:left;width:200px;height:22px;margin:6px 0 0;}\
        .search-box-inner{height:22px;overflow:hidden;background-position:0 -78px;}\
        .search-box input,.search-box button{float:left;padding:0;border:0 none;background:transparent;}\
        .search-box input{width:164px;height:16px;line-height:16px;padding:3px 0 3px 10px;font-family:simsun;}\
        .search-box input:focus{outline:none;}\
        .search-box button{position:relative;width:26px;height:22px;line-height:22px;cursor:pointer}\
        .search-box button span{position:absolute;left:0;top:0;width:100%;height:100%;background-position:0px -130px;line-height:22px;}\
        .search-trigger .search-box-inner{background-color:#ccc;background-position:0 -104px;}\
        .search-trigger .search-box-inner button span{background-position:-32px -130px;}\
        #userinfo{color:#ee7e5c;}\
        .user-state{float:right;height:34px;line-height:34px;}\
        .user-state{color:#666;}\
        .user-state a{padding:0 12px;color:#d0d0d0;}\
        .user-state em{margin:0 12px 0 0;color:#ee7e5c;font-weight:normal;}\
        </style>';
        var topbarHtml = '\
        <style>\
            #bnr1111{height:50px;overflow:hidden;}\
            #bnr1111 img{vertical-align:top;}\
            .bnr-close{background:#b40300;}\
            .bnr-open{background:url(http://p8.qhimg.com/t016be15fd310a197f5.png) repeat-x #b40300;}\
            .bnr-main{position:relative;margin:0 auto;display:none;}\
            .bnr-close .main-close{display:block;width:1000px;}\
            .bnr-open .main-open{display:block;width:1040px;}\
            .bnr-share{position:absolute;right:110px;bottom:8px;}\
            .bnr-btn{position:absolute;right:0;bottom:0;width:42px;height:18px;line-height:100px;overflow:hidden;background:url(http://p4.qhimg.com/t01e80b824ce6247120.png) no-repeat;cursor:pointer;}\
            .btn-open{background-position:0 -22px;}\
            .btn-close{background-position:0 0;right:10px;}\
        </style>\
        <div id="bnr1111" class="">\
            <div class="bnr-main main-close">\
                <a href="http://huodong.360.cn?eee=1111banner" target="_blank"><img src="http://p8.qhimg.com/t0126ec456ef2365737.png" /></a>\
                <span id="bnrbtn-open" class="bnr-btn btn-open">展开</span>\
            </div>\
            <div class="bnr-main main-open">\
                <a href="http://huodong.360.cn?eee=1111banner" target="_blank"><img src="http://p9.qhimg.com/t0141a339bde8b500c9.jpg" /></a>\
                <div class="bnr-share">\
                </div>\
                <span id="bnrbtn-close" class="bnr-btn btn-close">收起</span>\
            </div>\
        </div>\
        <div class="tp-hd">\
        <p><span>最超值999学生机夏新大V进步版来了！全新4.5英寸IPS全视角高清大屏，前300万+后800万双高清摄像头，极速双核，特供价：999元 立即去抢！</span>\
        <a class="go" href="http://www.360buy.com/product/741893.html" target="_blank">立刻订购</a></p>\
        <a class="close" href="/" title="关闭">x</a>\
        </div>\
        <div class="topbar" id="e_topbar" bk>\
        <div class="fill">\
        <div id="top_tab" class="channel-box">\
        <ul>\
        <li tag="search"><a href="http://s.mall.360.cn/" target="_blank"><span>首页</span></a></li>\
        <li tag="chujian"><a href="http://chujian.360.cn/" target="_blank"><span>初见</span></a></li>\
        <li tag="mall"><a href="http://mall.360.cn/" target="_blank"><span>商家</span></a></li>\
        <li tag="quan"><a href="http://youhui.360.cn/quan?aname=top" target="_blank"><span>优惠券</span></a></li>\
        <li tag="huodong"><a href="http://youhui.360.cn/huodong?aname=top" target="_blank"><span>促销</span></a></li>\
        <li tag="tuan"><a href="http://tuan.360.cn" target="_blank"><span>团购</span></a></li>\
        <li tag="lux"><a href="http://lux.360.cn" target="_blank"><span>奢侈品</span></a></li>\
        <li tag="t"><a href="http://t.360.cn" target="_blank"><span>特供机</span></a></li>\
        </ul>\
        </div>\
        <div class="search-box">\
        <div class="search-box-inner">\
        <form id="e_topbar_search" method="get" action="'+data['search']+'" >\
        <input type="hidden" name="eee" value="s2" />\
        <input type="text" name="'+(data['kwName'] || 'query')+'" id="e_topbar_kw" maxlength="60"/><button type="submit">搜<span></span></button>\
        </form>\
        </div>\
        </div>\
        <div class="user-state" id="logink" style="display:none">\
        <p><a id="userlogin" target="_blank" href="">登录</a>|<a target="_blank" href="http://i.360.cn/reg?src='+data['regTag']+'&destUrl='+encodeURIComponent(curHref)+'">注册</a></p>\
        </div>\
        <div class="user-state" id="logined" style="display:none;">\
        <p><strong id="userinfo"></strong> <span id="topbar_info">'+(data.info ? data.info : '<a href="http://i.360.cn" target="_blank">账户设置</a>')+'</span>|<a id="logout" href="">退出</a></p>\
        </div>\
        <!--<div class="mod-user user-state">\
        <span class="nloginWrap" style="display:none">\
        <a class="btn-login-pop" href="#" >登录</a>|<a class="btn-reg-pop" href="#" >注册</a>\
        </span>\
        <span class="loginWrap" style="display:none" >\
        <em class="popUsername" ></em>|<span id="topbar_info">'+(data.info ? data.info : '<a href="http://i.360.cn" target="_blank">账户设置</a>')+'</span>|<a class="btn-logout-pop" href="#" >退出</a>\
        </span>\
        </div>-->\
        </div>\
        </div>\
        <!--<script src="http://s0.qhimg.com/i360/;js;pass_api_seed/v2208.js"></'+'script>--><script src="http://tuan.360.cn/scripts/login_v5.js"></'+'script> ';
    var topbar = topbarCss + topbarHtml;
    document.write(topbar);
    $('#e_topbar li[tag='+data['tag']+'] a').attr('target','_self').addClass('current');
    Qtool.placeholder({input:'#e_topbar_kw',form:'#e_topbar_search',defKeyword:'请输入关键字'});
    ;(function(){
        var _w = 142 , _h = 32;
        var param = {
            url:location.href,
            type:'4',
            count:'', /**是否显示分享数，1显示(可选)*/
            appkey:'3068759065', /**您申请的应用appkey,显示分享来源(可选)*/
            title:'#360购物·豪门盛宴# 11.7正式奢华开幕！汇聚知名购物网站，一起玩转双十一！！曾经11.11是单身男女自我调侃的光棍节，如今已成为网购盛宴狂欢节。什么值得买？哪些是真折扣，哪些是假忽悠？360购物汇集全网双十一活动，真实惠假优惠，一比全知道。', /**分享的文字内容(可选，默认为所在页面的title)*/
            pic:'http://p5.qhimg.com/t017677475a57a5e138.jpg', /**分享图片的路径(可选)*/
            ralateUid:'2129153731', /**关联用户的UID，分享微博会@该用户(可选)*/
            language:'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
            rnd:new Date().valueOf()
        }
        var temp = [];
        for( var p in param ){
            temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
        }
        $(document).ready(function(){
            $('.bnr-share').html('<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>');
            });
    })();
    ;(function($){
        var isBnrClose = Qtool.cookie('_Bnr-1111');
        var closeBnr = function(){
            $('#bnr1111').animate({height:'50px'},500,function(){ 
                $('#bnr1111').attr('class','bnr-close');
                Qtool.cookie('_Bnr-1111',1,1,'','.360.cn');
            });                                                    
        }
        var openBnr = function(){
            $('#bnr1111').animate({height:'350px'},500);
            $('#bnr1111').attr('class','bnr-open');
        }
        if(isBnrClose){
            $('#bnr1111').attr('class','bnr-close');
            closeBnr();
        }else{
            openBnr();
            setTimeout(closeBnr,5000);
        }
        $('#bnrbtn-close').live('click',function(){
            closeBnr();
        });
        $('#bnrbtn-open').live('click',function(){
            openBnr();
        });
    })(jQuery);


    /*
    if(!Qtool.cookie('tegongji_zj4')){
    $('.tp-hd').show();
    }
    $('.tp-hd .close').click(function(){
    $('.tp-hd').hide();
    Qtool.cookie('tegongji_zj4',1,1);
    return false;
    });
    */
    /*
    var loginFuns = [] ,logoutFuns = [];
    window.ELogin = {
    init:function(obj){
    },
    logout:function(){
    QHPass.logout();
    },
    login:function(){
    QHPass.login();
    },
    regLoginFun : function(name,fun){
    loginFuns.push(fun);
    },
    regLogoutFun : function(name,fun){
    logoutFuns.push(fun);
    }
    };
    */
    $(function(){
        ELogin.init({'ischeck':true,'title':data['title'],'loginid':'#userlogin','logoutid':'#logout','loginevent':function(){                     
            $('#logink').hide();                                                                                                              
            $('#userinfo').html(ELogin.userInfo.username);                                                                                    
            $('#logined').show();                                                                                                             
        },'logoutevent':function(){                                                                                                       
            $('#logined').hide();                                                                                                             
            $('#logink').show();                                                                                                              
        }});    
        /*
        QHPass.resConfig.regSrc = data.regTag;
        QHPass.resConfig.charset = 'utf-8';
        QHPass.resConfig.reloadAfterLogout = false;
        QHPass.resConfig.loginOpts.thirdLogin =  ['msn|fetion|renren|sina', data.regTag, 'pop'];
        QHPass.getUserInfo(function(info){
        window.qid = info.qid;
        });
        QHPass.resConfig.callback = function(){
        window.qid = QHPass.uinfo.qid;
        for(var i=0,len = loginFuns.length;i<len;i++){
        if(typeof loginFuns[i] === 'function'){
        loginFuns[i]();
        }
        }
        };
        QHPass.resConfig.logoutCallback = function(){
        window.qid = '';
        for(var i=0,len = logoutFuns.length;i<len;i++){
        if(typeof logoutFuns[i] === 'function'){
        logoutFuns[i]();
        }
        }
        };
        */
        if(data.suggest){
            var option = {input:'#e_topbar_kw'};
            $.extend(option,data.suggest);
            Qtool.newsuggest(option);
        }
    });

})(window.jQuery);