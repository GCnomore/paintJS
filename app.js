const canvas = document.getElementById("jsCanvas"),
    body = document.getElementById("body"),
    ctx = canvas.getContext("2d"),
    color = document.getElementsByClassName("jsColor"),
    brushSize = document.getElementById("jsRange"),
    fillButton = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave");

let painting = false;

canvas.width = 600;
canvas.height = 600;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 600, 600);
ctx.strokeStyle = "#black";
ctx.fillStyle = "#black";
ctx.lineWidth = 3;
ctx.lineCap = "round";
ctx.lineJoin = "round";


function brushSizing(event){
    ctx.lineWidth = event.target.value;
}

function mouseUp(event){
    painting = false;
}

function startPainting(){
    painting = true;

}

function mouseMove(event) {
    const x = event.offsetX,
        y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function changeColor(event){
    const color = event.toElement.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function buttonChange (event){
    if (fillButton.innerText === "Fill"){
        fillButton.innerText = "Brush";
        
    } else {
        fillButton.innerText = "Fill";
        
    }
}

function fill (){
    if (fillButton.innerText === "Brush"){
        ctx.rect(0, 0, 600, 600);
        ctx.fill();
    }
}

function handleRightClick (event){
    event.preventDefault();
    alert("Oops! Right-click not allowed!");
}

function save (){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}


if (canvas){
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("click", fill);
    canvas.addEventListener("contextmenu", handleRightClick);
    
}
Array.from(color).forEach(color => color.addEventListener("click", changeColor));

if (brushSize){
    brushSize.addEventListener("input", brushSizing);
}

if (fillButton) {
    fillButton.addEventListener("click", buttonChange);
}

if (saveBtn){
    saveBtn.addEventListener("click", save);
}

