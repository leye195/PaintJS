const menubar=document.querySelector(".menubar"),menu=document.querySelector(".gallery"),m_btn=document.querySelector(".menubar>div");
function openMenu(){
    console.log("click");
    if(m_btn.classList.contains("open")){
        m_btn.classList.remove("open");
        m_btn.classList.add("close");
        if(menu.classList.contains("op")){
            menu.classList.remove("op");
            menu.classList.add("cl");
        }
        
    }else{
        m_btn.classList.remove("close");
        m_btn.classList.add("open");
        if(menu.classList.contains("cl")){
            menu.classList.remove("cl");
            menu.classList.add("op");

        }
    }
}
function init(){
    if(menubar)
        menubar.addEventListener("click",openMenu);
}
init();