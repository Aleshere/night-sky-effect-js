var cvs = document.getElementById("nightsky"),
    context = cvs.getContext("2d");

var traces = false;
 
document.body.appendChild(cvs);

cvs.addEventListener("mouseover",function(){
           traces = true;
        });

 cvs.addEventListener("mouseout",function(){
            traces = false;
        });


var numDots = 300,
    n = numDots,
    currDot,
    maxRad = 900,
    minRad = 100,
    radDiff = maxRad-minRad,
    dots = [],
    PI = Math.PI,
    centerPt = {x:0, y:0};

resizeHandler();
window.onresize = resizeHandler;

while(n--){
  currDot = {};
  currDot.radius = minRad+Math.random()*radDiff;
  currDot.radiusV = 0+Math.random()*200,
  currDot.radiusVS = (0.5-Math.random()*10)*0.00000005,
  currDot.radiusVP = Math.random()*0,
  currDot.ang = (1-Math.random()*2)*PI;
  currDot.speed = (1+Math.random()*0);
  //currDot.speed = 1-Math.round(Math.random())*2;
  //currDot.speed = 1;
  currDot.intensityP = Math.random()*PI;
  currDot.intensityS = Math.random()*0.0005;
  currDot.intensityO = 64+Math.round(Math.random()*64);
  currDot.intensityV = Math.min(Math.random()*255,currDot.intensityO);
  currDot.intensity = Math.round(Math.random()*255);
  currDot.fillColor = "rgb("+currDot.intensity+","+currDot.intensity+","+currDot.intensity+")";
  dots.push(currDot);
}

function drawPoints(){
  n = numDots;
  var _centerPt = centerPt,
      _context = context,
      dX = 0,
      dY = 0;
  if (!traces) {
   _context.clearRect(0, 0, cvs.width, cvs.height);
  }
  var radDiff;
  
  //draw dots
  while(n--){
    currDot = dots[n];
    currDot.radiusVP += currDot.radiusVS;
    radDiff = currDot.radius+Math.sin(currDot.radiusVP)*currDot.radiusV;
    dX = _centerPt.x+Math.sin(currDot.ang)*radDiff;
    dY = _centerPt.y+Math.cos(currDot.ang)*radDiff;
    
    //currDot.ang += currDot.speed;
    currDot.ang += currDot.speed*radDiff/400000;
    currDot.intensityP += currDot.intensityS;
    currDot.intensity = Math.round(currDot.intensityO+Math.sin(currDot.intensityP)*currDot.intensityV);
    
    //console.log(currDot);
    
    _context.beginPath();
    _context.strokeStyle= "rgb("+currDot.intensity+","+currDot.intensity+","+currDot.intensity+")";;
    _context.fillStyle= "rgb("+currDot.intensity+","+currDot.intensity+","+currDot.intensity+")";;
_context.arc(dX, dY, 0.5, 0, Math.PI * 2);
_context.stroke(); 
    
  } 
  
  //draw dot
  window.requestAnimationFrame(drawPoints);
}

function resizeHandler(){
  var box = cvs.getBoundingClientRect();
  var w = box.width;
  var h = box.height;
  cvs.width = w;
  cvs.height = h;
  centerPt.x = Math.round(w/2);
  centerPt.y = Math.round(h/2);
}

drawPoints();


