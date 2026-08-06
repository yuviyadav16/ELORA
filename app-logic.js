// --- 1. SPLASH SCREEN TO LOGIN ---
window.onload = () => {
  setTimeout(() => {
    const splash = document.getElementById("splashScreen");
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.classList.add("hidden");
      document.getElementById("authScreen").classList.remove("hidden");
    }, 500);
  }, 2500); // 2.5 Sec Smooth Splash
};

// --- 2. AUTHENTICATION & PROFILE LOGIC ---
function togglePassword() {
  const pwd = document.getElementById("userPassword");
  const icon = document.querySelector(".toggle-password");
  if (pwd.type === "password") {
    pwd.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    pwd.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function loginUser() {
  const name = document.getElementById("userName").value;
  const dob = document.getElementById("userDOB").value;
  
  // Calculate Age (18+ Verification UI Side)
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  
  // Save locally to display in profile
  localStorage.setItem("elora_user", name);
  localStorage.setItem("elora_age", age);

  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
}

// --- 3. SETTINGS & DRAWER LOGIC ---
function openSettings() {
  document.getElementById("displayUserName").innerText = localStorage.getItem("elora_user") || "Yuvi Bhai";
  document.getElementById("displayUserAge").innerText = `Age: ${localStorage.getItem("elora_age") || "18"}+`;
  
  const drawer = document.getElementById("settingsDrawer");
  drawer.classList.remove("hidden");
  setTimeout(() => drawer.classList.add("open"), 10);
}

function closeSettings() {
  const drawer = document.getElementById("settingsDrawer");
  drawer.classList.remove("open");
  setTimeout(() => drawer.classList.add("hidden"), 400);
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

function logoutUser() {
  location.reload(); // Reloads app back to splash/login
}

// DP Upload Logic (Visual change)
document.getElementById('dpUpload').addEventListener('change', function(e) {
  if(e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('displayDP').src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
});

// --- 4. CHAT ROOM LOGIC ---
let currentBotLogo = "";

function openChat(name, logoImg, bgImg) {
  currentBotLogo = logoImg;
  document.getElementById("dashboardScreen").classList.add("hidden");
  document.getElementById("chatScreen").classList.remove("hidden");
  
  document.getElementById("chatName").innerText = name;
  document.getElementById("chatAvatar").src = logoImg;
  
  // Set Background Image directly on chat screen
  document.getElementById("chatScreen").style.backgroundImage = `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.95)), url('${bgImg}')`;
  
  // Clear chat and start fresh
  const chatArea = document.getElementById("chatArea");
  chatArea.innerHTML = `
    <div class="msg bot-msg fade-up">
      <img src="${logoImg}" class="bot-icon">
      <div>Hi Yuvi! Main ${name} hoon... Aaj kya plan hai? ❤️</div>
    </div>
  `;
}

function goHome() {
  document.getElementById("chatScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
  document.getElementById("chatMenu").classList.add("hidden"); // close menu if open
}

function toggleChatMenu() {
  document.getElementById("chatMenu").classList.toggle("hidden");
}

// --- 5. CHAT MESSAGING & EMOJI ANIMATION ---
function handleEnter(e) { if(e.key === 'Enter') sendMessage(); }

function sendMessage() {
  const input = document.getElementById("chatInput");
  let text = input.value.trim();
  if (!text) return;

  // Check if text has emojis to animate them
  const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  text = text.replace(emojiRegex, '<span class="emoji-anim">$1</span>');

  const chatArea = document.getElementById("chatArea");
  
  // Add User Msg
  chatArea.innerHTML += `<div class="msg user-msg fade-up">${text}</div>`;
  input.value = "";
  chatArea.scrollTop = chatArea.scrollHeight;

  // AI Reply Simulation
  setTimeout(() => {
    chatArea.innerHTML += `
      <div class="msg bot-msg fade-up">
        <img src="${currentBotLogo}" class="bot-icon">
        <div>Wow! <span class="emoji-anim">😍</span> Tumhari baatein bohot achi hain!</div>
      </div>
    `;
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 1000);
}

function startNewChat() {
  document.getElementById("chatArea").innerHTML = `<div class="msg bot-msg fade-up"><img src="${currentBotLogo}" class="bot-icon"><div>Nayi shuruaat karte hain! Bolo?</div></div>`;
  toggleChatMenu();
}

// --- 6. MODALS LOGIC ---
function showModal(id) {
  document.getElementById(id).classList.remove("hidden");
  if(id === 'deleteChatModal') toggleChatMenu();
}

function hideModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function confirmDeleteChat() {
  document.getElementById("chatArea").innerHTML = "";
  hideModal("deleteChatModal");
}

function confirmDeleteAccount() {
  alert("Verification Link Sent to Email! Account will be deleted permanently.");
  hideModal("deleteAccountModal");
  logoutUser();
}
