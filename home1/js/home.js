/* Smooth Scroll Start */$(function(){$('a[href*=#]:not([href=#])').click(function(){if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
var target=$(this.hash);  target=target.length ? target : $('[name=' + this.hash.slice(1) +']');
if (target.length){$('html,body').animate({scrollTop: target.offset().top}, 1000);
return false;}}});});(function(){var defaultOptions={frameRate:150,animationTime:400,stepSize:120,pulseAlgorithm:true,pulseScale:8,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:true,arrowScroll:50,touchpadSupport:true,fixedBackground:true,excluded:""};
var options=defaultOptions;var isExcluded=false;var isFrame=false;var direction={x:0,y:0};var initDone=false;var root=document.documentElement;var activeElement;var observer;var deltaBuffer=[120,120,120];var key={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};var options=defaultOptions;options.frameRate=150;options.animationTime=1800;options.stepSize=85;function initTest(){var disableKeyboard=false;if(disableKeyboard){removeEvent("keydown",keydown);}
if(options.keyboardSupport&&!disableKeyboard){addEvent("keydown",keydown);}}
function init(){if(!document.body)return;var body=document.body;var html=document.documentElement;var windowHeight=window.innerHeight;var scrollHeight=body.scrollHeight;root=(document.compatMode.indexOf('CSS')>=0)?html:body;activeElement=body;initTest();initDone=true;if(top!=self){isFrame=true;}
else if(scrollHeight>windowHeight&&(body.offsetHeight<=windowHeight||html.offsetHeight<=windowHeight)){var pending=false;var refresh=function(){if(!pending&&html.scrollHeight!=document.height){pending=true;setTimeout(function(){html.style.height=document.height+'px';pending=false;},500);}};html.style.height='auto';setTimeout(refresh,10);if(root.offsetHeight<=windowHeight){var underlay=document.createElement("div");underlay.style.clear="both";body.appendChild(underlay);}}
if(!options.fixedBackground&&!isExcluded){body.style.backgroundAttachment="scroll";html.style.backgroundAttachment="scroll";}}
var que=[];var pending=false;var lastScroll=+new Date;function scrollArray(elem,left,top,delay){delay||(delay=1000);directionCheck(left,top);if(options.accelerationMax!=1){var now=+new Date;var elapsed=now- lastScroll;if(elapsed<options.accelerationDelta){var factor=(1+(30/elapsed))/ 2;
if(factor>1){factor=Math.min(factor,options.accelerationMax);left*=factor;top*=factor;}}
lastScroll=+new Date;}
que.push({x:left,y:top,lastX:(left<0)?0.99:-0.99,lastY:(top<0)?0.99:-0.99,start:+new Date});if(pending){return;}
var scrollWindow=(elem===document.body);var step=function(time){var now=+new Date;var scrollX=0;var scrollY=0;for(var i=0;i<que.length;i++){var item=que[i];var elapsed=now- item.start;var finished=(elapsed>=options.animationTime);var position=(finished)?1:elapsed/options.animationTime;if(options.pulseAlgorithm){position=pulse(position);}
var x=(item.x*position- item.lastX)>>0;var y=(item.y*position- item.lastY)>>0;scrollX+=x;scrollY+=y;item.lastX+=x;item.lastY+=y;if(finished){que.splice(i,1);i--;}}
if(scrollWindow){window.scrollBy(scrollX,scrollY);}
else{if(scrollX)elem.scrollLeft+=scrollX;if(scrollY)elem.scrollTop+=scrollY;}
if(!left&&!top){que=[];}
if(que.length){requestFrame(step,elem,(delay/options.frameRate+ 1));}else{pending=false;}};requestFrame(step,elem,0);pending=true;}
function wheel(event){if(!initDone){init();}
var target=event.target;var overflowing=overflowingAncestor(target);if(!overflowing||event.defaultPrevented||isNodeName(activeElement,"embed")||(isNodeName(target,"embed")&&/\.pdf/i.test(target.src))){return true;}
var deltaX=event.wheelDeltaX||0;var deltaY=event.wheelDeltaY||0;if(!deltaX&&!deltaY){deltaY=event.wheelDelta||0;}
if(!options.touchpadSupport&&isTouchpad(deltaY)){return true;}
if(Math.abs(deltaX)>1.2){deltaX*=options.stepSize/120;}
if(Math.abs(deltaY)>1.2){deltaY*=options.stepSize/120;}
scrollArray(overflowing,-deltaX,-deltaY);event.preventDefault();}
function keydown(event){var target=event.target;var modifier=event.ctrlKey||event.altKey||event.metaKey||(event.shiftKey&&event.keyCode!==key.spacebar);if(/input|textarea|select|embed/i.test(target.nodeName)||target.isContentEditable||event.defaultPrevented||modifier){return true;}
if(isNodeName(target,"button")&&event.keyCode===key.spacebar){return true;}
var shift,x=0,y=0;var elem=overflowingAncestor(activeElement);var clientHeight=elem.clientHeight;if(elem==document.body){clientHeight=window.innerHeight;}
switch(event.keyCode){case key.up:y=-options.arrowScroll;break;case key.down:y=options.arrowScroll;break;case key.spacebar:shift=event.shiftKey?1:-1;y=-shift*clientHeight*0.9;break;case key.pageup:y=-clientHeight*0.9;break;case key.pagedown:y=clientHeight*0.9;break;case key.home:y=-elem.scrollTop;break;case key.end:var damt=elem.scrollHeight- elem.scrollTop- clientHeight;y=(damt>0)?damt+ 10:0;break;case key.left:x=-options.arrowScroll;break;case key.right:x=options.arrowScroll;break;default:return true;}
scrollArray(elem,x,y);event.preventDefault();}
function mousedown(event){activeElement=event.target;}
var cache={};setInterval(function(){cache={};},10*1000);var uniqueID=(function(){var i=0;return function(el){return el.uniqueID||(el.uniqueID=i++);};})();function setCache(elems,overflowing){for(var i=elems.length;i--;)
cache[uniqueID(elems[i])]=overflowing;return overflowing;}
function overflowingAncestor(el){var elems=[];var rootScrollHeight=root.scrollHeight;do{var cached=cache[uniqueID(el)];if(cached){return setCache(elems,cached);}
elems.push(el);if(rootScrollHeight===el.scrollHeight){if(!isFrame||root.clientHeight+ 10<rootScrollHeight){return setCache(elems,document.body);}}else if(el.clientHeight+ 10<el.scrollHeight){overflow=getComputedStyle(el,"").getPropertyValue("overflow-y");if(overflow==="scroll"||overflow==="auto"){return setCache(elems,el);}}}while(el=el.parentNode);}
function addEvent(type,fn,bubble){window.addEventListener(type,fn,(bubble||false));}
function removeEvent(type,fn,bubble){window.removeEventListener(type,fn,(bubble||false));}
function isNodeName(el,tag){return(el.nodeName||"").toLowerCase()===tag.toLowerCase();}
function directionCheck(x,y){x=(x>0)?1:-1;y=(y>0)?1:-1;if(direction.x!==x||direction.y!==y){direction.x=x;direction.y=y;que=[];lastScroll=0;}}
var deltaBufferTimer;function isTouchpad(deltaY){if(!deltaY)return;deltaY=Math.abs(deltaY)
deltaBuffer.push(deltaY);deltaBuffer.shift();clearTimeout(deltaBufferTimer);var allDivisable=(isDivisible(deltaBuffer[0],120)&&isDivisible(deltaBuffer[1],120)&&isDivisible(deltaBuffer[2],120));return!allDivisable;}
function isDivisible(n,divisor){return(Math.floor(n/divisor)==n/divisor);}
var requestFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(callback,element,delay){window.setTimeout(callback,delay||(1000/60));};})();function pulse_(x){var val,start,expx;x=x*options.pulseScale;if(x<1){val=x-(1- Math.exp(-x));}else{start=Math.exp(-1);x-=1;expx=1- Math.exp(-x);val=start+(expx*(1- start));}
return val*options.pulseNormalize;}
function pulse(x){if(x>=1)return 1;if(x<=0)return 0;if(options.pulseNormalize==1){options.pulseNormalize/=pulse_(1);}
return pulse_(x);}
var isChrome=/chrome/i.test(window.navigator.userAgent);var wheelEvent=null;if("onwheel"in document.createElement("div"))
wheelEvent="wheel";else if("onmousewheel"in document.createElement("div"))
wheelEvent="mousewheel";if(wheelEvent&&isChrome){addEvent(wheelEvent,wheel);addEvent("mousedown",mousedown);addEvent("load",init);}})();
/* Smooth Scroll End */

