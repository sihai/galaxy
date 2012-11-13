document.domain = '360.cn';
window.feedbackBiz = {
    option:{
        objectNameId:3,
        callback:0,
        inputname:'feedbackitem',
        position:'lc',
        image:'',
        hdimage:''
    },
    iframeId : 'feedbackIframe' ,
    feeddesc: {
        name:'',
        title:'',
        inputLen:'',
        inputtype:'',
        itemsid:'',
        itemsdesc:''
    },
    assemblyLink : function(){
        var data = this.data;
        var feeddesc = this.feeddesc;
        var cssstr = '.feed-back-entrance{overflow:hidden;position:fixed;left:0;top:50%;z-index:99;width:30px; padding-bottom:38px;margin-top:-98px;_top:expression(eval(document.documentElement.scrollTop)+document.documentElement.clientHeight/2-this.offsetHeight/2);}\
        .feed-back-entrance a,\
        .feed-back-entrance a span,\
        .feed-back-entrance a em{display:block; background:url('+this.option.image+') no-repeat}\
        .feed-back-entrance a{width:30px; padding-bottom:10px;color:#fff;background-position:-60px bottom;}\
        .feed-back-entrance a span{width:30px;height:0;font-size:0;padding-top:34px;background-position:0 0;}\
        .feed-back-entrance a em{line-height:18px;padding:0 5px 10px;background-position:-30px 0; background-repeat:repeat-y; color:#fff;}\
        .feed-back-entrance a:hover{background-position:-150px bottom;text-decoration:none;}\
        .feed-back-entrance a:hover span{background-position:-90px 0;}\
        .feed-back-entrance a:hover em{background-position:-120px 0;}\
        .feed-back-state{position:fixed;top:50%;left:50%;_top:expression(eval(document.documentElement.scrollTop)+document.documentElement.clientHeight/2-this.offsetHeight/2);}\
        .feed-back textarea{width:340px;}\
        .feed-back{width:400px;margin-left:-200px;position:fixed;top:50%;left:50%;_top:expression(eval(document.documentElement.scrollTop)+document.documentElement.clientHeight/2-this.offsetHeight/2);}';
        var cssstr2 = '.feed-back-entrance{overflow:hidden;position:fixed;right:5px;bottom:2px;z-index:99;width:29px;_top:expression(eval(document.documentElement.scrollTop)+document.documentElement.clientHeight-this.offsetHeight);}\
        .feed-back-entrance a{display:block;width:29px; height:27px;color:#fff;background:url('+this.option.image+') no-repeat 0 0; text-indent:-9999px;}\
        .feed-back-entrance a:hover{text-decoration:none;background-position:0 -29px;}\
        .feed-back-state{position:fixed;bottom:3px;right:3px;_top:expression(eval(document.documentElement.scrollTop)+document.documentElement.clientHeight-this.offsetHeight+62);}\
        .feed-back textarea{width:300px;}\
        .feed-back{width:360px;margin-left:-180px;position:fixed;bottom:3px;right:3px;_top:expression(eval(document.documentElement.scrollTop)+document.documentElement.clientHeight-this.offsetHeight+130);}';
        if(this.option.position == 'rb')
        {
            cssstr = cssstr2;
        }
        var css = '<style>\
        .feed-back .hd,\
        .feed-back .close,\
        .feed-back .btn,\
        .feed-back .btn-focus,\
        .feed-back-state .btn,\
        .feed-back-state .btn-focus {background:url(http://p4.qhimg.com/t01ac47bdce0ddb22b9.png) no-repeat;}'
        + cssstr +
        '* html,* html body{background-image:url(about:blank);background-attachment:fixed}\
        .feed-back-entrance,.feed-back,.feed-back-state{_position:absolute;_margin-top:0;}\
        .feed-back{display:none;z-index:100;margin-top:-130px;background-color:#fff;-moz-box-shadow:3px 3px rgba(221,221,221,.75);-webkit-box-shadow:3px 3px rgba(221,221,221,.75);-o-box-shadow:3px 3px rgba(221,221,221,.75);box-shadow:3px 3px rgba(221,221,221,.75);}\
        .feed-back .hd,\
        .feed-back .close{background:url('+this.option.hdimage+') no-repeat;}\
        .feed-back .hd{position:relative;height:34px;background-color:#e9e6e4;background-position:0 0;background-repeat:repeat-x;zoom:1;}\
        .feed-back .close{position:absolute;top:7px;right:9px;width:20px;height:20px;background-position:0 -36px;cursor:pointer;}\
        .feed-back .hd h2{color:#fff;font:bold 14px/34px "airal","simsun";text-indent:14px;}\
        .feed-back .box{border:1px solid #ccc;}\
        .feed-back .bd{padding:20px 26px 0;}\
        .feed-back .item{margin-right:34px;}\
        .feed-back label{margin-left:9px;color:#000;font-size:14px;}\
        .feed-back input{vertical-align:middle;}\
        .feed-back textarea{height:76px;overflow:auto;margin-top:10px;padding:2px;border:1px solid #666;border-color:#abadb3 #e3e9ef #e3e9ef #e3e9ef;color:#ccc;}\
        .feed-back .focus{color:#000;}\
        .feed-back .ft{padding:3px 26px 20px;}\
        .feed-back .num{float:left;}\
        .feed-back .num strong{color:#ff0000;font-weight:normal;}\
        .feed-back .btn{float:right;width:97px;height:28px;line-height:28px;border:none 0;color:#993400;font-size:14px;font-weight:bold;text-shadow:1px 1px #ffbe1b;cursor:pointer;}\
        .feed-back .btn-focus{background-position:0px -28px;}\
        .feed-back-error{ height:18px;line-height:18px;margin-top:2px;color:#f00;}\
        .feed-back-state{display:none;z-index:100;margin-left:-168px; margin-top:-62px;width:278px;padding:28px;border:1px solid #ccc;border:1px solid #ccc;-moz-border-radius:1px;-webkit-border-radius:1px;border-radius:1px;background-color:#fff;-moz-box-shadow:3px 3px rgba(221,221,221,.75);-webkit-box-shadow:3px 3px rgba(221,221,221,.75);-o-box-shadow:3px 3px rgba(221,221,221,.75);box-shadow:3px 3px rgba(221,221,221,.75);text-align:center;}\
        .feed-back-state p{margin-bottom:10px;font-size:14px;line-height:30px;}\
        .feed-back-state .btn{width:97px;height:27px;border:none 0;color:#993400;font-size:14px;font-weight:bold;line-height:27px;text-shadow:1px 1px #ffbe1b;cursor:pointer;}\
        .feed-back-state .btn-focus{background-position:0px -28px;}\
        </style>';
        $('head').append(css);
        feeddesc.name = data.name;
        var html ='<div class="feed-back-entrance" id="fb_link"><a target="_blank" href="#"><span></span><em>'+feeddesc.name+'</em></a></div>';
        $('body').append(html);
    },
    assemblyHtml : function() {
        var data = this.data;
        var feeddesc = this.feeddesc;
        var option = this.option;
        var str='';
        feeddesc.title = data.title;
        feeddesc.inputLen = data.data.items.length;
        feeddesc.inputtype = data.data.inputtype;
        for(var i=0; i<feeddesc.inputLen; i++)
        {
            feeddesc.itemsid = data.data.items[i].id;
            feeddesc.itemsdesc = data.data.items[i].desc;
            str += '<span class="item"><input type="'+feeddesc.inputtype+'" name="'+option.inputname+'" value="'+feeddesc.itemsid+'" id="feedback_'+i+'">';
            str += '<label for="feedback_'+i+'">'+feeddesc.itemsdesc+'</label></span>';
        };
        var html ='<div class="feed-back" id="fb_box">\
        <div class="hd">\
        <h2>'+feeddesc.title+'</h2>\
        <span class="close" id="close_box"></span>\
        </div>\
        <div class="box">\
        <div class="bd" id="fb_selectinput">'+str+'<textarea maxlength="500" name="feedbackdesc" rows="" cols="" id="fb_cont" >请输入您的意见和建议，这将帮助我们不断改进服务，谢谢！</textarea>\
        <p id="error" class="feed-back-error"></p>\
        </div>\
        <div class="ft clearfix"><span class="num"><strong id="fb_contnum">0</strong>/500字</span><input class="btn" type="button" value="提交" name="" id="fb_sumbit" /></div>\
        </div>\
        </div>\
        <div class="feed-back-state" id="fb_sucess">\
        <p id="fb_msg">提交成功，感谢你的意见。</p>\
        <p><input type="button" class="btn" id="close_it" value="关闭" name="" /></p>\
        </div>';
        $('body').append(html);
    },
    handleRes:function(info){
        var data;
        try{
            data = eval('('+info+')');
        }catch(e){
        }
        if(data)
        {
            switch(data.code)
            {
        case "success":
            $('#fb_msg').html(data.msg);
            break;
        case "mustselectone":
            $('#fb_msg').html(data.msg);
            break;
        default:
            $('#fb_msg').html("提交失败");
            break;
            }
            $('#close_box').click();
            $('#fb_sucess').show();
        }
    },
    submitData:function(data){
        var iframeObj = $('#'+this.iframeId)[0].contentWindow;
        iframeObj.submitData(data);
    },
    eventHandle : function(){
        var that = this,option = this.option;
        var defaultVal = '请输入您的意见和建议，这将帮助我们不断改进服务，谢谢！';   
        var feedbackBox = '',feedbackSuccess = '',feedbackCont = '',ContNum = '',ContMaxLen = '';
        $('#close_it,#fb_sumbit').live({
            'mouseover':function(){$(this).addClass('btn-focus')},
            'mouseout':function(){$(this).removeClass('btn-focus')}
        });
        $('#fb_link').click(function()
        {
            if(!that.htmlLoad)
            {
                that.assemblyHtml(); 
                feedbackBox = $('#fb_box');                                
                feedbackSuccess = $('#fb_sucess');                                  
                feedbackCont = $('#fb_cont');        
                ContNum = $('#fb_contnum');                                           
                ContMaxLen = feedbackCont.attr('maxlength');
                that.htmlLoad = true;
            }
            $('#fb_box').show();
            return false;
        }); 
        $('#close_box').live('click',function(){
            feedbackBox.hide();feedbackCont.val(defaultVal);feedbackCont.css({color:''});ContNum.html('0');$('#error').html('');});
        $('#close_it').live('click',function(){feedbackSuccess.hide();});         
        $('#fb_cont').live({
            'focus':function(){                                     
            if(feedbackCont.val() == defaultVal)
            {
                feedbackCont.val(''); feedbackCont.val().length=0;
            }
            $('#error').html('');                                                          
            feedbackCont.css({color:'#000'});
            },
            'blur':function()
            {
                var val = $(this).val();
                if(val == '') 
                {
                    $(this).val(defaultVal);
                    feedbackCont.css({color:'#ccc'});
                }
            },
            'keyup':function(){                                            
            var textareaVal = $(this).val();
            var ContLen = textareaVal.length;                           
            if(ContLen > 0 && ContLen < ContMaxLen)
            {
                ContNum.html(ContLen);
            }
            else if (ContLen >= ContMaxLen)
            {
                ContNum.html(ContMaxLen);
                feedbackCont.val(textareaVal.substr(0,ContMaxLen));
                $('#error').html('输入内容已超过'+ContMaxLen+'！');
            }
            else 
            {
                ContNum.html('0');
            }                                              
            }
        });
        $('#fb_selectinput input').live('click',function(){
            $('#error').html('');
        });
        $('#fb_sumbit').live('click',function(){
            var inputVal='';
            var inputCheck= $('#fb_selectinput input[name="feedbackitem"]:checked');
            if($('#fb_selectinput input').attr('type') == 'radio')
            {
                inputVal = inputCheck.val();
            }
            else
            {
                inputCheck.each(function(){
                    var checkVal=$(this).val();
                    inputVal += checkVal +'_';
                });
            }
            if(inputVal == null || inputVal == '' )     
            {
                $('#error').html('请至少选择一个');
            }                 
            else
            {
                if(feedbackCont.val() == '' || feedbackCont.val() == defaultVal)
                {
                    $('#error').html('您还没有输入任何内容！');
                }
                else
                {
                    var textVal = feedbackCont.val();
                    var iframeId = that.iframeId ;
                    var localurl = location.href;
                    var args =  {id:option.objectNameId,feedbackitem:inputVal,feedbackdesc:textVal,refurl:localurl};
                    if(!that.iframeLoad)
                    {
                        var ifr = '<iframe id="'+iframeId+'" src="http://tuan.360.cn/?do=feedbackiframe" style="display:none" ></iframe>';
                        $('body').append(ifr);
                        $('#'+iframeId).load(function(){
                            that.submitData(args);
                            that.iframeLoad = true;
                        });
                    }else{
                        that.submitData(args);
                    }
                }
            }
        });
    },
    main:function(options){
        var that = this;
        var option = this.option;
        $.extend(option,options);
        $(function(){
            var jsonUrl = 'http://tuan.360.cn/?do=feedbackmain&id='+option.objectNameId;
            if(option.callback)
            {
                jsonUrl += '&callback=?';
            }
            $.getJSON(jsonUrl,function(data){
                if(data)
                {
                    if(option.callback)
                        that.data = data.data;
                    else
                        that.data = data;
                    that.assemblyLink(data);
                    that.eventHandle();
                }
            });
        });
    }
};