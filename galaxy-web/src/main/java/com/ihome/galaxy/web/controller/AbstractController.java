/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.iacrqq.util.FileUtil;
import com.iacrqq.util.StringUtil;
import com.iacrqq.util.URLUtil;
import com.ihome.matrix.domain.ItemDO;
import com.ihome.matrix.domain.ShopDO;
import com.ihome.matrix.domain.TraceLogDO;
import com.ihome.matrix.domain.UserDO;
import com.ihome.matrix.domain.WebSiteDO;
import com.ihome.matrix.enums.PlatformEnum;
import com.ihome.matrix.manager.TraceLogManager;

/**
 * Controller抽象基类，请继承本类
 * 
 * @author sihai
 * 
 */
public abstract class AbstractController implements Controller {
	
	private Log logger = LogFactory.getLog(AbstractController.class);
	
	protected static final String PARAMETER_REDIRECT_TO = "rt";
	protected static final String PARAMETER_ITEM_ID = "item_id";
	protected static final String PARAMETER_SHOP_ID = "shop_id";
	protected static final String PARAMETER_WEB_SITE_ID = "web_site_id";
	
	protected static final String GOTO_URI = "/goto.jhtml";
	
	protected static final String CURRENT_URL = "curl";

	protected static final String OPERATION_KEY = "_operation_";
	protected static final String LOGIN_CONTEXT = "_login_context_";
	protected static final String ACTION_METHOD = "_method_";

	protected static final String NONE_VALUE = "-1";

	protected static final String SUCCEED = "succeed";
	protected static final String ERROR_MSG = "errorMsg";

	public static final String DUMP_FORMAT_TYPE_XML = "xml";
	public static final String DUMP_FORMAT_TYPE_JSON = "json";
	public static final String DUMP_FORMAT_TYPE_RSS = "rss";

	protected static final String UPLOAD_FILE_HOLDER_KEY = "_upload_file_holder_";
	
	protected static final String PARAMETER_PUG_KEY = "_pug_key_";
	protected static final String PUG_KEY = "XxEf-uu!QNs^!ViBx\\BQ^JdKXEhO%=p#CjI!ZRg*BReCbt^nXne*s-kFBTvCcIn@%aCjX^LXT#)mTCaBK!fSd!h*E\\Lr^QbteNQj-j^MO)IFFbS_rrX#*B^!sawBslgi";

	private static final String UPLOAD_DIRECTORY = "upload/";
	
	protected TraceLogManager traceLogManager;
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		/*
		 * // 前置处理 Device device =
		 * (Device)request.getAttribute(DeviceUtils.CURRENT_DEVICE_ATTRIBUTE);
		 * // 为了在PC测试扄1�7以取叄1�7 if(!device.isMobile()) { String requestURI =
		 * request.getRequestURI(); if(!requestURI.startsWith("/m")) { return
		 * new ModelAndView(new
		 * StringBuilder("forward:").append("/m").append(requestURI
		 * ).toString()); } }
		 */
		//
		_before_(request, response);
		
		ModelAndView mv = handle(request, response);

