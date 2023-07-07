//HEADER SECTION ========================================================================================================================================================================
//HEADER burger ========================================================================================================================================================================
let menu = document.querySelector(".header__burger");
let navigation = document.querySelector(".header__nav");

menu.addEventListener("click", (event) => {
    event.preventDefault();
    
    menu.classList.toggle("active");
    navigation.classList.toggle("active");
    document.body.classList.toggle("lock");
})
//HEADER remove burger ========================================================================================================================================================================
function removeMenu() {
    menu.classList.remove("active");
    navigation.classList.remove("active");
    document.body.classList.remove("lock");
}
//HEADER scroll effect ========================================================================================================================================================================
window.addEventListener('scroll', function() {

    let header = document.querySelector(".header-header");
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; 

    if (scrollPosition >= 70) {

        navigation.classList.add('scroll');
        header.classList.add('scroll');

    } else {

        navigation.classList.remove('scroll');
        header.classList.remove('scroll');
    }
  });

//HEADER background effect ========================================================================================================================================================================
let images = [
    "img/header_back1.png",
    "img/header_back.png",
    "img/header_back1.png",
];

let element = document.getElementById("header");
element.style.transition = "background-image 0.5s ease-in-out";

let currentImageIndex = 0;

function changeBackgroundImage() {
    let nextImage = images[currentImageIndex];

    element.style.opacity = "0";

        element.style.backgroundImage = "url('" + nextImage + "')";
        element.style.opacity = "1";

    currentImageIndex++;

    if (currentImageIndex === images.length) {
        currentImageIndex = 0;
    }
}
  
setInterval(changeBackgroundImage, 5000);
//Arrow scroll to block ========================================================================================================================================================================
function setScroll(top){
    const arrow = document.querySelector(".pluses");
    arrow.scrollIntoView({
        block:"start",
        behavior:"smooth",
    })
}
function setScrollTo(top){
    const achor = document.querySelector(".filter");
    achor.scrollIntoView({
        block:"start",
        behavior:"smooth",
    })
}
//filter popup ========================================================================================================================================================================
let popupOpened = document.querySelectorAll(".filter__box_all, .filter__box_buy");
popupOpened.forEach((element) => {
    element.addEventListener("click", (event) => {
        document.body.classList.add("locks");
    });
});

function removeClass() {
    document.body.classList.remove("locks");
}
//filter button ========================================================================================================================================================================
let count = 0;

function moreButton(e) {
    count++;
    document.getElementById("button").innerText = "Нажаль товару більше нема!";
    if(count >= 2){
        removeText();
        count = 0;
    }
}
function removeText() {
    document.getElementById("button").innerText = "Подивитись більше";
}
//backet popup ========================================================================================================================================================================
const popupLinks = document.querySelectorAll(".header__nav-link_modern");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;
const timeout = 400;

