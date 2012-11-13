/**
 * 
 * @param category
 */
function fillItem(id, category) {
	
	var parameters = {
		search_mode : 0,
		q: '三星',
		//category_id : category,
		page_size: 4,
		current_page: 1
	};
	
	$.getJSON("/query.jhtml", parameters, function(jsonResult){
		for(var i = 0; i < jsonResult.result.length; i++) {
			append(id, jsonResult.result[i]);
		}
	});
}

/**
 * 
 * @param item
 */
function append(id, item) {
	var html = "" 																		+
	'<li class="span5">' 																+
		'<div class="thumbnail border-radius-top">' 									+
			'<div class="bg-thumbnail-img">' 											+
				'<a target="_blank" class="overlay" href="' + item.detailURL + '">' 	+
					'<!--' 																+
					'<img title="$!{item.name}" src="assets/img/tmall.png">'			+
					'-->'																+
				'</a>'																	+
				'<a target="_blank" href="' + item.detailURL + '">'						+
					'<img class="border-radius-top" style="width:200px;height:160px;" src="' + item.logoURL + '">' 	+
				'</a>'																								+
			'</div>'																								+
			'<div class="thumbnail-content-left">'																	+
				'<h5 style="height:18px;">商城：<a target="_blank" href="' + item.platformURL + '">' + item.platformName + '</a></h5>'					+
				'<h5 style="height:18px;">店铺：<a target="_blank" href="' + item.shopURL + '">' + item.shopName + '</a></h5>'					+
				'<h5 style="height:18px;">促销：<a target="_blank" href="#' + '">' + item.promotion + '</a></h5>'											+
				'<h5 style="height:18px;">赠品：<a target="_blank" href="#' + '">' + item.gif + '</a></h5>'												+
				'<p>'																																	+
					item.other																															+
				'</p>'																																	+
			'</div>'																																	+
		'</div>'																																		+
		'<div class="box border-radius-bottom">'																										+
			'<p>'																																		+
				'<span title="' + item.name + '" class="title_torrent pull-left">' + item.name + '</span>'												+
				'<span class="number-view pull-right"><i class="icon-white icon-eye-open"></i>' + item.price + '</span>'								+
			'</p>'																																		+
		'</div>'																																		+
	'</li>';
	$('#' + id).append(html);
}