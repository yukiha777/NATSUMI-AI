const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ko-KR';
recognition.continuous = true;
recognition.interimResults = false;

const log = document.getElementById("log");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  recognition.start();
  log.textContent = "🎧 듣는 중... 나츠미라고 불러봐!";
});

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim();
  log.textContent = `🗣️ 들은 말: ${transcript}`;

  if (transcript.includes("나츠미")) {
    log.textContent = "✨ 나츠미 호출 감지! 다음 단계로 고고!";
    // 다음 단계에서 TTS나 애니 추가 예정!
  }
};

recognition.onerror = (event) => {
  log.textContent = `⚠️ 에러: ${event.error}`;
};

recognition.onend = () => {
  log.textContent = "🛑 음성 인식 종료됨. 다시 시작하려면 버튼 눌러!";
};