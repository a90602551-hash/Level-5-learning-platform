// ========================================
// AWL Test JavaScript (Enhanced with Spelling Test)
// ========================================

// Note: currentStudent is declared in main.js as global variable
let testQuestions = [];
let spellingQuestions = [];
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let userAnswers = [];
let isSpellingPhase = false; // 스펠링 단계 플래그

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('AWL Test page loaded');
    
    // Check student login using the global getCurrentStudent function
    const student = getCurrentStudent();
    if (!student) {
        alert('로그인이 필요합니다.');
        location.href = 'index.html';
        return;
    }
    
    console.log('Current student:', student.name);
    updateStudentInfo(student);
    
    // Check if day1Vocabulary is loaded
    console.log('Day 1 Vocabulary available:', typeof day1Vocabulary !== 'undefined');
    if (typeof day1Vocabulary !== 'undefined') {
        console.log('Total AWL words:', day1Vocabulary.length);
    }
    
    prepareTestQuestions();
});

// ========================================
// Update Student Info
// ========================================
function updateStudentInfo(student) {
    if (student) {
        document.getElementById('studentName').textContent = student.name;
    }
}

// ========================================
// Prepare Test Questions
// ========================================
function prepareTestQuestions() {
    // Check if day1Vocabulary is available
    if (typeof day1Vocabulary === 'undefined' || !day1Vocabulary) {
        console.error('Day 1 vocabulary data not loaded');
        alert('단어 데이터를 불러올 수 없습니다.');
        return;
    }
    
    console.log('Preparing test with', day1Vocabulary.length, 'words');
    
    // Create test questions from Day 1 vocabulary (객관식 30문제)
    testQuestions = day1Vocabulary.map(word => {
        // Get 3 random wrong answers from other words
        const wrongAnswers = day1Vocabulary
            .filter(w => w.id !== word.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.word);
        
        // Combine correct and wrong answers
        const choices = [...wrongAnswers, word.word]
            .sort(() => Math.random() - 0.5);
        
        return {
            id: word.id,
            korean: word.koreanMeaning,
            correctAnswer: word.word,
            choices: choices,
            userAnswer: null,
            type: 'multiple-choice'
        };
    });
    
    // Shuffle questions
    testQuestions.sort(() => Math.random() - 0.5);
    
    // 스펠링 테스트 5문제 랜덤 선택
    spellingQuestions = day1Vocabulary
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((word, index) => ({
            id: 30 + index + 1,
            korean: word.koreanMeaning,
            correctAnswer: word.word.toLowerCase(),
            pronunciation: word.pronunciation,
            userAnswer: null,
            type: 'spelling'
        }));
    
    console.log('Test questions prepared:', testQuestions.length);
    console.log('Spelling questions prepared:', spellingQuestions.length);
}

// ========================================
// Start Test
// ========================================
function startTest() {
    console.log('startTest() called');
    
    // Validate test questions are prepared
    if (!testQuestions || testQuestions.length === 0) {
        alert('테스트 문제가 준비되지 않았습니다. 페이지를 새로고침해주세요.');
        console.error('Test questions not prepared');
        return;
    }
    
    const startScreen = document.getElementById('testStartScreen');
    const questionsScreen = document.getElementById('testQuestionsScreen');
    
    if (!startScreen || !questionsScreen) {
        console.error('Screen elements not found!');
        alert('화면 요소를 찾을 수 없습니다.');
        return;
    }
    
    startScreen.style.display = 'none';
    questionsScreen.style.display = 'block';
    
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    userAnswers = [];
    isSpellingPhase = false;
    
    console.log('Starting test with', testQuestions.length, 'multiple-choice questions');
    showQuestion();
}

// ========================================
// Show Question
// ========================================
function showQuestion() {
    const currentQuestions = isSpellingPhase ? spellingQuestions : testQuestions;
    const questionNum = isSpellingPhase ? 
        30 + currentQuestionIndex + 1 : 
        currentQuestionIndex + 1;
    const totalQuestions = 35;
    
    const question = currentQuestions[currentQuestionIndex];
    console.log('Showing question:', questionNum, question);
    
    // Update progress
    document.getElementById('currentQuestion').textContent = questionNum;
    document.getElementById('correctCount').textContent = correctAnswersCount;
    
    const progress = (questionNum / totalQuestions) * 100;
    document.getElementById('testProgressFill').style.width = progress + '%';
    
    // Update question number
    document.getElementById('qNum').textContent = questionNum;
    
    if (isSpellingPhase) {
        showSpellingQuestion(question);
    } else {
        showMultipleChoiceQuestion(question);
    }
}

