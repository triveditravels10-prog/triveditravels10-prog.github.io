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
