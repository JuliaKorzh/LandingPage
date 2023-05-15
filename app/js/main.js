
//_____________SCROLL TO TOP____________________

const btnToTop = document.querySelector(".btn-top");
window.onscroll = function(){scroll()}
btnToTop.addEventListener("click", function(){
   document.documentElement.scrollTop = 0;
});

function scroll (){
   if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
      btnToTop.style.display = "block"
   }
   else{
      btnToTop.style.display = "none"
   }
}

//____________________ANIMATION _.ACTIVE____________________________


let animItems = document.querySelectorAll(".anim-items");

if(animItems.length > 0){
   window.addEventListener("scroll", animOnScroll);
   
   function animOnScroll (){
      for ( let i=0; i < animItems.length; i++){
         const animItem = animItems[i];
         const animItemHeight = animItem.offsetHeight;       //высота объекта
         const animItemOffset = offset(animItem).top;                // позиция элемента относительно верха окна
         const animStart = 4;                                    // коэфицент момента старта

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight){
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }                                                                                  // scrollY   это переменная хранит данные о прокрученных пикселях
         if((scrollY > (animItemOffset - animItemPoint)) && scrollY < (animItemOffset + animItemHeight)) {
            animItem.classList.add("active");
         } else{
               animItem.classList.remove("active")
            }         
   }

   function offset(el){
      const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY|| document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
   }
   }  
}
setTimeout(()=>{
   animOnScroll();
}, 300)

