const canvas=document.querySelector(".convas"),color=document.querySelector(".control__color");
const colors=document.querySelectorAll(".control__color"),range=document.querySelector("#js-range");
const mode=document.querySelector("#jsMode"),save=document.querySelector("#jsSave");
const modelContainer=document.querySelector(".modal-container"),cancel=document.querySelector(".cancel-btn"),
input=document.querySelector(".img_name"),confirm=document.querySelector(".confirm-btn");

const ctx=canvas.getContext('2d');
const WIDTH=700,HEIGHT=600
canvas.width=WIDTH;
canvas.height=HEIGHT;
let painting=false;
let filling=false;
let currentColor="#000000";
ctx.strokeStyle=currentColor;
ctx.fillStyle="#ffffff";
ctx.fillRect(0,0,WIDTH,HEIGHT);
ctx.lineWidth=2.5;
function startPainting(){
    painting=true;
}
function stopPainting(){
    painting=false;
}
function onMouseMove(e){
    const x=e.offsetX,y=e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
        //ctx.closePath();
    }
} 
function setColor(e){
    currentColor=e.target.style.backgroundColor;
    ctx.strokeStyle=currentColor;
    ctx.fillStyle=currentColor;
}
function changeRange(e){
    const value=e.target.value;
    ctx.lineWidth=value;
}
function handleModeClick(){
    if(!filling){
        filling=true;
        painting=false;
        mode.innerText="paint";
        ctx.fillStyle=currentColor;

    }else{
        filling=false;
        painting=true;
        mode.innerText="fill";
        ctx.strokeStyle=currentColor;
    }
}
function handleCanvasClick(){
    if(filling)
        ctx.fillRect(0,0,WIDTH,HEIGHT);
}
function handleCM(e){
    e.preventDefault();
}
function handleSave(){
    modelContainer.style.visibility="visible";
    /*const img=canvas.toDataURL("image/jpeg");
    const link=document.createElement("a");
    link.href=img;
    link.download="Paint";
    link.click();*/
}
function handleSaveFile(){
    if(input.value!==""){
        const img=canvas.toDataURL("image/jpeg");
        const link=document.createElement("a");
        link.href=img;
        link.download=input.value;
        link.click()
        input.value="";
    }
}
function handleCancel(){
    //console.log(modelContainer.style);
    modelContainer.style.visibility="hidden";
}
function init(){
    if(canvas){
        canvas.addEventListener("mousemove",onMouseMove);
        canvas.addEventListener("mousedown",startPainting);
        canvas.addEventListener("mouseup",stopPainting);
        canvas.addEventListener('mouseleave',stopPainting);
        canvas.addEventListener('click',handleCanvasClick);

        //protect the image form context menu
        canvas.addEventListener('contextmenu',handleCM);
        if(colors){
            for(let i=0;i<colors.length;i++){
                colors[i].addEventListener('click',setColor);
            }   
        }
        if(range)
            range.addEventListener("change",changeRange);
        if(mode)
            mode.addEventListener("click",handleModeClick);
        if(save)
            save.addEventListener("click",handleSave); 
        if(cancel)
            cancel.addEventListener("click",handleCancel);
        if(confirm)
            confirm.addEventListener("click",handleSaveFile);
        if(input)
            input.addEventListener("keypress",(e)=>{
                if(e.code==="Enter")
                    handleSaveFile();
            })
        
    }
    
}
init();