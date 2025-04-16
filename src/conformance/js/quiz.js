export function renderQuiz(questions) {
    let currentIndex = 0;
    let answers = []; // 각 질문에 대한 정답 번호를 추적

    // 각 섹션을 동적으로 생성하는 함수
    function renderQuestion(index) {
        const q = questions[index];

        // 미리 정의된 컨테이너를 가져오기
        const container = document.getElementById(`quiz-container-${index + 1}`);

        // 컨테이너가 없으면 경고 출력
        if (!container) {
            console.warn(`컨테이너 quiz-container-${index + 1}를 찾을 수 없습니다.`);
            return;
        }

        const submitButton = document.getElementById("submit-btn"); // 제출 버튼
        const resultDiv = document.getElementById("result"); // 결과를 표시할 div

        // 새로운 섹션 HTML 구성 (section 없이 바로 container에 질문과 옵션 추가)
        const questionHTML = `
            <div class="question">${q.question}</div>
            <div class="options">
                ${q.options
            .map(
                (opt, i) => `<button class="option-btn" data-value="${opt}" data-index="${i + 1}">${opt}</button>`
            )
            .join("")}
            </div>
        `;

        // 각 컨테이너에 질문과 옵션을 추가
        container.innerHTML = questionHTML;

        // 버튼 클릭 이벤트 처리 함수
        container.addEventListener("click", (event) => {
            if (event.target && event.target.classList.contains("option-btn")) {
                const selected = event.target.dataset.value;
                const selectedIndex = event.target.dataset.index;
                const isCorrect = selected === q.answer;

                const optionButtons = container.querySelectorAll(".option-btn");

                // 정답에 맞는 클래스 추가/제거
                optionButtons.forEach(b => {
                    b.classList.remove("correct", "incorrect");
                });

                if (isCorrect) {
                    event.target.classList.add("correct");
                } else {
                    event.target.classList.add("incorrect");
                }

                // 각 질문에 대한 정답 번호 저장
                answers[currentIndex] = { selected: selectedIndex, correct: q.answer };

                // 다음 섹션으로 넘어가기
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    renderNextSection(currentIndex); // 다음 섹션 렌더링
                } else {
                    // 모든 질문을 완료한 후 제출 버튼 보이기
                    submitButton.style.display = "block";  // 제출 버튼 보이기
                }
            }
        });

        // 제출 버튼 클릭 시 퀴즈 결과를 div에 표시
        submitButton.addEventListener("click", () => {
            let resultText = '';
            answers.forEach((answer, index) => {
                resultText += `${index + 1}번의 정답: ${answer.correct} (당신의 선택: ${answer.selected}번)<br>`;
            });
            resultDiv.innerHTML = resultText;
            resultDiv.style.display = "block"; // 결과 div 보이기
        });
    }

    // 섹션을 전환하는 함수
    function renderNextSection(index) {
        const previousContainer = document.getElementById(`quiz-container-${index}`);
        const currentContainer = document.getElementById(`quiz-container-${index + 1}`);

        // 이전 섹션 숨기기
        if (previousContainer) {
            previousContainer.style.display = "none";
        }

        // 현재 섹션 보이기
        if (currentContainer) {
            currentContainer.style.display = "block";
        }
    }

    // 첫 번째 질문을 렌더링
    questions.forEach((q, index) => renderQuestion(index));

    // 첫 번째 섹션만 보이도록 설정
    const firstContainer = document.getElementById(`quiz-container-1`);
    if (firstContainer) firstContainer.style.display = "block";
}
