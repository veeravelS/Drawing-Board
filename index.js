let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;
console.log("hello");
let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);
let drawColor = "black";
let drawWidth = 2;
let isDrawing = false;
let undo_array = [];
index = -1;
let redo_array = [];

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function change_color(element) {
  drawColor = element.style.background;
}

function start(e) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  e.preventDefault();
}

function draw(e) {
  if (isDrawing) {
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.strokeStyle = drawColor;
    context.lineWidth = drawWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
}

function stop(e) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }
  e.preventDefault();

  if (e.type != "mouseout") {
    undo_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    /* console.log(undo_array); */
  }
}

function undo() {
  if (undo_array.length > 0) {
    redo_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(undo_array.length>1){
    context.putImageData(undo_array[undo_array.length-2], 0, 0);
    console.log("undo", undo_array);
    console.log("redo", redo_array);
    }
    else{
      context.fillStyle = start_background_color
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    undo_array.pop();
  } 
  }


function redo() {
  if (redo_array.length > 0) {
    undo_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(redo_array.pop(), 0, 0);
  }
}

function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  undo_array = [];
  redo_array = [];
}

console.log(undo_array);
console.log(redo_array)
