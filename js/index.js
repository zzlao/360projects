window.onload = function() {

	function $(id) {

		var back_top_btn = document.getElementById("back_top_btn");
		window.onscroll = function() {
			if(document.body.scrollTop > 200) {
				back_top_btn.style.display = "block";
			} else {
				back_top_btn.style.display = "none";
			}
		}
		back_top_btn.onclick = function() {
			var top = document.body.scrollTop;
			var speed = top / 60;
			var id = setInterval(function() {
				if(document.body.scrollTop <= 0) {
					clearInterval(id);
					document.body.scrollTop = 0;
				} else {
					document.body.scrollTop = document.body.scrollTop - speed;
				}
			}, 1);
		}

		return document.getElementById(id);
	}

	var index = 0;
	var timer = null;
	var pic = $("pic").getElementsByTagName("li");
	var num = $("num").getElementsByTagName("li");
	var flash = $("flash");
	var left = $("left");
	var right = $("right");
	//单击左箭头
	left.onclick = function() {
			index--;
			if(index < 0) {
				index = num.length - 1
			};
			changeOption(index);
		}
		//单击右箭头
	right.onclick = function() {
			index++;
			if(index >= num.length) {
				index = 0
			};
			changeOption(index);
		}
		//鼠标划在窗口上面，停止计时器
	flash.onmouseover = function() {
			clearInterval(timer);
		}
		//鼠标离开窗口，开启计时器
	flash.onmouseout = function() {
			timer = setInterval(run, 2000)
		}
		//鼠标划在页签上面，停止计时器，手动切换
	for(var i = 0; i < num.length; i++) {
		num[i].id = i;
		num[i].onmouseover = function() {
			clearInterval(timer);
			changeOption(this.id);
		}
	}
	//定义计时器
	timer = setInterval(run, 2000)
		//封装函数run
	function run() {
		index++;
		if(index >= num.length) {
			index = 0
		};
		changeOption(index);
	}
	//封装函数changeOption
	function changeOption(curindex) {
		// console.log(index)
		for(var j = 0; j < num.length; j++) {
			pic[j].style.display = "none";
			num[j].className = "";
		}
		pic[curindex].style.display = "block";
		num[curindex].className = "active";
		index = curindex;
	}

	var list_detail = document.getElementById("list_detail");
	var nav_list_ul = document.getElementById("nav_list_ul");
	var nav_detail_ul = document.getElementById("nav_detail_ul");
	var nav_list_li = nav_list_ul.getElementsByTagName("li");
	var nav_detail_li = nav_detail_ul.getElementsByTagName("li");
	var list_container = document.getElementById("list_container");
	for(var i = 0; i < nav_list_li.length; i++) {
		nav_list_li[i].index = i;
		nav_list_li[i].onmouseover = function() {
			list_detail.style.display = "block";
			for(var j = 0; j < nav_detail_li.length; j++) {
				nav_detail_li[j].style.display = "none";
			}
			nav_detail_li[this.index].style.display = "block";
		}
	}
	list_container.onmouseleave = function() {
		list_detail.style.display = "none";
	}
	
	//登陆
	var denglu_contianer =document.getElementById("denglu_contianer");
	var denglu_close = document.getElementById("denglu_close");
	var denglu_open = document.getElementById("dingduandenglu");
	denglu_contianer.style.width = document.documentElement.clientWidth + "px";
	denglu_contianer.style.height = document.documentElement.clientHeight + "px";
	denglu_open.onclick = function(){
		denglu_contianer.style.display = "block";		
	}
	denglu_close.onclick = function(){
		denglu_contianer.style.display = "none";
	}
	
	
	//地图
	var map_contianer =document.getElementById("map_contianer");
	var map_close = document.getElementById("map_close");
	var map_open = document.getElementById("main_left_head_map");
	map_contianer.style.width = document.documentElement.clientWidth + "px";
	map_contianer.style.height = document.documentElement.clientHeight + "px";
	map_open.onclick = function(){
		map_content.innerHTML = "";
		map_contianer.style.display = "block";
		var script = dc("script");
		script.src = "http://webapi.amap.com/maps?v=1.3&key=2974c58ceb4f2814a075707090fa7319&callback=init";
		map_content.appendChild(script);
	}
	map_close.onclick = function(){
		map_contianer.style.display = "none";
	}
};

//封装document.createElement()
function dc(type){
	return document.createElement(type);
}

//初始化地图以及当前页商家对应的坐标
function init(){
    var map = new AMap.Map('map_content', {
        center:[121.558079, 38.875933],
        zoom: 12,
        animateEnable:true
    });
    map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
    });

    current_arr.forEach(function(elem){
    	(function(elem){
    		var infowindow = null;
    		var marker = new AMap.Marker({
	            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
	            position: [elem.map_longitude, elem.map_latitude]
	        });
	        marker.setMap(map);
	    	var clickHandle = AMap.event.addListener(marker, 'click', function(){
			    infowindow.open(map, marker.getPosition());
			});
	    	AMap.plugin('AMap.AdvancedInfoWindow',function(){
		       infowindow = new AMap.AdvancedInfoWindow({
		        content: "<div class='info_title'>"+elem.shop_name+"</div><div class='info_desc'>主营："+elem.shop_desc+"</div><div class='info_addr'>地址："+elem.addr_detail+"</div>",
		        offset: new AMap.Pixel(0, -30)
		    	})
		    });
    	})(elem);
    });
}

    function clickCity(flag){
    	if(flag == 1){
    		$("#cityList").css("display","block");
    	}else{
    		$("#cityList").css("display","none");
    	}
    }