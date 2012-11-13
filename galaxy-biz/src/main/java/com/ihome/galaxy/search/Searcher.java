/*
 * ihome inc.
 * igo
 */
package com.ihome.galaxy.search;

import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;

/**
 * 搜索入口
 * @author sihai
 *
 */
public interface Searcher {
	
	/**
	 * 
	 * @param searchModel
	 * @return
	 */
	ResultModel search(SearchModel searchModel);
}