// ========================================
// Show Multiple Choice Question
// ========================================
function showMultipleChoiceQuestion(question) {
    document.getElementById('questionText').textContent = question.korean;
    document.getElementById('questionKorean').textContent = '알맞은 영어 단어를 선택하세요';
    
    // Generate options (영어 선택지들)
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    question.choices.forEach((choice, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'answer-option';
        optionDiv.onclick = () => selectAnswer(choice, question.correctAnswer);
        
        optionDiv.innerHTML = `
            <div class="option-letter">${letters[index]}</div>
            <div class="option-text">${choice}</div>
            <i class="fas fa-check-circle option-icon correct-icon"></i>
            <i class="fas fa-times-circle option-icon wrong-icon"></i>
        `;
        
        optionsContainer.appendChild(optionDiv);
    });
}

// ========================================
// Show Spelling Question
// ========================================
function showSpellingQuestion(question) {
    document.getElementById('questionText').textContent = '📝 한글 뜻을 보고 영어 철자를 입력하세요';
    document.getElementById('questionKorean').textContent = '';
    
    // Create spelling input interface (Korean to English)
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <div style="background: linear-gradient(135deg, #F6E27F 0%, #E5D06B 100%);
                        color: #1F2A44; padding: 30px; 
                        border-radius: 16px; font-size: 32px; 
                        font-weight: 700; margin-bottom: 30px;
                        border: 3px solid #1F2A44;
                        box-shadow: 0 8px 20px rgba(246, 226, 127, 0.4);">
                ${question.korean}
            </div>
            <input type="text" id="spellingInput" 
                   placeholder="영어 단어를 입력하세요 (예: student)" 
                   style="width: 100%; max-width: 400px; padding: 15px; 
                          font-size: 18px; border: 2px solid #1F2A44; 
                          border-radius: 12px; margin-bottom: 20px;
                          text-align: center; font-weight: 500;"
                   onkeypress="if(event.key==='Enter') submitSpelling('${question.correctAnswer}')">
            <div>
                <button onclick="submitSpelling('${question.correctAnswer}')" 
                        style="background: linear-gradient(135deg, #F6E27F 0%, #E5D06B 100%);
                               color: #1F2A44; border: 3px solid #1F2A44; 
                               padding: 12px 40px; border-radius: 12px; 
                               font-size: 16px; cursor: pointer; font-weight: 600;
                               box-shadow: 0 4px 12px rgba(246, 226, 127, 0.4);">
                    제출하기
                </button>
            </div>
        </div>
    `;
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('spellingInput').focus();
    }, 100);
}

// ========================================
// Play Spelling Pronunciation (REMOVED - No longer needed)
// ========================================
// Audio removed - now using Korean meaning for spelling test
/*
function playSpelling(word) {
    // Use Firebase TTS if available
    if (typeof playPronunciationTTS === 'function') {
        playPronunciationTTS(word);
    } else {
        // Fallback to Web Speech API
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.75;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang === 'en-US' && 
            (voice.name.includes('Google') || 
             voice.name.includes('Microsoft') ||
             voice.name.includes('Samantha') ||
             voice.name.includes('Karen'))
        );
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        } else {
            const anyUSVoice = voices.find(voice => voice.lang === 'en-US');
            if (anyUSVoice) {
                utterance.voice = anyUSVoice;
            }
        }
        
        speechSynthesis.speak(utterance);
    }
}
*/

// ========================================
// Submit Spelling Answer
// ========================================
function submitSpelling(correctAnswer) {
    const input = document.getElementById('spellingInput');
    if (!input) return;
    
    const userInput = input.value.trim().toLowerCase();
    
    if (!userInput) {
        alert('답을 입력해주세요!');
        return;
    }
    
    const isCorrect = userInput === correctAnswer.toLowerCase();
    
    if (isCorrect) {
        correctAnswersCount++;
        document.getElementById('correctCount').textContent = correctAnswersCount;
    }
    
    // Save user answer
    userAnswers.push({
        question: `Spelling: ${spellingQuestions[currentQuestionIndex].korean}`,
        selectedAnswer: userInput,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    });
    
    // Show feedback
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            ${isCorrect ? 
                '<div style="color: #4CAF50; font-size: 48px; margin-bottom: 20px;"><i class="fas fa-check-circle"></i></div>' + 
                '<div style="font-size: 24px; color: #4CAF50; font-weight: 600;">정답입니다! 🎉</div>' :
                '<div style="color: #f44336; font-size: 48px; margin-bottom: 20px;"><i class="fas fa-times-circle"></i></div>' + 
                '<div style="font-size: 24px; color: #f44336; font-weight: 600; margin-bottom: 10px;">틀렸습니다</div>' +
                `<div style="font-size: 18px; color: #666;">정답: <span style="color: #4CAF50; font-weight: 600;">${correctAnswer}</span></div>`
            }
        </div>
    `;
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (isSpellingPhase && currentQuestionIndex >= spellingQuestions.length) {
            // 스펠링 테스트 완료
            showResults();
        } else if (!isSpellingPhase && currentQuestionIndex >= testQuestions.length) {
            // 객관식 완료, 스펠링 시작
            currentQuestionIndex = 0;
            isSpellingPhase = true;
            showQuestion();
        } else {
            showQuestion();
        }
    }, 2000);
}

