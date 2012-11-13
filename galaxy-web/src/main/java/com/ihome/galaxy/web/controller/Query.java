/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.controller;

import java.io.IOException;
import java.io.Writer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.web.servlet.ModelAndView;

import com.ihome.galaxy.search.Searcher;
import com.ihome.galaxy.web.util.FormUtil;
import com.ihome.matrix.model.JSONResultModel;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;

/**
 * Ajax Query
 * @author sihai
 *
 */
public class Query extends AbstractController {

	private Searcher searcher;
	
	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return doQuery(FormUtil.toBean(SearchModel.class, request), response);
	}
	
	/**
	 * 
	 * @param searchModel
	 * @param response
	 * @return
	 * @throws IOException
	 */
	private ModelAndView doQuery(SearchModel searchModel, HttpServletResponse response) throws IOException {
		
		JSONResultModel result = new JSONResultModel(); 
		ResultModel resultModel = searcher.search(searchModel);
		result.withIsSucceed(true);
		result.withResult(resultModel.getItemList());
		
		JsonConfig jconfig = new JsonConfig();
		jconfig.setExcludes(new String[]{"gmtCreate", "gmtModified"});
		
		Writer writer = null;
		try {
			writer = response.getWriter();
			writer.write(JSONObject.fromObject(result, jconfig).toString());
			writer.flush();
		} finally {
			if(null != writer) {
				writer.close();
			}
		}
		return null;
	}
	
	//=================================================================================
	//							setter/getter
	//=================================================================================
	
	public void setSearcher(Searcher searcher) {
		this.searcher = searcher;
	}
}
