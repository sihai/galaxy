    	$(function(){
			var timerhide=null;
			var oCityList=$("#cityList ul");
			$(".address").hover(function(){
				clearTimeout(timerhide);
				$(".addressShow").show();
				oCityList.find('.i').each(function(i)
				{
					
					if($(this).hasClass('active'))
					{
						$(this).removeClass('gray');
						var h=$(this).next('p').outerHeight();
						$(this).parents('ul:not(.sorting_btns)').css({"height":h+23+"px"});
					}
					
					
				});
			},function(){
				timerhide = setTimeout(function(){
					oneShow();
				},1000);
				
			});
			
			$(".address").click(function(event){
				event.stopPropagation();       
			});
			
			var iNow=0;
			
			
			oCityList.each(function(i){
				var oLi=$("#cityList ul").eq(i).find('li');
				oLi.find('.i').click(function(event){
					
					if(!$(this).hasClass('active'))
					{
						
						oCityList.find('p').hide();
						oCityList.css({"height":"23px"});
						oCityList.find(".i").removeClass('active').addClass('gray');
						$(this).removeClass('gray').addClass('active');
						oLi.parent('ul').css({"height":$(this).next('p').outerHeight()+23+"px"});
						$(this).next('p').slideDown(100);
					}
					
				});
				
				
			});
			
			
			var iNow2=0;
			var have=false;
			
			oCityList.find(".i").each(function(i){
				if(oCityList.find('.i').eq(i).hasClass('active'))
				{
					have=true;
					iNow2=oCityList.find(".i").index($(this));
				}
			});
			
			function oneShow()
			{
				$(".addressShow").hide();
				oCityList.find(".i").removeClass('active gray');
				oCityList.find("p").hide();
				oCityList.css({"height":"23px"});
				
				if(have)
				{
					oCityList.find(".i").eq(iNow2).trigger('click');
				}
			}




			
			$(document).click(function(event){
				oneShow();
			});
			
			//滚动条
			var oIe6True=${JQUERY}browser.msie && (${JQUERY}browser.version == "6.0") && !${JQUERY}support.style;
			var iBoxLength=$("#quote_list .box").length;
			var iBox2Length=$("#quote_list .box2").length;
			
			var oLastBox=$("#quote_list .box").last();
			var oLastBox2=$("#quote_list .box2").last();
			
			var oQuoteList=$("#quote_list");
			
			var iZindex=9999;
			if(iBoxLength+iBox2Length>4)
			{
				var oScreening=$("#screening");
				var oOffset=oScreening.offset();
				
				var iWindowScroll=0;
				
				var oldTop=parseInt(oOffset.top);
				
				
				
				$(window).bind('scroll',moveBar);
				$(window).bind('resize',moveBar);
				
				$("#recovery").click(function()
				{
					if (oIe6True)
					{
						oScreening.css({"position":"relative","left":"0px","z-index":iZindex}).animate({"top":"0px"},1);
					}
					else
					{
						oScreening.css({"position":"relative","left":"0px","top":"0px","z-index":iZindex});
					}
					$(this).hide();
					$(window).unbind('scroll');
					$(window).unbind('resize');
				});
				
			}
			
			function moveBar(){
					var oMain=$("#main").offset();
					var oldLeft=parseInt(oMain.left);
					iWindowScroll=parseInt($(window).scrollTop());
					
					var iBoxOffset=0;
					
					
					
					
					if(iBox2Length)
					{
						iBoxOffset=oLastBox2.offset().top;
					}
					else
					{
						iBoxOffset=oLastBox.offset().top;
					}
					
					
					if(iWindowScroll>oldTop)
					{
						
						if(iWindowScroll>iBoxOffset)
						{
							oQuoteList.css({"margin-top":"0px"});
							oScreening.hide().css({"position":"relative","left":"0px","top":"0px","z-index":iZindex}).show();
							$("#recovery").hide();
						}
						else
						{
							if (oIe6True)
							{
								oScreening.css({"position":"absolute","left":oMain.left+"px","top":iWindowScroll+"px","z-index":iZindex});
							}
							else
							{
								oScreening.css({"position":"fixed","left":oMain.left+"px","top":"0px","z-index":iZindex});
							}
							oQuoteList.css({"margin-top":"35px"});
							$("#recovery").show();
						}
						
						
					}
					else
					{
						oQuoteList.css({"margin-top":"0px"});
						oScreening.hide().css({"position":"relative","left":"0px","top":"0px","z-index":iZindex}).show();
						$("#recovery").hide();
					}
					
				
					
					
					
				}				

		});
