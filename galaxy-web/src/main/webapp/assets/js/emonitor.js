; (function(window,undefined) {
    var isBlueB = !+"\v1";
    var doc = document;
    var loca = location;
    var hostname = location.hostname;
    var referrer = doc.referrer;
    var screen = window.screen;
    var nav = navigator;
    var href = doc.URL;
    var ua = nav.userAgent.toLowerCase();
    var cookie = function() {
        var GetCookieVal = function(offset) {
            var endstr = document.cookie.indexOf (";", offset);
            if (endstr == -1){
                endstr = document.cookie.length;
            }
            return unescape(document.cookie.substring(offset, endstr));
        };
        var getCookie = function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg)
                    return GetCookieVal (j);
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        };
        var setCookie = function (argv) {
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
    };

    var baseData = {
        c : href,
        r : referrer,
        h : hostname,
        y : 1
    };


    var baseBiz = {
        inArrS:function(val,arr){
            if(val && arr && arr.length>0){
                var arrS = arr.join(',');
                arrS += ',';
                return arrS.indexOf(val+',') ;
            }
            return -1;
        },
        pv:function(url){
            var that = this;
            var data = {
                pv : 1,
                f: screen.width+'_'+screen.height,
                l : that.getBrowser()
            };
            this.assemblyLog(data,url);
        },
        log:(function(){
            window._log_temp = {};
            return function(url){
                var id = '_'+ +new Date();
                var img = window._log_temp[id] = new Image();
                img.onload = img.onerror = function(){
                    img = null;
                    delete window._log_temp[id];
                } 
                img.src = url;
            }
        }()),
        encodeJson:function(obj){
            var result = [];
            for( var p in obj ){
                var val = obj[p];
                val = val || ''; 
                result.push( encodeURIComponent(p) + '=' + encodeURIComponent(val.toString()));
            }
            return result.join('&');
        },
        assemblyLog:function(arg,src){
            if(arg){
                var url = src || emonitor.clkUrl;
                if(typeof arg === 'object'){
                    arg = this.encodeJson(arg);
                }
                url = url + '?' + arg + '&' +this.encodeJson(baseData) + '&u='+ baseBiz.getEuid() + '&t='+ +new Date;
                this.log(url);
                if(baseData.ex){
                    delete baseData.ex;
                }
            }
        },
        getText:function(el){
            return el.innerText || el.textContext || el.title || (el.innerHTML && el.innerHTML.replace(/<.*?>|\s*/g,''));
        },
        getEuid:function(){
            if(this.uid) return this.uid;
            function hash(s) {
                var h = 0, 
                g = 0,
                i = s.length - 1;
                for(i; i>= 0; i--) {
                    var code = parseInt(s.charCodeAt(i), 10);
                    h = ((h << 6) & 0xfffffff) + code + (code << 14);
                    if ((g = h & 0xfe00000) != 0) {
                        h = (h ^ (g >> 21));
                    }
                }
                return h;
            };

            function euid() {
                var s = [nav.appName, nav.version, nav.language || nav.browserLanguage, nav.platform, ua, screen.width, 'x', screen.height, screen.colorDepth, doc.referrer].join(""),
                sLen = s.length,
                hLen = window.history.length;

                while(hLen) {
                    s += (hLen--) ^ (sLen++);
                }

                return (Math.round(Math.random() * 2147483647) ^ hash(s)) * 2147483647;
            };

            var euidKey = emonitor.uidName || '__Euid',
            id = cookie(euidKey);

            if(!id) {
                id = [ hash(doc.domain), euid(), +new Date + Math.random() + Math.random() ].join('.');
                cookie(euidKey, id, emonitor.expires,emonitor.path,emonitor.domain);
            }
            this.uid = id;
            return id;
        },
        getBrowser : function() {
            var browsers = {
                '360se-ua':'360se',
                'TT':'tencenttraveler',
                'Maxthon':'maxthon',
                'GreenBrowser':'greenbrowser',
                'Sogou':'se 1.x / se 2.x',
                'TheWorld':'theworld'
            };
            for(var i in browsers){
                if(ua.indexOf(browsers[i]) > -1) {
                    return i;
                }
            }
            var is360se = false;
            try{
                if(+external.twGetVersion(external.twGetSecurityID(window)).replace(/\./g,"") > 1013) {
                    is360se = true;
                }
            }catch(e){ }

            if(is360se) {
                return "360se-noua";
            }
            var result = ua.match(/(msie|chrome|safari|firefox|opera)/);
            result = result ? result[0] : '';
            if(result == 'msie') {
                result = ua.match(/msie[^;]+/);
            }
            return result;
        }, 
        parentNode : function(el, tagName, deep) {
            deep = deep || 6;
            tagName = tagName.toUpperCase();
            while(el && deep-- > 0) {
                if(el.tagName === tagName) {
                    return el;
                }
                el = el.parentNode;
            }
            return null;
        },
        getContainerId:function(el){
            var data = {bkname:'','tbk':false,el:null};
            while(el && el.getAttribute){
                data.el = el;
                var elId = el.id;
                var bkname =  el.getAttribute('tbk');
                if(bkname === '' || bkname){
                    data.tbk = true;
                }else{
                    bkname = el.getAttribute('bk');
                }
                if(bkname === ''){
                    bkname = elId || el.className;
                }
                if(bkname){
                    data.bkname = bkname;
                    return data;
                }
                el = el.parentNode;
            }
            return data;
        }
    };
    var biz = {
        main:function(){
            var that = this;
            this.bindEvent(doc,'keydown',function(e){
                that.keydownCount(e);
            });
            this.bindEvent(doc,'click',function(e){
                that.clickCount(e);
            });
            this.bindEvent(doc,'submit',function(e){
                that.submitCount(e);
            });
        },
        bindEvent : function(el,type,fn){
            if(el.addEventListener) {
                el && el.addEventListener(type, fn, false);
            } else {
                el && el.attachEvent('on' + type, fn);
            }
        },
        keydownCount:function(e){
            var e = e || event;
            if(e.keyCode != 13 || isBlueB) return false;
            var target = e.srcElement || e.target;
            if(target.tagName == 'input'){
                var formNode = baseBiz.parentNode(target,'FORM');
                if(formNode){
                    this.submitCount(formNode,true);
                }
            }
        },
        clickCount : function(e){
            var e = e || event;
            var target = e.srcElement || e.target;
            var tagName = target.tagName;
            var container = baseBiz.getContainerId(target);
            var bkname = container.bkname || tagName;

            if(tagName == 'AREA') {
                baseBiz.assemblyLog({
                    a : target.href,
                    n : 'area:' + target.parentNode.name,
                    b : bkname
                });
            }else if(isBlueB && (/submit|button|image/.test(target.type))){
                var formNode = baseBiz.parentNode(target,'FORM');
                if(formNode){
                    this.submitCount(formNode,true);
                }
            }else{
                var img, text;
                var newTarget = baseBiz.parentNode(target, 'A');
                if(!newTarget){
                    if(container.tbk){
                        baseBiz.assemblyLog({
                            a : tagName,
                            n : baseBiz.getText(target),
                            b : container.bkname
                        }); 
                    }
                    return;
                }
                var ex = newTarget.getAttribute('ex');
                if(ex){
                    baseData.ex = ex+(this.ex || '');
                }
                if(tagName == 'IMG') {
                    img = target;
                }
                target = newTarget;
                text = baseBiz.getText(target);
                baseBiz.assemblyLog({
                    a : target.href,
                    n : img ? 'img:'+(img.getAttribute('stitle')  || '')+img.alt+img.src.match(/[^\/]+$/) : (target.getAttribute('stitle') || '')+(target.title || text),
                    b : bkname
                }); 
            }
        },
        submitCount : function(e,isNotBubble){
            var e = e || event;
            var target;
            if(isNotBubble){
                target = e;
            }else{
                target = e.srcElement || e.target ;
            }
            var action = target.action;
            var name = target.name || target.id;
            var inputs = target.getElementsByTagName('input');
            var searchIds = emonitor.searchIds;
            var j=0,desc = [],text = '';
            if(inputs.length > 0){
                for(var i=0,len = inputs.length;i<len;i++){
                    var node = inputs[i]; 
                    var id = node.id;
                    if(!j && node.type == 'text'){
                        j = 1;
                        text = node.name ? node['name'] + '=' + node.value : '';
                    }
                    if(!id) continue;
                    if(baseBiz.inArrS(id,searchIds) > -1){
                        desc.push(id+'='+node.value);
                    }
                }
                text = desc.length > 0 ? desc.join(',') : text;
            }
            baseBiz.assemblyLog({a:action,n:name+':'+text,b:'FORM'});
            return;
        }
    };
    window.emonitor = {
        pvUrl:'http://s.360.cn/ec/s.html',
        clkUrl:'http://s.360.cn/ec/s.html',
        expires:2*365,
        uidName:'__Euid',
        path:'/',
        domain:'.360.cn',
        forumIds:[],
        searchIds:[],
        setConf:function(obj){
            if(typeof Obj === 'object'){
                for(var key in obj){
                    this[key] = obj[key];
                }
            }
        },
        setExComInfo:function(info){
            biz.ex = info;
        },
        setHostname:function(name){
            baseData.h = name;
        },
        setBiz:function(num){
            baseData.y = num ;
        },
        sendInfo:function(data,url){
            baseBiz.assemblyLog(data,url);
        },
        getTrack:function(url){
            baseBiz.pv((url || this.pvUrl));
        },
        setSId:function(){
            for(var i=0,len = arguments.length;i<len;i++){
                this.searchIds.push(arguments[i]);
            }
            return this;
        },
        setId:function(){
            var argument,i=0;
            while(argument = arguments[i++]) {
                if(Object.prototype.toString.apply(argument) === '[object Array]') {
                    this.forumIds = this.forumIds.concat(argument);
                } else {
                    this.forumIds.push(argument);
                }
            }
            return this;
        }
    }
    biz.main();
})(window);
setTimeout(function(){
    emonitor.getTrack();
},0);
;(function(){
    if(!window.onerror) return;
    var src = 'http://220.181.158.169/error.html';
    var en = encodeURIComponent;
    window.__t__ = {};
    window.onerror = function(msg,url,l){
        var t = +new Date;
        var img = window.__t__[t] = new Image();
        img.onload = img.onerror = img.onabord = function(){
            img = null;
            delete window.__t__[t] ; 
        }
        img.src = src+'?e='+en(msg)+'&n='+l+'&t='+t;
        return true;
    }
})();