$(function() {
  $('#search').click(function() {
    $('.side-nav').css('opacity', '0.5');
    $('#page-wrapper').css('opacity', '0.8');
    $('.side-nav').css('transition', 'opacity 0.15s linear');
    $('#page-wrapper').css('transition', 'opacity 0.15s linear');
  });
  $('.side-nav').click(function() {
    $('.side-nav').css('opacity', '1');
    $('#page-wrapper').css('opacity', '1');
  });
  $('#page-wrapper').click(function() {
    $('.side-nav').css('opacity', '1');
    $('#page-wrapper').css('opacity', '1');
  });
  $(a).click(function() {
    $('.side-nav').css('opacity', '1');
    $('#page-wrapper').css('opacity', '1');
  });

});

$(window).load(function(){
    $('.list-group-item>img').on('click',function() {
      var sr=$(this).attr('src');
      $('#modalImg').attr('src',sr);
      $('#downloadLink').attr('href',sr);
    });
    $('.list-group-item').on('click',function() {
      var sr=$('img',this).attr('src');
      $('#modalImg').attr('src',sr);
      $('#downloadLink').attr('href',sr);
    });
});

function codeAddress() {
var x = new XMLHttpRequest();
x.open("GET", "http://zakimonkey.com/test5.php?key=97724fe69733fdbf16bfd18725b2531e", true);
x.onreadystatechange = function () {
if (x.readyState == 4 && x.status == 200) {
    var doc = x.responseXML;
	for (var i = 0; i<4; i++) {
        var idd = "pan["+i+"]";
	    var title = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("title")[0].firstChild.nodeValue;
	    var link = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("link")[0].firstChild.nodeValue;
	    var pubdate = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue;
        document.getElementById(idd).innerHTML = "<a href=\""+link+"\"><b>"+title+"</b></a><i><span class=\"pull-right text-muted small\">"+pubdate+"</span></i>";
    };
}
};
x.send(null);
var y = new XMLHttpRequest();
y.open("GET", "http://zakimonkey.com/test5.php?key=87ee709a5c38bdbdb52638dd708dcf3f", true);
y.onreadystatechange = function () {
if (y.readyState == 4 && y.status == 200) {
    var doc = y.responseXML;
    for (var i = 0; i<4; i++) {
        var idd = "prac["+i+"]";
		var title = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var link = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("link")[0].firstChild.nodeValue;
		var pubdate = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue;
        document.getElementById(idd).innerHTML = "<a href=\""+link+"\"><b>"+title+"</b></a><i><span class=\"pull-right text-muted small\">"+pubdate+"</span></i>";
    };
}
};
y.send(null);
var z = new XMLHttpRequest();
z.open("GET", "http://zakimonkey.com/test5.php?key=7422a7f671b78319371a87dbf4df22db", true);
z.onreadystatechange = function () {
if (z.readyState == 4 && z.status == 200) {
    var doc = z.responseXML;
    for (var i = 0; i<2; i++) {
        var idd = "pedia["+i+"]";
		var title = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var link = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("link")[0].firstChild.nodeValue;
		var pubdate = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue;
		var creator = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("creator")[0].firstChild.nodeValue;
		var category = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("category")[0].firstChild.nodeValue;
		var description = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[i].getElementsByTagName("description")[0].firstChild.nodeValue;
        document.getElementById(idd).innerHTML = "<h3 class=\"wow fadeIn\" data-wow-delay=\"600ms\"><a href=\""+link+"\">"+title+"</a></h3><div class=\"col-xs-3 wow fadeIn\" data-wow-delay=\"700ms\" style=\"text-align: center;\"><small><a href=\""+link+"\"><i class=\"fa fa-calendar\"></i> "+pubdate+"</a></small></div><div class=\"col-xs-3 wow fadeIn\" data-wow-delay=\"800ms\" style=\"text-align: center;\"><small><a href=\"\"><i class=\"fa fa-user\"></i> "+creator+"</a></small></div><div class=\"col-xs-3 wow fadeIn\" data-wow-delay=\"900ms\" style=\"text-align: center;\"><small><a href=\""+link+"#comments\"><i class=\"fa fa-comments\"></i> 53 Comments</a></small></div><div class=\"col-xs-3 wow fadeIn\" data-wow-delay=\"1000ms\" style=\"text-align: center;\"><small><a href=\"http://nsitpedia.collegespace.in/category/blog/\"><i class=\"fa fa-folder-o\"></i> Blog-</a><a href=\"\">"+category+"</a></small></div><p class=\"wow fadeIn\" data-wow-delay=\"1200ms\">"+description+"</p>";
    };
}
};
z.send(null);
}
window.onload = codeAddress;