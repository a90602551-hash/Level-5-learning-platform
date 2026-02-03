// ========================================
// AWL Study Page JavaScript
// ========================================

let currentFilter = 'all';
let studiedWords = new Set();

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Check student login
    const student = getCurrentStudent();
    if (!student) {
        alert('로그인이 필요합니다.');
        location.href = 'index.html';
        return;
    }
    
    updateStudentInfo();
    loadStudiedProgress();
    renderWords();
    setupFilterTabs();
});

// ========================================
// Update Student Info
// ========================================
function updateStudentInfo() {
    const student = getCurrentStudent();
    if (student) {
        document.getElementById('studentName').textContent = student.name;
    }
}

// ========================================
// Load Studied Progress
// ========================================
function loadStudiedProgress() {
    const savedProgress = localStorage.getItem('awl_studied_words');
    if (savedProgress) {
        studiedWords = new Set(JSON.parse(savedProgress));
        updateProgress();
    }
}

function saveStudiedProgress() {
    localStorage.setItem('awl_studied_words', JSON.stringify([...studiedWords]));
}

// ========================================
// Render Words
// ========================================
function renderWords() {
    const container = document.getElementById('wordCardsContainer');
    container.innerHTML = '';
    
    // Use day1Vocabulary instead of awlWords
    const vocabulary = typeof day1Vocabulary !== 'undefined' ? day1Vocabulary : [];
    
    let filteredWords = vocabulary;
    if (currentFilter !== 'all') {
        filteredWords = vocabulary.filter(word => word.group === parseInt(currentFilter));
    }
    
    filteredWords.forEach(word => {
        const card = createWordCard(word);
        container.appendChild(card);
    });
}

function createWordCard(word) {
    const card = document.createElement('div');
    card.className = 'word-card';
    if (studiedWords.has(word.id)) {
        card.classList.add('studied');
    }
    card.dataset.wordId = word.id;
    
    card.innerHTML = `
        <div class="word-header">
            <div class="word-main">
                <div class="word-number">${word.id}</div>
                <h3 class="word-title" onclick="playPronunciation('${word.word}')" style="cursor: pointer; user-select: none;">
                    ${word.word} <i class="fas fa-volume-up" style="color: #667eea; font-size: 0.8em; margin-left: 8px;"></i>
                </h3>
                <div class="word-pronunciation">${word.pronunciation}</div>
                <span class="word-korean">${word.koreanMeaning}</span>
            </div>
            <button class="study-toggle ${studiedWords.has(word.id) ? 'checked' : ''}" 
                    onclick="toggleStudied(${word.id})">
                <i class="fas fa-check"></i>
            </button>
        </div>
        
        <div class="word-definition">
            <strong>Definition</strong>
            <p>${word.definition}</p>
        </div>
        
        <div class="word-example">
            <strong>Example</strong>
            <div class="example-en">${word.example}</div>
            <div class="example-ko">${word.exampleKorean}</div>
        </div>
        
        <span class="group-badge">그룹 ${word.group}: ${groupNames[word.group]}</span>
    `;
    
    return card;
}

// ========================================
// Toggle Studied Status
// ========================================
function toggleStudied(wordId) {
    if (studiedWords.has(wordId)) {
        studiedWords.delete(wordId);
    } else {
        studiedWords.add(wordId);
    }
    
    saveStudiedProgress();
    updateProgress();
    
    // Update card visual
    const card = document.querySelector(`[data-word-id="${wordId}"]`);
    const toggle = card.querySelector('.study-toggle');
    
    if (studiedWords.has(wordId)) {
        card.classList.add('studied');
        toggle.classList.add('checked');
    } else {
        card.classList.remove('studied');
        toggle.classList.remove('checked');
    }
}

// ========================================
// Update Progress
// ========================================
function updateProgress() {
    const studiedCount = studiedWords.size;
    const totalCount = 30;
    const percentage = (studiedCount / totalCount) * 100;
    
    document.getElementById('studiedCount').textContent = studiedCount;
    document.getElementById('progressFill').style.width = percentage + '%';
}

// ========================================
// Filter Tabs
// ========================================
function setupFilterTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Update filter
            currentFilter = this.dataset.group;
            
            // Re-render words
            renderWords();
        });
    });
}

// ========================================
// Audio Pronunciation (Google Cloud TTS)
// ========================================
function playPronunciation(word) {
    // Use Firebase TTS if available
    if (typeof playPronunciationTTS === 'function') {
        playPronunciationTTS(word);
    } else {
        // Fallback to Web Speech API
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.75;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            const voices = window.speechSynthesis.getVoices();
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
            
            window.speechSynthesis.speak(utterance);
        }
    }
}
