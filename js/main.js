/*<![CDATA[*/
$(document).ready(function(){
    $('#video0').on('ended',function(){
        $("#introduction").css("display","block");
    });
    
function subtitle(id,subStr,time){
	var subobj = document.createElement("div");
	subobj.id = id;
	document.getElementById("stationcontent").appendChild(subobj);
	
	//captext区域用于写字幕
	var capText = document.createElement("div");
	capText.id = "captext";
	document.getElementById(id).appendChild(capText);

	//skipvideo button用于跳过视频
	var skipVideo = document.createElement("button");
    skipVideo.id = "skipbutton";
    skipVideo.style = "position:absolute;top:55%;left:65%;";
    skipVideo.innerHTML = "Skip Video";
    document.getElementById(id).appendChild(skipVideo);
    var videoClicked = false;
    function clickvideo(){
    	videoClicked = true;
    	video = document.getElementsByTagName("video")[0];
    	video.currentTime += 1000;
    }//clickvideo
    document.getElementById("skipbutton").addEventListener("click",clickvideo,false);

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
subtitle("caption","<h1 style='margin-left:5%;width:70%;'>广州火车站是很多人认识广州的第一站，自1974年投运以来，经历了42年风雨的广州火车站即将被改造为高铁站，老广的记忆也即将改头换面。值此大变之际，我们想走近一点，带您重新体验在广州火车站发生的故事。<br/>小组成员：何青秋 吴洁慧 莫博宇 张茜      </h1>",100);

function buttonClick(){// 点击开始游戏
	$("#introduction").css("display","none");
	document.getElementsByTagName("source")[0].setAttribute("src","img/03.mov");
	video = document.getElementsByTagName("video")[0];
	video.load();
	video.play();
	subtitle("caption","<h1 style='margin-left:5%;width:70%;'>广州火车站就在眼前了，但是人好多，看上去走过去还要一段时间。。。</h1>",200);
	document.getElementById("introduction").innerHTML = "<h1>请问您需要在火车站现场购票吗？</h1><button id='button1'>不用，已经打电话／在网上买好了</button><button id='button2'>需要去火车站现场买</button>";
	//如果不需要买票
	function button1Click(){
		document.getElementById("introduction").innerHTML = "<h1>请问您需要在火车站现场取票吗？</h1><button id='button3'>不用，已经在取票点取好了</button><button id='button4'>需要去火车站现场取票</button>";
		//如果不需要取票
		function button3Click(){

			document.getElementById("introduction").innerHTML = "<h1>看来您准备的很充分，节省了很多时间呢！接下来请您控制小圆点在平面地图中移动去安检。</h1><button class = 'mapbutton'>好的</button>";
		}
		document.getElementById("button3").addEventListener("click",button3Click,false);
		//如果需要取票
		function button4Click(){
			document.getElementById("introduction").innerHTML = "<h1>请您控制小圆点在平面地图中移动去取票。</h1><button class = 'mapbutton'>好的</button>";
		}
		document.getElementById("button4").addEventListener("click",button4Click,false);
	}//button1Click
	document.getElementById("button1").addEventListener("click",button1Click,false);
	
	//如果需要买票
	function button2Click(){
		document.getElementById("introduction").innerHTML = "<h1>请控制小圆点在平面地图中移动去售票处。</h1><button class = 'mapbutton'>好的</button>";
	}//button2Click
	document.getElementById("button2").addEventListener("click",button2Click,false);
}//buttonClick
document.getElementById("button0").addEventListener("click",buttonClick,false);
});/*]]>*/

