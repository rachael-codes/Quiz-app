const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "FFC stands for?",
        choice1: "Foreign Finance Corporation",
        choice2: "Film Finance Corporation",
        choice3: "Federation of Football Council",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "A clock is started at noon. By 10 minutes past 5, the hour hand has turned through:",
        choice1: "145°",
        choice2: "150°",
        choice3: "155°",
        choice4: "160°",
        answer: 3,
    },
    {
        question: "What country has the highest life expectancy?",
        choice1: "Hong Kong",
        choice2: "USA",
        choice3: "Japan",
        choice4: "New Zealand",
        answer: 1,
    },
    {
        question: "What sports car company manufactures the 911?",
        choice1: "Lamborghini",
        choice2: "Bugatti",
        choice3: "Ferrari",
        choice4: "Porsche",
        answer: 4,
    },
    {
        question: "What country has won the most World Cups?",
        choice1: "France",
        choice2: "Brazil",
        choice3: "Argentina",
        choice4: "Italy",
        answer: 2,
    },
    {
        question: "In what country would you find Mount Kilimanjaro? ",
        choice1: "Zimbabwe",
        choice2: "Egypt",
        choice3: "Kenya",
        choice4: "Tanzania",
        answer: 4,
    },
    {
        question: "What is the largest Spanish-speaking city in the world? ",
        choice1: "Madrid",
        choice2: "Mexico City",
        choice3: "Barcelona",
        choice4: "Los Angeles",
        answer: 2,
    },
    {
        question: "How many bones do we have in an ear? ",
        choice1: "3",
        choice2: "4",
        choice3: "5",
        choice4: "6",
        answer: 1,
    },
    {
        question: "How many faces does a Dodecahedron have?",
        choice1: "8",
        choice2: "10",
        choice3: "12",
        choice4: "14",
        answer: 3,
    },
    {
        question: "What is the capital of Finland?",
        choice1: "Ohio",
        choice2: "Canberra",
        choice3: "Stockholm",
        choice4: "Helsinki",
        answer: 4,
    },
    {
        question: "Who painted the Mona Lisa?",
        choice1: "Vincent van Gogh",
        choice2: "Pablo Picasso",
        choice3: "Leonardo Da Vinci",
        choice4: "Charles Babbage",
        answer: 3,
    },
    {
        question: "Which planet is closest to the sun?",
        choice1: "Mercury",
        choice2: "Venus",
        choice3: "Earth",
        choice4: "Mars",
        answer: 1,
    },
    {
        question: "What's a baby rabbit called?",
        choice1: "A kitten",
        choice2: "A kit",
        choice3: "A cub",
        choice4: "A puppy",
        answer: 2,
    },
    {
        question: "What does He stand for on the periodic table?",
        choice1: "Helium",
        choice2: "Silver",
        choice3: "Copper",
        choice4: "Hydrogen",
        answer: 1,
    },
    {
        question: "What is a group of pandas known as?",
        choice1: "A litter",
        choice2: "A herd",
        choice3: "An embarrassment",
        choice4: "A troop",
        answer: 3
    }
]

const SCORE_POINTS = 5
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()