//take data from user and dispaly everything at page
import { GetQuestions } from "./GetQuestions.js"
import { Question } from "./question.js";

const categoryMenu = document.querySelector("#categoryMenu");
const difficultyOptions = document.querySelector("#difficultyOptions");
export const questionsNumber = document.querySelector("#questionsNumber");
const startQuiz = document.querySelector("#startQuiz");
export let questions;
export const quizOptions = document.querySelector("#quizOptions");
export const questionsContainer = document.querySelector(".questions-container");
export let quiz;
const alert = document.querySelector(".alert")

startQuiz.addEventListener("click", async function () {
    if (!questionsNumber.value == " ") {
        alert.classList.replace("d-flex", "d-none");
        const category = categoryMenu.value;
        const difficulty = difficultyOptions.value;
        const numberOfQuestions = questionsNumber.value;
        quiz = new GetQuestions(category, difficulty, numberOfQuestions);
        questions = await quiz.getQuestion();
        const question = new Question(0);
        // hide form
        quizOptions.classList.replace("d-flex", "d-none")
        // display Question one
        question.displayQuestion();
    } else {
        alert.classList.replace("d-none", "d-flex");
    }
})
