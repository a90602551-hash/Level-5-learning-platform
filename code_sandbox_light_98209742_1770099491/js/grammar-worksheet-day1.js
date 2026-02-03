// Grammar Worksheet Day 1 - Interactive Functions

// Canvas Drawing for Brain Mapping
let canvas, ctx;
let isDrawing = false;
let currentTool = 'pen';
let currentColor = '#2563eb';
let lastX = 0;
let lastY = 0;

// Answer Keys
const answerKeys = {
    pattern: [
        {
            answer: "The suspect who (the police thought) was(V) guilty has been released.",
            translation: "경찰이 유죄라고 생각했던 용의자가 석방되었다."
        },
        {
            answer: "We interviewed a candidate who (we believed) had(V) the most potential for the role.",
            translation: "우리는 그 역할에 가장 큰 잠재력을 가졌다고 우리가 믿었던 후보자를 인터뷰했다."
        },
        {
            answer: "This is the masterpiece which (the critics say) changed(V) the history of modern art.",
            translation: "이것은 비평가들이 현대 미술의 역사를 바꿨다고 말하는 걸작이다."
        },
        {
            answer: "The theory which (the professor argued) explains(V) the phenomenon is still debated.",
            translation: "교수가 그 현상을 설명한다고 주장한 이론은 여전히 논쟁 중이다."
        },
        {
            answer: "They chose the location which (the architect suggested) would(V) be best for the new building.",
            translation: "그들은 건축가가 새 건물에 가장 좋을 것이라고 제안한 장소를 선택했다."
        }
    ],
    errors: {
        A: {
            correction: "She is the teacher who I heard won the national award.",
            clue: "was와 won이 연속으로 나타남 (이중 동사)",
            structure: "관계대명사 who + 삽입절(I heard) + 진짜 동사(won). 삽입절 뒤에는 진짜 동사만 와야 함",
            rule: "was를 삭제. 삽입절 이후에는 관계대명사의 진짜 동사만 필요"
        },
        B: {
            correction: "The artifact which the researcher claimed was authentic proved to be a fake.",
            clue: "it이 불필요하게 삽입됨 (중복 주어)",
            structure: "관계대명사 which = the artifact이므로 it은 중복",
            rule: "it을 삭제. 관계대명사가 이미 주어 역할을 하므로 it 불필요"
        },
        C: {
            correction: "This is the student who the principal believes is the most talented in our school.",
            clue: "주어가 단수(the student)인데 동사가 복수형(are)",
            structure: "who = the student (단수) → 동사도 단수형이어야 함",
            rule: "are를 is로 수정. 관계대명사의 선행사가 단수이므로 동사도 단수 일치"
        }
    }
};

// Worksheet Progress
let worksheetData = {
    brainMapping: {
        canvas: null,
        text: ''
    },
    patternHunting: [],
    errorDetection: []
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initCanvas();
    loadStudentInfo();
    loadProgress();
});

