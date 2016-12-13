/*<![CDATA[*/
var stationContainer = document.getElementById("stationcontent"); 
var gameIntro = document.getElementById("introduction");  
var videoContent = document.getElementById("videoContainer"); 

function streetMap(){// google street map api
		var streetGZ = document.createElement("div");
		streetGZ.id = "map";
		videoContent.setAttribute("style","display:none;");
		gameIntro.setAttribute("style","display:none;");
		stationContainer.insertBefore(streetGZ,videoContent);
		var panorama;
		(function initialize() {
			panorama = new google.maps.StreetViewPanorama(
				document.getElementById('map'),
				{
					position: {lat: 23.145052, lng: 113.256903},
					pov: {heading: -25, pitch: 10},
					disableDefaultUI: true,
					zoom: 1
				});
			subtitle("caption","<h1 style='margin-left:5%;width:70%;'>该往哪里走？先看看周边。。。<br/>使用鼠标拖拽街景可转换视角,点击跳动的箭头可直接进入广州站      </h1>",200,1);
			var arrowBounce = document.createElement("div");
			arrowBounce.id = "arrow";
			stationContainer.insertBefore(arrowBounce,streetGZ);
			var pov = panorama.getPov();
			var t = setInterval(function(){
				if(pov.heading >= -50 && pov.heading <= 75){
					$("#arrow").css("display","block");
				}else{
					$("#arrow").css("display","none");
				}
			},50);//setinterval
					function ballMap(){
						clearInterval(t);
						$("#stationcontent").css("background-image","none");
						$("#arrow").remove();
						$("#map").css("z-index","-1");
						$("#introduction").remove();
						document.getElementById("map").innerHTML = "";
						var canvasCt = document.createElement("canvas");
						canvasCt.id = "canvasBall";
						stationContainer.insertBefore(canvasCt,streetGZ);
						
						var map = new AMap.Map('map', {
							resizeEnable: false,
							zoomEnable:false,
							dragEnable: false,
							keyboardEnable:false,
							zoom:18,
							center: [113.257582,23.148728]
						});
						if (document.createElement('canvas') && document.createElement('canvas').getContext && document.createElement('canvas').getContext('2d')) {
						// 实例化3D楼块图层
						var buildings = new AMap.Buildings();
						// 在map中添加3D楼块图层
						buildings.setMap(map);
					}
					//控制小球移动
						function ballRoll(){
							var ctx;
							var c;
							var dx = 5, dy = 5;
							var x = 400;
							var y = 300;
							function init(){
								c = document.getElementById("canvasBall");
								ctx = c.getContext("2d");
								ctx.canvas.width  = window.innerWidth;
								ctx.canvas.height = window.innerHeight;
								function draw(){
									console.log("circle_____________");
								ctx.clearRect(0,0,WIDTH,HEIGHT);
								ctx.fillStyle = "transparent";
								ctx.strokeStyle = "black";
								rect(0,0,WIDTH,HEIGHT);
								ctx.fillStyle = "purple";
								circle(x,y,10);
								function hotspot(url,locateX,locateY){
									x = locateX; y = locateY;
									ctx.clearRect(0,0,WIDTH,HEIGHT);
									ctx.fillStyle = "transparent";
									ctx.strokeStyle = "black";
									rect(0,0,WIDTH,HEIGHT);
									ctx.fillStyle = "purple";
									circle(x,y,10);
									clearInterval(drawt);

									$("#videoContainer").css("display","block");
									$("#video0").css("display","block");
									$("#map").css("display","none");
									$("#canvasBall").css("display","none");

									document.getElementsByTagName("source")[0].setAttribute("src",url);
									video = document.getElementsByTagName("video")[0];
									video.load();
									video.play();
									console.log("hotspot______________");
									$("#video0").on("ended",function(){
										$("#stationcontent").css("background-image","none");
										$("#map").css("display","block");
										$("#canvasBall").css("display","block");
										console.log("drawwwwwwwwwwwwwwwwww___________________");
										drawt = setInterval(draw,10);
									})
								}//hotspot

								if(x >= 480 && x <= 570 && y >= 370 && y <= 450){
									leftQP = true;
									hotspot("img/02.mov",625,645);
								}
								if(x >= 830 && x <= 920 && y >= 530 && y <= 640){
									rightQP = true;
									hotspot("img/04.mov",625,645);
								}
								if(x >= 571 && x <= 612 && y >= 410 && y <= 480){
									anjian = true;
									hotspot("img/05.mov",625,645);	
								}
								if(x >= 620 && x <= 685 && y >= 445 && y <= 515){
									bigClock = true;
									hotspot("img/06.mov",625,645);
								}
							}//draw
								var drawt = setInterval(draw,10);
								return drawt;
							}//init
							init();
							var WIDTH = c.width;
							var HEIGHT = c.height;
							function circle(x,y,r) {
								ctx.beginPath();
								ctx.arc(x, y, r, 0, Math.PI*2, true);
								ctx.fill();
								}

								function rect(x,y,w,h) {
								ctx.beginPath();
								ctx.rect(x,y,w,h);
								ctx.closePath();
								ctx.fill();
								ctx.stroke();
								}
							function keyDown(evt){
								var WIDTH = document.getElementById("canvasBall").width;
								var HEIGHT = document.getElementById("canvasBall").height;
								switch(evt.keyCode){
									case 38://up
									if(y - dy >0){
										y -= dy;
									}
									break;
									case 40://down
									if(y + dy < HEIGHT){
										y += dy;
									}
									break;
									case 37://left
									if(x - dx >0){
										x -= dx;
									}
									break;
									case 39:
									if(x + dx < WIDTH){
										x += dx;
									}
									break;
								}
							}
							window.addEventListener('keydown',keyDown,true);
						}//ballRoll
						ballRoll(); 
						
					}//ballMap
					arrowBounce.addEventListener("click",ballMap,false);
				})();//initialize
				}//streetMap

