/*
 * ihome inc.
 * igo
 */
package com.ihome.galaxy.search.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.ihome.galaxy.search.ItemSearcher;
import com.ihome.galaxy.search.Searcher;
import com.ihome.galaxy.search.ShopSearcher;
import com.ihome.matrix.enums.SearchModeEnum;
import com.ihome.matrix.model.ResultModel;
import com.ihome.matrix.model.SearchModel;

/**
 * 基于matrix-client的搜索入口
 * @author sihai
 *
 */
public class SearcherImpl implements Searcher {

	@Autowired
	private ItemSearcher itemSearcher;
	@Autowired
	private ShopSearcher shopSearcher;
	
	@Override
	public ResultModel search(SearchModel searchModel) {
		
		SearchModeEnum mode = SearchModeEnum.toEnum(searchModel.getSearchMode());
		if(SearchModeEnum.ITEM == mode) {
			return itemSearcher.search(searchModel);
		} else if(SearchModeEnum.SHOP == mode) {
			return shopSearcher.search(searchModel);
		} else if(SearchModeEnum.HYBRID == mode) {
			throw new UnsupportedOperationException(String.format("At now we can not supported searche mode: %s", mode.getDesc()));
		} else {
			throw new IllegalArgumentException(String.format("Unknow searche mode:%d", searchModel.getSearchMode()));
		}
	}
	
	//=================================================================================
	//							setter/getter
	//=================================================================================
	
	public void setItemSearcher(ItemSearcher itemSearcher) {
		this.itemSearcher = itemSearcher;
	}

	public void setShopSearcher(ShopSearcher shopSearcher) {
		this.shopSearcher = shopSearcher;
	}
}
