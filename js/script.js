let myWork;
window.addEventListener('load', () => {

    let path;

    if(location.host ==  "belen-dominguez.github.io"){
        path = "/cv"
    }
    else {
        path = "/my-work"
    }

    let title
   
    if(location.pathname == `${path}/index.html`){
        myWork = workPortfolio
        title = ['Hi! ' ,'my name is Belu,', 'frontend developer' ,' and this is my work...']
    }
    if(location.pathname == `${path}/index-es.html`){
        myWork = workPortfolioEsp
        title = ['Hola! ' ,'soy Belu, ','programadora frontend ',' y estos son mis trabajos...']
    }

    titleEffect(title)
    fetchWork(myWork)
})

const heroTitle = document.querySelector('.hero .detail h1');

const titleEffect =  (title) => {
   
    let j = 1
    const printTitle = (word) => {

        let i = 0;

            let printFirst = setInterval(() => {
    
                heroTitle.innerHTML += word.charAt(i) ;
    
                i++
         
                if( i == word.length){
                    clearInterval(printFirst)
                    heroTitle.innerHTML += '</br>'
    
                    if(j == title.length){
                        return
                    }
                    else {
                        printTitle(title[j])
                        j++
    
                    }
                }
    
             },100)
       
    }

    
    printTitle(title[0])
   
}

const changeLang = document.querySelector('.lang');

changeLang.addEventListener('click', (e) => {

    if(location.host ==  "belen-dominguez.github.io"){
        path = "/cv"
    }
    else {
        path = "/my-work"
    }

    if(location.pathname == `${path}/index.html`){
        location.pathname = `${path}/index-es.html`
     
    }
    else {
        location.pathname = `${path}/index.html`
     
    }
   
})

/*for pagination*/
let splitArr = [] ;
const paginationDiv = document.querySelector('.pag-container');

const checkDate = (workToDisplay) => {
    let currentDate = new Date();
    let priorityCk = 1
    workToDisplay.forEach(item => {
        if(item.date){
            /*86400000 son la cant de milisegundos en 1 dia */
            let day = new Date(item.date) /*dia  del item */
            let difference = currentDate - day /*diferencia entre el dia del item y la fecha actual en milisegundos*/
            let diffInDays = Math.floor(difference / 86400000) /*sacamos la diferencia en cantidad de dias*/

            if(diffInDays < 10) {
                item.badge = true
                item.priority = priorityCk++
            }

        }
        else {
            item.priority = 1 
        }
    })

    let sortArrByNewWork = workToDisplay.sort((a,b) => {
        return  b.priority - a.priority 

    })

   return sortArrByNewWork
}

const fetchWork = (e) => {

    let workToDisplay = []
    let id;
    
    if(e == undefined || e.target == undefined){
        id = 'all'
    }
    else {
        let selectedBtn = e.target
        tabStyle(selectedBtn);
        id = e.target.attributes.id.value; 
    }

    if(id == 'all'){
        workToDisplay = myWork
    }
    else {
        workToDisplay = myWork.filter(item => item.type == id )
    }

    /*sort by new items*/
    workToDisplay = checkDate(workToDisplay)

    if(workToDisplay.length > 10){
        splitArr = [] 
        paginationDiv.innerHTML = ""
        pagination(workToDisplay)
    }
    else {
        paginationDiv.innerHTML = ""
        displayWork(workToDisplay)

    }

}

const changeWork = (id , nr) => {
    let workId = id + nr;

    if(workId == -1){
        workId = myWork.length -1
    }
    if(workId == myWork.length){
        workId = 0;
    }

    displayIndividualProject(workId)
}


const pagination = (array) => {

    let nroPages = Math.ceil(array.length / 10)
    let cut = 10;
    let start = 0

   
    for(let i = 0; i < nroPages; i++){
        splitArr.push(array.slice(start,cut));
  
        start = start + 10;
        cut = cut + 10;
    }

    displayWork(splitArr[0])

    for(let i = 1; i < (nroPages + 1); i++){

        if(i == 1) {
            paginationDiv.innerHTML += `
                <button class="pag-number btnActive" onclick="changePage(event, ${i -1})">
                    ${i}
                </button>
            `
        }
        else {
            paginationDiv.innerHTML += `
                <button class="pag-number" onclick="changePage(event, ${i -1})">
                    ${i}
                </button>
            `
        }
    }
}

const changePage = (e, nro) => {
   
    const btnPagination = document.querySelector('.pag-container').children;
    const topProject = document.querySelector('#work')

    for(i = 0; i < btnPagination.length; i++){
        btnPagination[i].classList.remove('btnActive')
    }
    e.target.classList.add('btnActive')
    
    displayWork(splitArr[nro])

    location.href = "#work";
}


/*disable flipcard when clicking social links*/
const socialLinks = document.querySelector('.presentation-card .social');

socialLinks.addEventListener('mouseenter', () => {
    card.removeEventListener('click', flipCard)
    card.style.cursor = 'initial'
})
socialLinks.addEventListener('mouseleave', () => {
    card.addEventListener('click', flipCard)
    card.style.cursor = 'pointer'
})