// ========================================
// Select Answer (Multiple Choice)
// ========================================
function selectAnswer(selectedAnswer, correctAnswer) {
    console.log('Answer selected:', selectedAnswer, 'Correct:', correctAnswer);
    
    const options = document.querySelectorAll('.answer-option');
    
    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
        const optionText = option.querySelector('.option-text').textContent;
        
        if (optionText === correctAnswer) {
            option.classList.add('correct');
        }
        
        if (optionText === selectedAnswer && selectedAnswer !== correctAnswer) {
            option.classList.add('wrong');
        }
    });
    
    // Check if correct
    const isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
        correctAnswersCount++;
        document.getElementById('correctCount').textContent = correctAnswersCount;
    }
    
    // Save user answer
    userAnswers.push({
        question: testQuestions[currentQuestionIndex].korean,
        selectedAnswer: selectedAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    });
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < testQuestions.length) {
            showQuestion();
        } else {
            // 객관식 완료, 스펠링 시작
            currentQuestionIndex = 0;
            isSpellingPhase = true;
            showQuestion();
        }
    }, 1500);
}

// ========================================
// Show Results
// ========================================
async function showResults() {
    document.getElementById('testQuestionsScreen').style.display = 'none';
    document.getElementById('testResultScreen').style.display = 'flex';
    
    const totalQuestions = 35; // 30 + 5
    const wrongAnswers = totalQuestions - correctAnswersCount;
    const score = Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed = score >= 95;
    
    console.log('Test completed. Score:', score, 'Passed:', passed);
    
    // Update result card
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    
    if (passed) {
        resultIcon.classList.add('passed');
        resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        resultTitle.textContent = '축하합니다! 합격입니다! 🎉';
        resultMessage.textContent = '95점 이상을 달성하여 다음 단계로 진행할 수 있습니다. 훌륭합니다!';
        
        // Show next button
        const nextButton = document.getElementById('nextButton');
        if (nextButton) {
            nextButton.style.display = 'inline-block';
        }
    } else {
        resultIcon.classList.add('failed');
        resultIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        resultTitle.textContent = '아쉽습니다. 불합격입니다.';
        resultMessage.textContent = `95점 이상 획득이 필요합니다. 단어를 다시 복습한 후 재시도해주세요. 현재 점수: ${score}점`;
    }
    
    // Update score display
    document.querySelector('.score-number').textContent = score;
    document.getElementById('correctAnswers').textContent = correctAnswersCount;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    document.getElementById('accuracyRate').textContent = score + '%';
    
    // Update student record
    await updateStudentTestResult(score, passed);
}

// ========================================
// Update Student Test Result
// ========================================
async function updateStudentTestResult(score, passed) {
    const student = getCurrentStudent();
    if (!student) return;
    
    // Update student object
    student.awl_test_score = score;
    student.awl_test_passed = passed;
    student.step2_unlocked = passed;
    
    // Save to localStorage
    localStorage.setItem('currentStudent', JSON.stringify(student));
    
    // 🔥 Firebase 진도 저장
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
        try {
            await ProgressManager.updateActivityProgress(
                studentId, 
                1, // Day 1
                'awl_test', 
                passed, 
                { score: score }
            );
            console.log('✅ AWL 테스트 결과가 Firebase에 저장되었습니다!');
        } catch (error) {
            console.error('❌ Firebase 저장 오류:', error);
        }
    }
    
    // Update in database (기존 테이블 API)
    try {
        const response = await fetch(`tables/students/${student.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        
        if (response.ok) {
            console.log('Test result saved successfully');
        }
    } catch (error) {
        console.error('Error saving test result:', error);
    }
}

// ========================================
// Retake Test
// ========================================
function retakeTest() {
    console.log('retakeTest() called');
    
    document.getElementById('testResultScreen').style.display = 'none';
    document.getElementById('testStartScreen').style.display = 'flex';
    
    // Reset result card classes
    document.getElementById('resultIcon').classList.remove('passed', 'failed');
    
    // Prepare new questions
    prepareTestQuestions();
}

// ========================================
// Make functions globally accessible
// ========================================
window.startTest = startTest;
window.retakeTest = retakeTest;
// window.playSpelling = playSpelling; // Removed - no longer needed
window.submitSpelling = submitSpelling;
