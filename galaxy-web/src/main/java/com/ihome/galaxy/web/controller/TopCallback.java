/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * @author sihai
 *
 */
public class TopCallback extends AbstractController {

	@Override
	protected ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = new ModelAndView("index");
		return mv;
	}
}
