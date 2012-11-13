/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.ihome.matrix.domain.WebSiteDO;
import com.ihome.matrix.enums.WebSiteTypeEnum;
import com.ihome.matrix.manager.WebSiteManager;
import com.ihome.matrix.model.BaseQueryModel;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.WebSiteQueryModel;

/**
 * 网址大全
 * @author sihai
 *
 */
public class WebSiteMap extends AbstractController {
	
	private WebSiteManager webSiteManager;
	
	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = new ModelAndView("webSiteMap");
		Map<WebSiteTypeEnum, ResultModel<WebSiteDO>> resultModelMap = new HashMap<WebSiteTypeEnum, ResultModel<WebSiteDO>>();
		for(WebSiteTypeEnum type : WebSiteTypeEnum.values()) {
			WebSiteQueryModel queryModel = WebSiteQueryModel.newInstance().withType(type.getValue())
					.withCurrentPage(1L)
					.withPageSize(BaseQueryModel.MAX_PAGE_SIZE);
			resultModelMap.put(type, webSiteManager.query(queryModel));
		}
		mv.getModel().put("resultModelMap", resultModelMap);
		return mv;
	}
	
	public void setWebSiteManager(WebSiteManager webSiteManager) {
		this.webSiteManager = webSiteManager;
	}
}
