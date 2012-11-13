//选择城市
var baseUrl="http://www.yiqisoo.com/";
$(function(){
		   
	$(".city a")
	.click(function(event){
		$(".area").fadeOut(200);
		$(".area").show();
	});
	
	$(".area a").click(function(event){
		var city = $(this).text()
		$(this).parents(".area").fadeOut(200);
		$(".city strong").text(city);
		//return false;
	});

	$(document).mouseup(function(event){
		$(".area").fadeOut(200);
	});
 }); 

//下拉搜索框
$(function(){
		   
	$(".select").mouseover(function(event){
		$(this).children(".super_select").show();
	});
	$(".select").mouseleave(function(event){
		$(".super_select").fadeOut(200);
	});
	
	$(".super_select a").click(function(event){
		var selected = $(this).text()
		$(this).parents(".super_select").fadeOut(200);
		$(this).parents(".super_select").siblings(".btn").text(selected);
		//return false;
	});

 }); 
 
//搜索选项显示隐藏
$(function(){
	$(".search_terms_btn a").toggle(
		function () {
			$(this).text("收起").removeClass("show").addClass("hide");
			$(".search_terms_more").css({display:"block"});
		},
		function () {
			$(this).text("显示更多筛选条件").removeClass("hide").addClass("show");
			$(".search_terms_more").css({display:"none"});
		}
	); 
}); 
$(function(){
	$("#region_more").click(function(){
			$(this).parent().next("#region_more_con").show();
			$(this).parent().hide();
	})
	$("#region_more_hide").click(function(){
			$(this).parent().hide();
			$(this).parent().prev("#region_recommendation").show();
	})
}); 
/*
/*模块展开和关闭*/
$(function(){
		 $(".calc_hd > div").toggle(function(){
			 	
				$(this).parents().next('ul').slideUp();
				$(this).removeClass('calc_minusbtn').addClass('calc_addbtn');	
			
			 },function(){
				$(this).parents().next('ul').slideDown();
				$(this).removeClass('calc_addbtn').addClass('calc_minusbtn');
				
		 });
});
$(function(){
		 $(".calc_lside_hd > div").toggle(function(){
			 	
				$(this).parents().next('.calc_lside_bd').slideUp();
				$(this).removeClass('calc_minusbtn').addClass('calc_addbtn');	
			
			 },function(){
				$(this).parents().next('.calc_lside_bd').slideDown();
				$(this).removeClass('calc_addbtn').addClass('calc_minusbtn');
				
		 });
});
$(function(){
		 $(".calc_lside_hd2 > div").toggle(function(){
			 	
				$(this).parents().next('.calc_inlist').slideUp();
				$(this).removeClass('calc_minusbtn').addClass('calc_addbtn');	
			
			 },function(){
				$(this).parents().next('.calc_inlist').slideDown();
				$(this).removeClass('calc_addbtn').addClass('calc_minusbtn');
				
		 });
});
/*模块展开和关闭2*/
$(function(){
		 $("#calc_1").click(function(){
			 	
				$("#calc_1_hd").slideUp();
				$('#calc_1_con').slideDown();	
				return false;
		 });
		 
		 $('#calc_back1').click(function(){
				$("#calc_1_hd").slideDown();
				$('#calc_1_con').slideUp();
				return false;	
					
		});
});
/*zhibin验证码*/
function changeAuthImg(imgID) {
    document.getElementById(imgID).src = "/class/action/vimg.php?ran=" + Math.random();
}
/*zhibin注册*/
function checkRegister(field) {
    switch (field) {
    case 'username':
        if (!/^[a-z0-9_]{6,16}$/.test($("#username").val())) {
            $("#_username").html("<span class='ico'></span>用户名格式不合格!");
            return false;
        } else { //$("#_username").html("<span class='ico'></span>用户名格式合格.");
            checkregister('username', $.trim($("#username").val()), $("#_username"));
            if ($("#_username").text().length > 15) return false;
            if ($("#_username").text().length == 0) $("#_username").css('display', 'none'); //$("#_username").css('display','none');
            return true;
        }
        break;
    case 'password':
        if ($("#password").val().length < 6) {
            $("#_password").html("<span class='ico'></span>密码长度不能低于6位!");
            $("#_password").css('display', 'block');
            return false;
        } else {
            $("#_password").html("<span class='ico'></span>密码格式合格.");
            $("#_password").css('display', 'none');
            return true;
        }
        break;
    case 're-password':
        if ($("#re-password").val() != $("#password").val()) {
            $("#_re-password").html("<span class='ico'></span>前后密码不一致!");
            $("#_re-password").css('display', 'block');
            return false;
        } else {
            $("#_re-password").html("<span class='ico'></span>密码格式合格.");
            $("#_re-password").css('display', 'none');
            return true;
        }
        break;
    case 'email':
        if ($("#email").val().length < 1) {
            $("#_email").html("<span class='ico'></span>电子邮箱不能为空!");
            $("#_email").css('display', 'block');
            return false;
        }
        if (!/^[\w|-|\.]+@[\w|-|\.]+(\.\w{2,3}){1,2}$/.test($("#email").val())) {
            $("#_email").html("<span class='ico'></span>错误的电子邮箱!");
            $("#_email").css('display', 'block');
            return false;
        } else { //$("#_email").html("<span class='ico'></span>电子邮箱格式合格.");
            checkregister('email', $.trim($("#email").val()), $("#_email")); //			alert($("#_email").html());
            $("#_email").css('display', 'block');
            if ($("#_email").text().length > 15) return false;
            if ($("#_email").text().length == 0) $("#_email").css('display', 'none');
            return true;
        }
        break;
    case 'cellphone':
        if ($("#cellphone").val().length < 1) {
            $("#_cellphone").html("<span class='ico'></span>手机号码不能为空!");
            $("#_cellphone").css('display', 'block');
            return false;
        }
        if (!/^[\+86|86|0]{0,3}1[3|5|8]\d{9}$/.test($("#cellphone").val())) {
            $("#_cellphone").html("<span class='ico'></span>错误的手机号码!");
            $("#_cellphone").css('display', 'block');
            return false;
        } else {
            checkregister('cellphone', $.trim($("#cellphone").val()), $("#_cellphone"));
            $("#_cellphone").css('display', 'block'); //			$("#_cellphone").html("<span class='ico'></span>手机号码格式合格.");
            //			$("#_cellphone").css('display','none');alert($("#_cellphone").html());
            if ($("#_cellphone").text().length > 15) return false;
            if ($("#_cellphone").text().length == 0) $("#_cellphone").css('display', 'none');
            return true;
        }
        break;
    case 'authcode':
        if (!/[A-Za-z]{4}/.test($("#authcode").val())) {
            $("#_authcode").html("<span class='ico'></span>验证码为空或错误!");
            $("#_authcode").css('display', 'block');
            return false;
        } else {
            $("#_authcode").html("<span class='ico'></span>验证码格式合格.");
            $("#_authcode").css('display', 'none');
            return true;
        }
        break;
    case 'all':
        if (checkRegister('username')) if (checkRegister('password')) if (checkRegister('re-password')) if (checkRegister('email')) if (checkRegister('cellphone')) if (checkRegister('authcode')) return true;
        return false;
        break;
    }
}
function checkregister(task, content, showobj) {
    pre = "<span class='ico'></span>";
    $.get('/index.php', {
        action: 'ajax|checkregister',
        task: task,
        content: content
    },
    function(data) {
        try {
            data = eval('(' + data + ')');
        } catch(err) {
            return;
        }
        showobj.html(pre + data);
    });
}
/*zhibin退出*/
function logout() {
    $.get('/index.php', {
        action: 'ajax|recentview',
        task: 'clear'
    },
    function() {
        window.location.reload();
    });
}
/*zhibin首页*/
function submit_check(key, form) {
    key = document.getElementById(key);
    theform = document.getElementById(form);
    key.value = $.trim(key.value); //	if(key.value.length>0)
	if(form=='sub_3c')
	{
		if (key.value == '请输入您要搜索的商品关键词')
		{
			key.value = '';
		}
		else if(key.value == '')
		{
			var d_url=document.location.href;	
			var patt = new RegExp('utm_campaign');
			if(patt.test(d_url))
			{
				var pattern = /utm_campaign=[^&]*/;
				strs = d_url.match(pattern);
				window.location.href="http://3c.yiqisoo.com/index.php?action=life&type=life&classid=51&anl=shy_search&"+strs;
			}else{
				window.location.href="http://3c.yiqisoo.com/index.php?action=life&type=life&classid=51&anl=shy_search";
			}
			return false;
			
		}
//		if(key.value=='请输入您要搜索的产品或型号等关键词,如thinkpad' || !key.value)
//		{
//			return false;
//		}
	}
	//		key.value=filter_str(key.value);
    if (form == 'sub_ershou' || form == 'sub_newhouse' || form == 'sub_rent' || form == 'sub_show' || form == 'sub_jiaju') {
        if (key.value == '请输入您想租的房源特征信息，如小区名称、地址...') key.value = ''; //alert(form.substr(4,form.length));
		if (key.value == '请输入您想买的二手房信息，如小区名称、地址...') key.value = ''; //alert(form.substr(4,form.length));

        if (key.value == '请输入想搜索的关键字...') key.value = ''; //		theform.submit();
        //		window.location.href="/index.php?action=search&type=";
    }
} //首页绑定值
//zhibin写cookies函数 
function setCookie(name, value, period) //3个参数，一个是cookie的名子，一个是值,一个是有效期单位分钟
{
    var period = period;
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + period * 60 * 1000);
	
    document.cookie = name + "=" + escape(value) + ";domain=.yiqisoo.com;expires=" + exp.toGMTString();
	
}
function getCookie(name) //取cookies函数     
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}
function delCookie(name) //删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
} //显示最近浏览记录
//zhibin取最近找过的房子
function getRecentView(thetype, viewid,city) { // 获取最近找过的房子
	//var city=arguments[2]?arguments[2]:'bj';
    $.get('/index.php?action=ajax|recentview&type='+thetype+'&city='+city, 
    function(data) {
        if (data.length < 1) return 1;
        try {
            data = eval('(' + data + ')');
        } catch(err) {
            return;
        }
        html = '';
        switch (thetype) {
        case 'newhouse':
            for (i in data) {
                data[i].price = parseInt(data[i].price) > 0 ? parseInt(data[i].price) + '元/平方米': '未知';
                html += '<li><p>[ 新房 ]<a href="/index.php?action=rentsnapshot&type=newhouse&city=' + data[i].city_en + '&info_id=' + data[i].id + '" target="_blank">' + data[i].name + '</a></p><span class="gray">' + data[i].city + '  ' + data[i].district + '  ' + data[i].price + ' </span></li>';
            }
            break;
        case 'ershou':
            for (i in data) {
                data[i].price = parseInt(data[i].price) > 0 ? '<b class="fn orange">'+parseInt(data[i].price) + '</b>万元': '未知';
				html += '<p class="clearfix"><span class="fr">'+data[i].price+'</span><input class="recentcompare" name="" type="checkbox" value="'+data[i].id+'"> <span class="blue"><a href="'+baseUrl+'housesnapshot/esf/'+data[i].city+'/'+data[i].id+'" target="_blink">'+data[i].housetitle+'</a></span></p>';
            }
			html+='<p class="tc"><input name="" type="button" onclick="recentcompare()" value="比较最近浏览的二手房"  /></p>';
            break;
         case 'rent':
            for (i in data) {
				if(!data[i])continue;
                data[i].price = parseInt(data[i].price) > 0 ? '<b class="fn orange">'+parseInt(data[i].price) + '</b>元': '未知';
				html += '<p class="clearfix"><span class="fr">'+data[i].price+'</span><input class="recentcompare" name="" type="checkbox" value="'+data[i].id+'"> <span class="blue"><a href="'+baseUrl+'housesnapshot/rent/'+data[i].city+'/'+data[i].id+'" target="_blink">'+data[i].housetitle+'</a></span></p>';
            }
			html+='<p class="tc"><input name="" type="button" onclick="recentcompare()" value="比较最近浏览的租房"  /></p>';
            break;
        case 'jiaju':
            for (i in data) {
                data[i].price = Math.ceil(data[i].price) > 0 ? data[i].price + '元': '未知';
				 html += '<li>	<div class="tac"><a href="/index.php?action=jiajusnapshot&type=jiaju&info_id=' + data[i].id + '&subclassid=' + data[i].classid + '" target="_blank"><img src="' + data[i].s_picurl + '" width="100" height="75" /></a></div><p><a href="/index.php?action=jiajusnapshot&type=jiaju&info_id=' + data[i].id + '&subclassid=' + data[i].classid + '" class="blue" target="_blank">' + data[i].title + '</a></p>参考价：<span class="orange2">' + data[i].price + '</span>	</li>'
            }
            break;
        case 'show':
            for (i in data) {
                data[i].price = parseInt(data[i].price) > 0 ? parseInt(data[i].price) + '元': '未知';
                data[i].style = data[i].style == 'null' ? data[i].style: '未知';
				html += '<li><div class="tac"><a href="/index.php?action=search&type=showsnapshot&showid=' + data[i].id + '" target="_blank"><img src="' + data[i].pic + '" width="100" height="75" /></a></div>	<p><a href="/index.php?action=search&type=showsnapshot&showid=' + data[i].id + '" class="blue" target="_blank">' + data[i].title + '</a></p><p class="gray">居室：' + data[i].housetype + '<br />风格：' + data[i].style + '</p><span class="orange2">预算：' + data[i].price + '</span></li>';
            }
            break;
		case '3c':
			var cursor = 1;
            for (i in data) {
				data[i].title = data[i].title.substr(0,7);
				html += '<li><p><a target="_blank" href="/snapshot3c/3c/overview/'+data[i].id+'"><img src="'+data[i].pic+'"></a></p><strong>'+cursor+'</strong><dl><dt><a target="_blank" href="/snapshot3c/3c/overview/'+data[i].id+'">'+data[i].title+' </a></dt><dd> </dd><dd><span class="orange">'+data[i].minprice+'</span>元</dd></dl></li>';
				cursor++;
            }
            break;
	   case 'overview':
            for (i in data) {

		   	var s = data[i].communityname;
			  	title = s.substr(0, 6); 
				//alert(title);
                data[i].price = parseInt(data[i].price) > 0 ? '<b class="fn orange">'+parseInt(data[i].price) + '</b>元/平米': '未知';
				html += '<p class="clearfix"><span class="fr">'+data[i].price+'</span> <span class="blue"><a  href="/'+data[i].city+'/community/'+data[i].communitytag+'/overview/&-&-&-'+data[i].id+'.html" target="_blank" alt='+data[i].communityname+' title='+data[i].communityname+'>'+title+'</a></span></p>';
            }
            break;
        }
        $('#'+viewid).html(html);
    });
	
}


