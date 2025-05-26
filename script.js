// 음성 인식 초기화
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ko-KR';
recognition.continuous = true; // 계속 듣기
recognition.interimResults = false; // 중간 결과 무시

document.getElementById("startBtn").addEventListener("click", () => {
  recognition.start();
  console.log("🎧 음성 인식 시작됨");
});

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim();
  console.log("🗣️ 들은 말:", transcript);

  if (transcript.includes("나츠미")) {
    console.log("✨ 나츠미 호출 감지!");
    // 다음 단계에서 여기에 음성 응답이나 애니메이션 추가할 예정
  }
};

recognition.onerror = (event) => {
  console.error("에러 발생:", event.error);
};

recognition.onend = () => {
  console.log("🛑 음성 인식이 종료되었어. 다시 시작할래?");
};