function subtitle(id,subStr,time,p){//打字机函数
	var subobj = document.createElement("div");
	subobj.id = id;
	stationContainer.appendChild(subobj);
	
	//captext区域用于写字幕
	var capText = document.createElement("div");
	capText.id = "captext";
	document.getElementById(id).appendChild(capText);

	if(p){//skipvideo button用于跳过视频
	var skipVideo = document.createElement("button");
    skipVideo.id = "skipbutton";
    skipVideo.innerHTML = "跳过介绍";
    document.getElementById(id).appendChild(skipVideo);
    var videoClicked = false;
    function clickvideo(){
    	videoClicked = true;
    	video = document.getElementsByTagName("video")[0];
    	video.currentTime += 1000;
    }//clickvideo
    document.getElementById("skipbutton").addEventListener("click",clickvideo,false);
	}
	var i = 0, text = '', chara = '', isTag = 0;
	(function substring(){
		if(videoClicked){
			clearTimeout(t);
			$("#" + id).remove();
			videoClicked = false;
			return;
		}
		if(text === subStr) {
			console.log(subStr);
			clearTimeout(t);
			$("#" + id).remove();
			return;
		}else{
			text = subStr.slice(0,++i);
			chara = text.slice(-1);
			if(chara === "<") isTag = 1;
			if(chara === ">") isTag = 0;
			if(isTag) return substring();	
			console.log(text);
			document.getElementById("captext").innerHTML = text;
			var t = setTimeout(substring,time);
		}
	})()//substring
}//subtitle

