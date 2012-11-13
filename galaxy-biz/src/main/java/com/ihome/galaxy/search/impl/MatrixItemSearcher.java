/*
 * ihome inc.
 * igo
 */
package com.ihome.galaxy.search.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.ihome.galaxy.search.ItemSearcher;
import com.ihome.matrix.domain.ItemDO;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;
import com.ihome.matrix.search.ItemSolrSearcher;

/**
 * 基于matrix-client的搜索实现
 * @author sihai
 *
 */
public class MatrixItemSearcher implements ItemSearcher {

	@Autowired
	private ItemSolrSearcher itemSolrSearcher;
	
	@Override
	public ResultModel<ItemDO> search(SearchModel searchModel) {
		return itemSolrSearcher.search(ItemDO.class, searchModel);
	}
	
	//=================================================================================
	//							setter/getter
	//=================================================================================
	public void setItemSolrSearcher(ItemSolrSearcher itemSolrSearcher) {
		this.itemSolrSearcher = itemSolrSearcher;
	}
}
