Dialog = {
	init:function() {
		var style = '<style> body,div,ul,li,form,fieldset,legend,input,button,textarea,p{margin:0;padding:0;} button,input{font:100% arial,sans-serif,\5b8b\4f53;} ul,ol{list-style-type:none;} img,fieldset{border:0;} .g-login{z-index:100000000;position:absolute;left:50%;width:580px;margin-left:-290px;} .g-logint{ height:8px; background:url(http://p1.qhimg.com/t01a740cd7c5f69117a.png) no-repeat 0 0;  _background-image:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src="http://p1.qhimg.com/t01a740cd7c5f69117a.png ");font-size:0;} .g-loginb{height:8px;background:url(http://p1.qhimg.com/t012aea12ea556b4acf.png) no-repeat 0 0; _background-image:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src="http://p1.qhimg.com/t012aea12ea556b4acf.png ");font-size:0;} .g-loginc{height:100%; margin:0 auto; background:url(http://p1.qhimg.com/t01650ab2a204e60508.png) repeat-y 0 0;_background-image:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src="http://p1.qhimg.com/t01650ab2a204e60508.png"); } .g-loginbox{width:564px; margin:0 auto;} .login-hd{ height:34px; line-height:34px; padding:0 10px; background-color:#b00; border-bottom:1px solid #fff; font-size:14px; font-weight:bold; color:#fff;position:relative;} .login-bd{position:relative; overflow:hidden; *zoom:1;padding:35px 0 30px 0; background-color:#f5f5f5;} .login-box{float:left;width:305px; padding-left:30px; border-right:1px solid #dfdfdf;} .login-share{float:left;width:195px; padding-left:30px;border-left:1px solid #fff;} .login-box label{display:inline-block;width:50px;} .login-input1{width:215px; height:18px; padding:3px 0; border:1px solid #c8c8c8;box-shadow:2px 2px 2px #ebebeb inset;} .login-but{display:inline-block;width:85px; height:30px;line-height:30px;text-align:center; border:none; background:url(http://p2.qhimg.com/t01e3dbc4ce6ab4b2ac.png) no-repeat 0 0 ; color:#b00; font-size:14px; font-weight:bold; cursor:pointer;} label.login-remember{ margin-left:10px; vertical-align:top; width:100px;} .login-lost{margin-left:10px; color:#2e74d3;text-decoration:none;} .login-box legend{display:none;} .login-share p{ margin-bottom:15px;} .login-mar a{ display:inline-block; overflow:hidden; width:81px; height:22px; margin-right:10px;} .login-sina{margin-top:-63px;} .login-ren{margin-top:-86px;} .login-error{ position:absolute;display:none; left:90px; top:50px; height:18px; line-height:18px; padding-left:20px;background:url(http://p2.qhimg.com/t010d91e2a51682eaa4.png) no-repeat 0 -31px; color:#f00;}.login-close{ position:absolute; right:12px; top:12px; display:inline-block; width:10px; height:10px; cursor:pointer; background:url(http://p2.qhimg.com/t01e3dbc4ce6ab4b2ac.png) no-repeat 0 -51px; font-size:0;} .loginmar-b10{margin-bottom:10px;} .loginmar-b15{ margin-bottom:15px;} .loginmar-b30{ margin-bottom:30px;} .loginmar-l50{ margin-left:50px;} .loginmark{display:none;width:100%;z-index:99999;background:#000;position:absolute;top:0;left:0;opacity:0.6;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);filter:alpha(opacity=60);zoom:1}</style>';
        var destUrl = encodeURIComponent(location.href);
        var html = 	'<div class="loginmark" id="dialog-mark" style="display:none;"></div>'										+
    		   		'<div class="g-login" id="dialog-div" style="display:none;">'												+
    		   			'<div class="g-logint"></div>'																			+
    		   			'<div class="g-loginc">'																				+
    		   				'<div class="g-loginbox">'																			+
    		   					'<div class="login-hd">'																		+
    		   						'<span id="dialog-title"></span><span class="login-close" id="close-dialog"></span>'		+
    		   					'</div>'																						+
    		   					'<div class="login-bd" id="dialog-body">'														+
    		   					'</div>'																						+ 
    		   					'<div class="login-error" id="error-msg"></div>'												+
    		   				'</div>'																							+ 
    		   			'</div>'																								+ 
    		   			'<div class="g-loginb"></div>'																			+ 
    		   		'</div>';
        $('head').append(style);
        $('body').append(html);
        // bind event
        $('#close-dialog').click(function(){ 
            $('#dialog-mark,#dialog-div').hide(); 
            $('#error-msg').hide();
        });
	},
	show:function(title, errorMsg, div) {
		$('#dialog-title').html(title);
		$('#dialog-body').html($('#' + div).html());
        var h = $(document).height() > $(window).height() ? $(document).height() : $(window).height();
        $('#dialog-mark').css({'height':h}).show(); 
        $('#dialog-div').css('top',$(window).scrollTop()+($(window).height()-264)/2).show();
        //$('#' + div).show();
        if(errorMsg != null && errorMsg != '') {
			$('#error-msg').html(errorMsg);
			$('#error-msg').show();
		}
	}
}

$().ready(function() {
	Dialog.init();
});