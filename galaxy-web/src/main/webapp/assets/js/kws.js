
var oInputField;var oPopDiv;var oColorsUl;var xmlHttp;var oSelect='fangdudu';var oNeedle=1;var overTarget=null;var keyCode=null;var fieldValue='';var type='';var isie=document.all?true:false;function createXMLHttpRequest(){if(window.ActiveXObject)
xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");else if(window.XMLHttpRequest)
xmlHttp=new XMLHttpRequest();}
function initVars(i){oInputField=document.getElementById("keyword"+i);oPopDiv=document.getElementById("search_suggest"+i);oColorsUl=document.getElementById("suggest_list"+i);}
function clearColors(){if(oColorsUl){for(var i=oColorsUl.childNodes.length-1;i>=0;i--)
oColorsUl.removeChild(oColorsUl.childNodes[i]);oPopDiv.className="hide";}
if($(".new_hint").length){$(".new_hint").hide();}}
function moveTarget(event)
{event=event?event:window.event;keyCode=event.keyCode;
if(keyCode==40&&overTarget){overTarget.className="mouseOut";if(overTarget.nextSibling)
{overTarget=overTarget.nextSibling;overTarget.className="mouseOver";if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
				oInputField.value = n_v;}
else
{overTarget=null;oInputField.value=oSelect;}}
else if(keyCode==40&&!overTarget)
{overTarget=oColorsUl.firstChild;overTarget.className="mouseOver";if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
				oInputField.value = n_v;}
else if(keyCode==38&&!overTarget)
{overTarget=oColorsUl.lastChild;overTarget.className="mouseOver";if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
				oInputField.value = n_v;}
else if(keyCode==38&&overTarget)
{overTarget.className="mouseOut";if(overTarget.previousSibling)
{overTarget=overTarget.previousSibling;overTarget.className="mouseOver";if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
				oInputField.value = n_v;}
else
{overTarget=null;oInputField.value=oSelect;}}
else if(keyCode==13&&overTarget)
{if(isie) {
					var n_v = overTarget.innerText;
				}else{
					var n_v = overTarget.textContent;
				}
oSelect=n_v;clearColors();}
else if(keyCode==13&&oInputField.value!='')
{}}
function setColors(the_colors){clearColors();var is_header=document.getElementById('is_header');if(typeof(is_header)!='undefined'&&is_header!=null&&is_header.value)
{oPopDiv.className="showInHeader";if(typeof(oInputField.headerOffset)!='undefined'&&!oInputField.headerOffset)
{left=parseInt(oPopDiv.offsetLeft)+84;oPopDiv.style.left=left+"px";oInputField.headerOffset=true;}}
else
oPopDiv.className="show";var oLi;for(var i=0;i<the_colors.length;i++){oLi=document.createElement("li");oColorsUl.appendChild(oLi);oLi.innerHTML=the_colors[i];
var li = document.getElementById('suggest_list1').childNodes;
document.onmousemove = function() {

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
oLi.onclick=function(){if(isie) {
					var n_v = this.innerText;
				}else{
					var n_v = this.textContent;
				}
overTarget=null;oSelect=n_v;oInputField.value=n_v;

if(typeof(islife) != 'undefined') {
	oCurClassifyLink="http://"+window.location.host+"/index.php?action=life";
	oCurClassifyLink += '&type=life';
	window.location.href=oCurClassifyLink+'&keyword='+oSelect;
}
				clearColors();}}}
function findColors(){
	if(keyCode==null)return;if(keyCode==38||keyCode==40)return;initVars(oNeedle);if(oSelect==oInputField.value)return;else oSelect=oInputField.value;if(oInputField.value.length>0){createXMLHttpRequest();var sUrl="http://"+window.location.host+"/index.php?action=ajax|Keyword&timestamp="+new Date().getTime();var searchtype=document.getElementById("type")?$("#type").val():type;var content="key="+encodeURIComponent(oInputField.value)+"&type="+searchtype+"&city="+cityname;xmlHttp.open("POST",sUrl,true);xmlHttp.setRequestHeader("Content-Length",content.length);xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");xmlHttp.send(content);xmlHttp.onreadystatechange=function(){if(xmlHttp.readyState==4&&xmlHttp.status==200){var aResult=new Array();if(xmlHttp.responseText.length){aResult=xmlHttp.responseText.split(",");
//	keyword = xmlHttp.responseText;
//					keyword = JSON.parse(keyword);
//					alert(keyword['total']);
//					aResult = keyword['keyword'].split(",");
	setColors(aResult);}
else
clearColors();}}}
else
clearColors();}
function switch_tab(num){$(".super_select").css('display','none');if(num==15)
{window.location.href="http://"+$("#baseurl").text()+'/index.php?action=search&type=jiaju';return;}
var name="indextab";var expire=1000*60;SetCookie(name,num,expire);if(num==4)
type='show';else if(num==5)
type='jiaju';else
type=''
for(i=1;i<6;i++)
{var menu=document.getElementById("tab"+i);var con=document.getElementById("con"+i);if(typeof(menu)!='undefined')
menu.className=i==num?"current":"";if(typeof(con)!='undefined'&&con!=null)
con.style.display=i==num?"block":"none";}
oNeedle=num;if(oSelect)oSelect='';key=document.getElementById('keyword'+num);oInputField=key;key.value='';if(typeof(oInputField.headerOffset)=='undefined'||!oInputField.headerOffset)
oInputField.headerOffset=false;key.onkeydown=moveTarget;if(navigator.userAgent.indexOf("MSIE")>0)
{key.onpropertychange=findColors;}
else
{key.addEventListener("input",findColors,false);}}
function SetCookie(name,value,expire){var exp=new Date();exp.setTime(exp.getTime()+expire);document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();}
function getCookie(name){var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));if(arr!=null)return unescape(arr[2]);return null;}
function delCookie(name){var exp=new Date();exp.setTime(exp.getTime()-1);var cval=getCookie(name);if(cval!=null)document.cookie=name+"="+cval+";expires="+exp.toGMTString();}
$(function(){for(i=1;i<6;i++)
{if(document.getElementById('con'+i))
if(document.getElementById('con'+i).style.display=='block')
oNeedle=i;}
key=document.getElementById('keyword'+oNeedle);oInputField=key;oInputField.headerOffset=false;s_w=key.style.width;$("#search_suggest"+oNeedle).css('width',s_w);$("body").click(clearColors);key.onkeydown=moveTarget;if(navigator.userAgent.indexOf("MSIE")>0)
{key.onpropertychange=findColors;}
else
{key.addEventListener("input",findColors,false);}})