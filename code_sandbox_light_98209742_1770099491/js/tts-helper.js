// ========================================
// TTS Helper Functions using Firebase Functions
// ========================================

// Cache for storing generated audio
const ttsCache = new Map();

/**
 * Play pronunciation using Google Cloud TTS via Firebase Functions
 * @param {string} word - The word to pronounce
 * @returns {Promise<void>}
 */
async function playPronunciationTTS(word) {
    try {
        // Check cache first
        if (ttsCache.has(word)) {
            const audioBase64 = ttsCache.get(word);
            playAudioFromBase64(audioBase64);
            return;
        }

        // Show loading indicator
        console.log(`Generating TTS for: ${word}`);

        // Call Firebase Function
        const generateTTS = firebase.functions().httpsCallable('generateTTS');
        const result = await generateTTS({ 
            text: word,
            languageCode: 'en-US'
        });

        if (result.data.success) {
            const audioBase64 = result.data.audioBase64;
            
            // Cache the audio
            ttsCache.set(word, audioBase64);
            
            // Play audio
            playAudioFromBase64(audioBase64);
        } else {
            throw new Error('TTS generation failed');
        }

    } catch (error) {
        console.error('TTS Error:', error);
        
        // Fallback to Web Speech API
        console.log('Falling back to Web Speech API');
        fallbackToWebSpeech(word);
    }
}

/**
 * Play audio from base64 encoded MP3
 * @param {string} audioBase64 - Base64 encoded audio
 */
function playAudioFromBase64(audioBase64) {
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    audio.play().catch(error => {
        console.error('Audio playback error:', error);
    });
}

/**
 * Fallback to Web Speech API if Firebase TTS fails
 * @param {string} word - The word to pronounce
 */
function fallbackToWebSpeech(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.75;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang === 'en-US' && 
            (voice.name.includes('Google') || voice.name.includes('Microsoft'))
        );
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('No speech synthesis available');
    }
}

/**
 * Pre-load TTS for multiple words (useful for AWL test)
 * @param {Array<string>} words - Array of words to pre-generate
 * @returns {Promise<void>}
 */
async function preloadTTS(words) {
    try {
        console.log(`Pre-loading TTS for ${words.length} words...`);
        
        const generateBatchTTS = firebase.functions().httpsCallable('generateBatchTTS');
        const result = await generateBatchTTS({ words: words });

        if (result.data.success) {
            result.data.results.forEach(item => {
                ttsCache.set(item.word, item.audioBase64);
            });
            console.log(`Successfully pre-loaded ${words.length} words`);
        }

    } catch (error) {
        console.error('Batch TTS Error:', error);
        console.log('Will generate TTS on-demand instead');
    }
}

/**
 * Clear TTS cache
 */
function clearTTSCache() {
    ttsCache.clear();
    console.log('TTS cache cleared');
}

// Export functions
window.playPronunciationTTS = playPronunciationTTS;
window.preloadTTS = preloadTTS;
window.clearTTSCache = clearTTSCache;
