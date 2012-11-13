/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.ihome.galaxy.search.Searcher;
import com.ihome.galaxy.web.util.FormUtil;
import com.ihome.matrix.domain.BaseDO;
import com.ihome.matrix.enums.SearchModeEnum;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;

/**
 * 
 * @author sihai
 *
 */
public class Search extends AbstractController {

	@Autowired
	private Searcher searcher;
	
	//=================================================================================
	//							Route Method
	//=================================================================================

	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {

		SearchModel searcheModel = FormUtil.toBean(SearchModel.class, request);
		
		return doSearch(searcheModel);
	}
	
	/**
	 * 
	 * @param searchModel
	 * @return
	 */
	private ModelAndView doSearch(SearchModel searchModel) {
		
		ModelAndView mv = null;
		SearchModeEnum mode = SearchModeEnum.toEnum(searchModel.getSearchMode());
		if(null == mode) {
			searchModel.setSearchMode(SearchModeEnum.ITEM.getValue());
			mode = SearchModeEnum.ITEM;
		}
		
		ResultModel resultModel = searcher.search(searchModel);
		/*if(mode == SearchModeEnum.ITEM) {
			mv = new ModelAndView("itemSearchResult");
		} else if(mode == SearchModeEnum.SHOP) {
			mv = new ModelAndView("shopSearchResult");
		} else if(mode == SearchModeEnum.HYBRID) {
			mv = new ModelAndView("hybridSearchResult");
		} else {
			throw new RuntimeException("OMG, Not Possible");
		}*/
		
		mv = new ModelAndView("search");
		
		mv.getModel().put("resultModel", resultModel);
		
		return mv;
	}

	//=================================================================================
	//							setter/getter
	//=================================================================================
	
	public void setSearcher(Searcher searcher) {
		this.searcher = searcher;
	}
}
