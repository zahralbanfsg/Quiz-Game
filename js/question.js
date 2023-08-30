// display Question

import { questions, quiz, questionsContainer, quizOptions, questionsNumber } from "./index.js";

export class Question {
    constructor(index) {
        this.question = questions[index].question;
        this.category = questions[index].category;
        this.index = index;
        this.answer = questions[index].correct_answer;
        this.wrongAnswer = questions[index].incorrect_answers;  //return array
        this.allAnswer = this.displayAllAnswers();
        this.answered = false;
    }

    displayAllAnswers() {
        return this.wrongAnswer.concat(this.answer).sort(); //return array
    }

    //to display the current question
    displayQuestion() {
        const questionMarkUp = `<div class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
                <div class="w-100 d-flex justify-content-between">
                <span class="btn btn-category">${this.category}</span>
                <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length} Questions</span>
            </div>
            <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
            <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
            ${this.allAnswer.map(function (answer) {
            return `<li>${answer}</li>`
        }).join("")}
            </ul>
            <h2 class="text-capitalize text-center score-color h3 fw-bold">
            <i class="bi bi-emoji-laughing"></i>
            Score:${quiz.score}
            </h2>        
            </div>`;

        questionsContainer.innerHTML = questionMarkUp;

        const allAnswer = document.querySelectorAll(".question ul li");
        for (let i = 0; i < allAnswer.length; i++) {
            allAnswer[i].addEventListener("click", (eventInfo) => {
                this.checkAnswer(eventInfo);
            })
        }
    }

    checkAnswer(eventInfo) {
        if (!this.answered) {
            this.answered = true;
            if (eventInfo.target.innerHTML.toLowerCase() === this.answer.toLowerCase()) {
                eventInfo.target.classList.add("correct", "animate__animated", "animate__flipInY");
                quiz.score += 1;
            } else {
                eventInfo.target.classList.add("wrong", "animate__animated", "animate__shakeX");
            }
        }
        this.animateQuestion(eventInfo.target.closest(".question"), 1000);
    }

    animateQuestion(element, duration) {
        setTimeout(() => {
            element.classList.replace("animate__bounceIn", "animate__backOutLeft");
            setTimeout(() => {
                this.nextQuestion();
            }, 500);
        }, duration);
    }

    nextQuestion() {
        this.index += 1;
        if (this.index > questions.length - 1) {
            questionsContainer.innerHTML = quiz.endQuiz();
            const tryAgainBtn = document.querySelector(".again");
            tryAgainBtn.addEventListener("click", function () {
                quizOptions.classList.replace("d-none", "d-flex");
                questionsContainer.classList.add("d-none");
                questionsNumber.value = "";
            })
            return;
        }
        const newQuestion = new Question(this.index);
        newQuestion.displayQuestion();

    }
}