//只显示多图
function changefilter(url) {
    window.location = url;
}
    
function showmutipic(obj, url) {
	var str = new Array();
    str = url.split('.');
    str = str['2'].split('/');
    var newUrl = '/'+str['1']+'/'+str['2']+'/';
    str = str['3'].split('-');
    
    if (obj.checked) {
    	str['17'] = '1';
    }else{
    	str['17'] = '&';
    }
    
    var param = str.toString().replace(/,/g,"-");
	url = newUrl+param+'.html';
    changefilter(url);
}




//记录
var isagent = 0;
var restat = "";
function addsearch() {
    checklogin();
}
function getinfo() {
    var url = "/index.php?action=ajax|getquicksearch";
    var data = "op=add&searchtext=" + keyuri + "&showtext=" + keytext + "&type=" + datatype;
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        success: function(msg) {
            var data = eval('(' + msg + ')'); //alert(data);
            if (data['status'] == 'false') {
                alert(data['msg']);
            } else {
                if (data['msg'] != "" && data['msg'] != null && data['msg'] != 'undefined') {
                    alert(data['msg']);
                }
                window.document.getElementById('quickaera').innerHTML = data['html'];
                showmserchlayer(data['nums']);
            }
        }
    });
}
function repalcetext(id) {
    var url = "/index.php?action=ajax|getquicksearch";
    var data = "op=update&id=" + id + "&searchtext=" + keyuri + "&showtext=" + keytext + "&type=" + datatype;
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        success: function(msg) {
            var data = eval('(' + msg + ')'); //alert(data);
            if (data['status'] == 'false') {
                alert(data['msg']);
            } else {
                window.document.getElementById('quickaera').innerHTML = data['html'];
                if (data['msg'] != "" && data['msg'] != null && data['msg'] != 'undefined') {
                    alert(data['msg']);
                }
                showmserchlayer(data['nums']);
            }
        }
    });
}
function deltext(id) {
    var url = "/index.php?action=ajax|getquicksearch";
    var data = "op=del&id=" + id;
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        success: function(msg) {
            var data = eval('(' + msg + ')'); //alert(data);
            if (data['status'] == 'false') {
                alert(data['msg']);
            } else {
                window.document.getElementById('quickaera').innerHTML = data['html'];
                if (data['msg'] != "" && data['msg'] != null && data['msg'] != 'undefined') {
                    alert(data['msg']);
                }
                showmserchlayer(data['nums']);
            }
        }
    });
}
function taketext(id) {
    var url = "/index.php?action=ajax|getquicksearch";
    var data = "op=getmsg&id=" + id;
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        success: function(msg) {
            var data = eval('(' + msg + ')'); //alert(data);
            if (data['status'] == 'false') {
                alert(data['msg']);
            } else {
                window.document.getElementById('quickaera').innerHTML = data['html'];
                if (data['msg'] != "" && data['msg'] != null && data['msg'] != 'undefined') {
                    alert(data['msg']);
                }
                showmserchlayer(data['nums']);
            }
        }
    });
}
function canceltext(id) {
    var url = "/index.php?action=ajax|getquicksearch";
    var data = "op=delmsg&id=" + id;
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        success: function(msg) {
            var data = eval('(' + msg + ')'); //alert(data);
            if (data['status'] == 'false') {
                alert(data['msg']);
            } else {
                window.document.getElementById('quickaera').innerHTML = data['html'];
                if (data['msg'] != "" && data['msg'] != null && data['msg'] != 'undefined') {
                    alert(data['msg']);
                }
                showmserchlayer(data['nums']);
            }
        }
    });
}
function showmserchlayer(nums) {
    $('#q_search_popup').slideDown('slow');
   // window.document.getElementById('searchnums').innerHTML = nums;
}
function showmserch() {
    getinfo();
}
function hidemserch() {
    $('#q_search_popup').slideUp('slow');
}
function showlogin() {
    $('#q_login_popup').slideDown('slow');
}
function hidelogin() {
    $('#q_login_popup').slideUp('slow');
}
function checklogin() {
    var url = "/index.php?action=ajax|checklogin";
    $.ajax({
        type: 'post',
        url: url,
        success: function(msg) {
            if (msg == 'yes') { //已登录成功 添加记录
                showmserch();
            } else {
                showlogin();
            }
        }
    });
} //登录


