(function(window,document){
	// 在window上暴露一个对象，后面的回调方法都放在此对象中，避免污染全局对象
	window.$jsonp_holder = {};
	var jsonp = function(url,param,callback){//三个参数
		// 生成回调函数后缀名
		//随机生成把.提换成空
		var callbackSuffix = Math.random().toString().replace(".","");
		// 生成回调函数名
		var callbackName = "callback_function" + callbackSuffix; 
		// 向跨域对象中暴露回调方法
		window.$jsonp[callbackName] = callbackName;
		// 拼接querystring
		//看倒数一位是不是？
		var querystring = url.charAt(url.length - 1) == "?"?"":"?";
		for(var attr in param){
			querystring += attr + "=" + param[attr] + "&";
		}
		// 生成最终的querystring
		//callback=空对象+一串随机数字
		querystring += "callback" = "$jsonp_holder." + callbackName; 
		// 动态生成script标签，并设置src的值
		var scriptElement = document.createElement("script");
		script.src = url + querystring;
		// 将script标签追加到body
		document.body.appendChild(scriptElement);
	}
	// 向window暴露jsonp方法
	window.$jsonp = jsonp;
})(window,document);