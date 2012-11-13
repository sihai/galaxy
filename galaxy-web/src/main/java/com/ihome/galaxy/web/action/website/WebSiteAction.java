/**
 * 
 */
package com.ihome.galaxy.web.action.website;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.iacrqq.util.StringUtil;
import com.ihome.galaxy.web.controller.AbstractController;
import com.ihome.galaxy.web.util.FormUtil;
import com.ihome.matrix.dao.exception.ValidateException;
import com.ihome.matrix.domain.WebSiteDO;
import com.ihome.matrix.enums.WebSiteTypeEnum;
import com.ihome.matrix.manager.WebSiteManager;

/**
 * 
 * @author sihai
 *
 */
public class WebSiteAction extends AbstractController {
	
	private WebSiteManager webSiteManager;
	
	public static final String OPERATION_ADD = "_add_";
	public static final String OPERATION_DELETE = "_delete_";
	
	//=================================================================================
	//							Route Method
	//=================================================================================
	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String operation = request.getParameter(OPERATION_KEY);
		if(StringUtil.equals(operation, OPERATION_ADD)) {
			return doAdd(FormUtil.toBean(WebSiteDO.class, request), request);
		} else if(StringUtil.equals(operation, OPERATION_DELETE)) {
			return doDelete(FormUtil.toBean(WebSiteDO.class, request));
		} else {
			throw new RuntimeException(String.format("Unknown operation:%s", operation));
		}
	}
	
	//=================================================================================
	//							Action Method
	//=================================================================================
	
	/**
	 * 
	 * @param webSite
	 * @param request
	 * @return
	 * @throws IOException
	 */
	private ModelAndView doAdd(WebSiteDO webSite, HttpServletRequest request) throws IOException {
		webSite.setViewCount(0L);
		webSite.setRank(0L);
		webSite.setIsDeleted(false);
		webSite.setGmtCreate(new Date());
		webSite.setGmtModified(webSite.getGmtCreate());
		
		MultipartFile logo = ((MultipartHttpServletRequest)request).getFile("logo");
		webSite.setLogo(upload(request, logo));
		
		try {
			webSiteManager.add(webSite);
			return new ModelAndView("redirect:/websitemap.jhtml");
		} catch (ValidateException e) {
			//
			ModelAndView mv = new ModelAndView("webSiteMap");
			mv.getModel().put("recommendErrorMsg", e.getMessage());
			mv.getModel().put("webSite", webSite);
			return mv;
		}
	}
	
	/**
	 * 
	 * @param webSite
	 * @return
	 */
	private ModelAndView doDelete(WebSiteDO webSite) {
		webSiteManager.delete(webSite.getId());
		return new ModelAndView("redirect:/websitemap.jhtml");
	}
	
	public void setWebSiteManager(WebSiteManager webSiteManager) {
		this.webSiteManager = webSiteManager;
	}
}
