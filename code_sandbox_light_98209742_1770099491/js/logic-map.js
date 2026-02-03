// Logic Map JavaScript

// Correct answers
const correctAnswers = {
    q1: 'socioeconomic barriers',
    q2: 'level the playing field',
    q3: 'financial burden',
    q4: 'school pride',
    q5: 'authority',
    q6: 'individuality',
    q7: 'self-expression',
    q8: 'distraction',
    q9: 'academic outcomes',
    q10: 'measurable effect'
};

document.addEventListener('DOMContentLoaded', function() {
    const student = getCurrentStudent();
    if (student) {
        document.getElementById('studentName').textContent = student.name;
    }
});

function submitLogicMap() {
    const inputs = document.querySelectorAll('.logic-input');
    let correctCount = 0;
    const userAnswers = {};
    
    // Check each answer
    inputs.forEach(input => {
        const questionName = input.name;
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = correctAnswers[questionName].toLowerCase();
        
        userAnswers[questionName] = input.value.trim();
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('wrong');
            correctCount++;
        } else {
            input.classList.add('wrong');
            input.classList.remove('correct');
        }
        
        input.disabled = true;
    });
    
    // Show answer comparison
    displayAnswerComparison(userAnswers, correctCount);
    
    // Scroll to results
    document.getElementById('answerComparison').scrollIntoView({ behavior: 'smooth' });
    
    // Save to database
    saveLogicMapResult(userAnswers, correctCount);
}

function displayAnswerComparison(userAnswers, correctCount) {
    const comparisonSection = document.getElementById('answerComparison');
    comparisonSection.style.display = 'block';
    
    // Update score
    document.getElementById('scoreNumber').textContent = correctCount;
    
    // Update message
    const resultMessage = document.getElementById('resultMessage');
    const resultDescription = document.getElementById('resultDescription');
    
    if (correctCount === 10) {
        resultMessage.textContent = '완벽합니다! 🎉';
        resultDescription.textContent = '모든 답안이 정확합니다. 논리구조를 완벽하게 이해했습니다!';
    } else if (correctCount >= 7) {
        resultMessage.textContent = '잘했어요! 👍';
        resultDescription.textContent = `${correctCount}/10 정답입니다. 조금만 더 복습하면 완벽해질 거예요!`;
    } else if (correctCount >= 5) {
        resultMessage.textContent = '괜찮아요! 💪';
        resultDescription.textContent = `${correctCount}/10 정답입니다. 리딩과 리스닝을 다시 복습해보세요.`;
    } else {
        resultMessage.textContent = '다시 도전해보세요! 📚';
        resultDescription.textContent = `${correctCount}/10 정답입니다. 토픽빌더와 지문을 다시 학습한 후 재시도하세요.`;
    }
    
    // Populate answer table
    const tableBody = document.getElementById('answerTableBody');
    tableBody.innerHTML = '';
    
    Object.keys(correctAnswers).forEach((key, index) => {
        const userAnswer = userAnswers[key] || '(작성 안 함)';
        const correctAnswer = correctAnswers[key];
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        
        const row = document.createElement('tr');
        row.className = isCorrect ? 'correct-row' : 'wrong-row';
        
        row.innerHTML = `
            <td><strong>Q${index + 1}</strong></td>
            <td class="${isCorrect ? 'answer-correct' : 'answer-wrong'}">${userAnswer}</td>
            <td class="answer-correct">${correctAnswer}</td>
            <td>
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'} result-icon ${isCorrect ? 'correct' : 'wrong'}"></i>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function resetLogicMap() {
    // Reset all inputs
    const inputs = document.querySelectorAll('.logic-input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'wrong');
        input.disabled = false;
    });
    
    // Hide answer comparison
    document.getElementById('answerComparison').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function saveLogicMapResult(userAnswers, correctCount) {
    const student = getCurrentStudent();
    if (!student) return;
    
    const result = {
        id: generateUUID(),
        student_id: student.id,
        day: 1,
        answers: JSON.stringify(userAnswers),
        completed_at: new Date().toISOString()
    };
    
    try {
        await fetch('tables/logic_map_results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        });
        console.log('Logic map result saved');
    } catch (error) {
        console.error('Error saving logic map result:', error);
    }
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Word chip click to copy
document.addEventListener('DOMContentLoaded', function() {
    const wordChips = document.querySelectorAll('.word-chip');
    
    wordChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const text = this.textContent;
            
            // Copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    // Visual feedback
                    const originalBg = this.style.background;
                    this.style.background = 'var(--success-color)';
                    this.style.color = 'white';
                    
                    setTimeout(() => {
                        this.style.background = '';
                        this.style.color = '';
                    }, 500);
                });
            }
        });
    });
});