function getloginck(sname)
{//获取单个cookies


	var acookie=document.cookie.split(";");
	for(var i=0;i<acookie.length;i++)
	{
		var arr=acookie[i].split("=");

		var cookname =$.trim(arr[0]);

		cookname = $.trim(cookname);

		if(sname==cookname)
		{
			if(arr.length>1)
				return unescape(arr[1]);
			else
				return "";
		}
	}
	return "";
}


function dologin(action) {
    if (formcheck()) {
        var username = window.document.getElementById('username').value;
        var password = window.document.getElementById('password').value;
        var authcode = window.document.getElementById('authcode').value;
        var data = 'username=' + username + '&password=' + password + "&authcode=" + authcode + "&ifagent=" + isagent;
        var url = "/index.php?action=ajax|login";
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            success: function(msg) {
                var data = eval('(' + msg + ')');
				var loginnum = getloginck("_authnumC");
				if(loginnum>2)
				{
					window.document.getElementById('passma').style.display='';
				}

                if (data['status'] == 'false') {
                    //alert(data['msg']);
                } else {
                    if ($(".ico08").length) {
                        addBookaction();
                        return;
                    }
					if($("#add_community").length)
					{
						addcommunityaction();
						return;
					}
                    switch (action) {
                    case "quicksearch":
                        hidelogin();
                        showmserch();
                        break;
                    }
                    $('#q_login_popup').slideUp('slow');
                }
            }
        });
    }
}
//添加收藏
$(function(){
	if($(".ico08").length)
	{
		$(".ico08").click(function(){addtostore()});
		loginaction='';
	}
	if($("#add_community").length)
	{
		$("#add_community").click(function(){addcommunity()});
		loginaction='';
	}
	if($(".scico").length)
	{
		$(".scico").click(function(){addtostore()});
		loginaction='';
	}
	
	if($(".fav").length){//家电详情页添加收藏
		$(".fav").click(function(){add3c()});
		loginaction='';
	}
});
function add3c(){
	$.get("/index.php?action=ajax|checklogin",
	function(data) {
		//alert(data);
		if (data == 'yes') {
			add3caction();
		} else {
			showlogin();
		}
	});
}