		if (mv != null && !mv.getViewName().startsWith("redirect:")) {
			Map<String, Object> context = mv.getModel();
			context.put("StringEscapeUtils", new StringEscapeUtils());
			context.put("StringUtil", new StringUtil());
			context.put("URLUtil", new URLUtil());
			context.put("PlatformEnum", PlatformEnum.class);
			context.put("user", getUser(request.getSession()));

			String queryString = request.getQueryString();
			queryString = StringUtil.isBlank(queryString) ? "" : "?" + queryString;
			context.put(CURRENT_URL, new StringBuilder(URLEncoder.encode(request.getRequestURL()
							.toString(), "utf-8")).append(URLEncoder.encode(
							queryString, "utf-8").toString()));
		}
		// 后置处理
		_after_(request, response);
		return mv;
	}
	
	/**
	 * 前置处理
	 * @param request
	 * @param response
	 */
	private void _before_(HttpServletRequest request, HttpServletResponse response) {
		before(request, response);
	}

	/**
	 * 前置处理
	 * @param request
	 * @param response
	 */
	private void _after_(HttpServletRequest request, HttpServletResponse response) {
		trace(request, response);
		after(request, response);
	}

	/**
	 * 前置处理, 子类可以覆盖
	 * @param request
	 * @param response
	 */
	protected void before(HttpServletRequest request, HttpServletResponse response) {
		
	}

	/**
	 * 前置处理, 子类可以覆盖
	 * @param request
	 * @param response
	 */
	protected void after(HttpServletRequest request, HttpServletResponse response) {
		
	}	
	
	//
	protected abstract ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception;

	/**
	 * 判断是否登录
	 * @param session
	 * @return
	 */
	protected boolean isLogined(HttpSession session) {
		
		UserDO user = getUser(session);
		if (null == user) {
			return false;
		}

		return true;
	}
	
	/**
	 * 
	 * @param session
	 * @return
	 */
	protected Long getUserId(HttpSession session) {
		UserDO user = getUser(session);
		return null == user ? null : user.getId();
	}
	
	/**
	 * 
	 * @param session
	 * @return
	 */
	protected String getUserName(HttpSession session) {
		UserDO user = getUser(session);
		return null == user ? null : user.getName();
	}
	
	/**
	 * 
	 * @param session
	 * @return
	 */
	protected UserDO getUser(HttpSession session) {
		
		UserDO user = null;
		Long userId = (Long)session.getAttribute("userId");
		String userName = (String)session.getAttribute("userName");
		String logoURL = (String)session.getAttribute("userName");
		if(null != userId && null != userName) {
			user = new UserDO();
			user.setId(userId);
			user.setName(userName);
			user.setLogoURL(logoURL);
		}
		
		return user;
	}
	
	/**
	 * 记录点击日志
	 * @param request
	 * @param response
	 */
	private void trace(HttpServletRequest request, HttpServletResponse response) {
		
		TraceLogDO trace = new TraceLogDO();
		trace.setUser(getUser(request.getSession()));
		
		trace.setClickURL(getFullRequestURL(request));
		trace.setRefererURL(request.getHeader("referer"));
		trace.setRemoteIP(request.getRemoteAddr());
		
		ItemDO item = new ItemDO();
		item.setId(getItemId(request));
		trace.setItem(item);
		
		ShopDO shop = new ShopDO();
		shop.setId(getShopId(request));
		trace.setShop(shop);
		
		WebSiteDO webSite = new WebSiteDO();
		webSite.setId(getWebSiteId(request));
		trace.setWebSite(webSite);
		
		trace.setGmtCreate(new Date());
		trace.setGmtModified(trace.getGmtCreate());
		
		traceLogManager.addTrace(trace);
	}
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	protected String getFullRequestURL(HttpServletRequest request) {
		String queryString = trimToNull(request.getQueryString());
	    return String.format("%s%s", request.getRequestURL().toString(), null == queryString ? "" : "?" + queryString);
	}
	
	/**
	 * 
	 * @param str
	 * @return
	 */
	protected String trimToNull(String str) {
        if (str != null) {
            str = str.trim();
            if (str.length() == 0) {
                str = null;
            }
        }
        return str;
    }
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	protected Long getItemId(HttpServletRequest request) {
		if(StringUtil.equalsIgnoreCase(GOTO_URI, request.getRequestURI())) {
			String strItemId = request.getParameter(PARAMETER_ITEM_ID);
			if(StringUtil.isNotBlank(strItemId)) {
				try {
					return Long.valueOf(strItemId);
				} catch (NumberFormatException e) {
					logger.error(String.format("Wrong request url:%s", request.getRequestURL().toString()));
				}
			}
		}
		return null;
	}
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	protected Long getShopId(HttpServletRequest request) {
		if(StringUtil.equalsIgnoreCase(GOTO_URI, request.getRequestURI())) {
			String strShopId = request.getParameter(PARAMETER_SHOP_ID);
			if(StringUtil.isNotBlank(strShopId)) {
				try {
					return Long.valueOf(strShopId);
				} catch (NumberFormatException e) {
					logger.error(String.format("Wrong request url:%s", request.getRequestURL().toString()));
				}
			}
		}
		return null;
	}
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	protected Long getWebSiteId(HttpServletRequest request) {
		if(StringUtil.equalsIgnoreCase(GOTO_URI, request.getRequestURI())) {
			String strWebSiteId = request.getParameter(PARAMETER_WEB_SITE_ID);
			if(StringUtil.isNotBlank(strWebSiteId)) {
				try {
					return Long.valueOf(strWebSiteId);
				} catch (NumberFormatException e) {
					logger.error(String.format("Wrong request url:%s", request.getRequestURL().toString()));
				}
			}
		}
		return null;
	}
	
	/**
	 * 
	 * @param file
	 */
	protected final String upload(HttpServletRequest request, MultipartFile file) throws IOException {
		String originalName = generateFileName();
		String fileURL = new StringBuilder(UPLOAD_DIRECTORY).append(originalName).append(".").append(FileUtil.getSuffix(file.getOriginalFilename())).toString();
		String originalFileName = request.getSession().getServletContext().getRealPath(fileURL); 
		file.transferTo(new File(originalFileName));
		return fileURL;
	}
	
	/**
	 * 
	 * @return
	 */
	private String generateFileName() {
		return UUID.randomUUID().toString();
	}
	
	public void setTraceLogManager(TraceLogManager traceLogManager) {
		this.traceLogManager = traceLogManager;
	}
}
