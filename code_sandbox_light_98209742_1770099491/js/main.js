// ========================================
// Global State Management
// ========================================
let currentStudent = null;

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    checkStudentSession();
    updateStepLockStatus();
});

// ========================================
// Student Session Management
// ========================================
function checkStudentSession() {
    const savedStudent = localStorage.getItem('currentStudent');
    if (savedStudent) {
        currentStudent = JSON.parse(savedStudent);
        showLearningSteps();
        updateStudentInfo();
        updateStepLockStatus();
    }
}

function loginStudent() {
    const nameInput = document.getElementById('studentNameInput');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('이름을 입력해주세요.');
        return;
    }
    
    // Create or load student
    currentStudent = {
        id: generateUUID(),
        name: name,
        current_step: 'step1_awl',
        awl_test_score: 0,
        awl_test_passed: false,
        step2_unlocked: false
    };
    
    // Save to localStorage
    localStorage.setItem('currentStudent', JSON.stringify(currentStudent));
    
    // Save to database
    saveStudentToDatabase();
    
    // Show learning interface
    showLearningSteps();
    updateStudentInfo();
}

async function saveStudentToDatabase() {
    try {
        const response = await fetch('tables/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentStudent)
        });
        
        if (response.ok) {
            console.log('Student saved to database');
        }
    } catch (error) {
        console.error('Error saving student:', error);
    }
}

function showLearningSteps() {
    document.getElementById('studentLogin').style.display = 'none';
    document.getElementById('learningSteps').style.display = 'block';
}

function updateStudentInfo() {
    const studentNameElement = document.getElementById('studentName');
    if (studentNameElement && currentStudent) {
        studentNameElement.textContent = currentStudent.name;
    }
}

// ========================================
// Step Lock/Unlock Management
// ========================================
async function updateStepLockStatus() {
    if (!currentStudent) return;
    
    // Check AWL test status
    const awlPassed = currentStudent.awl_test_passed || false;
    
    // Update UI for locked/unlocked cards
    const lockedCards = ['readingCard', 'listeningCard', 'logicMapCard'];
    const lockedBtns = ['readingBtn', 'listeningBtn', 'logicMapBtn'];
    const lockedStatuses = ['readingStatus', 'listeningStatus', 'logicMapStatus'];
    
    lockedCards.forEach((cardId, index) => {
        const card = document.getElementById(cardId);
        const btn = document.getElementById(lockedBtns[index]);
        const status = document.getElementById(lockedStatuses[index]);
        
        if (!card || !btn || !status) return;
        
        if (awlPassed) {
            card.classList.remove('disabled');
            btn.style.pointerEvents = 'auto';
            status.className = 'status-badge status-ready';
            status.innerHTML = '학습 가능';
        } else {
            card.classList.add('disabled');
            btn.style.pointerEvents = 'none';
            status.className = 'status-badge status-locked';
            status.innerHTML = '<i class="fas fa-lock"></i> AWL 테스트 통과 필요';
        }
    });
    
    // Update AWL test card if passed
    const awlTestCard = document.getElementById('awlTestCard');
    if (awlTestCard && awlPassed) {
        const statusBadge = awlTestCard.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.className = 'status-badge status-completed';
            statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> 통과 (' + currentStudent.awl_test_score + '점)';
        }
    }
}

// ========================================
// Utility Functions
// ========================================
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.removeItem('currentStudent');
        location.reload();
    }
}

// ========================================
// Export for other pages
// ========================================
function getCurrentStudent() {
    const savedStudent = localStorage.getItem('currentStudent');
    return savedStudent ? JSON.parse(savedStudent) : null;
}

function updateCurrentStudent(updates) {
    if (!currentStudent) return;
    
    currentStudent = {
        ...currentStudent,
        ...updates
    };
    
    localStorage.setItem('currentStudent', JSON.stringify(currentStudent));
}