if(popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", (e) =>{
            const popupName = popupLink.getAttribute("href").replace("#","");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const closePopup = document.querySelectorAll(".popup__close");
if(closePopup.length > 0){
    for(let index = 0; index < closePopup.length; index++){
        const el = closePopup[index];
        el.addEventListener("click", (e) => {
            popupClose(el.closest(".popup__backet"));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if(curentPopup && unlock){
        const popupActive = document.querySelector(".popup__backet.open");
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        menu.classList.remove("active");
        navigation.classList.remove("active");
        curentPopup.classList.add("open");

        curentPopup.addEventListener("click", (e) => {
            if(!e.target.closest(".popup__backet_content")){
                popupClose(e.target.closest(".popup__backet"));
            }
        });
    } 
}
function popupClose(popupActive, doUnlock = true){
    if(unlock) {
        popupActive.classList.remove("open");
        if(doUnlock){
            bodyUnlock();
        }
    }
}
function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    if(lockPadding.length > 0){
        for(let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("locked");

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout)
}
function bodyUnlock(){
    setTimeout(function () {
        for(index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        body.classList.remove("locked");
    },100);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    },100);
}

document.addEventListener("keydown", (e) => {
    if(e.which === 27){
        const popupActive = document.querySelector(".popup__backet.open");
        popupClose(popupActive);
    }
})
//filter and backet ========================================================================================================================================================================
const filterBox = document.querySelectorAll(".filter__box");

document.querySelector('.filter__list').addEventListener("click", (event) => {
    if(event.target.tagName !== 'LI') return false;
   
    let filterClass = event.target.dataset["filter"];

    if (filterClass === 'all') {
        filterBox.forEach((element) => {
            element.classList.remove("hide");
        });
    } else {
        filterBox.forEach( (element) => {
            element.classList.add("hide");
            if(element.classList.contains(filterClass)) {
                element.classList.remove("hide");
            }
        });
    }
});
//calcCartPrice ========================================================================================================================================================================
function calcCartPrice() {
    const cartItems = document.querySelectorAll(".popup__backet_box");
    const priceTotalEl = document.querySelector(".total-price");
    let totalPrice = 0;
  
    cartItems.forEach(function (item) {
      const amountEl = item.querySelector("[data-counter]");
      const priceEl = item.querySelector(".popup__backet_price");
  
      const amount = parseInt(amountEl.innerHTML);
      const price = parseFloat(priceEl.innerHTML); 


  
      if (!isNaN(amount) && !isNaN(price)) {
        const currentPrice = price * amount;

        totalPrice += currentPrice;
      }
    });

    priceTotalEl.innerText = totalPrice.toFixed(2); 

}
//backet empty or not;) ========================================================================================================================================================================
const orderForm = document.querySelector("#order-form");
orderForm.classList.add("untouch");

function toggleCartStatus() {
    const cartWrapper = document.querySelector(".popup__backet_wrapper");
    const cartEmpty = document.querySelector("[data-cart-empty]");


    if(cartWrapper.children.length > 0 ){
        cartEmpty.classList.add("none");
        orderForm.classList.remove("untouch");
    }else{
        cartEmpty.classList.remove("none");
        orderForm.classList.add("untouch");
    }

}

//toBacket cards==============>
const cardWrapper = document.querySelector(".popup__backet_wrapper");

window.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-cart")) {

        const card = event.target.closest(".filter__box");
        const productId = card.dataset.id;

        const existingCard = cardWrapper.querySelector(`[data-product="${productId}"]`);

        if (existingCard) {
            calcCartPrice();
            event.preventDefault(); 
            alert("В корзині вже є такий предмет");
            document.body.classList.remove("locks");    
        } else {
            const productInfo = {
                id: card.dataset.id,
                imgSrc: card.querySelector("[data-img]").getAttribute("src"),
                title: card.querySelector(".filter__box_title").innerText,
                price: card.querySelector(".filter__box_price").innerText,
                someCounter: card.querySelector(".filter__counter").innerText,
            }
            const cardItem = `<div class="popup__backet_box" data-product="${productInfo.id}">
                                <div class="popup__backet_goods">
                                    <div class="popup__backet_name">
                                        <div class="popup__backet_somebox">
                                            <div class="popup__backet_img">
                                                <img src="${productInfo.imgSrc}" alt="">
                                            </div>
                                            <div class="popup__backet_texts">
                                                <h1>${productInfo.title}</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet convallis erat auctor nibh pharetra ac. </p>
                                            </div>
                                        </div>
                                        <div class="popup__backet_color">Модель або колір</div>
                                    </div>
                                    <div class="popup__backet_counters">
                                        <div class="popup__backet_more">
                                            <div data-counter class="popup__backet_number">${productInfo.someCounter}</div>
                                            <div class="popup__backet_equal">
                                                <div data-action="plus" class="popup__backet_plus">+</div>
                                                <div data-action="minus" class="popup__backet_minus">-</div>
                                            </div>
                                        </div>
                                        <div class="popup__backet_price">${productInfo.price}</div>
                                    </div>
                                </div>
                                <div data-remove class="popup__backet_close"></div>
                            </div>`;
            cardWrapper.insertAdjacentHTML("beforeend", cardItem);

        }
        toggleCartStatus(); 
        calcCartPrice();

    }
});
//plus minus script ========================================================================================================================================================================
window.addEventListener("click", (event) => {
    let counter;

    if(event.target.dataset.action === ("plus") || event.target.dataset.action === "minus"){
        const counterWrapper = event.target.closest(".popup__backet_more");
        counter = counterWrapper.querySelector("[data-counter]");
    }

    if(event.target.dataset.action === ("plus")){     
        if(parseInt(counter.innerText) < 15) {
            counter.innerText++;
        }
    }
    if(event.target.dataset.action === ("minus")){

        if(event.target.closest(".popup__backet_box") && parseInt(counter.innerText) === 1){

            event.target.closest(".popup__backet_box").remove();

            toggleCartStatus();
            calcCartPrice();
        }

        if(parseInt(counter.innerText) > 1) {
            counter.innerText--;
        }
    }

    if(event.target.hasAttribute("data-action") && event.target.closest(".popup__backet_wrapper")){
        calcCartPrice();
    }
});

const links = document.querySelector("[data-cart]");

function removeFromCart(event) {
    if (event.target.hasAttribute("data-remove")) {
        const card = event.target.closest(".popup__backet_box");
        if (card) {
            card.remove();
            toggleCartStatus();
            calcCartPrice();
        }
    }
}

cardWrapper.addEventListener("click", removeFromCart);
//GALLERY SWIPER ========================================================================================================================================================================
//========================================================================================================================================================================================================
new Swiper (".gallery__container", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    speed:600,
    pagination: {
        el:".swiper-pagination",
        clickable:true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
