var oInputField;	//输入框
var oPopDiv;		//显示的DIV
var oColorsUl;    //DIV里面的Ul
var xmlHttp;       //xmlHttp对象
var oSelect='fangdudu';     //输入框的值暂存
var oNeedle=1;   //当前的输入框needle
var overTarget=null;//鼠标或上下箭头选中的
var keyCode=null;//按键的编码
//var isIe=(navigator.userAgent.indexOf("MSIE")>0)?1:0; //是否是IE浏览器
var fieldValue='';//123
var type='';
var type2=null;
var oBtn;
var oldSelect='';
var oldSelect2='';
var isie=document.all?true:false;

function createXMLHttpRequest(){
	if(window.ActiveXObject)
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	else if(window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
}

function initVars(i){
	oInputField = document.getElementById("keyword"+i);
	oPopDiv = document.getElementById("search_suggest"+i);
	oColorsUl = document.getElementById("suggest_list"+i);
	
}

//清除除第一第二个以外的li
function clearColors(){
	if(oColorsUl)
	{
		for(var i=3; i<oColorsUl.childNodes.length; i++)
		{
			oColorsUl.removeChild(oColorsUl.childNodes[i]);
		}
	}
}


function clearColors3(){
	if(oColorsUl){
		for(var i=oColorsUl.childNodes.length-1;i>=0;i--)
		oColorsUl.removeChild(oColorsUl.childNodes[i]);
		oPopDiv.className = "hide";
	}
}

//body点击的时候，都清除了。
function clearColors2(){
	if(oColorsUl){
		for(var i=oColorsUl.childNodes.length-1;i>=0;i--)
		oColorsUl.removeChild(oColorsUl.childNodes[i]);
		oPopDiv.className = "hide";
	}
	oInputField.value='请输入您要搜索的商品关键词';
	oInputField.className='text';
	oInputField.style.color="#a4a4a4";
	oPopDiv.className = "hide";
	
}

function addLi()
{
		var d_url=document.location.href;	
		//alert(d_url);
		var patt = new RegExp('utm_campaign');
		var strs='';
		if(patt.test(d_url))
		{
			var pattern = /utm_campaign=[^&]*/;
			strs = d_url.match(pattern);
		}
		var oAllClassify= document.createElement("li");
		if(strs)
		{
			oAllClassify.innerHTML='<a href="http://www.yiqisoo.com/index.php?action=life&type=life&anl=lb_search&'+strs+'&keyword='+oInputField.value+'"><span>'+oldSelect2+'</span>在<i class="red">全部</i>分类中查找</a>';
		}else
		{
			oAllClassify.innerHTML='<a href="http://www.yiqisoo.com/index.php?action=life&type=life&anl=lb_search&keyword='+oInputField.value+'"><span>'+oldSelect2+'</span>在<i class="red">全部</i>分类中查找</a>';
		}
		
		oAllClassify.id='allClassify';
		var oCur=document.createElement("li");
		if(strs)
		{
			var linkurl=oCurClassifyLink+'&anl=lb_search&'+strs+'&keyword='+oInputField.value;
		}else
		{
			var linkurl=oCurClassifyLink+'&anl=lb_search&keyword='+oInputField.value;
		}
		oCur.innerHTML='<a href="'+linkurl+'"><span>'+oldSelect2+'</span>在<i class="red">'+oCurClassify+'</i>分类中查找</a>';
		oCur.id='curClassify';
		li = document.getElementById('suggest_list1').childNodes;
		oAllClassify.onmouseover = oCur.onmouseover = function()
		{
			
					li_=li
					for(i in li) {
						li[i].onmouseover=function() {
							overTarget=this;
							for(j in li_){
								li_[j].className = "mouseOut";
							}
							this.className="mouseOver";	
						}
						li[i].onmouseout=function() {
							overTarget=this;
							for(j in li_){
								li_[j].className = "mouseOut";
							}
							this.className = "mouseOut";
						}
					}
			overTarget=this;
			for(i=0;i<oColorsUl.childNodes.length;i++){
				oColorsUl.childNodes[i].className = "mouseOut";
			}
	
			this.className='mouseOver';
			oInputField.value=oAllClassify.getElementsByTagName('span')[0].innerHTML;
			oSelect=oInputField.value;
		}
		oAllClassify.onmouseout = oCur.onmouseout = function()
		{
			this.className='mouseOut';
			
		}
	
		oAllClassify.onclick = oCur.onclick = function()
		{
			set_keyword_log(oInputField.value);
			window.location.href=this.href+'&keyword='+oInputField.value;
		}
		
		
		oColorsUl.appendChild(oCur);
		oColorsUl.appendChild(oAllClassify);
	
}

function moveTarget(event)
{
	event = event?event:window.event;
	keyCode =event.keyCode;
	
	oldSelect=oInputField.value;
	
	
	if(keyCode ==40 && overTarget){
		overTarget.className = "mouseOut";
			
		if(overTarget.nextSibling){
			overTarget = overTarget.nextSibling;
			for(i=0;i<oColorsUl.childNodes.length;i++){
				oColorsUl.childNodes[i].className = "mouseOut";
			}
			overTarget.className = "mouseOver";

			//当前对象的SPAN个数为0表示不时搜索框中1，2中元素
			if(overTarget.getElementsByTagName('a').length==0){
				if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
				oInputField.value = n_v;
			}else{
				oInputField.value = oSelect;
			
			}
				
		}else{
			overTarget = null;
			
			oInputField.value = oSelect;
			
		}
	}
	else if(keyCode ==40 && !overTarget)
	{		
		overTarget = oColorsUl.firstChild;
		overTarget.className = "mouseOver";	
		if(oCurClassifyLink == '')
		{
		
			if(isie) {
				var n_v = overTarget.innerText;
			}else{
				var n_v = overTarget.textContent;
			}
			
			oInputField.value = n_v;
		}
	}
	else if(keyCode ==38 && !overTarget)
	{
		overTarget = oColorsUl.lastChild;
		overTarget.className = "mouseOver";
		if(isie) {
			var n_v = overTarget.innerText;
		}else{
			var n_v = overTarget.textContent;
		}
		oInputField.value = n_v;
	}
	else if(keyCode ==38 && overTarget)
	{
		overTarget.className = "mouseOut";
		if(overTarget.previousSibling)
		{
			for(i=0;i<oColorsUl.childNodes.length;i++){
				oColorsUl.childNodes[i].className = "mouseOut";
			}
			overTarget = overTarget.previousSibling;
			overTarget.className = "mouseOver";
			//当前对象的SPAN个数为0表示不时搜索框中1，2中元素
			if(overTarget.getElementsByTagName('a').length==0){
				if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
				oInputField.value = n_v;
			}else{
				oInputField.value = oSelect;
			}
			
		}else{
			overTarget = null;
			oInputField.value = oSelect;
		}
	}else if(keyCode ==13 && overTarget){
		
		if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
		oSelect =n_v;
		if(overTarget.getElementsByTagName('a').length==1){
			type2=2;
			//alert(overTarget.getElementsByTagName('a')[0].href);
			set_keyword_log(oInputField.value);
			oCurClassifyLink="http://www.yiqisoo.com/index.php?action=life&type=life"
				window.location.href=oCurClassifyLink+'&keyword='+oInputField.value;
			//
		}

		clearColors3();

		
		
	}else if(keyCode == 13 && oInputField.value!=''){
	}
	
	
	
}


function setColors(the_colors){
	clearColors3();	
	var is_header=document.getElementById('is_header');//搜索头调整css
	
	if(oCurClassifyLink != '' && oInputField.value!='请输入您要搜索的商品关键词')
	{
		addLi();	
	}
	
	
	
	if(typeof(is_header)!='undefined' && is_header!=null && is_header.value)
		{
			oPopDiv.className="showInHeader";
			if( typeof(oInputField.headerOffset)!='undefined' && !oInputField.headerOffset)
			{
				left=parseInt(oPopDiv.offsetLeft)+84;
				oPopDiv.style.left=left+"px";
				oInputField.headerOffset=true;
			}
			
		}
	else
		oPopDiv.className = "show";
		
		var oLi;
		if(the_colors.length==0)
		return ;
		for(var i=0;i<the_colors.length;i++)
		{
			oLi = document.createElement("li");
			oColorsUl.appendChild(oLi);
			//oLi.appendChild(document.createTextNode(the_colors[i]));
			oLi.innerHTML=the_colors[i];
			
			document.onmousemove = function() {
					li = document.getElementById('suggest_list1').childNodes;
					li_=li;
					if(li.length>0) {
						for(z=0;z<li.length;z++) {

							li[z].onmouseover=function() {
								overTarget=this;
								for(x=0;x<li_.length;x++){
									li_[x].className = "mouseOut";
								}
								this.className="mouseOver";	
							}
							li[z].onmouseout=function() {
								overTarget=this;
								for(x=0;x<li_.length;x++){
									li_[x].className = "mouseOut";
								}
								this.className = "mouseOut";
							}
						}
					}
					

			}
			
			
			oLi.onclick = function(){
				if(isie) {
					var n_v = this.innerText;
				}else{
					var n_v = this.textContent;
				}
				overTarget = null;
				oSelect =n_v;
				
				
				//oInputField.focus();
				oInputField.value = n_v;
				//alert(oCurClassifyLink+'&keyword='+oSelect);
				//if(oCurClassifyLink=='')
				oCurClassifyLink="http://www.yiqisoo.com/index.php?action=life&type=life&anl=shy_search"
				window.location.href=oCurClassifyLink+'&keyword='+oSelect;
				set_keyword_log(oSelect);
				clearColors3();
			}
		}
}

function findColors(){
	if(keyCode == null) return;
	if(keyCode == 38||keyCode == 40) return;
	initVars(oNeedle);
	if(oSelect == oInputField.value) return;
	else oSelect =oInputField.value;
	if(oInputField.value.length > 0){
		oBtn=document.getElementById(oEmptyBtn);
		oBtn.style.display='block';
			var aVal=document.getElementById("search_suggest1").getElementsByTagName('span');
			oldSelect2=oInputField.value;
			
			for(var i=0; i<aVal.length;i++)
			{
				aVal[i].innerHTML=oldSelect2;
			}
		
		createXMLHttpRequest();		
		var sUrl = "http://"+window.location.host+"/index.php?action=ajax|Keyword&timestamp=" + new Date().getTime();
		var searchtype = document.getElementById("type")?$("#type").val():type;
		var content = "key="+encodeURIComponent(oInputField.value)+"&type="+searchtype;//alert(content);
		xmlHttp.open("POST",sUrl,true);
		xmlHttp.setRequestHeader("Content-Length", content.length);
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xmlHttp.send(content);
		xmlHttp.onreadystatechange = function(){
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
			{
				var aResult = new Array();
				if(xmlHttp.responseText.length){
//					keyword = xmlHttp.responseText;
//					keyword = JSON.parse(keyword);
//					aResult = keyword['keyword'].split(",");
					aResult = xmlHttp.responseText.split(",");
					setColors(aResult);	
				}
				else if(oInputField.value!='请输入您要搜索的商品关键词')
				{
					
					//alert(aResult.length);
					setColors(aResult);	
					//clearColors();
				}
			}
		}
	}		
	else
	{
		oBtn=document.getElementById(oEmptyBtn);
		oBtn.style.display='none';
		clearColors3();	
	}
}


//TAB页签2
function switch_tab(num){
	$(".super_select").css('display','none');
	if(num==15)
	{
		window.location.href="http://"+$("#baseurl").text()+'/index.php?action=search&type=jiaju';
		return;
	}
	var name="indextab";
	var expire = 1000*60;
	SetCookie(name,num,expire);
	
	if(num==4)
		type='show';
	else if(num==5)
		type='jiaju';
	else
		type=''

	for(i=1;i<6;i++)
	{
		var menu=document.getElementById("tab"+i);
		var con=document.getElementById("con"+i);
		if(typeof(menu)!='undefined') 
			menu.className=i==num?"current":"";
		if(typeof(con)!='undefined' && con!=null)
			con.style.display=i==num?"block":"none";
	}
	oNeedle=num;
	if(oSelect)oSelect='';
	key=document.getElementById('keyword'+num);
	oInputField=key;
	key.value='';
	//key.focus();
	if(typeof(oInputField.headerOffset)=='undefined' || !oInputField.headerOffset)
		oInputField.headerOffset=false;
	key.onkeydown=moveTarget;
	//s_w=key.style.width;
	//$("#search_suggest"+num).css('width',s_w);
	if(navigator.userAgent.indexOf("MSIE")>0)
	{ 
		key.onpropertychange=findColors;
	}
	else
	{
		key.addEventListener("input",findColors,false); 
	}
}

function SetCookie(name,value,expire) {
var exp  = new Date();
exp.setTime(exp.getTime() + expire);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
if(arr != null) return unescape(arr[2]); return null;
}

function delCookie(name){
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


$(function(){
for(i=1;i<6;i++)
{
	if(document.getElementById('con'+i))
		if(document.getElementById('con'+i).style.display=='block')
			oNeedle=i;
}
key=document.getElementById('keyword'+oNeedle);
oInputField=key;
//if($(".link").length<1)key.focus(); 
oInputField.headerOffset=false;
s_w=key.style.width;
$("#search_suggest"+oNeedle).css('width',s_w);
$("body").click(function()
{
	clearColors3();
	if(oInputField.value=='请输入您要搜索的商品关键词')
	{
		oBtn=document.getElementById(oEmptyBtn);
		oBtn.style.display='none';
	}
});
key.onkeydown=moveTarget;
//key.onkeyup=function(ev)
//{
//	var oEvent=ev||event;
//	
//	if(oEvent.keyCode!=38&&oEvent.keyCode!=40)
//	{
//		var aVal=document.getElementById("search_suggest1").getElementsByTagName('span');
//		oldSelect2=oInputField.value;
//		
//		for(var i=0; i<aVal.length;i++)
//		{
//			aVal[i].innerHTML=oldSelect2;
//		}
//	}
//}
if(navigator.userAgent.indexOf("MSIE")>0)
{ 
	key.onpropertychange=findColors;
}
else
{
	key.addEventListener("input",findColors,false); 
}

}
)


function set_keyword_log(key){
	if(key == '') {
		return false;
	}
	key = encodeURI(key);
	$.ajax({
			type : "post",
			url  : "http://"+window.location.host+"/api/write_keyword_log.php",
			data : "key="+key,
			contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			success:function(msg){
					}
		  	  });	
}