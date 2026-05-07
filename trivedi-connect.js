// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCu9pQYnkbGRTVN8798C3ilvrc6Z_EmrH0",
  authDomain: "trivedi-8d263.firebaseapp.com",
  projectId: "trivedi-8d263",
  storageBucket: "trivedi-8d263.firebasestorage.app",
  messagingSenderId: "531536403649",
  appId: "1:531536403649:web:daff55e05741e0af0b8840",
  measurementId: "G-LLBMZYDJ39"
};

// 🔥 IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔥 SEND MESSAGE
async function sendMessage() {

  if (!auth.currentUser) {
    alert("Login first!");
    return;
  }

  const msgInput = document.getElementById("msg");
  const msg = msgInput.value.trim();

  if (msg === "") return;

  msgInput.value = "";

  await addDoc(collection(db, "messages"), {
    text: msg,
    time: Date.now(),
    sender: auth.currentUser.uid,
    name: auth.currentUser.displayName
  });
}

// 🔥 LOGIN
async function login() {

  try {

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 🔥 SAVE USER
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      bio: "Using Trivedi Connect 🚀"
    });

    loadProfile();

  } catch (error) {
    console.log(error);
  }
}

window.login = login;

// 🔥 PAGE LOAD
window.onload = () => {

  // SEND BUTTON
  document
    .getElementById("sendBtn")
    .addEventListener("click", sendMessage);

  // ENTER KEY
  document
    .getElementById("msg")
    .addEventListener("keypress", (e) => {

      if (e.key === "Enter") {
        sendMessage();
      }

    });

  // CHAT ACTIVE EFFECT
  document.querySelectorAll(".chat-list").forEach(item => {

    item.addEventListener("click", () => {

      document
        .querySelectorAll(".chat-list")
        .forEach(el => el.classList.remove("active"));

      item.classList.add("active");

    });

  });

};

// 🔥 REALTIME MESSAGES
const q = query(
  collection(db, "messages"),
  orderBy("time")
);

onSnapshot(q, (snapshot) => {

  const box = document.getElementById("messages");

  box.innerHTML = "";

  snapshot.forEach((docItem) => {

    const data = docItem.data();

    const messageDiv = document.createElement("div");

    // 🔥 OWN / OTHER MESSAGE
    if (
      auth.currentUser &&
      data.sender === auth.currentUser.uid
    ) {

      messageDiv.className = "message user";

    } else {

      messageDiv.className = "message bot";

    }

    // 🔥 TIME
    const time = new Date(data.time)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

    // 🔥 MESSAGE HTML
    messageDiv.innerHTML = `
      <strong>${data.name}</strong><br>
      ${data.text}
      <div class="time">${time}</div>
    `;

    // 🔥 LONG PRESS DELETE
    if (
      auth.currentUser &&
      data.sender === auth.currentUser.uid
    ) {

      let pressTimer;

      messageDiv.onmousedown = () => {

        pressTimer = setTimeout(async () => {

          const confirmDelete =
            confirm("Delete this message?");

          if (confirmDelete) {

            await deleteDoc(
              doc(db, "messages", docItem.id)
            );

          }

        }, 700);

      };

      messageDiv.onmouseup = () => {
        clearTimeout(pressTimer);
      };

      messageDiv.onmouseleave = () => {
        clearTimeout(pressTimer);
      };

    }

    box.appendChild(messageDiv);

  });

  box.scrollTop = box.scrollHeight;

});

// 🔥 LOAD PROFILE
async function loadProfile() {

  if (!auth.currentUser) return;

  const ref = doc(
    db,
    "users",
    auth.currentUser.uid
  );

  const snap = await getDoc(ref);

  if (snap.exists()) {

    const data = snap.data();

    const username =
      document.getElementById("username");

    const bio =
      document.getElementById("bio");

    const dp =
      document.getElementById("dp");

    if (username) {
      username.innerText = data.name;
    }

    if (bio) {
      bio.innerText = data.bio;
    }

    if (dp) {
      dp.src = data.photo;
    }

  }

}
