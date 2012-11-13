/**
 * ihome .inc
 * igo
 */
package com.ihome.galaxy.web.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import antlr.collections.List;

import com.iacrqq.util.ClassUtil;
import com.iacrqq.util.StringUtil;


/**
 * 将Form中的参数转换成java bean
 * @author sihai
 *
 */
public class FormUtil {

	private static final Log logger = LogFactory.getLog(FormUtil.class);
	
	public static final String SEPARATOR = "_";
	public static final String PATTERN_PROPERTY_SEPARATOR = "\\.";
	public static final String PROPERTY_SEPARATOR = ".";
	
	public static final String BYTE = "byte";
	public static final String SHORT = "short";
	public static final String INT = "int";
	public static final String LONG = "long";
	public static final String FLOAT = "float";
	public static final String DOUBLE = "double";
	public static final String BOOLEAN = "boolean";

	/**
	 * 
	 * @param clazz
	 * @param request
	 * @return
	 */
	public static <T> T toBean(Class<T> clazz, HttpServletRequest request) {
		if(request instanceof MultipartHttpServletRequest) {
			return toBean(clazz, (Map<String, Object>)((MultipartHttpServletRequest)request).getParameterMap());
		} else {
			return toBean(clazz, (Map<String, Object>)request.getParameterMap());
		}
	}
	
	/**
	 * 暂且还不支持集合类型的属性, 不过一会儿就支持了
	 * @param clazz
	 * @param request
	 * @return
	 */
	public static <T> T toBean(Class<T> clazz, Map<String, Object> parameterMap) {
		
		T t = ClassUtil.newInstance(clazz);
		String propertyName = null;
		for(String parameterName : parameterMap.keySet()) {
			propertyName = requestParameterName2BeanPropertyName(parameterName);
			if(propertyName.startsWith(SEPARATOR)) {
				// 系统参数, 不处理
				continue;
			}
			setBeanProperty(t, propertyName, parameterMap.get(parameterName));
		}
		return t;
	}
	
	/**
	 * 将request中请求参数名称规范化为java bean 属性名称
	 * 
	 * <p>
	 * 如下：
	 * <ol>
	 * 	<li>user_id -> userId</li>
	 * 	<li>user_name -> userName</li>
	 *  <li>_operation_ -> _operation_</li>	
	 *  <li>key -> key</li>
	 *  <li>user_property.user_id -> userProperty.userId</li>
	 *  <li>user_property.item_property.item_id -> userProperty.itemPrpoerty.itemId</li>
	 * </ol>
	 * 
	 * <p>
	 * <b>注意:</b>
	 * <p>
	 * 参数名称如果以分割符开始, 不进行规范化, 直接返回, 参数名称以分割符开始的参数一般是系统参数, 不希望被注入到java bean中
	 * 
	 * @param requestParameterName
	 * @return
	 */
	public static String requestParameterName2BeanPropertyName(String requestParameterName) {
		
		// 
		if(StringUtil.isBlank(requestParameterName)) {
			return requestParameterName;
		}
		
		String tmp = requestParameterName.trim();
		if(tmp.startsWith(SEPARATOR)) {
			return requestParameterName;
		}
		
		int propertyIndex = 0;
		int index = 0;
		
		String[] properties = tmp.split(PATTERN_PROPERTY_SEPARATOR);
		String[] fields = null;
		StringBuilder sb = new StringBuilder();
		
		for(String property : properties) {
			propertyIndex++;
			index = 0;
			fields = property.split(SEPARATOR);
			for(String field : fields) {
				index++;
				if(1 == index) {
					sb.append(field);
				} else {
					sb.append(field.substring(0, 1).toUpperCase());
					if(field.length() > 1) {
						sb.append(field.substring(1));
					}
				}
			}
			if(properties.length > 1 && propertyIndex != properties.length) {
				sb.append(PROPERTY_SEPARATOR);
			}
		}
		if(tmp.endsWith(SEPARATOR)) {
			sb.append(SEPARATOR);
		}
		
		return sb.toString();
	}
	
	/**
	 * 或请bean的setter方法
	 * @param clazz
	 * @param propertyName
	 * @param value
	 * @return
	 */
	public static <T> void setBeanProperty(T bean, String propertyName, Object value) {
		if(propertyName.contains(PROPERTY_SEPARATOR)) {
			setBeanComplexProperty(bean, propertyName, value);
		} else {
			setBeanSimpleProperty(bean.getClass(), bean, propertyName, value);
		}
	}
	
