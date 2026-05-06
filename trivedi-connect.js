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
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, setDoc, getDoc} 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


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
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 🔥 USER DATA SAVE
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      bio: "Hey, I am using Trivedi Connect 🚀"
    });

    alert("Login successful ✅");
    loadProfile();

  } catch (error) {
    console.log(error);
    alert(error.message);
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
document.querySelectorAll(".chat-list").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".chat-list").forEach(el => el.classList.remove("active"));
    item.classList.add("active");
  });
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
    const time = new Date(data.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

messageDiv.innerHTML = `
  <strong>${data.name}</strong><br>
  ${data.text}
  <div class="time">${time}</div>
`;

    // 🔥 LONG PRESS DELETE (ONLY OWN MESSAGE)
if (auth.currentUser && data.sender === auth.currentUser.uid) {

  let pressTimer;

  messageDiv.onmousedown = () => {
    pressTimer = setTimeout(async () => {

      let confirmDelete = confirm("Delete this message?");

      if (confirmDelete) {
        await deleteDoc(doc(db, "messages", docItem.id));
      }

    }, 700);
  };

  messageDiv.onmouseup = () => clearTimeout(pressTimer);
  messageDiv.onmouseleave = () => clearTimeout(pressTimer);

}
}

    box.appendChild(messageDiv);
  });

  box.scrollTop = box.scrollHeight;
});




//
async function loadProfile() {
  if (!auth.currentUser) return;

  const ref = doc(db, "users", auth.currentUser.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();

    document.getElementById("username").innerText = data.name;
    document.getElementById("bio").innerText = data.bio;
    document.getElementById("dp").src = data.photo;
  }
}



async function postStatus() {

  if (!auth.currentUser) {
    alert("Login first!");
    return;
  }

  let text = prompt("Write your status...");

  if (!text) return;

  await addDoc(collection(db, "status"), {
    text: text,
    name: auth.currentUser.displayName,
    time: Date.now()
  });

}
