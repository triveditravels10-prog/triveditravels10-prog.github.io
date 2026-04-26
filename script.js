// PAGE LOAD MESSAGE
console.log("Trivedi Hub Loaded 🚀");

// BUTTON CLICK (Enter Ecosystem)
document.addEventListener("DOMContentLoaded", function () {
  
  const btn = document.querySelector("button");

  if(btn){
    btn.addEventListener("click", function () {
      alert("Welcome to Trivedi Hub 🚀");
    });
  }

});

// SMOOTH SCROLL FOR NAV LINKS
const links = document.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("click", function(e){
    if(this.hash !== ""){
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if(target){
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});





// 🔒 PIN CHECK
function checkPin(){
  let pin = document.getElementById("pinInput").value;

  if(pin === "0267"){   // 👉अपना PIN 
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("loaderScreen").style.display = "flex";

    startLoading(); // 👉 loading start
  } else {
    document.getElementById("error").innerText = "Wrong PIN!";
  }
}


// 💻 LOADING SYSTEM
let messages = [
  "Initializing System...",
  "Connecting to Server...",
  "Access Granted ✔"
];

let i = 0;
let j = 0;
let currentText = "";
let speed = 50;

function startLoading(){
  typeEffect();
}

function typeEffect(){
  if(i < messages.length){
    if(j < messages[i].length){
      currentText += messages[i].charAt(j);
      document.getElementById("typingText").innerText = currentText;
      j++;
      setTimeout(typeEffect, speed);
    } else {
      currentText = "";
      j = 0;
      i++;
      setTimeout(typeEffect, 500);
    }
  } else {
    setTimeout(() => {
      document.getElementById("loaderScreen").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    }, 500);
  }
}






function setTheme(theme) {
  document.body.className = theme;
}







function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

window.onload = () => {
  const saved = localStorage.getItem("theme");
  if (saved) document.body.className = saved;
};







function toggleTheme() {
  document.body.classList.toggle("light");
}



