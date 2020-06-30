var ypScreenshot = function(options) {
  function ypScreenshot(options) {
    this.defaults = {
      widthProportion: 0,
      heightProportion: 0,
      src: "",
      file: "",
      load: function() {},
      callback: function() {}
    };
    var _this = this;
    var x, y;
    var l = 0;
    var t = 0;
    //触摸开始
    _this.touchStart = function(e) {
      let screenWidth = _this.settings.screenWidth;
      let screenHeight = _this.settings.screenHeight;
      let myWidth = _this.settings.myWidth;
      let isHeight = _this.settings.isHeight;
      let context = _this.settings.context;
      let img = _this.settings.img;
      if (isHeight) {
        context.clearRect(0, 0, screenWidth, screenHeight);
      } else {
        context.clearRect(
          (screenWidth - myWidth) / 2,
          0,
          screenWidth,
          screenHeight
        );
      }
      _this.lineTo();
      l = img.offsetLeft;
      t = img.offsetTop;
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
    };
    //触摸移动
    _this.touchMove = function(e) {
      e.preventDefault();
      let screenWidth = _this.settings.screenWidth;
      let screenHeight = _this.settings.screenHeight;
      let myWidth = _this.settings.myWidth;
      let myHeight = _this.settings.myHeight;
      let img = _this.settings.img;
      let nx = e.touches[0].pageX;
      let ny = e.touches[0].pageY;
      //计算移动后的左偏移量和顶部的偏移量
      let nl = nx - x;
      let nt = ny - y;
      if (img.height > myHeight) {
        img.style.top = nt + t - (screenHeight / 2 - img.height / 2) + "px";
      }
      if (img.width > myWidth) {
        img.style.left = nl + l - (screenWidth - myWidth) / 2 + "px";
      }
    };
    //触摸结束
    _this.touchEnd = function(e) {
      e.preventDefault();
      let screenWidth = _this.settings.screenWidth;
      let screenHeight = _this.settings.screenHeight;
      let myWidth = _this.settings.myWidth;
      let myHeight = _this.settings.myHeight;
      let img = _this.settings.img;
      let context = _this.settings.context;
      let top = img.style.top.substring(0, img.style.top.indexOf("px"));
      let left = img.style.left.substring(0, img.style.left.indexOf("px"));
      if (top > 0) {
        img.style.top = 0 + "px";
      }
      if (top < 0) {
        top = -top;
        let topHeigth = parseInt(img.height - myHeight);
        if (top > topHeigth) {
          img.style.top = "-" + topHeigth + "px";
        }
      }
      if (left > 0) {
        img.style.left = 0;
      }
      if (left < 0) {
        left = -left;
        if (left > parseInt(img.width - myWidth)) {
          img.style.left = -parseInt(img.width - myWidth) + "px";
        }
      }
      context.fillRect(0, 0, screenWidth, screenHeight);
      context.clearRect(
        (screenWidth - myWidth) / 2,
        screenHeight / 2 - img.height / 2,
        myWidth,
        myHeight
      );
      _this.lineTo();
    };
    //创建网格线
    _this.lineTo = function() {
      let screenWidth = _this.settings.screenWidth;
      let screenHeight = _this.settings.screenHeight;
      let myWidth = _this.settings.myWidth;
      let myHeight = _this.settings.myHeight;
      let img = _this.settings.img;
      let context = _this.settings.context;
      let isHeight = _this.settings.isHeight;
      context.lineWidth = 1;
      context.strokeStyle = "#FFFFFF";
      //顶部边框线
      if (isHeight) {
        context.beginPath();
        context.moveTo(
          myWidth + (screenWidth - myWidth) / 2,
          screenHeight / 2 - img.height / 2
        );
        context.lineTo(
          (screenWidth - myWidth) / 2,
          screenHeight / 2 - img.height / 2
        );
        context.stroke();
      } else {
        context.beginPath();
        context.moveTo(
          (screenWidth - myWidth) / 2,
          screenHeight / 2 - img.height / 2
        );
        context.lineTo(
          img.width + (screenWidth - myWidth) / 2,
          screenHeight / 2 - img.height / 2
        );
        context.stroke();
      }
      //左边框线
      context.beginPath();
      context.moveTo(
        (screenWidth - myWidth) / 2,
        screenHeight / 2 - img.height / 2
      );
      context.lineTo(
        (screenWidth - myWidth) / 2,
        myHeight + screenHeight / 2 - img.height / 2
      );
      context.stroke();
      //九宫格
      var stepx = parseFloat(myWidth / 3);
      var stepy = parseFloat(myHeight / 3);
      for (let i = stepx; i <= myWidth; i += stepx) {
        context.beginPath();
        context.moveTo(
          i + (screenWidth - myWidth) / 2,
          screenHeight / 2 - img.height / 2
        );
        context.lineTo(
          i + (screenWidth - myWidth) / 2,
          myHeight + screenHeight / 2 - img.height / 2
        );
        context.stroke();
      }
      for (let i = stepy; i <= myHeight; i += stepy) {
        context.beginPath();
        context.moveTo(
          (screenWidth - myWidth) / 2,
          i + (screenHeight / 2 - img.height / 2)
        );
        context.lineTo(
          myWidth + (screenWidth - myWidth) / 2,
          i + (screenHeight / 2 - img.height / 2)
        );
        context.stroke();
      }
    };
    //截图
    _this.screenshot = function() {
      let myWidth = _this.settings.myWidth;
      let myHeight = _this.settings.myHeight;
      let img = _this.settings.img;
      var imgDom = document.getElementById(img.id);
      var canvas1 = document.createElement("canvas");
      canvas1.style.position = "absolute";
      canvas1.style.top = 0;
      canvas1.style.left = 0;
      canvas1.width = myWidth;
      canvas1.height = myHeight;
      canvas1.zIndex = 9999;
      var context1 = canvas1.getContext("2d");
      var imgWidth = img.width;
      var imgHeight = img.height;
      var canvas2 = document.createElement("canvas");
      canvas2.style.position = "absolute";
      canvas2.style.top = 0;
      canvas2.style.left = 0;
      canvas2.width = imgWidth;
      canvas2.height = imgHeight;
      canvas2.zIndex = 9999;
      var context2 = canvas2.getContext("2d");
      context2.drawImage(imgDom, 0, 0, imgWidth, imgHeight);
      imgDom.src = canvas2.toDataURL("image/png", 100);
      imgDom.onload = function() {
        var top = img.style.top.substring(0, img.style.top.indexOf("px"));
        if (top.length == 0) {
          top = 0;
        } else {
          top = -top;
        }
        var left = img.style.left.substring(0, img.style.left.indexOf("px"));
        if (left.length == 0) {
          left = 0;
        } else {
          left = -left;
        }
        context1.drawImage(
          imgDom,
          imgWidth - (imgWidth - left),
          imgHeight - (imgHeight - top), //开始剪切的 x, y 坐标位置。
          imgWidth,
          imgHeight, //被剪切图像的宽高度。
          0,
          0, //在画布上放置图像 x, y坐标位置。
          imgWidth,
          imgHeight //要使用的图像的宽高度。
        );
        if (typeof _this.settings.callback == "function") {
          _this.settings.callback(canvas1.toDataURL("image/png", 100));
        }
        _this.settings.mask.remove();
      };
    };
    //取消
    _this.cancel = function() {
      _this.settings.mask.remove();
    };
    //创建底部按钮
    _this.footer = function() {
      let mask = _this.settings.mask;
      var footer = document.createElement("footer");
      footer.style.width = "100%";
      footer.style.height = "44px";
      footer.style.position = "absolute";
      footer.style.bottom = "0";
      footer.style.borderTop = "1px solid rgba(255,255,255,.2)";
      var bu1 = document.createElement("div");
      bu1.innerHTML = "取消";
      bu1.onclick = _this.cancel;
      bu1.style.float = "left";
      bu1.style.color = "#FFFFFF";
      bu1.style.padding = "0px 10px";
      bu1.style.height = "100%";
      bu1.style.lineHeight = "44px";
      footer.appendChild(bu1); //追加至遮罩
      var bu2 = document.createElement("div");
      bu2.innerHTML = "截图";
      bu2.style.float = "right";
      bu2.style.color = "#FFFFFF";
      bu2.style.padding = "0px 10px";
      bu2.style.height = "100%";
      bu2.style.lineHeight = "44px";
      bu2.onclick = _this.screenshot;
      
      footer.appendChild(bu2); //追加至遮罩
      mask.appendChild(footer);
      document.body.appendChild(mask); //追加至html;
      _this.settings.load();
    };
    //创建截图画布
    _this.canvas = function() {
      let myWidth = _this.settings.myWidth;
      let myHeight = _this.settings.myHeight;
      let screenWidth = _this.settings.screenWidth;
      let screenHeight = _this.settings.screenHeight;
      let div = _this.settings.div;
      let mask = _this.settings.mask;
      _this.settings.canvas = document.createElement("canvas");
      let canvas = _this.settings.canvas;
      _this.settings.canvas.style.position = "absolute";
      _this.settings.canvas.style.top = 0;
      _this.settings.canvas.style.left = 0;
      _this.settings.context = canvas.getContext("2d");
      let context = _this.settings.context;
      var imgId = "img-" + new Date().getTime();
      _this.settings.img = new Image(myWidth);
      let img = _this.settings.img;
      img.style.marginLeft = (screenWidth - myWidth) / 2 + "px";
      img.style.position = "relative";
      img.style.display = "block";
      img.src = _this.settings.src;
      img.id = imgId;
      img.onload = function() {
        div.appendChild(img);
        setTimeout(function() {
          //制定延迟
          if (img.height < myHeight) {
            img.style.width = "auto";
            img.height = myHeight;
            _this.settings.isHeight = true;
          }
          img.style.marginTop = screenHeight / 2 - img.height / 2 + "px";
          canvas.width = screenWidth;
          canvas.height = screenHeight;
          context.fillStyle = "#000";
          context.globalAlpha = 0.7;
          context.fillRect(0, 0, screenWidth, screenHeight);
          context.clearRect(
            (screenWidth - myWidth) / 2,
            screenHeight / 2 - img.height / 2,
            myWidth,
            myHeight
          );
          _this.lineTo();
          div.ontouchstart = _this.touchStart;
          div.ontouchmove = _this.touchMove;
          div.ontouchend = _this.touchEnd;
          div.appendChild(canvas);
        }, 0);
        mask.appendChild(div); //追加至遮罩
        _this.footer();
      };
    };
    //创建遮罩与外包装窗口
    _this.createMask = function() {
      _this.settings.mask = document.createElement("div");
      _this.settings.mask.style.position = "fixed";
      _this.settings.mask.style.width = "100%";
      _this.settings.mask.style.height = "100%";
      _this.settings.mask.style.backgroundColor = "rgba(0,0,0,1)";
      _this.settings.mask.style.top = 0;
      _this.settings.mask.style.left = 0;
      _this.settings.mask.style.zIndex = 9999;
      //创建外包装窗口
      _this.settings.div = document.createElement("div");
      _this.settings.div.style.width = _this.settings.myWidth;
      _this.canvas();
    };
    _this.rotateImg = function(img, direction, canvas) {
	        //最小与最大旋转方向，图片旋转4次后回到原方向    
	        var min_step = 0;    
	        var max_step = 3;    
	        //var img = document.getElementById(pid);    
	        if (img == null)return;    
	        //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
	        var height = img.height;    
	        var width = img.width;    
	        //var step = img.getAttribute('step');    
	        var step = 2;    
	        if (step == null) {    
	            step = min_step;    
	        }    
	        if (direction == 'right') {    
	            step++;    
	            //旋转到原位置，即超过最大值    
	            step > max_step && (step = min_step);    
	        } else {    
	            step--;    
	            step < min_step && (step = max_step);    
	        }    
	        //旋转角度以弧度值为参数    
	        var degree = step * 90 * Math.PI / 180;    
	        var ctx = canvas.getContext('2d');    
	        switch (step) {    
	            case 0:    
	                canvas.width = width;    
	                canvas.height = height;    
	                ctx.drawImage(img, 0, 0);    
	                break;    
	            case 1:    
	                canvas.width = height;    
	                canvas.height = width;    
	                ctx.rotate(degree);    
	                ctx.drawImage(img, 0, -height);    
	                break;    
	            case 2:    
	                canvas.width = width;    
	                canvas.height = height;    
	                ctx.rotate(degree);    
	                ctx.drawImage(img, -width, -height);    
	                break;    
	            case 3:    
	                canvas.width = height;    
	                canvas.height = width;    
	                ctx.rotate(degree);    
	                ctx.drawImage(img, -width, 0);    
	                break;    
	        }
	    }
    //初始化方法
    _this.init = function() {
    	_this.settings = Object.assign(_this.defaults, options);
    	 var reader = new FileReader();
				reader.readAsDataURL(_this.settings.file);
				reader.onload = function () {
					EXIF.getData(_this.settings.file, function() {
			    	EXIF.getAllTags(this);
			    	var Orientation = EXIF.getTag(this, 'Orientation');
			    	var result = "";
			    	var image = new Image();  
		        image.src = reader.result;  
		        image.onload = function() {
	            var expectWidth = this.width;  
	            var expectHeight = this.height;  
	            var canvas = document.createElement("canvas");  
	            var ctx = canvas.getContext("2d");  
	            canvas.width = expectWidth;  
	            canvas.height = expectHeight;
	            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);  
	            var base64 = null;  
            	if(Orientation != "" && Orientation != 1 && typeof(Orientation) != "undefined"){  
                switch(Orientation){
                    case 6://需要顺时针（向左）90度旋转  
                        _this.rotateImg(this,'left', canvas);  
                        break;  
                    case 8://需要逆时针（向右）90度旋转  
                        _this.rotateImg(this,'right', canvas);  
                        break;
                    case 3://需要180度旋转  
                        _this.rotateImg(this,'right', canvas);//转两次  
                        _this.rotateImg(this,'right', canvas);  
                        break;  
                }
                var result = canvas.toDataURL("image/png", 1);
                _this.settings.src = result;
           		} else {
           			_this.settings.src = reader.result
							}
	            var screenWidth = window.screen.width;
				      var screenHeight = window.screen.height;
				      var widthProportion = _this.settings.widthProportion;
				      var heightProportion = _this.settings.heightProportion;
				      _this.settings.isHeight = false; //图片自适应高度比设定高度少 默认是 Y轴高于设定图高
				      _this.settings.context = ""; //画布内容;
				      _this.settings.img = ""; //图片标签
				      _this.settings.canvas = ""; //画布
				      _this.settings.myWidth = parseInt((screenWidth * 92) / 100); //根据图片自适应宽度变量
				      _this.settings.myHeight = parseInt(
				        (_this.settings.myWidth * heightProportion) / widthProportion
				      ); //根据图片自适应高度变量
				      _this.settings.screenWidth = screenWidth; //定义浏览器屏幕宽度
				      _this.settings.screenHeight = screenHeight; //定义浏览器屏幕高度
				      _this.createMask();
		        }
			    });
        }
    };
    _this.init();
  }
  return new ypScreenshot(options);
};