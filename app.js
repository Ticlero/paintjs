const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");


canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;
let rangeChanging = false;

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

if(canvas)
{
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

function handleColorClick(evnet){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    console.log(color);
}

Array.from(colors).forEach( (color) => {
    color.addEventListener("click", handleColorClick)
});

function handleRangeContorl(event){
    
}

range.addEventListener("mousedown", ()=>{
    rangeChanging = true;
});

range.addEventListener("mousemove", (event) =>{
    if(rangeChanging){
        const lineWidth = range.value;
        ctx.lineWidth = lineWidth;
    }
})

range.addEventListener("mouseup", ()=>{
    rangeChanging = false;
});

range.addEventListener("click", () =>{
    const lineWidth = range.value;
    ctx.lineWidth = lineWidth;
});
