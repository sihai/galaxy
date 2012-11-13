if (!this.JSON) { this.JSON = {}; } (function () { 'use strict'; function f(n) { return n < 10 ? '0' + n : n; } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear()     + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate())      + 'T' + f(this.getUTCHours())     + ':' + f(this.getUTCMinutes())   + ':' + f(this.getUTCSeconds())   + 'Z' : null; }; String.prototype.toJSON      = Number.prototype.toJSON  = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {    '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i,          k,          v,          length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === 'string') { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', {'': value}); }; } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/ .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@') .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']') .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({'': j}, '') : j; } throw new SyntaxError('JSON.parse'); }; } }());


    var Qtool = window.Qtool || {};
    Qtool.cookie = function()
    {
        var GetCookieVal = function(offset)
        {
            var endstr = document.cookie.indexOf (";", offset);
            if (endstr == -1)
                endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        };
        var getCookie = function (name)
        {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen)
            {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg)
                    return GetCookieVal (j);
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        }; 
        var setCookie = function (argv)
        {
            var expdate = new Date();
            var argc = argv.length;
            var name = argv[0];
            var value = argv[1];
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            if(expires!=null) expdate.setTime(expdate.getTime() + ( expires*24*60*60*1000 ));
            document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
            +((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
            +((secure == true) ? "; secure" : "");
        }; 
        if(arguments.length > 1)
        {
            return setCookie(arguments);
        }else{
            return getCookie(arguments[0]);
        }
    }
    Qtool.suggest = function(data)
    {
        if(typeof $.extend != 'function') return;
        var options = {
            quantifier:'个团购',
            border:'1px solid #ccc',
            offset:0,
            url:'',
            inputid:'',
            tpl:'',
            styleName:'suggest_content',
            style:'.suggest_content li{height:24px;padding:0 5px;line-height:24px;} \
                .suggest_content .current{background:#ffe9be;cursor:pointer;} \
                .suggest_key{float:left;} \
                .suggest_result{float:right;} \
                .suggest_result strong{color:#f60;font-weight:normal;}',
            defkeyword:'',
            nullFun:null,
            valFun:null
        };
        $.extend(options,data);
        var suggest = {

            inputBox:null,
            qHistory:{},
            noResultKeywords:[],
            curKeyword:'',
            curLiLen:0,
            curListIndex:-1,
            isTriggerBlur : true,
            assemblyList:function()
            {
                var obj = this.inputBox,detail = options.offset,name = options.styleName;
                var list_left = obj.offset().left-detail, list_top = obj.offset().top + obj.outerHeight(),list_width = obj.innerWidth()+detail;
                var style =' .'+name+'{display:none;position:absolute;z-index:200;left:'+list_left+'px;top:'+list_top+'px;width:'+(list_width)+'px;border:'+options.border+';border-top:0 none;background:#fff;} ';
                var listHmtl = ' <div class="'+name+'" id="'+name+'"> <ul>  </ul> </div>';
                $('head').append('<style>' + style + options['style'] + '</style>');
                $('body').append(listHmtl);
            },
            hideList:function()
            {
                var list = $('#'+options.styleName);
                this.curLiLen = 0;
                list.hide();
                list.find('ul').html('');
            },
            isUsefulKW:function()
            {
                var kw = this.curKeyword,nr = this.noResultKeywords;
                if(!kw || kw === options.defkeyword){
                    return;
                }
                for(var i=0,len =nr.length;i<len;i++)
                {
                    if(kw.indexOf(nr[i]) > -1)
                        return false;
                }
                return true;
            },
            boxEventHandle:function()
            {
                var list = $('#'+options.styleName);
                var obj = this.inputBox;
                var topThis = this;
                $(window).resize(function(){
                    list.css('left',obj.offset().left-topThis.offset);
                })
                list.find('li').live('mouseover',function(){
                    list.find('li').removeClass('current');
                    $(this).addClass('current');
                    topThis.isTriggerBlur = false;
                }).live('mouseout',function(){
                    topThis.curListIndex = -1;
                    list.find('li').removeClass('current');
                    topThis.isTriggerBlur = true;
                });
                obj.blur(function(){
                    if(!topThis.isTriggerBlur){ 
                        var val = list.find('.current').find('.suggest_key').text();
                        obj.val(val);
                        obj.parents('form').submit();
                    }
                    topThis.hideList();
                    topThis.isTriggerBlur = true;
                })
                obj.keyup(function(e){
                    var keycode = e.keyCode;
                    topThis.isTriggerBlur = true;
                    if(keycode == 27){
                        topThis.hideList();
                        return;
                    }
                    var liLen = topThis.curLiLen;
                    if(liLen) {
                        var lis = list.find('li');
                        lis.removeClass('current');
                        var curIndex = topThis.curListIndex;
                        if(keycode == 40){
                            curIndex++;
                            if( curIndex == liLen){
                                this.value = topThis.curKeyword;
                                topThis.curListIndex = -1;
                                return;
                            }
                            var cur = lis.eq(curIndex);
                            cur.mouseover();
                            this.value = cur.find('.suggest_key').text();
                            topThis.curListIndex = curIndex;
                            return;
                        }
                        if(keycode == 38) {
                            curIndex--;
                            if(curIndex == -2) curIndex = liLen-1;
                            if( curIndex == -1){
                                this.value = topThis.curKeyword;
                                topThis.curListIndex = -1;
                                return;
                            }
                            var cur = lis.eq(curIndex);
                            cur.mouseover();
                            this.value = cur.find('.suggest_key').text();
                            topThis.curListIndex = curIndex;
                            return;
                        }
                    }
                    var keyword = $.trim(this.value);
                    topThis.oldKeyword = topThis.curKeyword;
                    topThis.curKeyword = keyword;
                    if(topThis.oldKeyword === topThis.curKeyword) return;
                    topThis.curListIndex = -1;
                    if(!topThis.isUsefulKW())
                    {
                        topThis.hideList();
                        return;
                    }
                    var res = topThis.qHistory[keyword];
                    if(res){
                        topThis.appendToList(res);
                    }else{
                        topThis.start = true;
                        $.getJSON(options.url+encodeURIComponent(keyword),function(data){
                            if(data) {
                                if(!data.length) topThis.noResultKeywords.push(keyword);
                                topThis.qHistory[keyword] = data;
                                if(!topThis.start) return;
                                topThis.appendToList(data);
                            }
                            topThis.start = false;
                        });
                    }
                })
            },
            parseTpl:function(data){
                if(options.tpl){
                    return options.tpl.replace(/\{(.*?)\}/,function($0,$1){
                        return data[$1];
                    });
                }else{
                    return '<li><span class="suggest_key">'+data[0]+'</span><span  class="suggest_result">约<strong>'+data[1]+'</strong>'+options.quantifier+'</span></li>';
                }
            },
            appendToList:function(data)
            {
                var data = data ? data : [];
                var list = $('#'+options.styleName);
                var len  = data.length 
                if(len > 0){
                    var html = [];
                    for(var i=0;i<len;i++)
                    {
                        var temp = data[i];
                        html.push(this.parseTpl(temp));
                    }
                    this.curLiLen = len;
                    list.find('ul').html(html.join(''));
                    list.show();
                    if(typeof options.valFun === 'function') options.valFun();
                }else{
                    this.hideList();
                    if(typeof options.nullFun === 'function') options.nullFun();
                }
            },
            main:function()
            {
                var obj = $(options.inputid);
                var topThis = this;
                if(!obj[0] || !options.url) return;
                this.inputBox = obj;
                options.defkeyword =  options.defKeyword || obj.val();
                obj.attr('autocomplete','off');
                obj.one('focus',function(){
                    topThis.assemblyList();
                    topThis.boxEventHandle();
                });
            }

        }
        $(function(){
            try{
                suggest.main();
            }catch(e){
            }
        });
    }
    Qtool.lazyLoadImg = function(data)
    {
        var options = {
            imgs:null,
            replaceName:'_src',
            imgHeight:300,
            pre:200,
            nopic:'http://p6.qhimg.com/t0192160a7fed21bf8c.png'
        }
        $.extend(options,data);
        if(!options.imgs) return;
        var timer,imgh = options.imgHeight,preHeight = options.pre,replaceName = options.replaceName;
        var imgs = options.imgs.find('img'), imgN = imgs.length, countImg = 0;
        $(window).scroll(function(){
            if(timer) clearTimeout(timer);
            if(countImg == imgN) return;   
            var wHeigh = $(window).height();
            timer = setTimeout(function(){
                var sTop = $(window).scrollTop();
                imgs.each(function(){
                    var tTop = $(this).offset().top;
                    var src = $(this).attr('src');
                    if( (!src || src == options.nopic) && tTop > sTop - imgh && tTop < sTop + wHeigh + preHeight ) {   
                        countImg++;
                        $(this).attr('src',$(this).attr(replaceName));
                    }   
                })  
            },50)
        }); 
        if(!$(window).scrollTop()){
            $(window).scroll();
        }   
    }
    Qtool.goTop = function(pageWidth,value,bottom,imgsrc) 
    {   
        var pageWidth = pageWidth,value = value ? value : 0,bottom = bottom ? bottom : 80;
        var imgsrc = imgsrc ? imgsrc : 'http://p8.qhimg.com/t01fbf458a6a0179516.gif';
        var goTop = {
            imgInfo:[],
            assemblyHtml:function()
            {
                var w = this.topImgInfo[0],h = this.topImgInfo[1];
                if(!pageWidth) pageWidth = $('body').find('div').eq(0).width();
                var style = '.Q_gotop{ background: url("'+imgsrc+'") no-repeat scroll 0 0 transparent; \
                    cursor: pointer; display: none; height: '+h+'px; right:50%; position: fixed;_position:absolute; width: '+w+'px; z-index: 99; \
                    margin-right:'+(-(pageWidth/2+w+1))+'px;}';
                $('head').append('<style>'+style+'</style>');
                $('body').append('<div id="Q_gotop" class="Q_gotop"></div>');
            },
            handleEvent:function()
            {
                var hh = this.topImgInfo[1]+bottom;
                var Q_gotop = $('#Q_gotop');
                Q_gotop.click(function(){
                    $(window).scrollTop(0);
                });
                $(window).scroll(function(){
                    var wh = $(this).height();
                    var sTop = $(this).scrollTop();
                    if(sTop > value) {
                        if(!window.XMLHttpRequest){
                            Q_gotop.css('top',wh-hh+sTop);
                        }else{
                            Q_gotop.css('bottom',bottom);
                        }
                        Q_gotop.show();
                    }else{
                        Q_gotop.hide();
                    }

                })
            },
            main:function()
            {
                var topThis = this;
                var topImg = new Image();
                topImg.onerror = topImg.onload = function(){
                    topThis.topImgInfo = [topImg.width,topImg.height];
                    topThis.assemblyHtml();
                    topThis.handleEvent();
                }
                topImg.src = imgsrc;
            }   
        }   
        $(function(){
            goTop.main();
        });
    }
    Qtool.share = function(container)
    {
        if(!container) return;
        var doc = document;
        var selector = doc.getElementById(container);
        if(!selector) return;
        if(!-[1,])
        {
            doc.createElement('share360_li');
        }
        var title = arguments[1] ? encodeURIComponent(arguments[1]) : encodeURIComponent(doc.title);
        var url = arguments[2] ? escape(arguments[2]) : escape(location.href);
        var appkey = arguments[3] ? encodeURIComponent(arguments[3]) : '';
        var ralateUid = arguments[4] ? encodeURIComponent(arguments[4]) : '';
        var style = 'share360_li {float:left;height:16px;line-height:16px; cursor:default;margin-right:5px;display:inline;font-size:12px;color:#666;} share360_li a{background:url(http://img.qihoo.com/images/2008/360f2e/share360/shareicon_v1.1.png) no-repeat;height:16px; width:16px;display:block;}';
            var css = document.createElement('style');
            css.type='text/css';
            document.getElementsByTagName('head')[0].appendChild(css);
            if(css.styleSheet)
                css.styleSheet.cssText=style;
            else
                css.appendChild(document.createTextNode(style));
            var shareList = [{name:'\u65B0\u6D6A\u5FAE\u535A',url:'http://v.t.sina.com.cn/share/share.php?ralateUid='+ralateUid+'&appkey='+appkey+'&title='+title+'&url='+url,position:'0 0'},
                {name:'\u4EBA\u4EBA\u7F51',url:'http://share.renren.com/share/buttonshare.do?link='+url+'&title='+title,position:'0 -16px'},
                    {name:'\u5F00\u5FC3\u7F51',url:'http://www.kaixin001.com/repaste/share.php?rtitle='+title+'&rurl='+url,position:'0 -32px'},
                        {name:'\u8C46\u74E3',url:'http://www.douban.com/recommend/?url='+url+'&title='+title,position:'0 -48px'},
                            {name:'\u767E\u5EA6\u7A7A\u95F4',url:'http://apps.hi.baidu.com/share/?title='+title+'&url='+url,position:'0 -64px'}];
                                var listHtml = [];
                                listHtml.push('<share360_li>\u5206\u4EAB\u5230 |</share360_li>')
                                for(var i=0,len=shareList.length;i<len;i++)
                                {
                                    var temp = shareList[i];
                                    listHtml.push('<share360_li><a href="'+temp.url+'" target="_blank"  style="background-position:'+temp.position+'" title="\u5206\u4EAB\u5230'+temp.name+'"></a></share360_li>');
                                }
                                selector.innerHTML = listHtml.join('');
    }
    Qtool.pop = function(options)
    {
        var option = {
            nameSpace:'',
            markColor:'#000',
            opacity:0.8,
            popWidth:0,
            popHeight:0,
            closeObj:null,
            openObj:null,
            content:'',
            zindex:888,
            openFun:null,
            closeFun:null
        };
        $.extend(option,options);
        var popId = option.nameSpace || 'qtoolPop';
        var assembly = function() {
            var winH = $(window).height(),docH = $(document).height();
            if(!Qtool.pop.assemblyFrameOk) {
                var markStyle ='position:absolute;left:0;top:0;;width:100%;';
                var html = '<div id="mark'+popId+'" style="'+markStyle+'"></div><div id="pop'+popId+'" style="position:absolute;"></div>';
                $('body').append(html);
                Qtool.pop.assemblyFrameOk = true;
            }
            $('#mark'+popId).css({'zIndex':option.zindex,'background':option.markColor,'opacity':option.opacity,'height':(winH > docH ? winH : docH)});
            $('#pop'+popId).css({'zIndex':option.zindex+1,'width':option.popWidth, 'top': ($(window).scrollTop()+(winH-option.popHeight)/2), 'left':($(window).width()-option.popWidth)/2});
        }
        var openFun = function(){
            assembly();
            if(typeof option.openFun === 'function') option.openFun($(this));
            var popObj = $('#pop'+popId);
            $('#mark'+popId).show();
            if(option.content) popObj.html(option.content);
            popObj.children().eq(0).show();
            popObj.show();
        }
        if(!option.openObj){
            openFun();
        }else{
            $(option.openObj).live('click',function(){
                openFun();
                return false;
            });
        }
        if($('#pop'+popId).find(option.closeObj)[0]){
            $('#pop'+popId).find(option.closeObj)[0].onclick = function(){
                var popObj = $('#pop'+popId);
                popObj.hide();
                $('#mark'+popId).hide();
                if(typeof option.closeFun === 'function') option.closeFun($(this));
                return false;
            };
        }else{
            $('#pop'+popId).find(option.closeObj).live('click',function(){
                var popObj = $('#pop'+popId);
                popObj.hide();
                $('#mark'+popId).hide();
                if(typeof option.closeFun === 'function') option.closeFun($(this));
                return false;
            });
        }
    }
    Qtool.image = function(options)
    {
        var option = {
            src:'',
            timestamp:'',
            loadFun:null
        }
        $.extend(option,options);
        var src = option.src;
        if(!src) return;
        var image = new Image();
        image.onload = image.onerror = image.onabort =  function(){
            image.onload = null;
            image.onerror = null;
            image.onabort = null;
            if(typeof option.loadFun === 'function') option.loadFun(image);
            image = null;
        }
        image.src = src+(option.timestamp ? ((src.indexOf('?') > -1 ? '&' : '?') + option.timestamp+'='+ +new Date) : '');
    }
    Qtool.placeholder = function(options)
    {
        if(!options) return;
        var option = {
            form:'',
            input:'',
            empty:false,
            defKeyword:'',
            keyword:'',
            emptyVal:'',
            defStyle:{'color':'#ccc'},
            style:{'color':'#000'},
            submit:null
        };
        if(typeof $ === 'undefined' || !$.extend) return;
        $.extend(option,options);
        var input = $(option.input), form = input.parents('form');
        var keyword = option.keyword, defKeyword = option.defKeyword ;
        var def = keyword || defKeyword ;
        var setStyle = function()
        {
            var val = input.val();
            if(val == def){
                input.css(option.defStyle);
            }else{
                input.css(option.style);
            }
        };
        if(!input.val()) {
            input.val(def);
        }
        setStyle();
        input.live({'focus':function(e) {
            var val = $.trim($(this).val());
            if(val ==  def){
                $(this).val('');
            }
            setStyle();
        },
        'blur':function(e) {
            var val = $.trim($(this).val());
            if(val ==  ''){
                $(this).val(def);
            }
            setStyle();
        }
        });
        form.submit(function(){
            var val = $.trim(input.val());
            if(option.submit){ 
                return option.submit(val);
            }
            if(!option.empty) {
                if(!val || val == defKeyword) return false;
            }else{
                if( !val || val == defKeyword){
                    var newval = option.emptyVal || '';
                    input.val(newval);
                }
            }
        });
    }
    Qtool.sidebiz = function(options)
    {
        var option = {
            biz:'gotop',//float or gotop
            preTop:300,
            pageWidth:960,
            side:'right',// left or right
            width:23,
            height:68,
            bottom:80,
            content:'',
            topOffset:0,
            src:'http://p8.qhimg.com/t01fbf458a6a0179516.gif',
            selector:''
        };
        $.extend(option,options);
        var assembly,eventHandl,html = [],side = option.side;
        var isIE6 = !window.XMLHttpRequest;
        var posStyle = isIE6 ? "absolute" : "fixed";
        var style= 'position:'+posStyle+';'+side+':50%;margin-'+side+':-'+(option.pageWidth/2+option.width+1)+'px;display:none;';
        var gotop = function()
        {
            var content = option.content ? option.content : '<img src="'+option.src+'" style="cursor:pointer"/>';
            $('body').append('<div id="qtool_gotop" style="'+style+'"> '+ content +'</div>');
            var preTop = option.preTop,qtool_gotop = $('#qtool_gotop');
            if(!isIE6) qtool_gotop.css('bottom',option.bottom);
            $('#qtool_gotop').live('click',function(){ $(window).scrollTop(0); return false;});
            $(window).scroll(function(){
                var sTop = $(this).scrollTop();
                if(sTop >= preTop) {
                    qtool_gotop.show();
                    if(isIE6){
                        var wh = $(this).height();
                        qtool_gotop.css('top',sTop+wh-option.bottom-option.height);
                    }
                }else{
                    qtool_gotop.hide();
                }
            });
        };
        var float = function(){
            $('body').append('<div id="qtool_float" style="'+style+'"> </div>');
            var preTop = option.preTop,qtool_float = $('#qtool_float');
            qtool_float.html(option.content ? option.content : $(option.selector));
            var topH = ($(window).height()-option.height)/2 + option.topOffset;
            qtool_float.children().eq(0).show();
            qtool_float.css('top',topH);
            if(preTop)
            {
                $(window).scroll(function(){
                    var sTop = $(this).scrollTop();
                    if(sTop >= preTop) {
                        qtool_float.show();
                        if(isIE6){
                            qtool_float.css('top',$(window).scrollTop()+topH);
                        }
                    }else{
                        qtool_float.hide();
                    }
                });
            }else{
                qtool_float.show();
                if(isIE6)
                {
                    $(window).scroll(function(){
                        qtool_float.css('top',$(window).scrollTop()+topH);
                    })
                }
            }
        };
        $(function(){
            if(option.biz == 'gotop') gotop();
            if(option.biz == 'float') float();
        });
    }
    Qtool.slide = function(options)
    {
        var option = 
        {
            container:'',
            show: {
                container:'',
                pics:[],
                template:'',
                href:[],
                alt:[]
            },
            operate:{
                container:'',
                pics:[],
                template:'',
                hoverClass:'',
                fun:null
            },
            controlInfo:{
                loadData:true,
                direction:0,// 0 left right ,1   up down 
                width:'',
                height:'',
                auto:true,
                animate:true,
                intervalTime:5000,
                animateTime:400,
                triggerType:'click'
            }
        };
        $.extend(true,option,options);
        var reg = /{(.*?)}/gi;
        var process = {
            currIndex:0,
            preIndex:0,
            num:0,
            slideCount:0,
            main:function()
            {
                var controlInfo = option.controlInfo;
                this.autoAnimate = controlInfo.animate && controlInfo.auto;
                this.showContainer = $(option.show.container);
                this.listContainer = $(option.operate.container);
                this.num = controlInfo.loadData ? option.show.pics.length : $(option.show.container).children().length;
                if(!this.num) return;
                if(controlInfo.loadData){
                    this.assembly();
                }
                if(this.autoAnimate) {
                    this.auto();
                }
                this.handleEvent();
            },
            loadPic:function()
            {
                var n = 0,num = this.num,that = this;
                for(var i=0;i<num;i++)
                {
                    Qtool.image({src:option.show.pics[i],loadFun:function(){
                        n++;
                        if(n == num) {
                            if(that.autoAnimate ) {
                                that.picLoadOk = true;
                                that.auto();
                            }
                        }
                    }});
                }
            },
            auto:function(){
                if(this.mousehover) return;
                //if(this.mousehover || (option.controlInfo.waitPics && !this.picLoadOk)) return;
                var that = this;
                var list = option.operate;
                var listLies = this.listContainer.children();
                that.autoSetTimer = setInterval(function(){
                    that.slideCount++;
                    if(that.slideCount >= that.num){
                        that.slideCount = 0;
                    }
                    listLies.removeClass(list.hoverClass);
                    listLies.eq(that.slideCount).addClass(list.hoverClass);
                    that.preIndex = that.currIndex;
                    that.currIndex = that.slideCount;
                    that.animate();
                },option.controlInfo.intervalTime);
            },
            animate:function()
            {
                var pre = this.preIndex,cur = this.currIndex;
                var that = this;
                var controlInfo = option.controlInfo; 
                var showContainer = this.showContainer;
                var showChildren = showContainer.children();
                var o = {};
                showContainer.stop();
                if(typeof option.operate.fun === 'function'){
                    option.operate.fun(cur);
                }
                var direction = controlInfo.direction;
                var dir = 'margin-',val;
                showChildren.hide();
                showChildren.eq(pre).show();
                showChildren.eq(cur).show();
                if(direction == 0)
                {
                    dir+= 'left';
                    val = controlInfo.width;
                }
                if(direction == 1)
                {
                    dir+= 'top';
                    val = controlInfo.height;
                }

                if(cur > pre)
                {
                    o[dir] = -val;
                    showContainer.css(dir,0);
                    showContainer.animate(o,controlInfo.animateTime,function(){
                        showChildren.eq(pre).hide();
                        showContainer.css(dir,0);
                    });
                }
                if(cur < pre)
                {
                    o[dir] = 0;
                    showContainer.css(dir,-val);
                    showContainer.animate(o,controlInfo.animateTime,function(){
                        showChildren.eq(pre).hide();
                    });
                }
            },
            toStr:function(str,obj)
            {
                var str = str.replace(reg,function($0,$1){
                    var s = obj[$1];
                    return s ? s : '';
                });
                return str;
            },
            assembly:function()
            {
                var show = option.show,list = option.operate;
                var showContainer = this.showContainer;
                var listContainer = this.listContainer;
                var num = this.num;
                var showHtml = [],listHtml = [];
                for(var i=0;i<num;i++)
                {
                    var tempObj = {};
                    tempObj.i = i+1;
                    tempObj.src = show.pics[i];
                    tempObj.href = show.href[i];
                    tempObj.alt = show.alt[i] ? show.alt[i] : '';
                    showHtml.push(this.toStr(show.template,tempObj));
                    tempObj2 = {};
                    tempObj2.i = i+1;
                    tempObj2.src = show.pics[i];
                    listHtml.push(this.toStr(list.template,tempObj2));
                    tempObj = null;
                    tempObj2 = null;
                }
                showContainer.html(showHtml.join(''));
                listContainer.html(listHtml.join(''));
                listContainer.children().eq(0).addClass(list.hoverClass);
            },
            handleEvent:function()
            {
                var controlInfo = option.controlInfo,list = option.operate;
                var showLies = this.showContainer.children();
                var listLies = this.listContainer.children();
                var animate = controlInfo.animate;
                var that = this;
                if(animate)
                {
                    listLies[controlInfo.triggerType](function(){
                        var curThis = $(this);
                        var index = curThis.index();
                        if(index == that.currIndex) return;
                        listLies.removeClass(list.hoverClass);
                        curThis.addClass(list.hoverClass);
                        that.preIndex = that.currIndex;
                        that.currIndex = index;
                        that.animate();
                    });
                }else{
                    listLies[controlInfo.triggerType](function(){
                        listLies.removeClass(list.currentClass);
                        $(this).addClass(list.hoverClass);
                        var index = $(this).index();
                        showLies.hide();
                        showLies.eq(index).show();
                        if(typeof option.operate.fun === 'function'){
                            option.operate.fun(index);
                        }
                    });
                }
                if(this.autoAnimate)
                {
                    $(option.container).mouseenter(function(){
                        that.mousehover = true;
                        if(that.autoSetTimer)
                        clearInterval(that.autoSetTimer);
                    }).mouseleave(function(){
                        that.mousehover = false;
                        that.slideCount = that.currIndex;
                        that.auto();
                    });
                }
            }
        };
        process.main();
    };
    Qtool.store = (function()
    {
        var store = {},
        win = window,
        doc = win.document,
        localStorageName = 'localStorage',
        globalStorageName = 'globalStorage',
        namespace = '__storejs__',
        storage

        store.disabled = false
        store.set = function(key, value) {}
        store.get = function(key) {}
        store.remove = function(key) {}
        store.clear = function() {}
        store.transact = function(key, defaultVal, transactionFn) {
            var val = store.get(key)
            if (transactionFn == null) {
                transactionFn = defaultVal
                defaultVal = null
            }
            if (typeof val == 'undefined') { val = defaultVal || {} }
            transactionFn(val)
            store.set(key, val)
        }
        store.getAll = function() {}

        store.serialize = function(value) {
            return JSON.stringify(value)
        }
        store.deserialize = function(value) {
            if (typeof value != 'string') { return undefined }
            return JSON.parse(value)
        }

        function isLocalStorageNameSupported() {
            try { return (localStorageName in win && win[localStorageName]) }
            catch(err) { return false }
        }

        function isGlobalStorageNameSupported() {
            try { return (globalStorageName in win && win[globalStorageName] && win[globalStorageName][win.location.hostname]) }
            catch(err) { return false }
        }

        if (isLocalStorageNameSupported()) {
            storage = win[localStorageName]
            store.set = function(key, val) {
                if (val === undefined) { return store.remove(key) }
                storage.setItem(key, store.serialize(val))
            }
            store.get = function(key) { return store.deserialize(storage.getItem(key)) }
            store.remove = function(key) { storage.removeItem(key) }
            store.clear = function() { storage.clear() }
            store.getAll = function() {
                var ret = {}
                for (var i=0; i<storage.length; ++i) {
                    var key = storage.key(i)
                    ret[key] = store.get(key)
                }
                return ret
            }
        } else if (isGlobalStorageNameSupported()) {
            storage = win[globalStorageName][win.location.hostname]
            store.set = function(key, val) {
                if (val === undefined) { return store.remove(key) }
                storage[key] = store.serialize(val)
            }
            store.get = function(key) { return store.deserialize(storage[key] && storage[key].value) }
            store.remove = function(key) { delete storage[key] }
            store.clear = function() { for (var key in storage ) { delete storage[key] } }
            store.getAll = function() {
                var ret = {}
                for (var i=0; i<storage.length; ++i) {
                    var key = storage.key(i)
                    ret[key] = store.get(key)
                }
                return ret
            }

        } else if (doc.documentElement.addBehavior) {
            var storageOwner, storageContainer;
            try {
                storageContainer = new ActiveXObject('htmlfile');
                storageContainer.open();
                storageContainer.write('<s' + 'cript>document.w=window</s' + 'cript><iframe src="/favicon.ico"></frame>');
                storageContainer.close();
                storageOwner = storageContainer.w.frames[0].document;
                storage = storageOwner.createElement('div');
            } catch(e) {
                storage = doc.createElement('div');
                storageOwner = doc.body;
            }
            function withIEStorage(storeFunction) {
                return function() {
                    var args = Array.prototype.slice.call(arguments, 0)
                    args.unshift(storage)
                    storageOwner.appendChild(storage)
                    storage.addBehavior('#default#userData');
                    storage.load(localStorageName);
                    var result = storeFunction.apply(store, args);
                    storageOwner.removeChild(storage)
                    return result
                }
            }
            function ieKeyFix(key) {
                // In IE7, keys may not begin with numbers.
                // See https://github.com/marcuswestin/store.js/issues/40#issuecomment-4617842
                return '_'+key
            }
            store.set = withIEStorage(function(storage, key, val) {
                key = ieKeyFix(key)
                if (val === undefined) { return store.remove(key) }
                storage.setAttribute(key, store.serialize(val))
                storage.save(localStorageName)
            })
            store.get = withIEStorage(function(storage, key) {
                key = ieKeyFix(key)
                return store.deserialize(storage.getAttribute(key))
            })
            store.remove = withIEStorage(function(storage, key) {
                key = ieKeyFix(key)
                storage.removeAttribute(key)
                storage.save(localStorageName)
            })
            store.clear = withIEStorage(function(storage) {
                var attributes = storage.XMLDocument.documentElement.attributes
                storage.load(localStorageName)
                for (var i=0, attr; attr=attributes[i]; i++) {
                    storage.removeAttribute(attr.name)
                }
                storage.save(localStorageName)
            })
            store.getAll = withIEStorage(function(storage) {
                var attributes = storage.XMLDocument.documentElement.attributes
                storage.load(localStorageName)
                var ret = {}
                for (var i=0, attr; attr=attributes[i]; ++i) {
                    ret[attr] = store.get(attr)
                }
                return ret
            })
        }

        try {
            store.set(namespace, namespace)
            if (store.get(namespace) != namespace) { store.disabled = true }
            store.remove(namespace)
        } catch(e) {
            store.disabled = true
        }
        store.enabled = !store.disabled
        return store;
    })();
    Qtool.newsuggest = function(data)
    {
        var option = {
            submit:true,
            input:'',
            url:'',
            tpls:{},
            key:'0',
            num:10,
            offset:{},
            nameSpace:'',
            ellipsis:0,
            data:null,
            style:''
        };
        if(typeof jQuery === 'undefined' || !data) return;
        ;(function($){
            var suggest = {
                link:false,
                curData:[],
                listObj:'',
                curInputObj:'',
                qHistory:{},
                noResultKeywords:[],
                curKeyword:'',
                curListIndex:-1,
                isTriggerBlur : true,
                main:function(){
                    $.extend(option,data);
                    if(!option.nameSpace) option.nameSpace = 'suggest_'+ +new Date;
                    for(var key in option.tpls){
                        if( /link/.test(key)){
                            this.link = true;
                        }
                    }
                    this.eventHandle();
                },
                eventHandle:function(){
                    var that = this;
                    $(option['input']).live('focus',function(){
                        var $this = $(this);
                        that.curInputObj = $this;
                        if(!that.assemblyOk){
                            that.assembly();
                            that.assemblyOk = true;
                        }
                        if(!$this.attr('__init')){
                            $this.attr('autocomplete','off');
                            that.suggestBiz();
                            $this.attr('__init',true);
                        }
                        that.setPosition();
                    });
                },
                setPosition:function(){
                    var obj = this.curInputObj,offset = option.offset;
                    var list_left = obj.offset().left+(offset.left || 0), list_top = obj.offset().top + obj.outerHeight()+(offset.top || 0),list_width = obj.innerWidth()+(offset.width || 0);
                    this.listObj.css({
                        position:'absolute',
                        left:list_left,
                        top:list_top,
                        width:list_width
                    });
                },
                assembly:function(){
                    var nameSpace = option.nameSpace;
                    if(!window.newsuggestStyle){
                        var style = '.e_suggest_box {cursor:default;border:1px solid #666;background:#fff;}\
                            .e_suggest_box li{height:26px;overflow:hidden;line-height:26px;}\
                            .e_suggest_box .title{height:24px;border-top:1px solid #fff;border-bottom:1px solid #e1e1e1;background-color:#f2f2f2;color:#666;line-height:24px;text-indent:10px;}\
                            .e_suggest_box strong{font-weight:bold;}\
                            .e_suggest_box em{color:#ff0100;font-style:normal;font-weight:bold;}\
                            .e_suggest_box .current{background-color:#f2f2f2;}\
                            .e_suggest_box .base{}\
                            .e_suggest_box .link{border-top:1px solid #e1e1e1;}\
                            .e_suggest_box .link a{display:block;border-top:1px solid #fff;background-color:#f2f2f2;color:#666;text-indent:10px;text-decoration:none;}\
                            .e_suggest_box .current a   {background:#e0e0e0;}\
                            .e_suggest_box .link strong{margin:0 5px;} ';
                        $('head').append('<style>' + style + '</style>');
                        window.newsuggestStyle = true;
                    }
                    if(option.style){
                        $('head').append('<style>' + option.style + '</style>');
                    }
                    var html = '<div id='+nameSpace+' tbk="e_suggest" style="display:none;z-index:360360360"><div class="e_suggest_box"><ul></ul></div></div>';
                    $('body').append(html);
                    this.listObj = $('#'+nameSpace);
                },
                showCurLi:function(li){
                    this.listObj.find('li').removeClass('current');
                    li.addClass('current');
                    this.curListIndex = li.index();
                    if(li.hasClass('link')){
                        this.curInputObj.val(this.curKeyword);
                    }
                },
                listEvent:function(){
                    var list = this.listObj;
                    var that = this;
                    list.find('li').live('mouseenter',function(){
                        var $this = $(this);
                        if($this.hasClass('title') || $this.hasClass('hr')){ return; }
                        that.isTriggerBlur =false;
                        that.showCurLi($this);
                    }).live('mouseleave',function(){
                        that.isTriggerBlur = true;
                        that.curListIndex = -1;
                        list.find('li').removeClass('current');
                    }).live('click',function(){
                        var $this = $(this);
                        if($this.hasClass('base')){
                            that.recovery();
                            that.curInputObj.val(that.getCurLiVal($this));
                            if(option.submit){
                                that.curInputObj.parents('form').submit();
                            }
                        }
                        that.hideList();
                    });
                },
                recovery:function(){
                    var obj = this.curInputObj;
                    var formInfo = this.formInfo;
                    var form = formInfo.form;
                    if(form && form[0]){
                        form.attr({action:formInfo.form_action,target:formInfo.form_target});
                    }
                    obj.attr('name',formInfo.inputName);
                    $('input[suggest]').each(function(){
                        $(this).remove();
                    });
                },
                suggestBiz:function() {
                    var list = this.listObj;
                    var obj = this.curInputObj;
                    var that = this;
                    var submit = option.submit;
                    var formInfo = {};
                    if(submit){
                        var form = obj.parents('form');
                        var form_action = form.attr('action');
                        var form_target = form.attr('target') || '_self';
                        formInfo.form = form;
                        formInfo.form_action = form_action;
                        formInfo.form_target = form_target;
                    }
                    var inputName = obj.attr('name');
                    formInfo.inputName = inputName;
                    this.formInfo = formInfo;
                    if(!that.listEventOk){
                        this.listEvent();
                        that.listEventOk = true;
                    }
                    obj.blur(function(){
                        if(!that.isTriggerBlur){ return false; }
                        that.hideList();
                    });
                    obj.keydown(function(e){
                        if(e.keyCode == 13){
                            if(list.find('.current a')[0]){
                                var curA = list.find('.current a');
                                var href = curA.attr('href');
                                var hrefArr = href.split('?');
                                form.attr({'action':hrefArr[0],'target':(curA.attr('target') || form_target)});
                                var arr = [];
                                hrefArr[1].replace(/&?(.*?)=(.*?)(?:&|$)/g,function($0,$1,$2){
                                    var temp = [$1,$2];
                                    arr.push(temp);
                                    return '';
                                });
                                var html = [];
                                obj.removeAttr('name');
                                for(var i=0,len = arr.length;i<len;i++){
                                    var temp = arr[i];
                                    html.push('<input type="hidden" suggest=true name="'+temp[0]+'" value="'+decodeURIComponent(temp[1])+'"/>');
                                }
                                form.append(html.join(''));
                                form.submit();
                                that.hideList();
                                return false;
                            }
                            that.hideList();
                            if(!submit)
                                return false;
                        }
                    }).keyup(function(e){
                        var keyCode = e.keyCode;
                        that.isTriggerBlur = true;
                        if(keyCode == 27  || keyCode == 13){
                            that.hideList();
                            return;
                        }
                        if(keyCode == 40 || keyCode ==38){
                            var lies = list.find('li');
                            var liLen = lies.length;
                            if(liLen >0) {
                                var curIndex = that.curListIndex;
                                lies.removeClass('current');
                                if(keyCode == 40){
                                    curIndex++;
                                    var cur = lies.eq(curIndex);
                                    while(cur.hasClass('title') || cur.hasClass('hr')){
                                        curIndex++;
                                        cur = cur.next();
                                    }
                                }
                                if(keyCode == 38) {
                                    curIndex--;
                                    if(curIndex == -1) curIndex = liLen;
                                    if(curIndex == -2) curIndex = liLen-1;
                                    var cur = lies.eq(curIndex);
                                    while(cur.hasClass('title') || cur.hasClass('hr')){
                                        curIndex--;
                                        cur = cur.prev();
                                    }
                                }
                                if(!cur[0]){
                                    this.value = that.curKeyword;
                                    that.curListIndex = -1;
                                    return;
                                }
                                that.showCurLi(cur);
                                if(cur.hasClass('base')){
                                    this.value = that.getCurLiVal(cur);
                                }
                                that.curListIndex = curIndex;
                                return;
                            }
                        }
                        var keyword = $.trim(this.value);
                        that.oldKeyword = that.curKeyword;
                        that.curKeyword = keyword;
                        if(that.oldKeyword == keyword) return;
                        that.curData = [];
                        that.curListIndex = -1;
                        if(option.data){
                            var tempData = [];
                            for(var i=0,len = option.data.length;i<len;i++){
                                var temp = option.data[i];
                                if(temp.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ){
                                    tempData.push(temp);
                                    }
                            }
                            if(tempData.length){
                                that.curData = tempData;
                                that.appendToList();
                            }else{
                                that.hideList();
                            }
                            return;
                        }
                        if(!that.isUsefulKW()) {
                            if(that.link){
                                that.appendToList();
                            }else{
                                that.hideList();
                            }
                            return;
                        }
                        var res = that.qHistory[keyword];
                        if(res){
                            that.curData = res;
                            that.appendToList();
                    }else{
                            $.getJSON(option.url+encodeURIComponent(keyword),function(data){
                                if(data && data.length > 0) {
                                    that.qHistory[keyword] = data;
                                    that.curData = data;
                                    that.appendToList();
                                }else{
                                    that.noResultKeywords.push(keyword);
                                    that.hideList();
                                }
                            });
                    }
                    })
                },
                getCurLiVal:function(li){
                    var index = li.index('#'+option.nameSpace+' .base');
                    var val = this.curData[index]; 
                    if( typeof val === 'object'){
                         val = val[option.key];
                    }
                    return val.replace(/<.*?>/g,'');
                },
                checkOption:function(val){
                    for(var i=0,len = this.curData.length;i<len;i++){
                        var temp = this.curData[i];
                        if(temp[option.key] == val)return false;
                    }
                    return true;
                },
                hideList:function() {
                    var list = this.listObj;
                    list.hide();
                    list.find('li').removeClass('current');
                    this.recovery();
                    this.isTriggerBlur = true;
                },
                isUsefulKW:function() {
                    var kw = this.curKeyword,nr = this.noResultKeywords;
                    if(!kw ){
                        return;
                    }
                    for(var i=0,len =nr.length;i<len;i++)
                    {
                        if(kw.indexOf(nr[i]) == 0)
                            return false;
                    }
                    return true;
                },
                getStrLen:function(val){
                    var len = val.length;
                    var reg = /[^x00-xff]/ig;
                    var cArr = val.match(reg);
                    var cnStrLen = cArr == null ? 0 : cArr.length;
                    var strLen = len+cnStrLen;
                    var cnStrLen2 = 0;
                    if(option.ellipsis){
                        var cArr2 = val.substr(0,option.ellipsis).match(reg);
                        cnStrLen2 = cArr2 == null ? 0 : cArr2.length;
                    }
                    return [strLen,cnStrLen2];
                },
                parseTpl:function(tplType,data){
                    var curval =  val = this.curKeyword;
                    var ellipsis = option.ellipsis;
                    if(/title|link/.test(tplType) && ellipsis){
                        var arr = this.getStrLen(val);
                        var len;
                        if(arr[0] > ellipsis){
                            if(arr[1]){
                                len = Math.max(Math.ceil(ellipsis/2),ellipsis-arr[1]);
                                if(val.length > len){
                                    val = val.substr(0,len)+'.';
                                }
                            }else{
                                len = ellipsis;
                                val = val.substr(0,len)+'.';
                            }
                        }
                    }
                    var repS = option.tpls[tplType].replace('%q',val);
                    repS = repS.replace('%enq',encodeURIComponent(curval));
                    if(typeof data === 'string'){
                        repS = repS.replace(/\{(.*?)\}/g, data);
                    }else if(typeof data === 'object'){
                        repS = repS.replace(/\{(.*?)\}/g,function($0,$1){
                            return data[$1];
                        });
                    }
                    return repS;
                },
                appendToList:function() {
                    var data = this.curData;
                    var list = this.listObj;
                    if(this.curKeyword){
                        var len  =  data.length > option.num ? option.num : data.length;
                        var html = [];
                        for(var key in option.tpls){
                            if(key == 'base'){
                                for(var i=0;i<len;i++)
                                {
                                    var temp = data[i];
                                    html.push('<li class="'+key+'">'+this.parseTpl(key,temp)+'</li>');
                                }
                            }else {
                                html.push('<li class="'+key+'">'+this.parseTpl(key)+'</li>');
                            }
                        }
                        html = html.join('');
                        list.find('ul').html(html);
                        list.show();
                    }else{
                        this.hideList();
                    }
                }
            };
            $(function(){
                try{
                    suggest.main();
                }catch(e){
                }
            });
        })(jQuery);
    }
    Qtool.getSeMid = function()
    {
        var mid = '';    
        try{        
            mid = external.GetSpecialData(window).split(",")[3];    
        }catch(e){
        }
        return mid;
    }
    Qtool.href = (function()
    {
        var href = document.URL;
        var qpos = href.indexOf('?');
        var assembly = function(key,val){
            return encodeURIComponent(key)+'='+encodeURIComponent(val);
        }
        var obj = {
            getVal : function(key,url){
                if(url){
                    var reg = eval('/'+key+'=(.*?)(?:&|$)/'); 
                    var res = url.match(reg);
                    return res[1];
                }else{
                    return this[key];
                }
            },
            append : function(key,val,url){
                if(key && val){
                    var o = {};
                    o[key] = val;
                    return this.connect(o,{href:url||href});
                }

            },
            connect : function(data,args){
                var option = {
                    skip:'',
                    href:undefined
                };
                if(args)
                $.extend(option,args);
                var str = [];
                for(var key in data){
                    if(key != option.skip && $.inArray(key,option.skip) < 0){
                        str.push(assembly(key,data[key]));
                    }
                };
                var url = option.href;
                return (typeof url !== 'undefined' ? (url.indexOf('?') > -1 ? url+'&' : url+'?') : '' )+str.join('&');
            }
        };
        if(qpos > -1){
            var search = href.substring(qpos+1);
            var reg = /(?!&)(.*?)=([^&]*)/gi;
            var res = search.match(reg);
            for(var i=0,len = res.length;i<len;i++){
                var temp = res[i].split('=');
                obj[temp[0]] = temp[1];
            }
        }
        return obj;
    })();
    Qtool.getStrLen = function(str)
    {
        if(typeof str === 'string'){
            var len = str.length;
            var reg = /[^x00-xff]/ig;
            var cArr = str.match(reg);
            var cnStrLen = cArr == null ? 0 : cArr.length;
            return {length:len,byte:len+cnStrLen,en:len-cnStrLen,cn:cnStrLen}
        }
        return {length:0,byte:0,en:0,cn:0}
    }
    Qtool.tips = function(arg)
    {
        var option = {
            position:{'selector':'',offsetTop:0,offsetLeft:0},
            zIndex:360,
            arrow:{direction:1,left:5},
            autoHiddenTime:0,
            close:true,
            nameSpace:'',
            closeFun:null,
            content:'',
            custom:{style:'',closeTrigger:'',effective:false}
        }
        $.extend(true,option,arg);
        if(!window.assemblyTipsStyle){
            var style = '<style>\
                .qtool_usepop{position:absolute;top:0;left:0;padding:5px 30px 5px 15px;border:1px solid #eb7e1b;background-color:#ffffe5;box-shadow:3px 3px 0 #d9d9d9;}\
                .qtool_usepop .useclose{position:absolute;top:3px;right:5px;width:7px;height:7px;padding:3px; background:url(http://p4.qhimg.com/t013dcd8787edea3291.png) no-repeat 3px 3px;}\
                .qtool_usepop .arrowl1,.qtool_usepop .arrowr1{position:absolute;top:-16px;left:5px;width:0;height:0;font-size:0;border-color:transparent transparent #eb7e1b;border-width:8px;border-style:dashed dashed solid;}\
                .qtool_usepop .arrowr1{top:-7px;left:-8px;border-color:transparent transparent #ffffe5;}\
                .qtool_usepop .arrowl2,.qtool_usepop .arrowr2{position:absolute;bottom:-16px;left:5px;width:0;height:0;font-size:0;border-color:#eb7e1b transparent transparent;border-width:8px;border-style:solid dashed dashed;}\
                .qtool_usepop .arrowr2{top:-9px;left:-8px;border-color:#ffffe5 transparent transparent;}\
                </style>';
            $('head').append(style);
            window.assemblyTipsStyle = true;
        }
        var id = option.nameSpace || 'tips_'+(+new Date);
        var html;
        if(option.custom.effective){
            html = '<style>'+option.custom.style+'</style><div  style="position:absolute;;z-index:'+option.zIndex+';" id="'+id+'" bk>'+option.content+'</div>';
        }else{
            html = '<div class="qtool_usepop" style="z-index:'+option.zIndex+';" id="'+id+'" bk>\
                <div>'+option.content+'</div>';
            if(option.close){
                html += '<a class="useclose" href=""></a>';
            }
            var direction = option.arrow.direction;
            if(direction){
                html += '<span class="arrowl'+direction+'" style="left:'+option.arrow.left+'px;" ><span  class="arrowr'+direction+'"></span></span>';
            }
            html += '</div>';
        }
        $(function(){
            $('body').append(html);
            id = $('#'+id);
            var adjust = function(){
                if(id[0]){
                    var offset =  $(option.position.selector).offset();
                    id.css({top:offset.top+option.position.offsetTop,left:offset.left+option.position.offsetLeft});
                }
            }
            adjust();
            if(option.close){
                id.find( (option.custom.effective ? option.custom.closeTrigger : '.useclose')).live('click',function(){
                    id.remove();
                    if(typeof option.closeFun === 'function'){
                        option.closeFun();
                    }
                    return false;
                });
            }
            if(option.autoHiddenTime){
                setTimeout(function(){
                    if(!id[0]) return;
                    id.remove();
                },option.autoHiddenTime);
            }
            $(window).resize(function(){
                adjust();
            })
            $(document).scroll(function(){
                adjust();
            })

        });
    }
    Qtool.follow = function(arg)
    {
        var option = {
            selector:'',
            style:null,
            position:{top:0,left:0}
        }
        $.extend(true,option,arg);
        var selector = option.selector;
        if(!selector) return;
        var oTop = oPosition = oLeft = curMLeft = curTop = curLeft = oMLeft = 0;
        var isIE6 = !window.XMLHttpRequest;
        var position = isIE6 ? 'absolute' : 'fixed';
        $(function(){
            var $selector = $(selector);
            var offset = $selector.offset();
            curTop = offset.top;
            curLeft = offset.left;
            curMLeft = curLeft - $(window).width()/2;
            oMLeft = $selector.css('margin-left');
            oPosition = $selector.css('position');
            oLeft = $selector.css('left');
            oTop = $selector.css('top');
            $(window).scroll(function(){
                if($(this).scrollTop() > curTop){
                    if(option.style) $selector.css(option.style);
                    $selector.css({position:position,top:option.position.top,left:'50%','margin-left':curMLeft+option.position.left});
                    if(isIE6){
                        $selector.css('top',$(this).scrollTop()+option.position.top);
                    }
                }else{
                    $selector.css({position:oPosition,top:oTop,left:oLeft,'margin-left':oMLeft});
                }
            })

        });
    }
    Qtool.tab = function(arg)
    {
        var option = {
            operate:{wrap:'',children:'',eventType:'mouseenter',status:'current'},
            show:{wrap:'',children:'',fun:null}
        }
        $.extend(true,option,arg);
        var operate = option.operate,show = option.show;
        var showObj ; 
        if(show.children){
            showObj = $(show.wrap).find(show.children);
        }else{
            showObj = $(show.wrap).children();
        }
        if(operate.children){
            $(operate.wrap).find(operate.children).on(operate.eventType,function(){
                var index = $(this).index(operate.wrap+' '+operate.children);
                $(operate.wrap).find(operate.children).removeClass(operate.status);
                $(this).addClass(operate.status);
                showObj.hide();
                showObj.eq(index).show();
                if(typeof show.fun == 'function') show.fun();
            });
        }else{
            $(operate.wrap).children().on(operate.eventType,function(){
                var index = $(this).index();
                $(this).addClass(operate.status).siblings().removeClass(operate.status);
                showObj.hide();
                showObj.eq(index).show();
                if(typeof show.fun == 'function') show.fun();
            });
        }

    }