// Canvas Initialization
function initCanvas() {
    canvas = document.getElementById('brainMappingCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 20;
    canvas.height = 400;
    
    // Canvas events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Set initial tool
    document.getElementById('penBtn').classList.add('active');
}

function selectTool(tool) {
    currentTool = tool;
    
    // Update button states
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.tool-btn').classList.add('active');
    
    if (tool === 'eraser') {
        canvas.style.cursor = 'not-allowed';
    } else {
        canvas.style.cursor = 'crosshair';
    }
}

function changeColor() {
    currentColor = document.getElementById('colorPicker').value;
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    
    if (currentTool === 'pen') {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
    } else {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 20;
    }
    
    ctx.lineCap = 'round';
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function clearCanvas() {
    if (confirm('정말 전체를 지우시겠습니까?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function saveBrainMapping() {
    worksheetData.brainMapping.canvas = canvas.toDataURL();
    worksheetData.brainMapping.text = document.getElementById('brainMappingText').value;
    
    saveToLocalStorage();
    showFeedback('Brain-Mapping이 저장되었습니다!', 'success');
    updateProgress();
}

// Pattern Hunting Check
function checkPatternHunting() {
    let correctCount = 0;
    let totalQuestions = 5;
    
    for (let i = 1; i <= 5; i++) {
        const answer = document.getElementById(`pattern${i}`).value.trim();
        const translation = document.getElementById(`pattern${i}Trans`).value.trim();
        
        worksheetData.patternHunting[i-1] = {
            answer: answer,
            translation: translation
        };
        
        // Simple check (contains key elements)
        if (answer && answer.includes('(') && answer.includes(')') && answer.includes('(V)')) {
            document.getElementById(`pattern${i}`).classList.add('correct');
            document.getElementById(`pattern${i}`).classList.remove('incorrect');
            correctCount++;
        } else {
            document.getElementById(`pattern${i}`).classList.add('incorrect');
            document.getElementById(`pattern${i}`).classList.remove('correct');
        }
        
        if (translation) {
            document.getElementById(`pattern${i}Trans`).classList.add('correct');
        }
    }
    
    saveToLocalStorage();
    updateProgress();
    
    showFeedback(`Pattern Hunting: ${correctCount}/${totalQuestions} 문제가 올바른 형식입니다. 모범답안과 비교하여 확인하세요.`, 'info');
    
    // Show model answers
    showModelAnswers();
}

function showModelAnswers() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-check-circle"></i> 모범 답안</h3>
                <button class="close-modal" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                ${answerKeys.pattern.map((item, idx) => `
                    <div class="model-answer-item">
                        <h4>문제 ${idx + 1}</h4>
                        <p><strong>괄호 처리:</strong> ${item.answer}</p>
                        <p><strong>해석:</strong> ${item.translation}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Error Detection Check
function checkErrorDetection() {
    const errors = ['A', 'B', 'C'];
    let correctCount = 0;
    
    errors.forEach(letter => {
        const correction = document.getElementById(`error${letter}`).value.trim();
        const logic1 = document.getElementById(`logic${letter}1`).value.trim();
        const logic2 = document.getElementById(`logic${letter}2`).value.trim();
        const logic3 = document.getElementById(`logic${letter}3`).value.trim();
        
        worksheetData.errorDetection.push({
            sentence: letter,
            correction: correction,
            logic: [logic1, logic2, logic3]
        });
        
        // Simple completeness check
        if (correction && logic1 && logic2 && logic3) {
            correctCount++;
        }
    });
    
    saveToLocalStorage();
    updateProgress();
    
    showFeedback(`Error Detection: ${correctCount}/3 문제의 답안을 작성하셨습니다. 제출 후 교사의 피드백을 확인하세요.`, 'info');
    
    // Show hints
    showErrorHints();
}

function showErrorHints() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-lightbulb"></i> 오류 수정 힌트</h3>
                <button class="close-modal" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="hint-item">
                    <h4>Sentence A 힌트</h4>
                    <p><strong>단서:</strong> ${answerKeys.errors.A.clue}</p>
                    <p><strong>구조:</strong> ${answerKeys.errors.A.structure}</p>
                    <p><strong>규칙:</strong> ${answerKeys.errors.A.rule}</p>
                    <p class="model-correction"><strong>모범 답안:</strong> ${answerKeys.errors.A.correction}</p>
                </div>
                <div class="hint-item">
                    <h4>Sentence B 힌트</h4>
                    <p><strong>단서:</strong> ${answerKeys.errors.B.clue}</p>
                    <p><strong>구조:</strong> ${answerKeys.errors.B.structure}</p>
                    <p><strong>규칙:</strong> ${answerKeys.errors.B.rule}</p>
                    <p class="model-correction"><strong>모범 답안:</strong> ${answerKeys.errors.B.correction}</p>
                </div>
                <div class="hint-item">
                    <h4>Sentence C 힌트</h4>
                    <p><strong>단서:</strong> ${answerKeys.errors.C.clue}</p>
                    <p><strong>구조:</strong> ${answerKeys.errors.C.structure}</p>
                    <p><strong>규칙:</strong> ${answerKeys.errors.C.rule}</p>
                    <p class="model-correction"><strong>모범 답안:</strong> ${answerKeys.errors.C.correction}</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Submit Worksheet
async function submitWorksheet() {
    if (!confirm('워크시트를 제출하시겠습니까? 제출 후에는 수정할 수 없습니다.')) {
        return;
    }
    
    const studentData = JSON.parse(localStorage.getItem('currentStudent'));
    if (!studentData) {
        alert('학생 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        window.location.href = 'index.html';
        return;
    }
    
    // Calculate completion score
    let score = 0;
    if (worksheetData.brainMapping.canvas || worksheetData.brainMapping.text) score += 20;
    if (worksheetData.patternHunting.length >= 5) score += 40;
    if (worksheetData.errorDetection.length >= 3) score += 40;
    
    // Save to database
    const worksheetResult = {
        studentId: studentData.id,
        studentName: studentData.name,
        day: 1,
        week: 1,
        topic: "관계사절 내 삽입구조",
        data: worksheetData,
        score: score,
        submittedAt: Date.now(),
        completed: true
    };
    
    // Update student record
    studentData.grammarWorksheets = studentData.grammarWorksheets || [];
    studentData.grammarWorksheets.push(worksheetResult);
    localStorage.setItem('currentStudent', JSON.stringify(studentData));
    
    // Update in database (if using Table API)
    try {
        const response = await fetch(`tables/students/${studentData.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(studentData)
        });
        
        if (response.ok) {
            showFeedback('워크시트가 성공적으로 제출되었습니다!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    } catch (error) {
        console.log('Database update failed, saved locally');
        showFeedback('워크시트가 저장되었습니다 (로컬).', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Helper Functions
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type} show`;
    feedback.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
    
    const submitArea = document.querySelector('.submit-area');
    submitArea.insertBefore(feedback, submitArea.firstChild);
    
    setTimeout(() => {
        feedback.remove();
    }, 5000);
}

function updateProgress() {
    let progress = 0;
    
    if (worksheetData.brainMapping.canvas || worksheetData.brainMapping.text) progress += 33;
    if (worksheetData.patternHunting.length > 0) progress += 33;
    if (worksheetData.errorDetection.length > 0) progress += 34;
    
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `진행률: ${progress}%`;
    
    // Calculate score
    let score = 0;
    if (worksheetData.brainMapping.canvas || worksheetData.brainMapping.text) score += 20;
    if (worksheetData.patternHunting.length >= 5) score += 40;
    if (worksheetData.errorDetection.length >= 3) score += 40;
    
    document.getElementById('scoreText').textContent = `점수: ${score}/100`;
}

function saveToLocalStorage() {
    localStorage.setItem('grammarWorksheetDay1', JSON.stringify(worksheetData));
}

function loadProgress() {
    const saved = localStorage.getItem('grammarWorksheetDay1');
    if (saved) {
        worksheetData = JSON.parse(saved);
        
        // Restore Brain Mapping text
        if (worksheetData.brainMapping.text) {
            document.getElementById('brainMappingText').value = worksheetData.brainMapping.text;
        }
        
        // Restore Pattern Hunting
        worksheetData.patternHunting.forEach((item, idx) => {
            if (item) {
                document.getElementById(`pattern${idx+1}`).value = item.answer || '';
                document.getElementById(`pattern${idx+1}Trans`).value = item.translation || '';
            }
        });
        
        updateProgress();
    }
}

function loadStudentInfo() {
    const studentData = JSON.parse(localStorage.getItem('currentStudent'));
    if (studentData) {
        document.getElementById('studentName').textContent = studentData.name;
    }
}

// Add modal styles
const style = document.createElement('style');
style.textContent = `
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s;
}

.modal-content {
    background: white;
    border-radius: 16px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.modal-header {
    padding: 24px;
    border-bottom: 2px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    font-size: 24px;
    color: #1f2937;
}

.close-modal {
    width: 40px;
    height: 40px;
    border: none;
    background: #f3f4f6;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.2s;
}

.close-modal:hover {
    background: #e5e7eb;
    transform: rotate(90deg);
}

.modal-body {
    padding: 24px;
}

.model-answer-item,
.hint-item {
    background: #f9fafb;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    border-left: 4px solid #667eea;
}

.model-answer-item h4,
.hint-item h4 {
    margin: 0 0 12px 0;
    color: #667eea;
}

.model-answer-item p,
.hint-item p {
    margin: 8px 0;
    line-height: 1.6;
}

.model-correction {
    background: #dbeafe;
    padding: 12px;
    border-radius: 8px;
    margin-top: 12px;
    border-left: 3px solid #3b82f6;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;
document.head.appendChild(style);
