const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const INITAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(evnet){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handleCM(event){
    event.preventDefault();
}

if(canvas)
{
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function handleColorClick(evnet){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

Array.from(colors).forEach( (color) => {
    color.addEventListener("click", handleColorClick)
});

function handleRangeContorl(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    }else{
        filling = true;
        mode.innerText ="paint";
        ctx.fillStyle
    }
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(range){
    range.addEventListener("input", handleRangeContorl);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}
// range.addEventListener("mousedown", ()=>{
//     rangeChanging = true;
// });

// range.addEventListener("mousemove", () =>{
//     if(rangeChanging){
//         const lineWidth = range.value;
//         ctx.lineWidth = lineWidth;
//     }
// })

// range.addEventListener("mouseup", ()=>{
//     rangeChanging = false;
// });

// range.addEventListener("click", () =>{
//     const lineWidth = range.value;
//     ctx.lineWidth = lineWidth;
// });
