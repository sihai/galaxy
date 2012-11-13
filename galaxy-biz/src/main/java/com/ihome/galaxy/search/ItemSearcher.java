/*
 * ihome inc.
 * igo
 */
package com.ihome.galaxy.search;

import com.ihome.matrix.domain.ItemDO;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;

/**
 * Item 搜索
 * @author sihai
 *
 */
public interface ItemSearcher {
	
	/**
	 * 
	 * @param searchModel
	 * @return
	 */
	ResultModel<ItemDO> search(SearchModel searchModel);
}
