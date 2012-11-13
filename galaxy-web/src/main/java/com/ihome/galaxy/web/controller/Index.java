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
import com.ihome.matrix.manager.ShopManager;

/**
 * 
 * @author sihai
 *
 */
public class Index extends AbstractController {

	private ShopManager shopManager;
	
	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = new ModelAndView("index");
		Map<String, Object> context = mv.getModel();
		
		// 名站
		List<ShopDO> famousShopList = new ArrayList<ShopDO>(PlatformEnum.values().length);
		for(PlatformEnum p : PlatformEnum.values()) {
			famousShopList.add(shopManager.getByShopIdAndPlatform(p.getName(), p.getValue()));
		}
		context.put("famousShopList", famousShopList);
		
		// 
		return mv;
	}
	
	public void setShopManager(ShopManager shopManager) {
		this.shopManager = shopManager;
	}
}
