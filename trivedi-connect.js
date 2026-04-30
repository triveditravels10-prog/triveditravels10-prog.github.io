//
  const firebaseConfig = {
  apiKey: "AIzaSyCu9pQYnkbGRTVN8798C3ilvrc6Z_EmrH0",
  authDomain: "trivedi-8d263.firebaseapp.com",
  projectId: "trivedi-8d263",
  storageBucket: "trivedi-8d263.firebasestorage.app",
  messagingSenderId: "531536403649",
  appId: "1:531536403649:web:daff55e05741e0af0b8840",
  measurementId: "G-LLBMZYDJ39"
};




// Firebase import (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log("Firebase Connected ✅");

alert("Firebase Connected ✅");

// 🔥 BUTTON FIX
document.getElementById("sendBtn").addEventListener("click", sendMessage);












function sendMessage() {
  let msg = document.getElementById("msg").value;
  if(msg === "") return;

  let box = document.getElementById("messages");





//
document.getElementById("msg").addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    sendMessage();
  }
});
//
const q = query(collection(db, "messages"), orderBy("time"));

onSnapshot(q, (snapshot) => {
  let box = document.getElementById("messages");
  box.innerHTML = "";

  snapshot.forEach((doc) => {
    let data = doc.data();

    let messageDiv = document.createElement("div");
    messageDiv.className = "message received";
    messageDiv.innerText = data.text;

    box.appendChild(messageDiv);
  });

  box.scrollTop = box.scrollHeight;
});
