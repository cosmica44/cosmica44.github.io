// Quiz questions and options
const quizData = [
    {
        question: "1. How satisfied are you with your current job or career path?",
        options: [
            { text: "Very satisfied", score: 1 },
            { text: "Somewhat satisfied", score: 2 },
            { text: "Neutral", score: 3 },
            { text: "Somewhat dissatisfied", score: 4 },
            { text: "Very dissatisfied", score: 5 }
        ]
    },
    {
        question: "2. How financially prepared are you to take an extended break from work?",
        options: [
            { text: "Not prepared and concerned about finances", score: 1 },
            { text: "Not prepared but willing to make financial adjustments", score: 2 },
            { text: "Somewhat prepared but need to budget carefully", score: 3 },
            { text: "Fully prepared with sufficient savings", score: 4 },
            { text: "Extremely well-prepared with ample savings and investments", score: 5 }
        ]
    },
    {
        question: "3. Have you set clear goals for what you want to achieve during your sabbatical?",
        options: [
            { text: "No, I haven't thought about it", score: 1 },
            { text: "Not yet, but I plan to set goals soon", score: 2 },
            { text: "I have general ideas but need to refine them", score: 3 },
            { text: "Yes, I have specific goals", score: 4 },
            { text: "Yes, I have specific and detailed goals", score: 5 }
        ]
    },
    {
        question: "4. How supportive do you think your company will be if you ask for a career break?",
        options: [
            { text: "Not supportive at all", score: 1 },
            { text: "Not very supportive", score: 2 },
            { text: "Neutral or mixed feelings", score: 3 },
            { text: "Somewhat supportive", score: 4 },
            { text: "Yes, they are very supportive", score: 5 }
        ]
    },
    {
        question: "5. How comfortable are you with uncertainty and stepping out of your comfort zone?",
        options: [
            { text: "Very uncomfortable", score: 1 },
            { text: "Slightly uncomfortable", score: 2 },
            { text: "Neutral", score: 3 },
            { text: "Somewhat comfortable", score: 4 },
            { text: "Very comfortable and excited", score: 5 }
        ]
    },
    {
        question: "6. Are you prepared to handle potential career implications of taking a sabbatical (e.g., job security, career progression)?",
        options: [
            { text: "Not prepared and worried about the consequences", score: 1 },
            { text: "Not sure, need more information", score: 2 },
            { text: "Somewhat prepared but have concerns", score: 3 },
            { text: "Mostly prepared and accept the implications", score: 4 },
            { text: "Yes, I've planned for it and accept the implications", score: 5 }
        ]
    },
    {
        question: "7. How ready are you to take action to start the process of planning a career sabbatical?",
        options: [
            { text: "I don't know if I even want to try", score: 1 },
            { text: "Not ready to commit yet", score: 2 },
            { text: "Ready but I don't know where to start", score: 3 },
            { text: "Mostly ready and committed", score: 4 },
            { text: "Fully ready and committed", score: 5 }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const quizElement = document.getElementById('quiz');
console.log('quizElement:', quizElement);

const submitButton = document.getElementById('submit');
console.log('submitButton:', submitButton);

const resultsElement = document.getElementById('results');
console.log('resultsElement:', resultsElement);

const scoreResultElement = document.getElementById('score-result');
console.log('scoreResultElement:', scoreResultElement);

const emailFormModal = document.getElementById('email-form-modal');
console.log('emailFormModal:', emailFormModal);

   function loadQuestion() {
       const question = quizData[currentQuestion];
       let questionHTML = `
           <div class="question">
               <h2>${question.question}</h2>
               <div class="options">
       `;
       
       question.options.forEach((option, index) => {
           questionHTML += `
               <label class="option">
                   <input type="radio" name="answer" value="${index}" required>
                   ${option.text}
               </label>
           `;
       });
       
       questionHTML += `
               </div>
           </div>
       `;
       
       quizElement.innerHTML = questionHTML;
   }

   function submitQuiz() {
       const selectedOption = document.querySelector('input[name="answer"]:checked');
       if (selectedOption) {
           score += quizData[currentQuestion].options[selectedOption.value].score;
           currentQuestion++;
           
           if (currentQuestion < quizData.length) {
               loadQuestion();
           } else {
               document.getElementById('emailModal').style.display = 'block';
           }
       }
   }

   function submitEmail(e) {
    e.preventDefault();
    const email = document.getElementById('email-modal').value;

    if (validateEmail(email)) {
        const resultMessage = getResultMessage(); // Get the quiz results message
        addEmailToHighLevel(email, resultMessage); // Pass the results to the function
        sendResultsEmail(email);
        console.log(`Email: ${email}, Score: ${score}`);
        alert("Thank you! Your results have been sent to your email.");
        document.getElementById('emailModal').style.display = 'none'; // Hide the modal
        showResults();
    } else {
        alert("Please enter a valid email address.");
    }
}

function addEmailToHighLevel(email, resultMessage) {
    console.log('Sending email to HighLevel:', email, resultMessage);
    fetch('https://rest.gohighlevel.com/v1/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Ik13eDNnQldnSWJ5ZDU0ak1ueVlWIiwidmVyc2lvbiI6MSwiaWF0IjoxNzI1MDQ3MDExODMwLCJzdWIiOiJLalBjNTl2MHZEWnJHejNTQlViZyJ9.3_9PVzBeca1qf_8rAE67xlYOS_mVvbrMduw6vcptlv4'
        },
        body: JSON.stringify({ 
            email: email, 
            customField: { 'Cjygcb9fkym82GADTt63': resultMessage }
            })
    })
    .then(response => response.json())
    .then(data => console.log('HighLevel response:', data))
    .catch(error => console.error('Error adding email to HighLevel:', error));
}


   function validateEmail(email) {
       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;sendResultsEmail
       return re.test(email);
   }
   
   function sendResultsEmail(email) {
    const resultMessage = getResultMessage();
    console.log('sendResultsEmail:', email, resultMessage);

    // Example using a generic email service
    fetch('https://rest.gohighlevel.com/v1/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Ik13eDNnQldnSWJ5ZDU0ak1ueVlWIiwidmVyc2lvbiI6MSwiaWF0IjoxNzI1MDQ3MDExODMwLCJzdWIiOiJLalBjNTl2MHZEWnJHejNTQlViZyJ9.3_9PVzBeca1qf_8rAE67xlYOS_mVvbrMduw6vcptlv4' // Replace with your actual API key
        },
        body: JSON.stringify({
            to: email,
            subject: 'Your Quiz Results',
            text: `Thank you for taking the quiz. Here are your results: ${resultMessage}`,
            customField: { 'Cjygcb9fkym82GADTt63': resultMessage }
        })
    })
    .then(response => response.json())
    .then(data => console.log('Email sent:', data))
    .catch(error => console.error('Error sending email:', error));
}

