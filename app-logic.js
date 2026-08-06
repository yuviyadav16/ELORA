// Har girl ki specific Logo aur Background Image mapping (As per your GitHub repo names)
const companionData = {
  Aditi: { 
    logo: '11987_2.png',  
    bg: '11988_2.png'     
  },
  Suhani: { 
    logo: '11993_2.png',  
    bg: '11984_2.png'     
  },
  Aarohi: { 
    logo: '11992_2.png',  
    bg: '11985_2.png'     
  }
};

let currentChatCompanion = "";

// 1. Temporary Login Function (Taki app aage badh sake bina Firebase ke abhi)
function loginDummy() {
  document.getElementById("authScreen").classList.remove("active");
  document.getElementById("authScreen").classList.add("hidden");
  
  document.getElementById("dashboardScreen").classList.remove("hidden");
  document.getElementById("dashboardScreen").classList.add("active");
}

// 2. Open Chat Room Logic
function openChatRoom(companionName) {
  currentChatCompanion = companionName;
  const data = companionData[companionName];

  // Screen switch
  document.getElementById("dashboardScreen").classList.remove("active");
  document.getElementById("dashboardScreen").classList.add("hidden");
  
  document.getElementById("chatScreen").classList.remove("hidden");
  document.getElementById("chatScreen").classList.add("active");

  // Chat Header Update
  document.getElementById("chatCharacterName").innerHTML = `
    <img src="${data.logo}" class="chat-header-avatar" alt="${companionName}"> 
    <span>${companionName}</span>
  `;

  // Chat Background Update with Glass Effect
  const chatScreen = document.getElementById("chatScreen");
  chatScreen.style.backgroundImage = `linear-gradient(rgba(13, 13, 18, 0.7), rgba(13, 13, 18, 0.9)), url('${data.bg}')`;

  // Clear old chat and start fresh
  const chatBox = document.getElementById("chatHistory");
  chatBox.innerHTML = `
    <div class="bot-msg">Hi Yuvi! Main ${companionName} hoon. Aaj ka din kaisa raha tumhara? ❤️</div>
  `;
}

// 3. Back to Dashboard Logic
function goBackToDashboard() {
  document.getElementById("chatScreen").classList.remove("active");
  document.getElementById("chatScreen").classList.add("hidden");
  
  document.getElementById("dashboardScreen").classList.remove("hidden");
  document.getElementById("dashboardScreen").classList.add("active");
}

// 4. Send Message UI logic
function sendMsg() {
  const input = document.getElementById("msgText");
  const chatBox = document.getElementById("chatHistory");
  const text = input.value.trim();

  if (text !== "") {
    // User message show karo
    chatBox.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = "";
    
    // Auto scroll bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Fake reply for now (Backend lagne tak)
    setTimeout(() => {
      chatBox.innerHTML += `<div class="bot-msg">Aapka message mil gaya! Yeh abhi demo version hai Yuvi bhai.</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
}
