/*
 * ihome inc.
 * igo
 */
package com.ihome.galaxy.search.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.ihome.galaxy.search.ShopSearcher;
import com.ihome.matrix.domain.ShopDO;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;
import com.ihome.matrix.search.ShopSolrSearcher;

/**
 * 基于matrix-client的搜索实现
 * @author sihai
 *
 */
public class MatrixShopSearcher implements ShopSearcher {

	@Autowired
	private ShopSolrSearcher shopSolrSearcher;
	
	@Override
	public ResultModel<ShopDO> search(SearchModel searchModel) {
		return shopSolrSearcher.search(ShopDO.class, searchModel);
	}
	
	//=================================================================================
	//							setter/getter
	//=================================================================================
	public void setShopSolrSearcher(ShopSolrSearcher shopSolrSearcher) {
		this.shopSolrSearcher = shopSolrSearcher;
	}
}