function add3caction(){
	content = {};
	content.t = 'jiadian';
	content.info_id = $(".fav").attr("id");
	content.title = encodeURIComponent($("h1").text());
	$.post("/index.php?action=ajax|addbook", content,
		function(data) {
			if (data == 'ok') {
				alert("恭喜,添加成功!");
			} else {
				alert("对不起,服务器忙,稍后再试!");
			}
		hidelogin();
	});
}

function addcommunity()
{
	$.get("/index.php?action=ajax|checklogin",
	function(data) {
		//alert(data);
		if (data == 'yes') {
			addcommunityaction();
		} else {
			showlogin();
		}
	});
}

function addcommunityaction()
{
	content = {};
	content.t = 'community';
	content.info_id = $("#fav_communitytag").text();
	content.title = encodeURIComponent($("h1").text());
	$.post("/index.php?action=ajax|addbook", content,
		function(data) {
			if (data == 'ok') {
				alert("恭喜,添加成功!");
			} else {
				alert("对不起,服务器忙,稍后再试!");
			}
		hidelogin();
	});
}

function addtostore()
{
	$.get("/index.php?action=ajax|checklogin",
	function(data) {
		//alert(data);
		if (data == 'yes') {
			addBookaction();
		} else {
			showlogin();
		}
	});
}
function addBookaction() {
 content = {};
 content.t = $("#type").val();
 content.info_id = $("#info_id").val();
 content.tt = $("#tradetype").val();
 content.title = encodeURIComponent($("h1").text());
 $.post("/index.php?action=ajax|addbook", content,
 function(data) {
 if (data == 'ok') {
 alert("恭喜,添加成功!");
 } else {
 alert("对不起,服务器忙,稍后再试!");
 }
 hidelogin();
 });
} 

function formcheck() {
    var username = window.document.getElementById('username').value;
    if (username == '') {
        alert('用户名不能为空');
        return false;
    }
    if (username == '请输入手机号或者用户ID') {
        alert('请输入手机号或者用户ID');
        return false;
    }
    var password = window.document.getElementById('password').value;
    if (password == '') {
        alert('密码不能为空');
        return false;
    }

	var loginnum = getloginck("_authnumC");

	if(loginnum >3 )
	{
		var authcode = window.document.getElementById('authcode').value;
		if (authcode == '') {
			alert('验证码不能为空');
			return false;
		}
	}

    return true;
}
function SetUserIdentity(agent) {
    isagent = agent;
	if(agent=='0')
	{
		window.document.getElementById('pop_people_login_set').className= 'current';
		window.document.getElementById('pop_agent_login_set').className= '';
	}
	else
	{
		window.document.getElementById('pop_people_login_set').className='';
		window.document.getElementById('pop_agent_login_set').className='current';
	}
}
function usergoToReg(ifagent) {
    href = "/index.php?action=register";
    if (ifagent) href += "&ifagent=" + isagent;
    window.location.href = href;
}
function autoSubmit(event, object) {
    event = event ? event: window.event;
    if (event.keyCode == 13) // && oInputField.value!='')
    { //		oInputField.value=filter_str(oInputField.value);
        object.submit();
    }
}

//页面跳转
$(function(){
	$("#redirect_page_button").click(function() {
		var url = location.href;
		var page = parseInt($("#redirect_page_number").val());
		var max =  parseInt($("#page_max_number").html());
		var numberReg = /\D+/;

		if (numberReg.test(page)){
			alert("您输入的不是数字");
			return false;
		}

		if (page <= 0){
			alert("数字不能为零或负数");
			return false;
		}

		if (page > max){
			alert("数字不能大于总页数");
			return false;
		}

		url = url.replace(/&page=(\w+)/, "");
		url = url + "&page=" + page;

		window.location = url;
	});
});

function SetHome(obj, vrl) {
	vrl="Yiqisoo搜索";
	//url = 'http://www.Yiqisoo.com/?anl=swsy';
	
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } catch(e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch(e) {
                alert("此操作被浏览器拒绝！\n 请在浏览器地址栏输入'about:config'并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
} 

// Change Tab
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
		if(menu && con)
		{
			menu.className = i == cursel ? "selected": "";
			con.style.display = i == cursel ? "block": "none";
		}
    }
}
//zhibin 
$(document).ready(function(){
		   
	$(".show_free_popup a")
	.click(function(event){
		$(".free_popup").show();
	});

	$(".free_popup").mouseleave(function(event){
		$(this).fadeOut(200);
	});
	$(document).mouseup(function(event){
		$(".free_popup").fadeOut(200);
	});
});
//wanglei
function addBookmark() {
    title = 'Yiqisoo搜索';
    url = 'http://www.Yiqisoo.com/';
    var browser = getOs();
    if (browser == 'Firefox') {
        window.sidebar.addPanel(title, url, "");
    } else if (browser == 'MSIE') {
        try {
            window.external.AddFavorite(url, title);
        } catch(e) {
            alert("添加失败,劳您手动添加!");
        }
    } else if (window.opera && window.print) {
        return true;
    }
} //提交表单

