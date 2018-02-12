document.addEventListener("DOMContentLoaded", () => {
  const worldCanvas = document.getElementById("world");

  const ctx = worldCanvas.getContext("2d");

  ctx.fillStyle = "red"; 
  ctx.fillRect(20,20,50,100); 

  //draw centered text 
  ctx.fillStyle = "black"; 
  ctx.font = "24pt sans-serif"; 
  var text = "Hello Canvas World"; 
  var metrics = ctx.measureText(text); 
  ctx.fillText(text, 250-metrics.width/2, 400); 
 
  
});


