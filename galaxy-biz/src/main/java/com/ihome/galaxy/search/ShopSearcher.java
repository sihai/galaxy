/*
 * ihome inc.
 * igo
 */
package com.ihome.galaxy.search;

import com.ihome.matrix.domain.ShopDO;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;

/**
 * Shop 搜索
 * @author sihai
 *
 */
public interface ShopSearcher {
	
	/**
	 * 
	 * @param searchModel
	 * @return
	 */
	ResultModel<ShopDO> search(SearchModel searchModel);
}
