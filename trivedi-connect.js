// 🔥 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCu9pQYnkbGRTVN8798C3ilvrc6Z_EmrH0",
  authDomain: "trivedi-8d263.firebaseapp.com",
  projectId: "trivedi-8d263",
  storageBucket: "trivedi-8d263.firebasestorage.app",
  messagingSenderId: "531536403649",
  appId: "1:531536403649:web:daff55e05741e0af0b8840",
  measurementId: "G-LLBMZYDJ39"
};

// 🔥 IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc} 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
alert("Firebase Connected ✅");

// 🔥 SEND MESSAGE
async function sendMessage() {
  //
  if (!auth.currentUser) {
  alert("Login first!");
  return;
}
  let msg = document.getElementById("msg").value;
  if(msg === "") return;

  document.getElementById("msg").value = "";

  await addDoc(collection(db, "messages"), {
    text: msg,
    time: Date.now(),
    sender: auth.currentUser.uid,
    name: auth.currentUser.displayName
  });
}

// 🔥 LOGIN FUNCTION 
async function login() {
  try {
    await signInWithPopup(auth, provider);
    alert("Login successful ✅");
  } catch (error) {
    console.log(error);
    alert("Login failed ❌");
  }
}
window.login = login;

// 🔥 LOAD AFTER PAGE READY
window.onload = () => {

  document.getElementById("sendBtn").addEventListener("click", sendMessage);

  document.getElementById("msg").addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
      sendMessage();
    }
  });

};

// 🔥 REALTIME LISTENER
const q = query(collection(db, "messages"), orderBy("time"));


onSnapshot(q, (snapshot) => {
  let box = document.getElementById("messages");
  box.innerHTML = "";

  snapshot.forEach((docItem) => {
    let data = docItem.data();

    let messageDiv = document.createElement("div");
    if (auth.currentUser && data.sender === auth.currentUser.uid) {
  messageDiv.className = "message user";
} else {
  messageDiv.className = "message bot";
}
    messageDiv.innerHTML = `
  <strong>${data.name}</strong><br>
  ${data.text}
`;
    // 🔥 CLICK = DELETE
    messageDiv.onclick = async () => {
      await deleteDoc(doc(db, "messages", docItem.id));
    };

    box.appendChild(messageDiv);
  });

  box.scrollTop = box.scrollHeight;
});