	/**
	 * 
	 * @param bean
	 * @param propertyName
	 * @param value
	 */
	public static <T> void setBeanComplexProperty(T bean, String propertyName, Object value) {
		
		int index = 0;
		String[] properties = propertyName.split(PATTERN_PROPERTY_SEPARATOR);
		Object target = bean;
		Object child = null;
		for(String property : properties) {
			index++;
			try {
				if(index != properties.length) {
					Field field = target.getClass().getDeclaredField(property);
					Class<?> type = field.getType();
					child = ClassUtil.newInstance(type);
					setBeanSimpleProperty(target.getClass(), target, property, child);
				} else {
					setBeanSimpleProperty(target.getClass(), target, property, value);
				}
				target = child;
			} catch (NoSuchFieldException e) {
				logger.warn(String.format("No such property:%s of bean, class:%s", property, target.getClass().getName()), e);
			}
		}
	}
	
	/**
	 * 
	 * @param bean
	 * @param propertyName
	 * @param value
	 */
	public static <T> void setBeanSimpleProperty(Class clazz, T bean, String propertyName, Object value) {
		
		if(null == clazz) {
			return;
		}
		
		String methodName = "set" + propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
		try {
			Field field = clazz.getDeclaredField(propertyName);
			Class<?> type = field.getType();
			Method method = clazz.getDeclaredMethod(methodName, new Class[]{type});
			if(null != value) {
				method.invoke(bean, convert(type, value));
			}
		} catch (NoSuchFieldException e) {
			logger.warn(String.format("No such property:%s of bean, class:%s", propertyName, clazz.getName()), e);
			setBeanSimpleProperty(clazz.getSuperclass(), bean, propertyName, value);
		} catch (NoSuchMethodException e) {
			logger.warn(String.format("No such method:%s of bean, class:%s", methodName, clazz.getName()), e);
		} catch (InvocationTargetException e) {
			logger.warn(String.format("Can not invoke method:%s of bean, class:%s", methodName, clazz.getName()), e);
		} catch (IllegalAccessException e) {
			logger.warn(String.format("Can not invoke method:%s of bean, class:%s", methodName, clazz.getName()), e);
		} catch (IllegalArgumentException e) {
			logger.warn(String.format("Can not invoke method:%s of bean, class:%s", methodName, clazz.getName()), e);
		}
	}
	
	/**
	 * 
	 * @param clazz
	 * @param bean
	 * @param methodName
	 * @param propertyName
	 * @param value
	 * @throws NoSuchFieldException
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 */
	private static void setBeanSimpleProperty(Class clazz, Object bean, String methodName, String propertyName, Object value) throws NoSuchFieldException, NoSuchMethodException, InvocationTargetException, IllegalAccessException, IllegalArgumentException {
		Field field = clazz.getDeclaredField(propertyName);
		Class<?> type = field.getType();
		Method method = clazz.getDeclaredMethod(methodName, new Class[]{type});
		if(null != value) {
			method.invoke(bean, convert(type, value));
		}
	}
	
