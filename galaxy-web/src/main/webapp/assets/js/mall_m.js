;(function(){
    var v = 1.1,
    w = window,
    ws = w.screen,
    d = document,
    dc = d.cookie,
    dr = d.referrer,
    dm=d.domain,
    na = navigator,
    ua = na.userAgent.toLowerCase(),
    c,
    I = 'http://haostat.qihoo.com/haoclk.gif',
    en = encodeURIComponent,
    lo = location, 
    //url = 'http://mall.360.cn/mall.html',
    url = /mall_(business(item|review)|priceoff)/.test(lo.href) ? 'http://mall.360.cn/detail.html' : 'http://mall.360.cn/mall.html',
    id,
    browerObj = {
        '360se':'360se',
        'TT':'tencenttraveler',
        'Maxthon':'maxthon',
        'GreenBrowser':'greenbrowser',
        'Sogou':'se 1.x / se 2.x',
        'TheWorld':'theworld'
    },
    // which brower
    isB = function(){
        var r;
        for(var p in browerObj){
            if(ua.indexOf(browerObj[p])>-1)
                return p;
            }
            r = ua.match(/(msie|chrome|safari|firefox)/)[0];
            if(r=='msie'){
                r = ua.match(/msie[^;]+/)
            }
            return r;
    },
    hash = function (s) {
        var h = 0,
        g = 0;
        for (var i = s.length - 1; i >= 0; i--) {
            var c = parseInt(s.charCodeAt(i));
            h = ((h << 6) & 0xfffffff) + c + (c << 14);
            if ((g = h & 0xfe00000) != 0) h = (h ^ (g >> 21))
                }
            return h
    },
    getGuid = function () {
        var s = [na.appName, na.version, na.language || na.browserLanguage, na.platform, na.userAgent, ws.width, 'x', ws.height, ws.colorDepth, d.referrer].join(""),
        k = s.length,
        o = history.length;
        while (o > 0) s += o--^k++;
        return (Math.round(Math.random() * 2147483647) ^ hash(s)) * 2147483647
    },
    getC = function (){
        var c = dc.match(/count=(\d+)/);
        return (c&&c[1]?c[1]:0)*1+1;
    },
    c = getC();
    d.cookie = "count="+c+";path=/;expires=" + new Date(+new Date + 3600*1000*24*365*2).toGMTString();
    id = dc.match(/sessionID=([^;]+)/);
    if(!id||!id[1]){
        id = [hash(dm),getGuid(),+new Date+ Math.random()+Math.random()].join('.');
        d.cookie = "sessionID="+id+";path=/;expires=" + new Date(+new Date + 3600*1000*24*365*2).toGMTString();
    }else{
        id = id[1];
    }
    var sd = function(s,statDomain) {
        if(s)
        {
            var stat = statDomain ? statDomain : I;
            stat = stat+'?';
            var n = "log_"+ +new Date();
            var img = window[n] = new Image();   
            img.onload = (img.onerror=function(){window[n] = null;img = null;});
            img.src = stat+s+'&v='+v+'&t='+ +new Date+'&u='+en(url)+'&uid='+id;
        }
    },
    inArray = function(arg,arr) {
        for(var i=0,len = arr.length;i<len;i++)
            if(arg === arr[i])
                return i;
            return -1;
    } ;

    function handleEvent(e){
        e = e || event;
        var et = e.type,t = e.target||e.srcElement;
        monitor.event = e;
        monitor.handleBiz(t,et);
    }
    d.attachEvent?d.attachEvent('onclick',handleEvent):d.addEventListener('click',handleEvent,false);
    d.attachEvent?d.attachEvent('onkeydown',handleEvent):d.addEventListener('keydown',handleEvent,false);

    monitor = {
        clickUrl:'',
        pvUrl:'',
        sessionID:id,
        funid:0,
        funs:{},
        ids:[],
        custom:{'click':null,'keydown':null},
        getContId : function(t)
        {
            var ids = this.ids;
            for(var i=0,ci;ci=ids[i++];)
            {
                if(ci.contains?ci.contains(t):!!(ci.compareDocumentPosition(t) & 16)){
                    return ci.id ;
                }
            }
            return t.tagName;
        },
        setCustomEvent:function(et,fun)
        {
            if(typeof fun == 'function')
            {
                if(typeof this.custom[et] == 'undefined')
                    d.attachEvent?d.attachEvent('on'+et,fun):d.addEventListener(et,fun,false);
                else{
                    this.custom[et] = fun;
                }
            }
        },
        clickFun:function(t)
        {
            var deep=0,contId,str,c,f;
            if(t.tagName == 'A')
            {
                contId = this.getContId(t);
                str = "&f="+en(t.href)+"&c="+en(t.innerHTML)+'&cId='+contId;
                sd(str);
                return;
            }
            if(t.tagName == 'IMG')
            {
                contId = this.getContId(t),f = c = t.alt || 'image';
                while(t = t.parentNode){
                    if(t.tagName == 'A'){
                        f = t.href;
                    }
                }
                str = "&f="+en(f)+"&c="+en(c)+'&cId='+contId;
                sd(str);
                return;
            }
            if(t.tagName == 'AREA')
            {
                contId = this.getContId(t);
                str = "&f="+en(t.href)+"&c=area:"+en(t.parentNode.name)+'&cId='+contId;
                sd(str);
                return;
            }
            if((t.tagName=='BUTTON'&&t.type=='submit')||(t.tagName=='INPUT'&&t.type=='submit'))
            {
                contId = this.getContId(t);
                while(t=t.parentNode){
                    if(t.tagName=='FORM'){
                        str = "&f="+en(t.action)+"&c=form:"+(t.name||t.id)+'&cId='+contId;
                        sd(str);
                        return;
                    }
                }
            }
            while(t = t.parentNode)
            {
                if(deep++>3)
                    break;
                if(t.tagName == 'A')
                {
                    contId = this.getContId(t);
                    str = "&f="+en(t.href)+"&c="+en('deep'+deep)+'&cId='+contId;
                    sd(str);
                    break;
                }
            }
        },
        keydownFun:function()
        {
        },
        regEventFun:function(eventType,name,fun)
        {
            if(eventType && name && typeof fun =='function')
                this.funs[eventType+name] = fun;
            return this;
        },
        handleBiz:function(t,et)
        {
            if(this.custom[et])
            {
                try{ this.custom[et](t);}catch(e){};
            }else{
                if(t.id && this.funs[et+t.id])
                {
                    try{this.funs[et+t.id](t);}catch(e){};
                    return;
                }
                typeof this[et+'Fun'] == 'function' && this[et+'Fun'](t);
            }
        },
        sendInfo:function(str,statDomain)
        {
            if(!statDomain && this.clickUrl) statDomain = this.clickUrl;
            if(typeof str == 'object')
            {
                var newstr='';
                for(var key in str)
                    newstr+=key+"="+en(str[key])+'&';
                sd(newstr,statDomain);
            }else{
                sd(str,statDomain);
            }
        },
        getValByKey : function(key,ehref) {
            var f = ehref || location.href;
            if(f) {
                var reg = eval('/'+key+'=([^&]*)/');
                if(f.match(reg)) return f.match(reg)[1];
            }
            return '';
        },
        getTrack: function(a) {
            var n = "log_"+ +new Date();
            var img = window[n] = new Image();   
            img.onload = (img.onerror=function(){window[n] = null;img = null;});
            var pvUrl = 'http://haostat.qihoo.com/haopv.gif';
            var curUrl = this.pvUrl ? this.pvUrl : pvUrl;
            img.src = curUrl + '?b='+isB()+'&a='+(a===undefined?1:a)+'&u='+en(url)+'&id='+id+'&c='+ c+'&r='+en(dr)+'&t='+ +new Date;
            if(/businesslist\.html/.test(location.href)) 
            img.src = pvUrl + '?b='+isB()+'&a='+(a===undefined?1:a)+'&u='+en(url)+'&id='+id+'&c='+ c+'&r='+en(dr)+'&t='+ +new Date;
            return this;
        },
        setId:function(a)
        {
            for(var i=0,len = a.length;i<len;i++){
                var ci = a[i];
                if(!ci)continue;
                var ci = d.getElementById(ci); 
                ci&&this.ids.push(ci);
            }
        }
    }
})();
;(function(){
    var  m = monitor;
    m.getTrack();
    //m.setId(['top_bar','mall_top','mall_nav','index_logowall']);
    if(typeof jQuery !== 'undefined') {
        (function($){
            var ids = [];
            $('*[bk]').each(function(){
                var id = $(this).attr('id');
                ids.push(id);
        });
        if(ids.length > 0) m.setId(ids);
        var reg = /\s/g;
        $('a').live('click',function(){
            var  _t = $(this),href = _t.attr('href'), cId=m.getContId(_t[0]),con;
            con = _t.text();
            con = con.replace(reg,'');
            m.sendInfo({'f':href,'c':con,'cId':cId});
            //if(/businesslist\.html/.test(location.href)) m.sendInfo({'f':href,'c':con,'cId':cId},'http://haostat.qihoo.com/haoclk.gif');
        });
        $('form').submit(function(){
            var className = $(this).attr('id');
            var val = $(this).find('input').eq(0).val();
            m.sendInfo({'f':className,'c':val,'cId':'mall_search'});
        });
        })(jQuery);
        m.setCustomEvent('click',function(){ });
    }
})();
var _gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-30952248-1']);

_gaq.push(['_trackPageview']);



(function() {

    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;

    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

})();