function recentcompare()
{
	
	type = $("#tradetype").val();
	if(type==1)
	{
		action = 'comphouse';
	}
	else
	{
		action = 'comprenthouse';
	}
	var recentviewid=[];
	$(".recentcompare").each(function(i){
		if(this.checked)
			recentviewid[i]=this.value;
	});
	if(recentviewid.length<1)return;
	newlink=baseUrl+'index.php?action='+action+'&house_list='+encodeURIComponent(recentviewid.join(','));
	window.open(newlink);
}

// modify by yucongke 2012.6.12
function condition_search(t,value,url) {
	var str = new Array();
    str = url.split('.');
    str = str['0'].split('/');
    var newUrl = '/'+str['1']+'/'+str['2']+'/';
    str = str['3'].split('-');
	if(t=='park'){
	    str['1'] = '&';
	    str['2'] = encodeURIComponent(encodeURIComponent(value));
	}else if(t=='school'){
	    str['1'] = '&';
	    str['2'] = '&';
	    str['15'] = encodeURIComponent(encodeURIComponent(value));
	}else if(t=='busline'){
		value = value.replace('-','_');
		str['1'] = encodeURIComponent(encodeURIComponent(value));
	}else if(t=='community'){
		str['15'] = encodeURIComponent(encodeURIComponent(value));
	}
	var param = str.toString().replace(/,/g,"-");
	url = newUrl+param+'.html';
    window.location = url;
}
///
function filter_int(obj, event) {
    event = event ? event: window.event;
    if (event.keyCode == 13 && parseInt(obj.value) >= 0) { //	$('#tijiaomianji').click();
        if ($(obj).next().attr('tagName').toUpperCase() != 'INPUT') {
            $(obj).next().click();
        } else {
            $(obj).next().next().click();
        }
    }
    while (/[^\d]/.test(obj.value)) obj.value = obj.value.replace(/[^\d]/, '');
}



function getOs() {
    var OsObject = "";
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        return "MSIE"; //IE浏览器
    }
    if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox"; //Firefox浏览器
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
        return "Safari"; //Safan浏览器
    }
    if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
        return "Camino"; //Camino浏览器
    }
    if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
        return "Gecko"; //Gecko浏览器
    }
}


function showhouseimg(pic)
{
	document.getElementById("showimg").src=pic;

}




function sendsearchlog() { // 送日志
    t = $("#type").val();
    if (typeof($("#tradetype").val()) != 'undefined')
	{
        t += $("#tradetype").val();
	}
        k = $("#keyword1").val();
        s = $("#city").val(); //		n=(t!='sjiaju')?$.trim($("div.title p.fr span").eq(0).text()):$.trim($("div.breadcrumbs2 p strong").eq(0).text());
        //		p=0;is=0;po=0;u=0;
        //		c=$("#this_city").text();
        //		if(k=='')return;
        $.ajax({
            type: 'post',
            url: 'http://'+window.location.host+'/static/static_log.php',
            data: 'type=' + t + '&keyword=' + k + "&task=addkey&city=" + s
        });
    
}
//家电选择品牌
function selectBrand3C(className)
{
	checkboxes = $("."+className);
	size=checkboxes.length;
	var compare=[];
	for(i=0;i<size;++i)
	{
		v = checkboxes.eq(i);
		if(v.attr('checked'))
		compare.push(v.val());
	}
	url = window.location.href;
	url = url.replace(/&bd[^&]*/,'');
	if(compare.length)
		url += '&bd='+encodeURIComponent(compare.join(','));
	window.location.href = url;
}

//搜索选项显示隐藏
$(function(){
	$("#select_bd_more").toggle(
		function () {
			$(this).text("收起").removeClass("icn_more").addClass("icn_hidden");
			$(".brand_more").css({display:"block"});
		},
		function () {
			$(this).text("更多").removeClass("icn_hidden").addClass("icn_more");
			$(".brand_more").css({display:"none"});
		}
	); 
}); 

//获取上家价格列表
var isHide=true;
function getCompareShopList(pid)
{
//	alert($("#compare_ul_"+pid).length);
	ul = $("#compare_ul_"+pid);
	if(ul.find('li').length<2)
	{
		$.post("/index.php",{'pid':pid,'action':'ajax|getCompareShopList'},function(d){
			if (d.length < 1) return 1;
			try {
				d = eval('(' + d + ')');
			} catch(err) {
				return;
			}
			html='';
			for (i in d)
			{
				html+='<li><span><b class="orange">'+d[i].price+'</b>元</span><a href="'+d[i].url+'" target="_blank" class="blue">'+d[i].name+'</a></li>';
			}
			html+='<li><a target="_blank" href="http://www.yiqisoo.com/index.php?action=snapshot3c&type=3c&id='+pid+'" class="blue">更多比价信息&gt;&gt;</a></li>';
			if($("#compare_ul_"+pid).find('li').length<2)
				ul.html(html);
			ul.fadeIn("slow");
		});
	}else{
		ul.fadeIn("slow");
	}
	
}

function hideCompareShopList(pid)
{
	setTimeout(function(){
		if(isHide)
		$('#compare_ul_'+pid).hide();
		},400);
//	alert(pid);
}

function changeContral()
{
	isHide=isHide?false:true;
}


//列表页最新修改 2011-04-20

$(function(){
	
	$(".list-view-new li").hover(
		function () {
			$(this).css({"background-color":"#fffaec"}).find(".compare,.attr_btn").show();
			
		},
		function () {
			var attr_box=$(this).find(".attr_box");
			if(attr_box.is(":hidden"))
			{
				$(this).css({"background-color":"#fff"}).find(".compare,.attr_btn").hide();
			}else{
				$(this).css({"background-color":"#fffaec"}).find(".compare,.attr_btn").show();
			}
			
		}
	);

	$(".list-view-new .list-item-new .attr_btn a").click(function()
	{
		var attr_box=$(this).parents(".list-item-new").find(".attr_box");
		if(attr_box.is(":hidden"))
		{
			$(".list-view-new li").css({"background-color":"#fff"}).find(".attr_box,.compare,.attr_btn").hide();
			$(".list-view-new .list-item-new .attr_btn a").removeClass("hide").text("详细信息");
			$(this).addClass("hide").text("收 起").parents("li").css({"background-color":"#fffaec"}).find(".attr_box,.compare,.attr_btn").show();
			
		}else{
			
			
			$(this).removeClass("hide").text("详细信息").parents("li").find(".attr_box,.compare,.attr_btn").hide();
		}
		
	});

});

