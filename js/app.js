
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
    let startHeight = 0;  

    if(educationDiv.getBoundingClientRect().top > 170 && educationDiv.getBoundingClientRect().top < 280 ){

        educationDiv.addEventListener('scroll', (e) => {
 
            
            for(i = 0; i < educationDivChildren.length; i++){
                
                for(let j = 0; j < educationDivChildren[i].children.length; j++){

                    let top = educationDivChildren[i].children[j].getBoundingClientRect().top;

                    if(top > 0 || top < 600){
                        educationDivChildren[i].children[j].classList.add('education-item-active')
                    }
                    if(top < 0 || top > 500) {
                        educationDivChildren[i].children[j].classList.remove('education-item-active')
                    }
                 }
                    
            }

            const progressBar = document.getElementById('myBar');
            
            let totalwidth = educationDiv.scrollTopMax
            let divScroll = educationDiv.scrollTop
            let width = (divScroll * 100) / totalwidth
            progressBar.style.width = width + "%";

        })
    }

})


const scrollDown = (nro) => {
    educationDiv.scrollBy({
        top: nro,
        behavior: 'smooth'
    })
}


/*work experience*/
const openDescription = (e) => {

    let description = e.target.nextElementSibling;
    description.classList.toggle('hide')

    const arrowIcon = e.target.lastElementChild.firstElementChild

    if(arrowIcon.classList.contains('fa-chevron-right')){
        arrowIcon.classList.replace('fa-chevron-right', 'fa-chevron-down')
    }
    else {
        arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-right')
    }
    
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
            <a href="#work-item" id="${item.id}" onclick="displayIndividualProject(${item.id})">
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


const flipCard = () => {
    const card = document.querySelector('.inner-card');

    card.classList.toggle('twist')
}

const openNav = () => {
    const navMobile = document.querySelector('.header-container nav');
    navMobile.classList.add('display')

    let childItems = navMobile.children

    for (let i =0; i < childItems.length; i++){
        childItems[i].addEventListener('click', () => {
            navMobile.classList.remove('display')
        })
    }
}

fetchWork(workPortfolio)


/*display indivifual work*/
const individualMainDiv = document.querySelector('.individual-work');

const displayIndividualProject = (id) => {
    let work = workPortfolio.filter(item => item.id == id)[0];

    individualMainDiv.classList.add('displayWork');

    const individualDiv = document.querySelector('.container-work');

    individualDiv.innerHTML = `
        <div class="description">
            <div class="header">
                <div class="arrows-slide">
                    <i class="fas fa-chevron-left" onclick="changeWork(${work.id}, -1)"></i>
                    <i class="fas fa-chevron-right" onclick="changeWork(${work.id}, +1)"></i>
                </div>
                <h2>Project #${work.id}</h2>
            </div>
            <h2> ${work.name}</h2>
            <p>Developed with:  ${work.type}</p>
            <p>Description:  ${work.description}</p>  
            <p>Status: ${work.status}</p>
            <a href="${work.link}" target="_blank"> Check it Out!</a>
        </div>
        <div class="image" onclick="openImage(${work.id})">
                <img src="${work.img}" alt="${work.name}">
        </div>
    `
}


const closeWork = () => {
    individualMainDiv.classList.remove('displayWork');
}

const openImage = (id) => {
    const imgLargeDiv = document.querySelector('.image-large');
    imgLargeDiv.style.display= "block"

    imgLargeDiv.addEventListener('click', () => {
        imgLargeDiv.style.display= "none"
    })

    let work = workPortfolio.filter(item => item.id == id)[0];
    imgLargeDiv.innerHTML = `
      <img src="${work.img_large}" alt="${work.name}">
    `

}