$(document).ready(function(){
    $('#video0').on('ended',function(){
    	$("#video0").css("display","none");
    	$("#stationcontent").css("background-image","url('img/01.jpg')");
        $("#introduction").css("display","block");
    });

subtitle("caption","<h1 style='margin-left:5%;width:70%;'>广州火车站是很多人认识广州的第一站，自1974年投运以来，经历了42年风雨的广州火车站即将被改造为高铁站，老广的记忆也即将改头换面。值此大变之际，我们想走近一点，带您重新体验在广州火车站发生的故事。<br/>小组成员：何青秋 吴洁慧 莫博宇 张茜      </h1>",100,1);

function buttonClick(){// 点击开始游戏
	stationContainer.setAttribute("style","");
	$("#video0").css("display","block");
	$("#introduction").css("display","none");
	document.getElementsByTagName("source")[0].setAttribute("src","img/03.mov");
	video = document.getElementsByTagName("video")[0];
	video.load();
	video.play();
	$('#video0').on("ended",function(){
		$("#stationcontent").css("background-image","url('img/02.jpeg')");
	})
	subtitle("caption","<h1 style='margin-left:5%;width:70%;'>广州火车站就在眼前了，但是人好多，看起来走过去还要一段时间。。。</h1>",200,1);
	gameIntro.innerHTML = "<h1>请问您需要在火车站现场购票吗？</h1><button id='button1'>不用，已经打电话／在网上买好了</button><button id='button2'>需要去火车站现场买</button>";
	//如果不需要买票
	function button1Click(){

		gameIntro.innerHTML = "<h1>请问您需要在火车站现场取票吗？</h1><button id='button3'>不用，已经在取票点取好了</button><button id='button4'>需要去火车站现场取票</button>";
		//如果不需要取票
		function button3Click(){
			gameIntro.innerHTML = "<h1 style = 'float:right;width:50%;'>请问您乘坐的列车几点发车？</h1><div id = 'timepicker'></div>";
			function loadScript(url, callback){
			var script = document.createElement("script");
			script.src = url;
			document.getElementById("timepicker").appendChild(script);
			if(script.readyState){
				//适用于ie
				script.onreadystatechange = function(){
					if(script.readyState == "loaded" || script.readyState == "complete"){
						script.onreadystatechange = null;
						callback();
					}
				};
			}else {
				script.onload = function(){
					callback();
				};
			}	
		}//loadScript
		loadScript("js/timepicker.js",function(){
			function selectorTime(){
				$('div:contains("OK"):last').click(function(){
					var waitTime = 2;
					var hour = document.getElementById("hours").innerHTML;
					var minute = document.getElementById("minutes").innerHTML;
					var ampm = document.getElementById("apm").innerHTML;
					if(hour[0] == "0"){ hour = hour[1]; }
					if(ampm == "AM"){
						ampm = "上午";
					}else{
						ampm = "下午";
					}
					gameIntro.innerHTML = "<h1>您乘坐的是" + ampm + hour + "点"+ minute + "分" + "发车的列车，距离列车发车还有" + waitTime + "小时，请您控制小圆点在平面地图中移动去安检和候车，祝您旅途顺利！</h1><button onclick = 'streetMap()' class = 'mapbutton'>好的</button>";
				})
			}//slectorTIme
			setTimeout(selectorTime,1000);
			
		});

			/*document.getElementById("introduction").innerHTML = "<h1>看来您准备的很充分，节省了很多时间呢！接下来请您控制小圆点在平面地图中移动去安检。</h1><button class = 'mapbutton'>好的</button>";*/
		}
		document.getElementById("button3").addEventListener("click",button3Click,false);
		
		//如果需要取票
		function button4Click(){
			gameIntro.innerHTML = "<h1>请您控制小圆点在平面地图中移动去取票。</h1><button onclick = 'streetMap()' class = 'mapbutton'>好的</button>";
		}
		document.getElementById("button4").addEventListener("click",button4Click,false);
	
	}//button1Click
	document.getElementById("button1").addEventListener("click",button1Click,false);
	
	//如果需要买票
	function button2Click(){
		gameIntro.innerHTML = "<h1>请控制小圆点在平面地图中移动去售票处。</h1><button onclick = 'streetMap()' class = 'mapbutton'>好的</button>";
	}//button2Click
	document.getElementById("button2").addEventListener("click",button2Click,false);

}//buttonClick
document.getElementById("button0").addEventListener("click",buttonClick,false);
});/*]]>*/