$(function(){
	$(".new_appliance_list li .compare").hover(function()
	{
		
		$(this).find(".tip").animate({"top":"22px"},300).show();
	},function(){
		$(this).find(".tip").animate({"top":"30px"},300).hide();
	});
	
	
	$(".applicationList li").hover(function(){
		$(this).addClass("active").css({"z-index":"1"}).find(".tips").show();
	},function(){
		$(this).removeClass("active").css({"z-index":"0"}).find(".tips").hide();
	});
	
	
	
	$("#releaseShowMore").toggle(function(){
		$("#releaseShow").show();
		$(this).find("em").text("收起").addClass("up");
	},function(){
		$("#releaseShow").hide();
		$(this).find("em").text("展开").removeClass("up");
	});
	
});
				

//713改版 头部
$(function(){
	var timer=null;
	$(".topBar .tool").hover(function(){
		$("#search_suggest1").removeClass("show").addClass("hide");
		$("#toolList").show();
		$("#appList").hide();
	},function(){
		$("#toolList").hide();
		$("#appList").hide();
	});

	$(".topBar .app").hover(function(){
		$("#search_suggest1").removeClass("show").addClass("hide");
		$("#toolList").hide();
		$("#appList").show();
	},function(){
		$("#toolList").hide();
		$("#appList").hide();
	});
	
	
	
	
	//725添加小区找房
	$(".xqList li").hover(function(){
		$(this).css({"background-color":"#fffaec"});
	},function(){
		if(!$(this).hasClass("active"))
		{
			$(this).css({"background-color":"#fff"});
		}
	});
	
	
	
	

	$(".xqList li .btns .btnsF a").click(function(){
		var parent=$(this).parents("li");
		parent.addClass("active")
		.siblings()
		.removeClass("active")
		.css({"background-color":"#fff"})
		.find(".b,.b1,.b2")
		.hide()
		.end()
		.find(".btns .btnsF a,.btns .btnsJ a")
		.removeClass("hide");
				
		if($(this).hasClass("hide"))
		{
			$(this).removeClass("hide").parents(".btns").css({"bottom":"0px"});
			parent.find(".b,.b1").hide();
		}
		else
		{
			parent.find(".btnsJ a")
			.removeClass("hide")
			.end().find(".b2").hide()
			.end().find(".b,.b1").show();
			$(this).addClass("hide").parents(".btns").css({"bottom":"-1px"});
			
		}
	});

	$(".xqList li .btns .btnsJ a").click(function(){
		var parent=$(this).parents("li");
		parent.addClass("active")
		.siblings()
		.removeClass("active")
		.css({"background-color":"#fff"})
		.find(".b,.b1,.b2")
		.hide()
		.end()
		.find(".btns .btnsF a,.btns .btnsJ a")
		.removeClass("hide");

		if($(this).hasClass("hide"))
		{
			$(this).removeClass("hide").parents(".btns").css({"bottom":"0px"});
			parent.find(".b,.b2").hide();
		}
		else
		{
			parent.find(".btnsF a")
			.removeClass("hide")
			.end().find(".b1").hide()
			.end().find(".b,.b2").show();
			$(this).addClass("hide").parents(".btns").css({"bottom":"-1px"});
		}
	});
	
	
	
	var xqZindex=3;
	$(".xqList li .price .selectBox .down").click(function(event){
		$(".xqList li .price .selectBox p").hide();
		$(this).parents("li").css({"position":"relative","z-index":xqZindex++}).end()
		.parents(".selectBox").find("p").show();
		
		event.stopPropagation();
	});
	
	$(".xqList li .price .selectBox p a").click(function(event){
		$(this).parents("p").hide().end().parents(".selectBox").find("h3").text($(this).text());
		event.stopPropagation();
	});
	$(".xqList li .price .selectBox p").mouseleave(function(){
		$(this).hide();
	});
	
	
});

/*

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(7($){$.Q.P=7(t){8 1={d:0,G:0,e:"o",B:"S",3:5};6(t){$.J(1,t)}8 p=c;6("o"==1.e){$(1.3).v("o",7(e){8 F=0;p.C(7(){6($.s(c,1)||$.x(c,1)){}f 6(!$.n(c,1)&&!$.m(c,1)){$(c).w("u")}f{6(F++>1.G){h E}}});8 H=$.N(p,7(9){h!9.k});p=$(H)})}c.C(7(){8 2=c;6(j==$(2).b("r")){$(2).b("r",$(2).b("i"))}6("o"!=1.e||j==$(2).b("i")||1.z==$(2).b("i")||($.s(2,1)||$.x(2,1)||$.n(2,1)||$.m(2,1))){6(1.z){$(2).b("i",1.z)}f{$(2).Z("i")}2.k=E}f{2.k=D}$(2).11("u",7(){6(!c.k){$("<Y />").v("U",7(){$(2).V().b("i",$(2).b("r"))[1.B](1.W);2.k=D}).b("i",$(2).b("r"))}});6("o"!=1.e){$(2).v(1.e,7(e){6(!2.k){$(2).w("u")}})}});$(1.3).w(1.e);h c};$.n=7(9,1){6(1.3===j||1.3===5){8 4=$(5).y()+$(5).I()}f{8 4=$(1.3).g().q+$(1.3).y()}h 4<=$(9).g().q-1.d};$.m=7(9,1){6(1.3===j||1.3===5){8 4=$(5).A()+$(5).M()}f{8 4=$(1.3).g().l+$(1.3).A()}h 4<=$(9).g().l-1.d};$.s=7(9,1){6(1.3===j||1.3===5){8 4=$(5).I()}f{8 4=$(1.3).g().q}h 4>=$(9).g().q+1.d+$(9).y()};$.x=7(9,1){6(1.3===j||1.3===5){8 4=$(5).M()}f{8 4=$(1.3).g().l}h 4>=$(9).g().l+1.d+$(9).A()};$.J($.10[\':\'],{"T-L-4":"$.n(a, {d : 0, 3: 5})","R-L-4":"!$.n(a, {d : 0, 3: 5})","O-K-4":"$.m(a, {d : 0, 3: 5})","l-K-4":"!$.m(a, {d : 0, 3: 5})"})})(X);',62,64,'|settings|self|container|fold|window|if|function|var|element||attr|this|threshold|event|else|offset|return|src|undefined|loaded|left|rightoffold|belowthefold|scroll|elements|top|original|abovethetop|options|appear|bind|trigger|leftofbegin|height|placeholder|width|effect|each|true|false|counter|failurelimit|temp|scrollTop|extend|of|the|scrollLeft|grep|right|lazyload|fn|above|show|below|load|hide|effectspeed|jQuery|img|removeAttr|expr|one'.split('|'),0,{}))


$(document).ready(function(){
	$(".list-item-new .pic img,.appliance_side_list li a img,.list_img .pic img,.new_appliance_list .img img,.showPic img,.showPic1 img").lazyload({effect : "fadeIn",placeholder : " http://img01.yiqisoo.com/yiqisoo/dandelion/common/images/loading.gif"});
	
});820图片延迟加载*/

