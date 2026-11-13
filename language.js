
/*  LANGUAGE MENU  */
const button = document.getElementById("languageButton");
const menu = document.getElementById("languageMenu");

button.addEventListener("click", () => {
    menu.classList.toggle("active");
});



/*  TIMER FUNCTION FROM W3 SCHOOLS  */
var countDownDate = new Date("May 9, 2027 9:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


/* MAP IMAGE CHANGE  */
const map = document.getElementById("mapImage");
const popup = document.getElementById("mapPopup");

map.addEventListener("click", () => {
    if (map.src.includes("bigmap.png")) {
        map.src = "images/bigmap2.png";
        popup.classList.add("active");
    } else {
        map.src = "images/bigmap.png";
        popup.classList.remove("active");
    }
});


/*  SECOND MAP POPUP  */
const takeMeThereBtn =
    document.getElementById("takeMeThereBtn");
const navigationPopup =
    document.getElementById("navigationPopup");
takeMeThereBtn.addEventListener("click", () => {
    map.src = "images/bigmap3.png";
    popup.classList.remove("active");
    navigationPopup.classList.add("active");
});