// Data configuration for Girls
const companionData = {
  Aditi: { logo: '11987_2.png', bg: '11988_2.png' },
  Suhani: { logo: '11993_2.png', bg: '11984_2.png' },
  Aarohi: { logo: '11992_2.png', bg: '11985_2.png' }
};

// ==========================================
// 1. SPLASH SCREEN TO AUTH LOGIC (10 Seconds)
// ==========================================
window.onload = function() {
  setTimeout(() => {
    const splash = document.getElementById("splashScreen");
    splash.style.opacity = "0"; // Smooth fade out
    
    setTimeout(() => {
      splash.classList.remove("splash-active");
      splash.classList.add("hidden");
      
      const auth = document.getElementById("authScreen");
      auth.classList.remove("hidden");
    }, 1000); // 1 sec fade animation wait
  }, 10000); // Exact 10 seconds waiting time
};

// ==========================================
// 2. LOGIN LOGIC
// ==========================================
function loginDummy() {
  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
}

// ==========================================
// 3. SETTINGS DRAWER LOGIC
// ==========================================
function toggleSettings() {
  const drawer = document.getElementById("settingsDrawer");
  if (drawer.classList.contains("open")) {
    drawer.classList.remove("open");
  } else {
    // Show Drawer
    drawer.classList.remove("hidden");
    // Chota sa delay slide animation work karne ke liye
    setTimeout(() => {
      drawer.classList.add("open");
    }, 10);
  }
}

// ==========================================
// 4. CHAT ROOM LOGIC
// ==========================================
function openChatRoom(companionName) {
  const data = companionData[companionName];

  document.getElementById("dashboardScreen").classList.add("hidden");
  document.getElementById("chatScreen").classList.remove("hidden");

  document.getElementById("chatCharacterName").innerHTML = `
    <img src="${data.logo}" class="chat-header-avatar" alt="${companionName}"> 
    <span>${companionName}</span>
  `;

  const chatScreen = document.getElementById("chatScreen");
  chatScreen.style.backgroundImage = `linear-gradient(rgba(13, 13, 18, 0.7), rgba(13, 13, 18, 0.9)), url('${data.bg}')`;

  const chatBox = document.getElementById("chatHistory");
  chatBox.innerHTML = `<div class="bot-msg">Hi Yuvi! Main ${companionName} hoon. Kaise ho aap? ❤️</div>`;
}

function goBackToDashboard() {
  document.getElementById("chatScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
}

function sendMsg() {
  const input = document.getElementById("msgText");
  const chatBox = document.getElementById("chatHistory");
  const text = input.value.trim();

  if (text !== "") {
    chatBox.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      chatBox.innerHTML += `<div class="bot-msg">Aapka message receive ho gaya Yuvi! Jald hi reply karungi.</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
}