/*等比例缩放*/
jQuery.fn.LoadImage=function(scaling,width,height,loadpic){
   
	return this.each(function(){
		var t=$(this);
		var src=$(this).attr("src")
		var img=new Image();
		img.src=src;
		var autoScaling=function(){
			if(scaling){
			
				if(img.width>0 && img.height>0){ 
			        if(img.width/img.height>=width/height){ 
			            if(img.width>width){ 
			                t.width(width); 
			                t.height((img.height*width)/img.width); 
			            }else{ 
			                t.width(img.width); 
			                t.height(img.height); 
			            } 
			        } 
			        else{ 
			            if(img.height>height){ 
			                t.height(height); 
			                t.width((img.width*height)/img.height); 
			            }else{ 
			                t.width(img.width); 
			                t.height(img.height); 
			            } 
			        } 
			    } 
			}	
		}
		if(img.complete){
			autoScaling();
		    return;
		}
		
		
		
		$(img).load(function(){
			autoScaling();
			t.attr("src",this.src);
			t.show();
		});
		
	});
}

	jQuery.fn.LoadImageList=function(scaling,width,height,loadpic){
	   
		return this.each(function(){
			var t=$(this);
			var src=$(this).attr("_src")
			var img=new Image();
			img.src=src;
			var autoScaling=function(){
				if(scaling){
				
					if(img.width>0 && img.height>0){ 
						if(img.width/img.height>=width/height){ 
							if(img.width>width){ 
								t.width(width); 
								t.height((img.height*width)/img.width); 
							}else{ 
								t.width(img.width); 
								t.height(img.height); 
							} 
						} 
						else{ 
							if(img.height>height){ 
								t.height(height); 
								t.width((img.width*height)/img.height); 
							}else{ 
								t.width(img.width); 
								t.height(img.height); 
							} 
						} 
					} 
				}	
			}
			if(img.complete){
				autoScaling();
				return;
			}
			
			
			
			$(img).load(function(){
				autoScaling();
				t.attr("src",this.src);
				t.show();
			});
			
		});
	}



$(function(){
	$("#salesList li .img a img").LoadImage(true,140,110);
	$(".showPic li .img img").LoadImage(true,180,180);
	
	
	
	$(".list_img_tj .pic img").LoadImage(true,73,73);
	$(".tj_list_img .pic img").LoadImage(true,210,210);

	$("#salesList2 li").hover(function(){
		$(this).addClass('active');
	},function(){
		$(this).removeClass();
	});				
});



