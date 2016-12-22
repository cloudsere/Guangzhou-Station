/*<![CDATA[*/
var stationContainer = document.getElementById("stationcontent"); 
var gameIntro = document.getElementById("introduction");  
var videoContent = document.getElementById("videoContainer"); 

function streetMap(){// google street map api
	var snd = new Audio("audio/2.mp3");
    snd.play();
	$("#stationcontent").css("background-image","none");
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
			subtitle("caption","<h1 style='margin-left:5%;width:70%;'>该往哪里走？先看看周边。。。<br/>使用鼠标拖拽街景可转换视角,点击跳动的箭头可直接进入广州站      </h1>",100,1);
			var arrowBounce = document.createElement("div");
			arrowBounce.id = "arrow";
			arrowBounce.innerHTML = "<br/><br/>进入<br/>";
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
						if(buyTicket){
							subtitle("caption","<h1 style='margin-left:5%;width:70%;'>您可以进入的是地图上的蓝色区域，您接下来要去售票窗口买票   </h1>",85,0,"#000000");
						}
						if(getTicket){
							subtitle("caption","<h1 style='margin-left:5%;width:70%;'>您可以进入的是地图上的蓝色区域，您接下来要去取票     </h1>",85,0,"#000000");
						}
						if(hadTicket){
							subtitle("caption","<h1 style='margin-left:5%;width:70%;'>您可以进入的是地图上的蓝色区域，您接下来要去排队安检     </h1>",85,0,"#000000");
						} 
						$("#stationcontent").css("background","none");
						$("#arrow").remove();
						document.getElementById("map").setAttribute("style","z-index:-1;background-image:url('img/map.png');background-repeat:no-repeat;");
						$("#introduction").remove();
						document.getElementById("map").innerHTML = "";
						var canvasCt = document.createElement("canvas");
						canvasCt.id = "canvasBall";
						stationContainer.insertBefore(canvasCt,streetGZ);
					//控制小球移动
						function ballRoll(){
							var ctx;
							var c;
							var dx = 5, dy = 5;
							var x = 400;
							var y = 700;
							var r = 10;
							function init(){
								c = document.getElementById("canvasBall");
								ctx = c.getContext("2d");
								ctx.canvas.width  = window.innerWidth;
								ctx.canvas.height = window.innerHeight;
								function draw(){
									console.log("circle_____________");
									ctx.clearRect(0,0,WIDTH,HEIGHT);
									ctx.fillStyle = "transparent";
									rect(0,0,WIDTH,HEIGHT);
									ctx.fillStyle = "red";
									circle(x,y,r);
								var anjian = false;//在取票或者买票以后，可以去安检
								function hotspot(url,locateX,locateY,str){
									x = locateX; y = locateY;
									ctx.clearRect(0,0,WIDTH,HEIGHT);
									ctx.fillStyle = "transparent";
									ctx.strokeStyle = "black";
									rect(0,0,WIDTH,HEIGHT);
									ctx.fillStyle = "red";
									circle(x,y,10);
									clearInterval(drawt);

									$("#videoContainer").css("display","block");
									$("#video2").css("display","block");
									$("#map").css("display","none");
									$("#canvasBall").css("display","none");

									document.getElementsByTagName("source")[0].setAttribute("src",url);
									video = document.getElementsByTagName("video")[0];
									video.load();
									video.play();
									subtitle("caption",str,100,1);
									console.log("hotspot______________");

										var skipVideo = document.createElement("button");
										skipVideo.id = "skipbutton";
										skipVideo.innerHTML = "跳过视频";
										stationContainer.insertBefore(skipVideo,canvasCt);
										function clickvideo(){
											$("#skipbutton").remove();
											video = document.getElementsByTagName("video")[0];
											video.currentTime += 1000;
											}//clickvideo
										document.getElementById("skipbutton").addEventListener("click",clickvideo,false);
										
									$("#video2").on("ended",function(){
										$("#skipbutton").remove();
										$("#stationcontent").css("background","none");
										$("#map").css("display","block");
										$("#canvasBall").css("display","block");
										if(anjian){
											subtitle("caption","<h1 style='margin-left:5%;width:70%;'>离列车发车的时间还有两小时，接下来请您去安检进站</h1>",100,1,"#000000");
											$("#clockdiv").css("display","inline-block");         
											var deadline = new Date(Date.parse(new Date()) +  2 * 60 * 60 * 1000);
											initializeClock('clockdiv', deadline);
										}
										drawt = setInterval(draw,10);
									})
								}//hotspot
								var str;
								if(x >= 232 && x <= 350 && y >= 291 && y <= 385){
									anjian = true;
									str = "<h1 style='margin-left:5%;width:70%;'>人太多了，去售票厅排队得花上不少时间。</h1>";
									hotspot("img/02.mov",625,645,str);
								}
								if(x >= 390 && x <= 454 && y >= 360 && y <= 445){
									str = "<h1 style='margin-left:5%;width:70%;'>安检也要做好冲锋的准备。。。</h1>";
									hotspot("img/04.mov",625,645,str);
								}
								if(x >= 531 && x <= 663 && y >= 436 && y <= 549){
									str = "<h1 style='margin-left:5%;width:70%;'>什么情况？？！！！</h1>";
									hotspot("img/05.mov",625,645,str);	
								}
								if(x >= 972 && x <= 1123 && y >= 654 && y <= 795){
									anjian = true;
									str = "<h1 style='margin-left:5%;width:70%;'>人太多了，去售票厅排队得花上不少时间。</h1>";
									hotspot("img/06.mov",625,645,str);
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
							}//keydown
							var draggable;
							function mousemove(e){
								mouseX = e.layerX - c.offsetLeft;
								mouseY = e.layerY - c.offsetTop;
								var dx = mouseX - x;
								var dy = mouseY - y;
								var dist = Math.sqrt((dx*dx) + (dy*dy));
								if(draggable && dist < r){         
									x = mouseX;
									y = mouseY;
								}
								}//mousemove
							function mousedown(){
								draggable = true;
							}
							function mouseup(){
								draggable = false;
							}

							window.addEventListener('keydown',keyDown,true);
							c.addEventListener("mousemove",mousemove);
							c.addEventListener("mousedown",mousedown);
							c.addEventListener("mouseup",mouseup);
						}//ballRoll
						ballRoll(); 
						
					}//ballMap
					arrowBounce.addEventListener("click",ballMap,false);
				})();//initialize
				}//streetMap
				
