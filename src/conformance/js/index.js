import '../sass/index.scss';
import { renderQuiz } from './quiz.js';

// 사용자가 입력할 질문 데이터와 quiz-container ID
const userQuestions = [
    {
        id: "quiz-container-1",
        question: "1. 사과는 영어로 무엇인가요?",
        options: ["Apple", "Banana", "Orange", "Melon"],
        answer: "Apple"
    },
    {
        id: "quiz-container-2",
        question: "2. 대한민국의 수도는?",
        options: ["서울", "부산", "도쿄", "뉴욕"],
        answer: "서울"
    },
    {
        id: "quiz-container-3",
        question: "3. 2 + 2 = ?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    }
];

// 퀴즈 시작
renderQuiz(userQuestions);
