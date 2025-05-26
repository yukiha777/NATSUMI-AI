// 음성 인식 초기화
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ko-KR';
recognition.continuous = true;
recognition.interimResults = false;

// DOM 요소
const log = document.getElementById("log");
const startBtn = document.getElementById("startBtn");

// 음성 인식 시작
startBtn.addEventListener("click", () => {
  recognition.start();
  log.textContent = "🎧 듣는 중... 나츠미 불러봐!";
});

// 음성 인식 결과 처리
recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim();
  log.textContent = `🗣️ 들은 말: ${transcript}`;

  // 여러 호출어 조건 검사
  const triggerWords = ["나츠미", "츠미야", "츠미짱", "나츠밍", "나짱"];
  const isTriggered = triggerWords.some(word => transcript.includes(word));

  if (isTriggered) {
    log.textContent = "✨ 나츠미 호출 감지! 대답 중...";
    speak("왜 불러, 바보 하루키."); // 츤츤 음성 대답
  }
};

// 음성 합성 (TTS)
function speak(text) {
  const utter = new SpeechSynthesisUtterance();
  utter.text = text;
  utter.lang = 'ko-KR';
  utter.pitch = 1.2;
  utter.rate = 1;

  // 한국어 여성 목소리 선택
  const voices = window.speechSynthesis.getVoices();
  const koreanVoices = voices.filter(v => v.lang === 'ko-KR');
  if (koreanVoices.length > 0) {
    utter.voice = koreanVoices[0];
  }

  window.speechSynthesis.speak(utter);
}

// 에러 처리
recognition.onerror = (event) => {
  log.textContent = `⚠️ 에러 발생: ${event.error}`;
};

// 인식 종료 시
recognition.onend = () => {
  log.textContent = "🛑 음성 인식 종료됨. 다시 시작하려면 버튼 눌러!";
};