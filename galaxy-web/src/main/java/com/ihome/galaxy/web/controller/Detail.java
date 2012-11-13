/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.ihome.matrix.domain.ShopDO;
import com.ihome.matrix.enums.PlatformEnum;
import com.ihome.matrix.manager.ItemManager;
import com.ihome.matrix.manager.ShopManager;

/**
 * 
 * @author sihai
 *
 */
public class Detail extends AbstractController {

	private ShopManager shopManager;
	private ItemManager itemManager;
	
	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = new ModelAndView("index");
		Map<String, Object> context = mv.getModel();
		
		//context.put("item", item);
		//context.put("shop", shop);
		
		// 
		return mv;
	}
	
	public void setShopManager(ShopManager shopManager) {
		this.shopManager = shopManager;
	}
	
	public void setItemManager(ItemManager itemManager) {
		this.itemManager = itemManager;
	}
}
