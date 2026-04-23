// Firebase import (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log("Firebase Connected ✅");

alert("Firebase Connected ✅");














function sendMessage() {
  let msg = document.getElementById("msg").value;
  if(msg === "") return;

  let box = document.getElementById("messages");

  // user message
  let messageDiv = document.createElement("div");
  messageDiv.className = "message sent";
  messageDiv.innerText = msg;
  box.appendChild(messageDiv);

  // auto reply
  setTimeout(() => {
    let reply = document.createElement("div");
    reply.className = "message received";
    reply.innerText = "Reply from Trivedi Connect";
    box.appendChild(reply);

    box.scrollTop = box.scrollHeight;
  }, 1000);

  box.scrollTop = box.scrollHeight;
  document.getElementById("msg").value = "";
}



//
document.getElementById("msg").addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    sendMessage();
  }
});
//
