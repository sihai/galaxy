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
public enum UserFromEnum {
	
	IGO(0, "igo");
	
	private int value;
	private String desc;
	
	/**
	 * 
	 * @param value
	 * @param desc
	 */
	private UserFromEnum(int value, String desc) {
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
	public static UserFromEnum toEnum(int value) {
		for(UserFromEnum s : UserFromEnum.values()) {
			if(s.value == value) {
				return s;
			}
		}
		
		return null;
	}
}
