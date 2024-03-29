window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.classList.add("onScroll");
  } else {
    header.classList.remove("onScroll");
  }
});

/*Education */
const educationDiv = document.querySelector(".education-container");
const educationItem = educationDiv.querySelectorAll(".education-item");

const showEducationItems = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("education-item-active");
    } else {
      entry.target.classList.remove("education-item-active");
    }
  });
};

educationDiv.addEventListener("scroll", () => {
  const options = {
    root: educationDiv,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(showEducationItems, options);
  educationItem.forEach((item) => observer.observe(item));

  const progressBar = document.getElementById("myBar");

  const totalHeight = educationDiv.scrollHeight - educationDiv.offsetHeight;
  const divScroll = educationDiv.scrollTop;
  const width = (divScroll * 100) / totalHeight;
  progressBar.style.width = width + "%";
});

const scrollDown = (nro) => {
  educationDiv.scrollBy({
    top: nro,
    behavior: "smooth",
  });
};

/*work experience*/
const openDescription = (e) => {
  let description = e.target.nextElementSibling;
  description.classList.toggle("hide");

  const arrowIcon = e.target.lastElementChild.firstElementChild;

  if (arrowIcon.classList.contains("fa-chevron-right")) {
    arrowIcon.classList.replace("fa-chevron-right", "fa-chevron-down");
  } else {
    arrowIcon.classList.replace("fa-chevron-down", "fa-chevron-right");
  }
};

/*Display projects*/

const tabStyle = (btn) => {
  const tabBtn = document.querySelector(".tabs").children;

  for (let i = 0; i < tabBtn.length; i++) {
    tabBtn[i].classList.remove("btn-active");
  }
  btn.classList.add("btn-active");
};
const workDiv = document.querySelector(".work");
const displayWork = (workToDisplay) => {
  workDiv.innerHTML = workToDisplay.reduce((html, item) => {
    return (html += `
         <div class="work-item">
            <div class="${item.badge ? "badge" : ""}">${
      item.badge ? "New" : ""
    }</div>
            <a href="#work-item" id="${
              item.id
            }" onclick="displayIndividualProject(${item.id})">
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <div class="text">
                 <h3> ${item.name} </h3>
                </div>
            </a>
         </div>
         `);
  }, "");

  workDiv.classList.add("animate__fadeInLeft");
};

workDiv.addEventListener("animationend", () => {
  workDiv.classList.remove("animate__fadeInLeft");
});

const card = document.querySelector(".inner-card");
const flipCard = () => {
  card.classList.toggle("twist");
};
card.addEventListener("click", flipCard);

const openNav = () => {
  const navMobile = document.querySelector(".header-container nav");
  navMobile.classList.add("display");

  let childItems = navMobile.children;

  for (let i = 0; i < childItems.length; i++) {
    childItems[i].addEventListener("click", () => {
      navMobile.classList.remove("display");
    });
  }
};

/*display indivifual work*/
const formatDate = (date) => {
  let lang = document.documentElement.attributes.lang.value;

  let getDate = new Date(date);
  let year = getDate.getFullYear();
  let day = getDate.getDate();
  let getMonth = getDate.getMonth();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  if (lang == "es") {
    months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
  }
  let month = months[getMonth];

  return `${day} ${month} ${year}`;
};

const individualMainDiv = document.querySelector(".individual-work");

const displayIndividualProject = (id) => {
  let work = myWork.filter((item) => item.id == id)[0];

  individualMainDiv.classList.add("displayWork");

  const individualDiv = document.querySelector(".container-work");

  let type = work.type.toUpperCase();
  if (type == "HTML") {
    type = "HTML & CSS";
  }
  if (type.includes("JAVASCRIPT - HTML")) {
    type = "JAVASCRIPT & CSS";
  }

  let dateFormat = formatDate(work.date);

  let lang = document.documentElement.attributes.lang.value;
  let description = "Description";
  let develop = "Developed with";
  let checkStr = "Check it Out!";
  let date = "Date";
  if (lang == "es") {
    description = "Descripción";
    develop = "Desarrollo con";
    checkStr = "Ver trabajo!";
    date = "Fecha";
  }

  individualDiv.innerHTML = `
        <div class="description">
            <div class="header">
                <div class="arrows-slide">
                    <i class="fas fa-chevron-left" onclick="changeWork(${
                      work.id
                    }, -1)"></i>
                    <i class="fas fa-chevron-right" onclick="changeWork(${
                      work.id
                    }, +1)"></i>
                </div>
                <h2>Project #${work.id + 1}</h2>
            </div>
            <h2> ${work.name}</h2>
            <p><strong>${develop}</strong>:  ${type}</p>
            <p><strong>${description}</strong>:  ${work.description}</p>  
            <p><strong>${date}</strong>: ${dateFormat}</p>
            <p><strong>Status</strong>: ${work.status}</p>
            <a href="${work.link}" target="_blank"> ${checkStr}</a>
        </div>
        <div class="image" onclick="openImage(${work.id})">
                <img src="${work.img}" alt="${work.name}" loading="lazy">
        </div>
    `;
};

const closeWork = () => {
  individualMainDiv.classList.remove("displayWork");
};

const closeImgModal = () => {
  imgLargeDiv.style.display = "none";
};

const imgLargeDiv = document.querySelector(".image-large");
const openImage = (id) => {
  imgLargeDiv.style.display = "block";

  imgLargeDiv.addEventListener("click", closeImgModal);

  let work = myWork.filter((item) => item.id == id)[0];

  if (typeof work.img_large != "string") {
    slideImages(work);
  } else {
    imgLargeDiv.innerHTML = `
          <img src="${work.img_large}" alt="${work.name}" loading="lazy">
        `;
  }
};

let arrayImg = [];
let index;
const slideImages = (work) => {
  imgLargeDiv.removeEventListener("click", closeImgModal);

  arrayImg = work.img_large;
  index = 0;

  imgLargeDiv.innerHTML = `
            <i class="far fa-times-circle" onclick="closeImgModal()"></i>
            <div class="arrows">
                <i class="fas fa-chevron-left" onclick="changeImg(-1)"></i>
                <i class="fas fa-chevron-right" onclick="changeImg(+1)"></i>
            </div>
            <img src="${work.img_large[index]}" alt="${work.name}" loading="lazy">
        
                `;
};
const changeImg = (nr) => {
  index = index + nr;

  if (index == -1) {
    index = arrayImg.length - 1;
  }
  if (index == arrayImg.length) {
    index = 0;
  }

  if (arrayImg[index].includes("mobile")) {
    imgLargeDiv.innerHTML = `
            <i class="far fa-times-circle" onclick="closeImgModal()"></i>
            <div class="arrows">
                <i class="fas fa-chevron-left" onclick="changeImg(-1)"></i>
                <i class="fas fa-chevron-right" onclick="changeImg(+1)"></i>
            </div>
            <img class="mobile-img" src="${arrayImg[index]}" alt="">
                `;
  } else {
    imgLargeDiv.innerHTML = `
                <i class="far fa-times-circle" onclick="closeImgModal()"></i>
                <div class="arrows">
                    <i class="fas fa-chevron-left" onclick="changeImg(-1)"></i>
                    <i class="fas fa-chevron-right" onclick="changeImg(+1)"></i>
                </div>
                <img src="${arrayImg[index]}" alt="" loading="lazy">
                    `;
  }
};
