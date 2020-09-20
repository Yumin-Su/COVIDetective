(function() {
    // Functions
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
                    );
                }
                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
                );
            }
        );
        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });
        var cert = "<b>";
        if (numCorrect >= 9) {
            cert = "PROFESSIONAL COVI-DETECTIVE";
        } else if (numCorrect >= 8) {
            cert = "PROGRESSIVE COVI-DETECTIVE";
        } else if (numCorrect >= 6) {
            cert = "MEDIUM COVI-DETECTIVE";
        } else {
            cert = "ROOKIE COVI-DETECTIVE";
        }
        cert += "</b>";
        // show number of correct answers out of total
        var score = Math.round(numCorrect * 17) / 10;
        var str = "<p>You scored ";
        str += `${score} out of ${myQuestions.length * 1.7}!</p><p>You have received the following certificate:</p><p id="certificate">${cert}</p>`;
        str += `<p>For more information on COVID-19, please check out these sources.</p><div><ul>
        <li><a href="https://www.hopkinsmedicine.org/coronavirus/coronavirus-research/">Coronavirus information and updates provided by JHU</a></li>
        <li><a href="https://www.nih.gov/coronavirus">U.S. Department of Health & Human Services</a></li>
        <li><a href="https://www.usatoday.com/story/money/2020/06/01/coronavirus-shave-nearly-8-trillion-off-gdp-through-2030-cbo-says/5312614002/">How Corona affect US economy</a></li>
        </ul></div>`;
        resultsContainer.innerHTML = str;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [{
            question: "What is Covid-19?",
            answers: {
                A: "a kind of bacteria",
                B: "a kind of virus",
                C: "a kind of chemical weapon",
                D: "a kind of rumor"
            },
            correctAnswer: "B"
        },
        {
            question: "Why the number behind the \"Covid-\" is \"19\"?",
            answers: {
                A: "because it is named in 2019",
                B: "because it is discovered to have 19 flagellums",
                C: "because it cannot survive in the environment with an under 19 degrees centigrade",
                D: "because it has 19 main types as a living thing"
            },
            correctAnswer: "A"
        },
        {
            question: "Where, in your point of view, the Covid-19 comes from?",
            answers: {
                A: "comes from biology laboratory by accident",
                B: "comes from outer space",
                C: "comes from wild animals in nature",
                D: "released by human intentionally"
            },
            correctAnswer: "C"
        },
        {
            question: "In which ways can Covid-19 NOT spread among people?",
            answers: {
                A: "spread by aerosols with saliva droplets containing Covid-19",
                B: "spread from infected mother to her newborn baby",
                C: "spread by close communicating without wearing masks",
                D: "spread by touch a patient with gloves"
            },
            correctAnswer: "D"
        },
        {
            question: "Why do you need to wash hands every time once you get back from public areas?",
            answers: {
                A: "because the government asks you to do so",
                B: "because washing the hand will prevent you from infecting others if you are potential patient",
                C: "because other people will treat you badly if you don't do so",
                D: "because this will ensure your safety even if there is patient in public areas"
            },
            correctAnswer: "D"
        },
        {
            question: "What is the role of face masks in preventing spread of Covid-19?",
            answers: {
                A: "kill the coronavirus by special micro-structure inside the masks",
                B: "degenerate the coronavirus by chemicals inside the masks like activated carbon",
                C: "improve the user's immune system by chemicals inside the masks",
                D: "filtrate the air and block the spreading path of coronavirus"
            },
            correctAnswer: "D"
        },
        {
            question: "Is there cases in the world that Covid-19 patient has been cured completely?",
            answers: {
                A: "Yes!",
                B: "No!"
            },
            correctAnswer: "A"
        },
        {
            question: "Which body organ will be harmed the most by the infection of coronavirus?",
            answers: {
                A: "heart",
                B: "liver",
                C: "lung",
                D: "kidney"
            },
            correctAnswer: "C"
        },
        {
            question: "Who has the largest risk of being infected by Covid-19 in the list below?",
            answers: {
                A: "a middle age woman who drives the ambulance for hospital",
                B: "an old man who works in the isolation areas for coronavirus in hospital",
                C: "a young university student who lives on the other side of a large hospital",
                D: "a middle age researcher who works in the lab studying Covid-19"
            },
            correctAnswer: "B"
        },
        {
            question: "Why the wild animal hosts are not wildly affected by coronavirus?",
            answers: {
                A: "animal hosts have certain body structure preventing severe negative effect",
                B: "they are actually affected but they display differently from human",
                C: "animal hosts' body contain certain inhibitors and DNAs to produce these inhibitors to suppress virus",
                D: "all the above is possible"
            },
            correctAnswer: "D"
        }
    ];

    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();