	/**
	 * 我擦 request.getParameterMap return Map<String, String[]>
	 * @param type
	 * @param value
	 * @return
	 */
	public static <T> T convert(Class<T> type, Object value) {
		
		if(type.equals(String.class)) {
			// String no need convert
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)((Object[])value)[0];
				} else {
					return null;
				}
			} else {
				return (T)value;
			}
		} else if (type.equals(Byte.class) || type.toString().equals(BYTE)) {
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)Byte.valueOf((String)(((Object[])value)[0]));
				} else {
					return null;
				}
			} else {
				return (T)Byte.valueOf((String)value);
			}
		} else if(type.equals(Short.class) || type.toString().equals(SHORT)) {
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)Short.valueOf((String)(((Object[])value)[0]));
				} else {
					return null;
				}
			} else {
				return (T)Short.valueOf((String)value);
			}
		} else if(type.equals(Integer.class) || type.toString().equals(INT)) {
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)Integer.valueOf((String)(((Object[])value)[0]));
				} else {
					return null;
				}
			} else {
				return (T)Integer.valueOf((String)value);
			}
		} else if(type.equals(Long.class) || type.toString().equals(LONG)) {
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)Long.valueOf((String)(((Object[])value)[0]));
				} else {
					return null;
				}
			} else {
				return (T)Long.valueOf((String)value);
			}
		} else if(type.equals(Float.class) || type.toString().equals(FLOAT)) {
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)Float.valueOf((String)(((Object[])value)[0]));
				} else {
					return null;
				}
			} else {
				return (T)Float.valueOf((String)value);
			}
		} else if(type.equals(Double.class) || type.toString().equals(DOUBLE)) {
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)Double.valueOf((String)(((Object[])value)[0]));
				} else {
					return null;
				}
			} else {
				return (T)Double.valueOf((String)value);
			}
		} else if(type.equals(Boolean.class) || type.toString().equals(BOOLEAN)) {
			String str = null;
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					str = (String)((Object[])value)[0];
				} 
			} else {
				str = (String)value;
			}
			
			if(null == str) {
				return null;
			} else if(StringUtil.equalsIgnoreCase(str, Boolean.TRUE.toString()) 
					|| StringUtil.equalsIgnoreCase(str, Boolean.FALSE.toString())) {
				return (T)Boolean.valueOf((String)value);
			} else {
				int intValue = Integer.valueOf((String)value);
				if(0 == intValue) {
					return (T)Boolean.FALSE;
				} else {
					return (T)Boolean.TRUE;
				}
			}
		} else if(type.equals(FileItem.class)) {
			//return fileServer.save((FileItem)value);
			return (T)value;
		} else if(type.isAssignableFrom(List.class)) {
			// TODO List
			throw new UnsupportedOperationException(String.format("Unsupported type of bean property", type.getName()));
		} else if(type.isArray()) {
			// TODO Array
			throw new UnsupportedOperationException(String.format("Unsupported type of bean property", type.getName()));
		} else {
			// FIXME
			if(value.getClass().isArray()) {
				if(((Object[])value).length > 0) {
					return (T)((Object[])value)[0];
				} else {
					return null;
				}
			} else {
				return (T)value;
			}
		}
	}
	
	/**
	 * 测试
	 * @param args
	 */
	public static void main(String[] args) {
		
		//
		System.out.println(requestParameterName2BeanPropertyName("user_id"));
		System.out.println(requestParameterName2BeanPropertyName("user_name"));
		System.out.println(requestParameterName2BeanPropertyName("_operation_"));
		System.out.println(requestParameterName2BeanPropertyName("key"));
		System.out.println(requestParameterName2BeanPropertyName("user_property.user_id"));
		
		//
		try {
			Map<String, Object> parameterMap = new HashMap<String, Object>();
			parameterMap.put("_operation_", "_register_");
			parameterMap.put("byte_value", "1");
			parameterMap.put("short_value", "2");
			parameterMap.put("int_value", "3");
			parameterMap.put("long_value", "4");
			parameterMap.put("float_value", "5.0");
			parameterMap.put("double_value", "6.0");
			parameterMap.put("boolean_value", "true");
			
			parameterMap.put("o_byte_value", "1");
			parameterMap.put("o_short_value", "2");
			parameterMap.put("o_int_value", "3");
			parameterMap.put("o_long_value", "4");
			parameterMap.put("o_float_value", "5.0");
			parameterMap.put("o_double_value", "6.0");
			parameterMap.put("o_boolean_value", "true");
			
			parameterMap.put("string_value", "string");
			
			// 
			parameterMap.put("user_property.user_id", "1");
			
			parameterMap.put("file_item_value", new MockPicFileItem(100, 1000, "png"));
			
			
			
			TestBean t = toBean(TestBean.class, parameterMap);
			System.out.println(t);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * @author sihai
	 *
	 */
	public static class TestBean {
		
		// number
		private byte byteValue;
		private short shortValue;
		private int intValue;
		private long longValue;
		private float floatValue;
		private double doubleValue;
		
		// number 2
		private Byte oByteValue;
		private Short oShortValue;
		private Integer oIntValue;
		private Long oLongValue;
		private Float oFloatValue;
		private Double oDoubleValue;
		
		// boolean
		private boolean booleanValue;
		
		// boolean 2
		private Boolean oBooleanValue;
		
		// String
		private String stringValue;
		
		private FileItem fileItemValue;
		
		private User userProperty;

		public byte getByteValue() {
			return byteValue;
		}

		public void setByteValue(byte byteValue) {
			this.byteValue = byteValue;
		}

		public short getShortValue() {
			return shortValue;
		}

		public void setShortValue(short shortValue) {
			this.shortValue = shortValue;
		}

		public int getIntValue() {
			return intValue;
		}

		public void setIntValue(int intValue) {
			this.intValue = intValue;
		}

		public long getLongValue() {
			return longValue;
		}

		public void setLongValue(long longValue) {
			this.longValue = longValue;
		}

		public float getFloatValue() {
			return floatValue;
		}

		public void setFloatValue(float floatValue) {
			this.floatValue = floatValue;
		}

		public double getDoubleValue() {
			return doubleValue;
		}

		public void setDoubleValue(double doubleValue) {
			this.doubleValue = doubleValue;
		}

		public boolean isBooleanValue() {
			return booleanValue;
		}

		public void setBooleanValue(boolean booleanValue) {
			this.booleanValue = booleanValue;
		}

		public String getStringValue() {
			return stringValue;
		}

		public void setStringValue(String stringValue) {
			this.stringValue = stringValue;
		}

		public FileItem getFileItemValue() {
			return fileItemValue;
		}

		public void setFileItemValue(FileItem fileItemValue) {
			this.fileItemValue = fileItemValue;
		}
		
		public Byte getOByteValue() {
			return oByteValue;
		}

		public void setOByteValue(Byte oByteValue) {
			this.oByteValue = oByteValue;
		}

		public Short getOShortValue() {
			return oShortValue;
		}

		public void setOShortValue(Short oShortValue) {
			this.oShortValue = oShortValue;
		}

		public Integer getOIntValue() {
			return oIntValue;
		}

		public void setOIntValue(Integer oIntValue) {
			this.oIntValue = oIntValue;
		}

		public Long getOLongValue() {
			return oLongValue;
		}

		public void setOLongValue(Long oLongValue) {
			this.oLongValue = oLongValue;
		}

		public Float getOFloatValue() {
			return oFloatValue;
		}

		public void setOFloatValue(Float oFloatValue) {
			this.oFloatValue = oFloatValue;
		}

		public Double getODoubleValue() {
			return oDoubleValue;
		}

		public void setODoubleValue(Double oDoubleValue) {
			this.oDoubleValue = oDoubleValue;
		}
		
		public Boolean getOBooleanValue() {
			return oBooleanValue;
		}

		public void setOBooleanValue(Boolean oBooleanValue) {
			this.oBooleanValue = oBooleanValue;
		}
		
		public User getUserProperty() {
			return userProperty;
		}

		public void setUserProperty(User userProperty) {
			this.userProperty = userProperty;
		}
		
		@Override
		public String toString() {
			return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
		}
	}
	
	/**
	 * 
	 * @author sihai
	 *
	 */
	public static class User {
		
		private Long userId;

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}
		
		@Override
		public String toString() {
			return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
		}
	}
	
	/**
	 * 
	 * @author sihai
	 *
	 */
	public static class MockPicFileItem implements FileItem {

		/**
		 * 
		 */
		private static final long serialVersionUID = 135296401991953551L;

		private static final String IMAGE_FIELD_NAME = "logo";
		
		private int width  = 100;
		private int height = 100;
		private String type = "png";

		private BufferedImage image;

		public MockPicFileItem(int width, int height, String type) throws IOException {
			
			this.width = width;
			this.height = height;
			this.type = type;
			
			image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

			// Create a graphics contents on the buffered image
			Graphics2D g2d = image.createGraphics();

			// Draw graphics
			g2d.setColor(Color.white);
			g2d.fillRect(0, 0, width, height);
			g2d.setColor(Color.black);
			g2d.fillOval(0, 0, width, height);

			// Graphics context no longer needed so dispose it
			g2d.dispose();

		}

		@Override
		public void delete() {
		}

		@Override
		public byte[] get() {

			try {
				ByteArrayOutputStream os = new ByteArrayOutputStream();
				ImageIO.write(image, type, os);

				return os.toByteArray();
			} catch (IOException e) {
				return new byte[0];
			}
		}

		@Override
		public String getContentType() {
			return type;
		}

		@Override
		public String getFieldName() {
			return IMAGE_FIELD_NAME;
		}

		@Override
		public InputStream getInputStream() throws IOException {
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			ImageIO.write(image, type, os);
			InputStream is = new ByteArrayInputStream(os.toByteArray());

			return is;
		}

		@Override
		public String getName() {
			return IMAGE_FIELD_NAME;
		}

		@Override
		public OutputStream getOutputStream() throws IOException {
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			ImageIO.write(image, type, os);
			return os;
		}

		@Override
		public long getSize() {
			return image.getWidth() * image.getHeight();
		}

		@Override
		public String getString() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getString(String encoding)
				throws UnsupportedEncodingException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public boolean isFormField() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean isInMemory() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public void setFieldName(String name) {
			// TODO Auto-generated method stub

		}

		@Override
		public void setFormField(boolean state) {
			// TODO Auto-generated method stub

		}

		@Override
		public void write(File file) throws Exception {
			// TODO Auto-generated method stub

		}
	}
}
