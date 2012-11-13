/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.ihome.matrix.domain.ItemDO;
import com.ihome.matrix.domain.ItemTraceLogDO;
import com.ihome.matrix.domain.ShopDO;
import com.ihome.matrix.domain.ShopTraceLogDO;
import com.ihome.matrix.domain.UserDO;
import com.ihome.matrix.domain.WebSiteDO;
import com.ihome.matrix.domain.WebSiteTraceLogDO;
import com.ihome.matrix.manager.ItemManager;
import com.ihome.matrix.manager.ShopManager;
import com.ihome.matrix.manager.WebSiteManager;

/**
 * 
 * @author sihai
 *
 */
public class Goto extends AbstractController {

	private ItemManager itemManager;
	private ShopManager shopManager;
	private WebSiteManager webSiteManager;

	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String url = null;
		
		UserDO user = getUser(request.getSession());
		// 尝试取item_id
		Long itemId = getItemId(request);
		if(null != itemId) {
			ItemTraceLogDO trace = new ItemTraceLogDO();
			trace.setRemoteIP(request.getRemoteAddr());
			trace.setUser(user);
			
			ItemDO item = itemManager.get(itemId);
			if(null == item) {
				throw new RuntimeException(String.format("Can not found item for itemId:%s", itemId));
			}
			
			url = item.getDetailURL();
			trace.setItem(item);
			
			ShopDO tmp = item.getShop();
			if(null != tmp && null != tmp.getId()) {
				ShopDO shop = shopManager.get(tmp.getId());
				trace.setShop(shop);
			}
			
			trace.setPlatform(item.getPlatform());
			
			trace.setGmtCreate(new Date());
			trace.setGmtModified(trace.getGmtCreate());
			
			traceLogManager.addItemTrace(trace);
		} else {
			// 尝试取shop_id
			Long shopId = getShopId(request);
			if(null != shopId) {
				ShopTraceLogDO trace = new ShopTraceLogDO();
				trace.setRemoteIP(request.getRemoteAddr());
				trace.setUser(user);
				
				ShopDO shop = shopManager.get(shopId);
				if(null == shop) {
					throw new RuntimeException(String.format("Can not found shop for shopId:%s", shopId));
				}
				url = shop.getDetailURL();
				trace.setShop(shop);
				trace.setPlatform(shop.getPlatform());
				trace.setGmtCreate(new Date());
				trace.setGmtModified(trace.getGmtCreate());
				
				traceLogManager.addShopTrace(trace);
			} else {
				// 尝试取site_id
				Long webSiteId = getWebSiteId(request);
				if(null != webSiteId) {
					WebSiteTraceLogDO trace = new WebSiteTraceLogDO();
					trace.setRemoteIP(request.getRemoteAddr());
					trace.setUser(user);
					
					WebSiteDO webSite = webSiteManager.get(webSiteId);
					if(null == webSite) {
						throw new RuntimeException(String.format("Can not found website for webSiteId:%s", webSiteId));
					}
					url = webSite.getSiteURL();
					trace.setWebSite(webSite);
					
					trace.setGmtCreate(new Date());
					trace.setGmtModified(trace.getGmtCreate());
					
					traceLogManager.addWebSiteTrace(trace);
				}
			}
		}
		
		if(null == url) {
			throw new RuntimeException(String.format("Wrong url:%s", request.getRequestURL().toString()));
		}
		
		return new ModelAndView(String.format("redirect:%s", url));
	}
	
	public void setItemManager(ItemManager itemManager) {
		this.itemManager = itemManager;
	}

	public void setShopManager(ShopManager shopManager) {
		this.shopManager = shopManager;
	}
	
	public void setWebSiteManager(WebSiteManager webSiteManager) {
		this.webSiteManager = webSiteManager;
	}
}
