
window.addEventListener('scroll', () => {
    const header = document.querySelector('header')

    if(window.scrollY > 50){
        header.classList.add('onScroll')
    }
    else {
        header.classList.remove('onScroll')
    }
})

 window.addEventListener('load', titleEffect)

/*Education */ 
const educationDiv = document.querySelector('.education-container')
const educationDivChildren = educationDiv.children


window.addEventListener('scroll', () => {
    

    if(educationDiv.getBoundingClientRect().top > 170 && educationDiv.getBoundingClientRect().top < 280 ){

        educationDiv.addEventListener('scroll', (e) => {
           

           
            //console.log( e.target)
            
            for(i = 0; i < educationDivChildren.length; i++){
                
                for(let j = 0; j < educationDivChildren[i].children.length; j++){
            
                   // console.log(educationDivChildren[1].children[4].getBoundingClientRect().top)

                    if(educationDivChildren[1].children[4].getBoundingClientRect().top == 458){
                        console.log('holi')
                        //educationDiv.style.overflow = "hidden"
                    }

                    let top = educationDivChildren[i].children[j].getBoundingClientRect().top;

                    if(top > 0 || top < 500){
                        educationDivChildren[i].children[j].classList.add('education-item-active')
                    }
                    if(top < 0 || top > 500) {
                        educationDivChildren[i].children[j].classList.remove('education-item-active')
                    }
                 }
                    
            }
        })
           
            // console.log('parent', educationDivChildren[0].getBoundingClientRect().top)
            // console.log('child 1 ', educationDivChildren[0].children[0].getBoundingClientRect().top)
            // console.log('child 3', educationDivChildren[0].children[2].getBoundingClientRect().top)

    }

        /*



        HIJO 1 -
        hijo esta en pantalla desde 
        parent -> 143
        child -> 159
        hasta
        parent -> -54
        child -> -38



        arriba de todo
        parent -> 143
        child -> 159
-> 16 

        scrolleando hacia abajo. a la mitad del  hijo
        parent -> 33
        child -> 49
        scrolleando hacia abajoi. cuando desaparece el hijo
        parent -> -39
        child -> -23


        scrolleando hacia arriba. cuando se empieza a ver el hijo
        parent -> 7
        child -> 23
        scrolleando hacia arriba. cuando se completa el hijo
        parent -> 138
        child -> 154



        medio
         parent -> -723
        child -> -707

        abajo de todo
        parent -> -1788
        child _> -1772



        */
      
        // educationDivChildren[0].addEventListener('scroll', () => {

        // })
    

})


/*work experience*/
const openDescription = (e) => {
    let description = e.target.nextElementSibling;

    description.classList.toggle('hide')
}


 /*Display projects*/
 
 const tabStyle = (btn) => {

    const tabBtn = document.querySelector('.tabs').children;

    for(let i = 0; i < tabBtn.length; i++){
        tabBtn[i].classList.remove('btn-active')
    }
    btn.classList.add('btn-active')
    
}
 const workDiv = document.querySelector('.work')
 const displayWork = (workToDisplay) => {

     workDiv.innerHTML = workToDisplay.reduce((html, item) => {
         return html += `
         <div class="work-item">
         <a href="${item.link}" target="_blank">
         <img src="${item.img}" alt="${item.name}">
         <div class="text">
         <h3> ${item.name} </h3>
         </div>
         </a>
         </div>
         `
        },"")
        
    workDiv.classList.add('animate__fadeInLeft')
    
}

workDiv.addEventListener('animationend', () => {
     workDiv.classList.remove('animate__fadeInLeft')
})

fetchWork(workPortfolio)