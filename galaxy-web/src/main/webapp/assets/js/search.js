﻿var QHPass=window.QHPass||{};QHPass.tpl=QHPass.tpl||{};var QHDomain=window.QHDomain||{i360:"http://i.360.cn",login_https:"https://login.360.cn",captcha:"http://captcha.360.cn",login_http:"http://login.360.cn"};(function(){var e=window.jQuery||window.qui||window.QW&&window.QW.NodeW,t="",n=null,r="http://s0.qhimg.com/i360/;js;pass_api_/panel,login,reg,name,css,md5/v2216d2.js";QHPass.uinfo={},QHPass.resConfig={jumpUrl:"",charset:"gbk",loginStatus:!0,userInfoParas:"",postCharset:"gbk",isAutoLogin:!1,loginTitle:"",setNameTitle:"",bindTitle:"",afterRenderPanel:"",needDefaultSkin:!0,afterClosePanel:"",loginAfterSetName:!1,regType:"normal_phone",reloadAfterLogout:!0,thirdFun:function(e){},callback:"",logoutCallback:null,regCallback:function(){},loginCallback:function(){},getInfoAfterReg:!0,regSrc:"",initModule:function(){},regOpts:{},regPhoneOpts:{},loginOpts:{},ssoOpts:{},bindOpts:{},namedOpts:{}},QHPass.thirdLoginSuccess=function(){QHPass.getUserInfo(function(e){if(e.qid)try{QHPass.loginUtils.closeOpenHander(),QHPass.setloginStatus(e),QHPass.resConfig.thirdFun&&QHPass.resConfig.thirdFun(e)}catch(t){}})},QHPass.getDocRect=function(e){e=e||document;var t=e.defaultView||e.parentWindow,n=navigator.userAgent.match(/opera/i),r=e.compatMode,i=e.documentElement,s=t.innerHeight||0,o=t.innerWidth||0,u=t.pageXOffset||0,a=t.pageYOffset||0,f=i.scrollWidth,l=i.scrollHeight;return r!="CSS1Compat"&&(i=e.body,f=i.scrollWidth,l=i.scrollHeight),r&&!n&&(o=i.clientWidth,s=i.clientHeight),f=Math.max(f,o),l=Math.max(l,s),u=Math.max(u,i.scrollLeft,e.body.scrollLeft),a=Math.max(a,i.scrollTop,e.body.scrollTop),{width:o,height:s,scrollWidth:f,scrollHeight:l,scrollX:u,scrollY:a}},QHPass.logoutOtherDomain=function(e){function n(){try{QHPass.setloginStatus({})}catch(e){}QHPass.resConfig.logoutCallback&&QHPass.resConfig.logoutCallback()}if(e.errno==0){var t=location.host.match(/1360\.com|360\.cn|qihoo\.com|woxihuan\.com|yunpan\.cn|360kan\.com/ig);t&&t[0]!=="360.cn"?QHPass.loadJsonp("http://login."+t[0]+"/?o=sso&m=logout&func=%callback%",n):n()}},QHPass.logout=function(e){e&&(QHPass.resConfig.logoutCallback=e),QHPass.Cookie.get("Q")&&QHPass.Cookie.get("T")?QHPass.getUserInfo(function(e){if(QHPass.resConfig.reloadAfterLogout){var t=QHPass.resConfig.jumpUrl||location.href;location.href=QHDomain.login_http+"/?op=logout&destUrl="+encodeURIComponent(t)+"&crumb="+e.crumb}else QHPass.loadJsonp(QHDomain.login_http+"/?o=sso&m=logout&func=%callback%",QHPass.logoutOtherDomain)}):e&&e()},QHPass.setloginStatus=function(t){QHPass.closePop&&QHPass.closePop();try{if(t.qid){QHPass.uinfo=t;var n=t.userName&&t.userName.indexOf("360U")==-1?t.userName:t.login_email||t.loginEmail||t.userName;e(".loginWrap").show(),e(".nloginWrap").hide(),e(".popUsername").html(n),e(".btn-logout-pop").click(function(e){try{QHPass.logout(),QHPass.preventDefault(e)}catch(t){}})}else QHPass.uinfo={},e(".loginWrap").hide(),e(".popUsername").html(""),e(".nloginWrap").show(),e(".btn-logout-pop")[0]=function(){}}catch(r){}},QHPass.loadJs=function(e,t,n){n=n||{};var r=document.getElementsByTagName("head")[0]||document.documentElement,i=document.createElement("script"),s=!1;i.src=e,n.charset&&(i.charset=n.charset),i.onerror=i.onload=i.onreadystatechange=function(){!s&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")&&(s=!0,t&&t(),i.onerror=i.onload=i.onreadystatechange=null,r.removeChild(i))},r.insertBefore(i,r.firstChild)},QHPass.loadJsonp=function(){var e=new Date*1;return function(t,n,r){r=r||{};var i="QiUserJsonP"+e++,s=r.callbackReplacer||/%callback%/ig;window[i]=function(e){n&&n(e),window[i]=null},s.test(t)?t=t.replace(s,i):t+=(/\?/.test(t)?"&":"?")+"callback="+i,QHPass.loadJs(t,null,r)}}(),QHPass.trim=function(e){return e&&e.replace(/^\s+|\s+$/g,"")},QHPass.byteLen=function(e){return e.replace(/[^\x00-\xff]/g,"--").length},QHPass.forEach=function(e,t,n){for(var r=0,i=e.length;r<i;r++)r in e&&t.call(n,e[r],r,e)},QHPass.queryUrl=function(e,t){e=e.replace(/^[^?=]*\?/ig,"").split("#")[0];var n={};return e.replace(/(^|&)([^&=]+)=([^&]*)/g,function(e,t,r,i){try{r=decodeURIComponent(r),i=decodeURIComponent(i)}catch(s){}r in n?n[r]instanceof Array?n[r].push(i):n[r]=[n[r],i]:n[r]=/\[\]$/.test(r)?[i]:i}),t?n[t]:n},QHPass.Cookie=QHPass.Cookie||{},QHPass.Cookie.get=function(e){if(QHPass.Cookie._isValidKey(e)){var t=new RegExp("(^| )"+e+"=([^;]*)(;|$)"),n=t.exec(document.cookie);if(n)return decodeURIComponent(n[2])||null}return null},QHPass.Cookie._isValidKey=function(e){return(new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test(e)},QHPass.Cookie.set=function(e,t,n){if(!QHPass.Cookie._isValidKey(e))return;n=n||{};var r=n.expires;"number"==typeof n.expires&&(r=new Date,r.setTime(r.getTime()+n.expires)),document.cookie=e+"="+encodeURIComponent(t)+(n.path?"; path="+n.path:"")+(r?"; expires="+r.toGMTString():"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":"")},QHPass.Cookie.del=function(e){QHPass.Cookie.set(e,"")},QHPass.getUserStatus=function(){return!!QHPass.uinfo.qid},QHPass.clearUinfo=function(){QHPass.uinfo={}},QHPass.getUserInfo=function(t,n,r){r=r||QHPass.resConfig.userInfoParas;var i=QHPass.Cookie.get("Q"),s=QHPass.Cookie.get("T");if(i&&s)if(QHPass.getUserStatus())t&&t(QHPass.uinfo);else{var o=location.host.match(/1360\.com|360\.cn|qihoo\.com|woxihuan\.com|yunpan\.cn|360kan\.com/ig),u=r||o&&o[0]&&"http://login."+o[0]+"/?o=sso&m=info&func=%callback%&show_name_flag=1";u&&QHPass.loadJsonp(u,t)}else n&&n(),e(".loginWrap").hide(),e(".nloginWrap").show()},QHPass.execCallback=function(e,t){QHPass.resConfig.loginAfterSetName=!1,typeof e=="string"?window.location.href=e:typeof e=="boolean"?window.location.reload(e):e&&e(t)},QHPass.login=function(e,t){QHPass.getUserInfo(function(t){QHPass.execCallback(e,t)},function(){QHPass.showLogin(e,t)})},QHPass.reg=function(e,t){QHPass.getUserInfo(function(t){QHPass.execCallback(e,t)},function(){QHPass.showReg(e,t)})},QHPass.autoLogin=function(e){QHPass.loadJsonp(QHDomain.login_https+"/?o=sso&m=info&func=%callback%&need_ck=1",function(t){t.auth&&t.auth.length>0&&QHPass.autoAuth(e,t)})},QHPass.autoAuth=function(e,t){t=t||{};var n=(new Date).getTime(),r=location.host.match(/1360\.com|360\.cn|qihoo\.com|woxihuan\.com|yunpan\.cn|360kan\.com/ig),r=r&&r[0],i=t.auth,s=s||{};if(!r)return;for(var o=0,u=i.length;o<u;o++)i[o].t&&(s.expires=i[o].t-n),s.path="/",s.domain=r,QHPass.Cookie.set(i[o].k,i[o].v,s);if(QHPass.resConfig.loginAfterSetName&&t.type!="bind"&&(!t.userName||t.userName.indexOf("360U")>-1))QHPass.showSetName(e,{notRequest:!0,crumb:t.crumb});else if(QHPass.resConfig.loginAfterSetName&&t.type=="bind")QHPass.showBind(e,{notRequest:!0,crumb:t.crumb});else{QHPass.execCallback(e,t);try{QHPass.setloginStatus(t)}catch(a){}}},QHPass.sso=function(e,t){QHPass.getUserInfo(function(t){QHPass.execCallback(e,t)},function(){QHPass.showSso(e,t)})},QHPass.showSso=function(e,t){QHPass.loadJs(r,function(){QHPass.showSso(e,t)},{charset:QHPass.resConfig.charset})},QHPass.showLogin=function(e,t){QHPass.loadJs(r,function(){QHPass.showLogin(e,t)},{charset:QHPass.resConfig.charset})},QHPass.showReg=function(e,t){QHPass.loadJs(r,function(){QHPass.showReg(e,t)},{charset:QHPass.resConfig.charset})},QHPass.showSetName=function(e,t){QHPass.loadJs(r,function(){QHPass.showSetName(e,t)},{charset:QHPass.resConfig.charset})},QHPass.namedUser=function(e,t){QHPass.resConfig.loginAfterSetName=!0,QHPass.getUserInfo(function(t){t.type!="bind"&&(!t.userName||t.userName.indexOf("360U")>-1)?QHPass.showSetName(e,{notRequest:!0,crumb:t.crumb}):t.type=="bind"?QHPass.showBind(e,{notRequest:!0,crumb:t.crumb}):QHPass.execCallback(e,t)},function(){QHPass.showSso(e)})},QHPass.preventDefault=function(e){e=e||window.event,e&&e.preventDefault?e.preventDefault():e.returnValue=!1},QHPass.Adapter={globalCallback:null,regOpts:{},loginOpts:{},ssoOpts:{},cookie_domains:[0],namedOpts:{}},(window.QW&&Dom.ready||e)(function(){try{e(".btn-login-pop").click(function(e){QHPass.login(QHPass.resConfig.callback||QHPass.resConfig.loginCallback),QHPass.preventDefault(e)}),e(".btn-reg-pop").click(function(e){QHPass.reg(QHPass.resConfig.callback||QHPass.resConfig.regCallback),QHPass.preventDefault(e)});function t(){QHPass.getUserInfo(function(e){n(e)})}function n(e){QHPass.setloginStatus(e),QHPass.resConfig.initModule&&QHPass.resConfig.initModule(e)}function r(){if(location.host.indexOf("360.cn")>-1)return;QHPass.getUserInfo(QHPass.setloginStatus,function(){QHPass.autoLogin(QHPass.resConfig.callback)})}if(QHPass.resConfig.isAutoLogin){r();return}QHPass.resConfig.loginStatus&&t()}catch(i){}})})();