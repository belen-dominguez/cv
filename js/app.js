
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
const educationDivChildren = document.querySelector('.education-container').children


console.log(educationDiv.offsetTop)
console.log(educationDiv.getBoundingClientRect().top)


console.log(educationDivChildren[0].children[0])

window.addEventListener('scroll', () => {
    //console.log(educationDiv.getBoundingClientRect().top)
    if(educationDiv.getBoundingClientRect().top > 170 && educationDiv.getBoundingClientRect().top < 280 ){

        educationDiv.addEventListener('scroll', () => {
            console.log('parent', educationDivChildren[0].getBoundingClientRect().top)
            console.log('child', educationDivChildren[0].children[0].getBoundingClientRect().top)

        })

        /*

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
    }

})




 /*Display work*/
 
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