/*928最新的家电改版*/
$(function(){
	
	
	
	$("#brand1 .more a").click(function(){
	
		if($(this).hasClass("show"))
		{
			$(this).removeClass().addClass("hide").text("收起");
			$("#brand1  ul li:gt(8)").show();
			$("#brand1 .choose").hide();
		}
		else
		{
			$(this).removeClass().addClass("show").text("更多");
			$("#brand1  ul li:gt(8)").hide();
			$("#brand1 .choose").show();
		}	
	
	});
	
	$("#brand1 .choose").click(function(){
		$("#brand1").hide();
		$("#brand2").show();
	});
	
	$("#brand2 .choose").click(function(){
		$("#brand2").hide();
		$("#brand1").show();
		$("#brand1 .more a").removeClass().addClass("show").text("更多");
		$("#brand1  ul li:gt(8)").hide();
	});
	
	
	
	$(".new_list li .pic img").LoadImage(true,95,95);
	

	$(".new_list li").hover(function(){
		$(this).css({"background-color":"#fffaec"});
	},function(){
		$(this).css({"background-color":"#fff"});
	});	
	
	
	$(".new_list_img li .pic img").LoadImage(true,180,180);
	
	var new_zindex=1;
	$(".new_list_img li").hover(function(){
		new_zindex++;
		$(this).addClass("active").css({"z-index":new_zindex});
	},function(){
		$(this).removeClass("active").css({"z-index":"1"});
		$(this).find(".shop").hide();
	});	

	$(".show_shop").mouseover(function(){
		$(this).find(".shop").show();
	});	
	
	$(".details_img .img img").LoadImage(true,200,200);


	/*0301修改家电详情页*/
	
	$("#quote_list .box").hover(function(){
		if(!$(this).hasClass("active")){
			$(this).find(".tips").show();
		}
	},function(){
		if(!$(this).hasClass("active")){
		$(this).find(".tips").hide();
		}
	});
	
	
	$("#quote_list .box2").hover(function(){
		if(!$(this).hasClass("active")){
			$(this).find(".tips").show();
		}
	},function(){
		if(!$(this).hasClass("active")){
		$(this).find(".tips").hide();
		}
	});
	
	$(window).resize(function(){
		$("#quote_list .one").each(function(){
			var offset=$(this).offset();
			var offset2=$(this).parents('dl').offset();
			$(this).find(".tuijian").css({"left":parseInt(offset2.left-offset.left+75)+"px","top":parseInt(offset2.top-offset.top+9)+"px"});
		});
	});
	
	
	var tabZindex=100;
	$(".tagBtn").click(function(){
		
		$(this).parents('ul').css({"z-index":tabZindex++});
		$(this).parents('.box').css({"z-index":tabZindex});
		$(this).parents('.box2').css({"z-index":tabZindex});
		$('.tagShow').hide();
		$('.tag p').show();
		$(this).parents('li').find('.tag').eq(0).find('p').hide();
		$(this).parents('li').find('.tagShow').slideDown(200);
	
		
		
	});
	
	$(".tagShow .close").click(function(){
		$(this).parents('.tagShow').hide();
		$(this).parents('li').find('.tag').eq(0).find('p').show();
	});
	
	/*0301修改家电详情页结束*/	
		
	$(".showrating").hover(function(){
		$(this).find(".tips").show();	
	},function(){
		$(this).find(".tips").hide();
	});
	
	$("#scrollpiclist li .img a img ").LoadImage(true,130,120);
	
	$(".more12 .more a").toggle(function(){
		$(this).removeClass().addClass("hide").text("收起");
		$(this).parents("li").find("a:gt(10)").show();
	},function(){
		$(this).removeClass().addClass("show").text("更多");
		$(this).parents("li").find("a:gt(10):not(:last)").hide();
	});
	
	
	$(".more9 .more a").toggle(function(){
		$(this).removeClass().addClass("hide").text("收起");
		$(this).parents("li").find("a:gt(7)").show();
	},function(){
		$(this).removeClass().addClass("show").text("更多");
		$(this).parents("li").find("a:gt(7):not(:last)").hide();
	});
	
	$(".select_com").mouseover(function(){
		$(this).find(".box").show();
	});
	
	$(".select_com").mouseleave(function(){
		$(this).find(".box").hide();
	});
	
	$(".a_com li").hover(function(){
		
		$(this).addClass("bg");
	},function(){
		$(this).removeClass("bg");
	});
	
	$(".a_com .more span").toggle(function(){
		$(this).removeClass().addClass("hide").text("收起");
		$(this).parents("li").addClass("active");
		$(this).parents("li").find(".change").show();
		$(this).parents("li").find(".change_before").show();
		$(this).parents("li").find(".change_shop").hide();
	},function(){
		$(this).removeClass().addClass("show").text("查看被更改前的版本");
		$(this).parents("li").removeClass("active");
		$(this).parents("li").find(".change").hide();
		$(this).parents("li").find(".change_before").hide();
		$(this).parents("li").find(".change_shop").show();
	});

	$(".a_com2 .more span").toggle(function(){
		$(this).removeClass().addClass("hide").text("收起");
		$(this).parents("li").addClass("active");
		$(this).parents("li").find(".change").show();
		$(this).parents("li").find(".change_before").show();
		$(this).parents("li").find(".change_shop").hide();
	},function(){
		$(this).removeClass().addClass("show").text("查看被更改前的版本");
		$(this).parents("li").removeClass("active");
		$(this).parents("li").find(".change").hide();
		$(this).parents("li").find(".change_before").hide();
		$(this).parents("li").find(".change_shop").show();
	});
	
	$(".morecate h3 span").click(function(){
		$(this).parents(".morecate").addClass("active");
		
	});
	$(".morecate a").click(function(event){
		$(this).parents(".morecate").removeClass("active");
		
	});
	
	var morecatetimer=null;
	$(".cate").mouseover(function(){
		clearInterval(morecatetimer);
	});

	$(".cate").mouseleave(function(){
		morecatetimer=setTimeout(function(){$(".morecate").removeClass("active");},1500);
	});
	
	$(".select_pf").mouseover(function(event){
		$(this).children(".super_select").show();
	});
	$(".select_pf").mouseleave(function(event){
		$(".super_select").fadeOut(200);
	});
	$(".select_pf2").mouseover(function(event){
		$(this).children(".super_select").show();
	});
	$(".select_pf2").mouseleave(function(event){
		$(".super_select").fadeOut(200);
	});
	
	$(".pftable tr").hover(function(){
		$(this).find("td").css({"background-color":"#fffaec"});	
	},function(){
		$(this).find("td").css({"background-color":"#fff"});	
	});
	
	$("#introduced span").toggle(function(){
	  $(".introduced").hide();
	  $(this).addClass("active");
	},function(){
		$(".introduced").show();
		$(this).removeClass("active");
	});
	
	
		
	$("a").bind("focus",function(){this.blur()}); 
	
	$(".sales_imgList img").LoadImage(true,60,60);
	$(".sm_imgList img").LoadImage(true,60,60);
	
	
	$("#searRes dl").hover(function(){
		$(this).find('dt p').addClass('active').end().find('dd').show();
	},function(){
		$(this).find('dt p').removeClass('active').end().find('dd').hide();
	});
	
	$("#searRes h3 img").click(function(){
		c = $(this).attr('class');
		if(c == '' || c == 'show') {
		$(this).removeClass().addClass("hide");
			$("#searRes .box").hide();	
								
		}else{
			$(this).removeClass().addClass("show");
			$("#searRes .box").show();	
						
		}
		
		
		
	});
				
	
	$(".saleList li .img a img").LoadImage(true,145,145);
	$("#product_img .leftImg .img img").LoadImage(true,250,250);
	$("#carousel li img").LoadImage(true,63,63);
	
	
	$("#top_list .t_more").hover(function(){
		$(this).find(".pop").show();
	},function(){
		$(this).find(".pop").hide();
	});
	
	
	
	
	$(".right_12 li").css({'width':'970px'});
	$(".right_12 ul").addClass('clearfix');
	$(".right_12 li.li1").css({'float':'none'});
	
	
	
	


	
	
	
	var brandNum=0;
	for(var i=0; i<$("#brand2 li a").length; i++)
	{
		if($("#brand2 li a").eq(i).hasClass('active'))
		{
			brandNum++;
		}
	}
	$("#brand2 li a").click(function()
	{
		if($(this).hasClass('active'))
		{
			brandNum--;
			$(this).removeClass('active');
		}
		else
		{
			if(brandNum>4)
			{
				if(!$("#brand4c").is(':visible'))
				{
					$("#brand4c").text('最多可选5个品牌').fadeIn().delay(1000).fadeOut();
				}
			}
			else
			{
				brandNum++;
				$(this).addClass('active');
			}
		}
	});
	
	
	
	


	
	$("#showfenlei a").toggle(function(){
		$(this).removeClass().addClass('hide').text('收起');
		$("#fenlei li").show();
	},function(){
		$(this).removeClass().addClass('show').text('更多');
		$("#fenlei li:gt(9)").hide();
	});
	
	
});

function newGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid;    
}

function guidSetCookie(name, value, iDay)
{
	//'名字=值;expires=时间'
	var oDate=new Date();
	
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';domain=.yiqisoo.com;expires='+oDate;
}

function guidGetCookie(name)
{
	var arr=document.cookie.split('; ');
	var i=0;
	
	for(i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');
		
		if(arr2[0]==name)
		{
			return arr2[1];
		}
	}
	
	return '';
}

function guidRemoveCookie(name)
{
	guidSetCookie(name, 1, -1);
}
if(guidGetCookie('guid')==''){
	guidSetCookie('guid', newGuid(),9999 );	
}



