育派截图插件用法

ypScreenshot({
	widthProportion: 4, //宽度参数比例
	heightProportion: 3, //高度参数比例
	src: '/logo.png', //图片地址
	callback: function (resultData) { //返回的图片 字节流
		//示例操作
		console.log(resultData);
		var bodyImg = document.getElementById('img'); 
		bodyImg.src = resultData;
	}
});