/*-----------------------------------------倒计时函数-----------------------------------------------------*/
function getTimeRemaining(endtime) {
                      var t = Date.parse(endtime) - Date.parse(new Date());
                      var seconds = Math.floor((t / 1000) % 60);
                      var minutes = Math.floor((t / 1000 / 60) % 60);
                      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                      return {
                        'total': t,
                        'hours': hours,
                        'minutes': minutes,
                        'seconds': seconds
                      };
                    }//getTimeRemaining  
function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	function updateClock() {
		var t = getTimeRemaining(endtime);
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}//updateClock
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}//initializeClock
/*-----------------------------------------打字机函数-----------------------------------------------------*/
function subtitle(id,subStr,time,p,bgcl){
	var subobj = document.createElement("div");
	subobj.id = id;
	subobj.style.background = bgcl;
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
    	video.currentTime += 10000;
    	$("video").css("display","none");
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
			if(document.getElementById("captext")){
				document.getElementById("captext").innerHTML = text;
			}else{
				document.getElementById(id).innerHTML = text;
			}
			var t = setTimeout(substring,time);
		}
	})()//substring
}//subtitle

/*-----------------------------------------------游戏开头-----------------------------------------------*/
var buyTicket = false;//定义三个变量描述要去火车站现场买票、要现场取票和已经有票直接安检的三种情况
var getTicket = false;
var hadTicket = false;
var playMusic = false;
$(document).ready(function(){
    $('#video0').on('ended',function(){
    	$("#video0").css("display","none");
    	$("#video0").attr("id","video1");
    	function svganimated(id,str){
			var path = document.getElementById(id);
			if(!path) return;
			var length = path.getTotalLength();
			console.log(id + "," +length);
			path.style.transition = path.style.WebkitTransition ='none';
			path.style.strokeDasharray = length + ' ' + length;
			path.style.strokeDashoffset = length;
			path.getBoundingClientRect();
			if(str){
				path.style.transition  = str;
			}else{
				path.style.transition = 'stroke-dashoffset 3s ease-in-out';
			}
			path.style.strokeDashoffset = '0';
		}//svganimated
    	
    	if(!playMusic){
    		var svgCt = document.getElementById("startsvg");
    		var snd = new Audio("audio/1.wav");
    		snd.play();
    		$("#startsvg").css("display","block");
    		svganimated("guang");
			svganimated("zhou");
			svganimated("zhan");
			svganimated("gan",'stroke-dashoffset 2s ease-in-out');
			svganimated("che",'stroke-dashoffset 2s ease-in-out');
			svganimated("li");
			svganimated("xian");
			svganimated("ji");
    		if(svgCt){
    			snd.addEventListener('ended',function(){
    				$("#startsvg").remove();
    				$("#stationcontent").css("background-image","url('img/01.jpg')");
    				$("#introduction").css("display","block");
    			})
    		}
    	}
    	playMusic = true;
    });

subtitle("caption","<h1 style='margin-left:5%;width:70%;'>广州火车站是很多人认识广州的第一站，自1974年投运以来，经历了42年风雨的广州火车站即将被改造为高铁站，老广的记忆也即将改头换面。值此大变之际，我们想走近一点，带您重新体验在广州火车站发生的故事。<br/>小组成员：何青秋 吴洁慧 莫博宇 张茜      </h1>",85,1,"#000000");

function buttonClick(){// 点击开始游戏
	var snd = new Audio("audio/2.mp3");
    snd.play();
	$("#stationcontent").css("background","none");
	$("#introduction").css("display","none");
	$("#video1").css("display","block");
	document.getElementsByTagName("source")[0].setAttribute("src","img/zhunbeisc.mov");
	video = document.getElementById("video1");
	video.load();
	video.play();
	$('#video1').on("ended",function(){
		$("#video1").css("display","none");
		$("#video1").attr("id","video2");
		document.getElementById("stationcontent").setAttribute("style","background-image:url('img/02.jpeg')");
		$("#introduction").css("display","block");
	})
	subtitle("caption","<h1 style='margin-left:5%;width:70%;'>广州火车站就在眼前了，但是人好多，看起来走过去还要一段时间。。。</h1>",100,1);
	gameIntro.innerHTML = "<h1>请问您要去取票还是买票？</h1><button id='button1' class = 'introbt'>需要去火车站取票</button><button id='button2' class = 'introbt'>需要去火车站现场买</button>";
/*-----------------------------------------------取票的场合-----------------------------------------------*/
	function button1Click(){//如果需要取票
		var snd = new Audio("audio/2.mp3");
    	snd.play();
    	var imgBG = document.createElement("div");
    	imgBG.id = "imgstart";
    	stationContainer.insertBefore(imgBG,videoContent);
    	imgBG.innerHTML = "<img src = 'img/qupiao.jpg'><ul><li id = 'qupiao1'><a></a></ul><ul><li id = 'qupiao2'><a></a></ul>";
		/*gameIntro.innerHTML = "<h1>请问您需要在火车站现场取票吗？</h1><button id='button3' class = 'introbt'>不用，已经在取票点取好了</button><button id='button4' class = 'introbt'>需要去火车站现场取票</button>";*/
		//如果不需要取票
		function qupiao1Click(){
			var snd = new Audio("audio/2.mp3");
    		snd.play();
			hadTicket = true;
			subtitle("caption","<h1 style='margin-left:5%;width:70%;'>您开始排队取票，在排队20分钟后，您顺利取到了火车票，请您按照车票信息，选择相应的安检口安检进站。</h1>",100,1,"#000000");
			selectAnjian();
		/*gameIntro.innerHTML = "<h1 style = 'float:right;width:50%;'>请问您乘坐的列车几点发车？</h1><div id = 'timepicker'></div>";*/
		/*function loadScript(url, callback){
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
					$("#clockdiv").css("display","inline-block");                  
                    var deadline = new Date(Date.parse(new Date()) +  2 * 60 * 60 * 1000);
                    initializeClock('clockdiv', deadline);
					gameIntro.innerHTML = "<h1>您乘坐的是" + ampm + hour + "点"+ minute + "分" + "发车的列车，距离列车发车还有" + waitTime + "小时，请您控制小圆点在平面地图中移动去安检和候车，祝您旅途顺利！</h1><button onclick = 'streetMap()' class = 'mapbutton'>好的</button>";
				})
			}//slectorTIme
			setTimeout(selectorTime,1000);	
		});*/
		/*document.getElementById("introduction").innerHTML = "<h1>看来您准备的很充分，节省了很多时间呢！接下来请您控制小圆点在平面地图中移动去安检。</h1><button class = 'mapbutton'>好的</button>";*/
		}//qupiao1Click
		document.getElementById("qupiao1").addEventListener("click",qupiao1Click,false);
		function qupiao2Click(){
			var snd = new Audio("audio/2.mp3");
    		snd.play();
    		subtitle("caption","<h1 style='margin-left:5%;width:70%;'>您开始排队取票，在排队20分钟后，终于轮到你取票了！可是，怎么身份证信息刷不出来了？？？奋斗10分钟后，你只能无奈的接受这台机器突然坏了的事实，请您换一台机器重新取票</h1>",100,1,"#000000");
		}//qupiao2Click
		document.getElementById("qupiao2").addEventListener("click",qupiao1Click,false);
	}//button1Click
	document.getElementById("button1").addEventListener("click",button1Click,false);
/*-----------------------------------------------买票的场合-----------------------------------------------*/
	function button2Click(){
		var snd = new Audio("audio/2.mp3");
    	snd.play();
		buyTicket = true;
		gameIntro.innerHTML = "<h1>请控制小圆点在平面地图中移动去售票处。</h1><button onclick = 'streetMap()' class = 'mapbutton'>好的</button>";
	}//button2Click
	document.getElementById("button2").addEventListener("click",button2Click,false);
/*-----------------------------------------------安检的场合-----------------------------------------------*/
	function selectAnjian(){
		var imgBG = document.createElement("div");
    	imgBG.id = "imgstart";
    	stationContainer.insertBefore(imgBG,videoContent);
    	imgBG.innerHTML = "<img src = 'img/maipiao.jpg'><ul><li id = 'anjian1'><a></a></ul><ul><li id = 'anjian2'><a></a></ul>";
    	function anjian1Click(){
    		subtitle("caption","<h1 style='margin-left:5%;width:70%;'>人好多，不要再往前面挤了啊！！要跌倒了。。。<br/>「啊。。。。」您听到不远处传来一声惨叫，但还没等你回头仔细查看，后面的人又把你往前推了很远。</h1>",100,1,"#000000");
    	}
    	document.getElementById("anjian1").addEventListener("click",anjian1Click,false);
    	function anjian2Click(){
    		subtitle("caption","<h1 style='margin-left:5%;width:70%;'>「快跑！！」你正站着排队，前面的人却突然乱作一团，几个人人边跑过来边对你大喊<br>你还没有反应过来，只见有人拿着刀向你的方向跑来。。。。</h1>",100,1,"#000000");	
    		document.getElementsByTagName("source")[0].setAttribute("src","img/zhunbeisc.mov");
    		video = document.getElementById("video1");
    		video.load();
    		video.play();
    	}
    	document.getElementById("anjian2").addEventListener("click",anjian2Click,false);
    	function anjian3Click(){
    		subtitle("caption","<h1 style='margin-left:5%;width:70%;'>你正无聊的排着队，一位大哥走过来对你说「100块带你快速进站，走不？」你很犹豫。。</h1>",100,1,"#000000");
    		gameIntro.innerHTML = "<h1>是否花钱快速进站？</h1><button id='button3' class = 'introbt'>排队没有尽头，就花点钱吧</button><button id='button4' class = 'introbt'>这个人看上去好可疑，果断拒绝</button>";
    	}
    	document.getElementById("anjian3").addEventListener("click",anjian3Click,false);
	}//selectAnjian
/*-----------------------------------------------安检的场合-----------------------------------------------*/
	function houche(){
		subtitle("caption","<h1 style='margin-left:5%;width:70%;'>胜利就在眼前！折腾了这么久也累了，去候车室坐着休息一下吧</h1>",100,1,"#000000");
		gameIntro.innerHTML = "<h1>请选择候车室</h1><button id='button5' class = 'introbt'>1号候车室</button><button id='button6' class = 'introbt'>2号候车室</button>";
	}//houche
}//buttonClick
document.getElementById("button0").addEventListener("click",buttonClick,false);
});/*]]>*/

