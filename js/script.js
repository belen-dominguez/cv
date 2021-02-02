const heroTitle = document.querySelector('.hero .detail h1');

const titleEffect =  () => {
   
    let title = ['Hi! ' ,'my name is ', 'Belu' ,', and this is my work...']


    let j = 1
    const algo = (word) => {

        let i = 0;
        

            let printFirst = setInterval(() => {
    
                heroTitle.innerHTML += word.charAt(i) 
    
                i++
         
                if( i == word.length){
                    clearInterval(printFirst)
    
                    if(j == title.length){
                        return
                    }
                    else {
                        algo(title[j])
                        j++
    
                    }
                }
    
             },100)
       
    }

    
    algo(title[0])
   
}


/*for pagination*/
let splitArr = [] ;
const paginationDiv = document.querySelector('.pag-container');


const fetchWork = (e) => {

    let workToDisplay = []
    let id;
    
    if(e.target == undefined){
        id = 'all'
    }
    else {
        let selectedBtn = e.target
        tabStyle(selectedBtn);
        id = e.target.attributes.id.value; 
    }

    if(id == 'all'){
         workToDisplay = workPortfolio
    }
    else {
        workToDisplay = workPortfolio.filter(item => item.type == id )
    }

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

    
   // paginationDiv.innerHTML = ""

    for(let i = 1; i < (nroPages + 1); i++){
        paginationDiv.innerHTML += `
            <button class="pag-number" onclick="changePage(event, ${i -1})">
                ${i}
            </button>
        `
    }
}

const changePage = (e, nro) => {
   
    const btnPagination = document.querySelector('.pag-container').children;

    for(i = 0; i < btnPagination.length; i++){
        btnPagination[i].classList.remove('btnActive')
    }
    e.target.classList.add('btnActive')
    
    displayWork(splitArr[nro])

}