function getResultMessage() {
    const maxScore = quizData.length * 5;
    if (score >= 30) {
        return "High Readiness - You appear ready to take a sabbatical";
    } else if (score >= 22) {
        return "Moderate Readiness - You're on the right track, but may need more planning";
    } else {
        return "Low Readiness - You may need more preparation before taking a sabbatical";
    }
}

   function showResults() {
       console.log("Showing results..."); 
       quizElement.style.display = 'none';
       submitButton.style.display = 'none';
       resultsElement.style.display = 'block';
       scoreResultElement.textContent = `Your result: ${getResultMessage()}`;
}
       
       const maxScore = quizData.length * 5;
       let result;
       if (score >= 30) {
           result = "High Readiness - You appear ready to take a sabbatical";
       } else if (score >= 22) {
           result = "Moderate Readiness - You're on the right track, but may need more planning";
       } else {
           result = "Low Readiness - You may need more preparation before taking a sabbatical";
       }
       
       scoreResultElement.textContent = `Your result: ${result}`;
   

   // Close modal when clicking the close button
   const closeButton = document.querySelector('.close');
   if (closeButton) {
       closeButton.onclick = function() {
           document.getElementById('emailModal').style.display = 'none';
       }
   }

   // Close modal when clicking outside of it
     window.onclick = function(event) {
        if (event.target == document.getElementById('emailModal')) {
            document.getElementById('emailModal').style.display = 'none';
        }
    }

   // Event listeners
   submitButton.addEventListener('click', submitQuiz);
   if (emailFormModal) {
       emailFormModal.addEventListener('submit', submitEmail);
   }

   // Start the quiz
   loadQuestion();