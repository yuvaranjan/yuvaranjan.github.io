//preloader 

var loader = document.getElementById("preloader");
window.addEventListener("load", function(){
  loader.style.display = "none";
})


//Navbar responsive menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation li")

menuBtn.addEventListener("click",  () => {
menuBtn.classList.toggle("active");
navigation.classList.toggle("active");
});
navigationItems.forEach((navigationItem) => {
navigationItem.addEventListener("click", () => {
  menuBtn.classList.remove("active");
  navigation.classList.remove("active");
});
});

//Scroll bar
const scrollProgressElement = document.querySelector("#scroll-progress");

function scrollProgress() {
  const totalheightOfWebPage = document.body.scrollHeight;
  const currentDistanceFromTop = document.documentElement.scrollTop;
  const windowHeight = document.documentElement.clientHeight;

  const scrolledPercentage = (currentDistanceFromTop / (totalheightOfWebPage - windowHeight)) * 100;
  scrollProgressElement.style.width = Math.round(scrolledPercentage) + "%" ;

}

document.addEventListener("scroll", scrollProgress)

//Scroll to top
const scrollBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function(){
  scrollBtn.classList.toggle("active", window.scrollY > 500);
});

scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


// On scroll reveal - right

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-right');
    } else {
      entry.target.classList.remove('show-right');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden-right');
hiddenElements.forEach((el) => observer.observe(el)); 


// On scroll reveal - left

const observer2 = new IntersectionObserver((entries2) => {
  entries2.forEach((entry2) => {
    if (entry2.isIntersecting) {
      entry2.target.classList.add('show-left');
    } else {
      entry2.target.classList.remove('show-left');
    }
  });
});

const hiddenElements2 = document.querySelectorAll('.hidden-left');
hiddenElements2.forEach((el) => observer2.observe(el)); 

// On scroll reveal - middle

const observer3 = new IntersectionObserver((entries3) => {
  entries3.forEach((entry3) => {
    if (entry3.isIntersecting) {
      entry3.target.classList.add('show-middle');
    } else {
      entry3.target.classList.remove('show-middle');
    }
  });
});

const hiddenElements3 = document.querySelectorAll('.hidden-middle');
hiddenElements3.forEach((el) => observer3.observe(el)); 






// image slider
  var slides = document.querySelectorAll('.slide');
  var btns = document.querySelectorAll('.btn');
  let currentSlide = 1;

  //manual navigation
  var manualNav = function(manual){
    slides.forEach((slide) => {
      slide.classList.remove('active');

      btns.forEach((btn) => {
        btn.classList.remove('active');
      });
    });

    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
  }

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      manualNav(i);
      currentSlide = i;
    });
  });

  //automatic navigation
  var repeat = function(activeClass){
    let active = document.getElementsByClassName('active');
    let i = 1;

    var repeater = () => {
      setTimeout(function(){
        [...active].forEach((activeSlide) => {
          activeSlide.classList.remove('active');
        });

      slides[i].classList.add('active');
      btns[i].classList.add('active');
      i++;

      if(slides.length == i){
        i = 0;
      }
      if(i >= slides.length){
        return;
      }
      repeater();
    }, 3000);
    }
    repeater();
  }
  repeat();





// mouse hover work page

  function bigImg(x) {
    x.style.filter = "brightness(110%)";
    x.style.transition = "250ms"
  }
  
  function normalImg(x) {
    x.style.filter = "brightness(95%)";

  }


  // On scroll reveal - progress bar

  const observer4 = new IntersectionObserver((entries4) => {
    entries4.forEach((entry4) => {
      if (entry4.isIntersecting) {
        document.getElementById("provalue1").classList.add("pro-value1");
        document.getElementById("provalue2").classList.add("pro-value2");
        document.getElementById("provalue3").classList.add("pro-value3");
        document.getElementById("provalue4").classList.add("pro-value4");
        document.getElementById("provalue5").classList.add("pro-value5");
      } else {
        document.getElementById("provalue1").classList.remove("pro-value1");
        document.getElementById("provalue2").classList.remove("pro-value2");
        document.getElementById("provalue3").classList.remove("pro-value3");
        document.getElementById("provalue4").classList.remove("pro-value4");
        document.getElementById("provalue5").classList.remove("pro-value5");
      }
    });
  });
  
  const proValue = document.querySelectorAll('.pro-value');
  proValue.forEach((el) => observer4.observe(el)); 


    
