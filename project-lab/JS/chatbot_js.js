let questions = [
  {
    question: "Te-ai apucat de ideea de proiect?",
    options: {
      a: "Da, am deja o schiță!",
      b: "Nu încă, dar mă gândesc la ceva",
      c: "Nu prea știu ce să fac...",
    },
    correctAnswer: "a",
    correctResponse: "Excelent! Abia aștept să văd ce iese!",
    incorrectResponse: "Nu-i nimic! Discutăm idei împreună",
  },
  {
    question: "Cum merge echipa ta la proiect?",
    options: {
      a: "Ne organizăm bine!",
      b: "Mai greu cu sincronizarea...",
      c: "Sunt singur",
    },
    correctAnswer: "a",
    correctResponse: "Foarte tare! Munca în echipă e cheia succesului!",
    incorrectResponse: "O să găsim soluții împreună, nu-ți face griji",
  },
  {
    question: "Cum te descurci cu HTML și CSS?",
    options: {
      a: "Bine, deja am făcut mai multe pagini",
      b: "Mă descurc, dar mai caut prin documentație",
      c: "Încă mi se pare greu",
    },
    correctAnswer: "a",
    correctResponse: "Super! Bazele bune fac restul mult mai ușor!",
    incorrectResponse: "Cu puțină practică o să meargă din ce în ce mai bine",
  },
  {
    question: "Ai scris deja primele rânduri de JavaScript?",
    options: {
      a: "Da, formularul de login se validează!",
      b: "Doar am citit despre el",
      c: "Încă nu",
    },
    correctAnswer: "a",
    correctResponse: "Bravo! JavaScript dă viață paginilor tale!",
    incorrectResponse: "Hai să începem cu pași mici, un eveniment pe rând",
  },
];

let currentQuestionIndex = 0;
let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");

displayQuestion();

function displayQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let optionsHTML = Object.keys(currentQuestion.options)
    .map((key) => `${key}. ${currentQuestion.options[key]}`)
    .join(" | ");

  let botResponse = document.createElement("div");
  botResponse.classList.add("message", "bot");
  botResponse.innerHTML = `<strong>Bot:</strong> ${currentQuestion.question}<br>${optionsHTML}`;

  chatContainer.appendChild(botResponse);
  scrollChatContainerToBottom();
}

function scrollChatContainerToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let userResponse = userInput.value.toLowerCase().trim();
  if (userResponse === "") return;

  let userMessage = document.createElement("div");
  userMessage.classList.add("message", "user");
  userMessage.innerHTML = `<strong>You:</strong> `;
  userMessage.append(userResponse);
  chatContainer.appendChild(userMessage);

  let currentQuestion = questions[currentQuestionIndex];
  let botResponse = document.createElement("div");
  botResponse.classList.add("message", "bot");
  botResponse.innerHTML = `<strong>Bot:</strong> `;

  if (userResponse === currentQuestion.correctAnswer) {
    botResponse.innerHTML += currentQuestion.correctResponse;
  } else {
    botResponse.innerHTML += currentQuestion.incorrectResponse;
  }

  chatContainer.appendChild(botResponse);

  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  userInput.value = "";

  setTimeout(() => {
    displayQuestion();
    scrollChatContainerToBottom();
  }, 800);
});
