/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.framework;


/**
 * 用戶上下文
 * @author sihai
 *
 */
public class LoginContext {
	
	private boolean 	isLogined;	//
	private Long 		userId;		//
	private String 		userName;	//
	private String  	userLogo;	//
	
	public boolean isLogined() {
		return isLogined;
	}

	public void setLogined(boolean isLogined) {
		this.isLogined = isLogined;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserLogo() {
		return userLogo;
	}

	public void setUserLogo(String userLogo) {
		this.userLogo = userLogo;
	}

	/**
	 * 
	 * @param isLogined
	 * @param userId
	 * @param userName
	 * @param userLogo
	 */
	public LoginContext(boolean isLogined, Long userId, String userName, String userLogo) {
		this.isLogined = isLogined; 
		this.userId = userId;
		this.userName = userName;
		this.userLogo = userLogo;
	}
}
