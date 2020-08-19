// import "./styles/index.scss";

// DOM Elements
const canvas = document.getElementById("canvasId");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jscolor");
const myColorContorls = document.querySelector("#jsMyColorControl");
const myColor = document.querySelector("#jsMyColor");
const range = document.getElementById("range"); // id="range"
const mode = document.getElementById("mode");
const save = document.getElementById("save");
const resetBtn = document.querySelector("#jsReset");
const resizeBtn = document.querySelector("#jsResize");
const widthControls = document.querySelector("#jsWidth");
const heightControls = document.querySelector("#jsHeight");

// Const
const INITIAL_COLOR = "black";
const BTN_CLICKED_CN = "controls__color__clicked";
const INITIAL_BG_COLOR = "white";
const INITIAL_LINE_WIDTH = 5.0;

// Variables
let canvasWidth = 600;
let canvasHeight = 500;
let painting = false;
let filling = false;

const initSetting = () => {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillStyle = INITIAL_BG_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = INITIAL_COLOR;
  ctx.fillStyle = INITIAL_COLOR;
  ctx.lineWidth = INITIAL_LINE_WIDTH;

  range.value = INITIAL_LINE_WIDTH;
  filling = false;
  mode.innerText = "FILL";

  Array.from(colors).forEach((color) => {
    color.classList.remove(BTN_CLICKED_CN);
  });
  Array.from(colors)[0].classList.add(BTN_CLICKED_CN);
};

const initEvent = () => {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
  }

  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );

  if (range) {
    range.addEventListener("input", handleRangeChange);
  }

  if (mode) {
    mode.addEventListener("click", handleModeClick);
  }

  if (save) {
    save.addEventListener("click", handleSaveClick);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", handleResetClick);
  }

  if (myColorContorls) {
    myColorContorls.addEventListener("change", handleMyColorChange);
  }

  if (resizeBtn) {
    resizeBtn.addEventListener("click", handleResizeClick);
  }
};

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(e) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
    // ctx.closePath();
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  // Set all button unclicked
  Array.from(colors).forEach((color) => {
    color.classList.remove(BTN_CLICKED_CN);
  });
  // Set clicked button clicked
  e.target.classList.add(BTN_CLICKED_CN);
}

function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}

function handleCM(e) {
  e.preventDefault(); // right click menu won't show up
}

function handleSaveClick() {
  // const image = canvas.toDataURL("image/jpeg"); //png by default
  const image = canvas.toDataURL(); //png by default
  const link = document.createElement("a"); // create an a tag with the link of the image as "download" attr
  link.href = image;
  link.download = "🎨JSPaintCanvas";
  link.click();
}

function handleResetClick() {
  initSetting();
}

function handleMyColorChange(e) {
  const color = e.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  myColor.style.backgroundColor = color;
}

function handleResizeClick(e) {
  if (widthControls.value > window.innerWidth) {
    alert("Too Large");
  } else {
    // canvas.style.width = widthControls.value + "px";
    // canvas.style.height = heightControls.value + "px";
    
    canvasWidth = widthControls.value;
    canvasHeight = heightControls.value;
    initSetting();
  }
}

initSetting();
initEvent();
