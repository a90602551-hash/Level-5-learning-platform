// Topic Builder JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const student = getCurrentStudent();
    if (!student) {
        alert('로그인이 필요합니다.');
        location.href = 'index.html';
        return;
    }
    
    document.getElementById('studentName').textContent = student.name;
});

function checkDictation() {
    const inputs = document.querySelectorAll('.dictation-input');
    let correctCount = 0;
    let wrongCount = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('wrong');
            correctCount++;
        } else {
            input.classList.add('wrong');
            input.classList.remove('correct');
            wrongCount++;
        }
        
        input.disabled = true;
    });
    
    const total = inputs.length;
    const accuracy = Math.round((correctCount / total) * 100);
    
    // Show results
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('wrongCount').textContent = wrongCount;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('dictationResults').style.display = 'block';
    
    // Scroll to results
    document.getElementById('dictationResults').scrollIntoView({ behavior: 'smooth' });
    
    // Save to database
    saveDictationResult(correctCount, wrongCount, accuracy);
}

function resetDictation() {
    const inputs = document.querySelectorAll('.dictation-input');
    
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'wrong');
        input.disabled = false;
    });
    
    document.getElementById('dictationResults').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function saveDictationResult(correct, wrong, accuracy) {
    const student = getCurrentStudent();
    if (!student) return;
    
    const answers = {};
    const inputs = document.querySelectorAll('.dictation-input');
    inputs.forEach((input, index) => {
        answers[`q${index + 1}`] = input.value.trim();
    });
    
    const result = {
        id: generateUUID(),
        student_id: student.id,
        day: 1,
        answers: JSON.stringify(answers),
        score: accuracy,
        completed_at: new Date().toISOString()
    };
    
    try {
        await fetch('tables/dictation_results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        });
    } catch (error) {
        console.error('Error saving dictation result:', error);
    }
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
