// Har girl ki specific Logo aur Background Image mapping
const companionData = {
  Aditi: { 
    logo: '11987_2.png',  // Image 1
    bg: '11988_2.png'     // Image 4 (Background)
  },
  Suhani: { 
    logo: '11993_2.png',  // Image 2
    bg: '11984_2.png'     // Image 5 (Background)
  },
  Aarohi: { 
    logo: '11992_2.png',  // Image 3
    bg: '11985_2.png'     // Image 6 (Background)
  }
};

let currentChatCompanion = "";

function openChatRoom(companionName) {
  currentChatCompanion = companionName;
  const data = companionData[companionName];

  // 1. Screens switch karna (Dashboard hide, Chat show)
  document.getElementById("dashboardScreen").classList.add("hidden");
  document.getElementById("chatScreen").classList.remove("hidden");

  // 2. Chat Header me Name aur Logo update karna
  document.getElementById("chatCharacterName").innerHTML = `
    <img src="${data.logo}" class="chat-header-avatar" alt="${companionName}"> 
    <span>${companionName}</span>
  `;

  // 3. Chat Screen ka Full Background Image update karna
  const chatScreen = document.getElementById("chatScreen");
  chatScreen.style.backgroundImage = `linear-gradient(rgba(11, 11, 16, 0.85), rgba(11, 11, 16, 0.95)), url('${data.bg}')`;
  chatScreen.style.backgroundSize = "cover";
  chatScreen.style.backgroundPosition = "center";
  chatScreen.style.backgroundAttachment = "fixed";

  // Naya chat room load hone par blank/history dikhane ka logic yahan aayega
  document.getElementById("chatHistory").innerHTML = `
    <div class="bot-msg">Hi, main ${companionName} hoon. Main tumhara wait kar rahi thi... ❤️</div>
  `;
}

// Back to Dashboard logic
function goBackToDashboard() {
  document.getElementById("chatScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
}

