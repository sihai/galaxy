/*
 * ihome inc.
 * igo
 */
package com.ihome.galaxy.enums;

/**
 * 
 * @author sihai
 *
 */
public enum UserStatusEnum {
	
	NORMAL(0, "Noraml");
	
	private int value;
	private String desc;
	
	/**
	 * 
	 * @param value
	 * @param desc
	 */
	private UserStatusEnum(int value, String desc) {
		this.value = value;
		this.desc = desc;
	}
	
	public int getValue() {
		return value;
	}
	
	public String getDesc() {
		return desc;
	}
	
	/**
	 * 
	 * @param value
	 * @return
	 */
	public static UserStatusEnum toEnum(int value) {
		for(UserStatusEnum s : UserStatusEnum.values()) {
			if(s.value == value) {
				return s;
			}
		}
		
		return null;
	}
}
