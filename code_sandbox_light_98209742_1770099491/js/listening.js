// Listening Page JavaScript

let isPlaying = false;
let audioProgress = 0;
let progressInterval = null;

// Listening script for TTS
const listeningScript = `While the reading focuses on the benefits of conformity, opponents argue that uniforms rob students of their fundamental right to self-expression. They indicate that adolescence is a crucial period for developing individuality, and punitive dress codes can stifle this growth. For many, the idea that uniforms save money is a financial illusion; instead, they often place a significant financial burden on poorer parents who must purchase these items exclusively from authorized vendors.

Moreover, critics argue that uniforms have no measurable effect on actual academic success. They believe the utility of such policies is overstated and serves as a way to conceal a lack of quality instruction. Instead of focusing on outward appearance, schools should be looking at ways to enhance the actual learning environment. Ultimately, the prospect of a uniform creating a better student is not backed by empirical evidence, and the outcome of such policies may simply be to teach students to follow authority without question, rather than thinking for themselves.`;

let currentUtterance = null;

document.addEventListener('DOMContentLoaded', function() {
    const student = getCurrentStudent();
    if (student) {
        document.getElementById('studentName').textContent = student.name;
    }
    
    // Initialize total time (approximate based on text length)
    const estimatedDuration = Math.ceil(listeningScript.split(' ').length / 2.5); // ~2.5 words per second
    const minutes = Math.floor(estimatedDuration / 60);
    const seconds = estimatedDuration % 60;
    document.getElementById('totalTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

function toggleAudio() {
    if (isPlaying) {
        stopAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    if ('speechSynthesis' in window) {
        // Stop any existing speech
        window.speechSynthesis.cancel();
        
        // Create new utterance
        currentUtterance = new SpeechSynthesisUtterance(listeningScript);
        currentUtterance.lang = 'en-US';
        currentUtterance.rate = 0.85; // Slightly slower for comprehension
        currentUtterance.pitch = 1.0;
        currentUtterance.volume = 1.0;
        
        // Event handlers
        currentUtterance.onstart = function() {
            isPlaying = true;
            updatePlayButton();
            startProgressAnimation();
        };
        
        currentUtterance.onend = function() {
            isPlaying = false;
            audioProgress = 0;
            updatePlayButton();
            stopProgressAnimation();
            updateProgressBar();
        };
        
        currentUtterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
            stopAudio();
        };
        
        // Speak
        window.speechSynthesis.speak(currentUtterance);
    } else {
        alert('죄송합니다. 이 브라우저는 음성 재생을 지원하지 않습니다.');
    }
}

function stopAudio() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    isPlaying = false;
    audioProgress = 0;
    updatePlayButton();
    stopProgressAnimation();
    updateProgressBar();
}

function updatePlayButton() {
    const playIcon = document.getElementById('playIcon');
    if (isPlaying) {
        playIcon.className = 'fas fa-pause';
    } else {
        playIcon.className = 'fas fa-play';
    }
}

function startProgressAnimation() {
    const estimatedDuration = Math.ceil(listeningScript.split(' ').length / 2.5) * 1000; // in milliseconds
    const updateInterval = 100; // Update every 100ms
    const progressIncrement = (100 / estimatedDuration) * updateInterval;
    
    progressInterval = setInterval(() => {
        if (audioProgress < 100) {
            audioProgress += progressIncrement;
            updateProgressBar();
            updateCurrentTime();
        } else {
            stopProgressAnimation();
        }
    }, updateInterval);
}

function stopProgressAnimation() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = Math.min(audioProgress, 100) + '%';
}

function updateCurrentTime() {
    const totalTimeText = document.getElementById('totalTime').textContent;
    const [totalMinutes, totalSeconds] = totalTimeText.split(':').map(Number);
    const totalDuration = totalMinutes * 60 + totalSeconds;
    
    const currentSeconds = Math.floor((audioProgress / 100) * totalDuration);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    document.getElementById('currentTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
});
