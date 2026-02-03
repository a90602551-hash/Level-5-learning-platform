const functions = require('firebase-functions');
const textToSpeech = require('@google-cloud/text-to-speech');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Text-to-Speech client
const ttsClient = new textToSpeech.TextToSpeechClient();

/**
 * Cloud Function to generate audio from text using Google Cloud TTS
 * 
 * @param {string} text - The text to convert to speech
 * @param {string} languageCode - Language code (default: 'en-US')
 * @returns {object} - Base64 encoded audio content
 */
exports.generateTTS = functions.https.onCall(async (data, context) => {
  try {
    // Validate input
    const text = data.text;
    const languageCode = data.languageCode || 'en-US';
    
    if (!text) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Text parameter is required'
      );
    }

    // Construct the request
    const request = {
      input: { text: text },
      voice: {
        languageCode: languageCode,
        name: 'en-US-Neural2-F', // High-quality female voice
        ssmlGender: 'FEMALE'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.85, // Slightly slower for clarity
        pitch: 0.0,
        volumeGainDb: 0.0,
        sampleRateHertz: 24000
      }
    };

    // Perform the text-to-speech request
    const [response] = await ttsClient.synthesizeSpeech(request);

    // Convert audio content to base64
    const audioBase64 = response.audioContent.toString('base64');

    // Log usage for monitoring
    console.log(`TTS generated for text: "${text}" (${text.length} characters)`);

    return {
      success: true,
      audioBase64: audioBase64,
      contentType: 'audio/mp3'
    };

  } catch (error) {
    console.error('TTS Error:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to generate speech',
      error.message
    );
  }
});

/**
 * Batch TTS generation for multiple words
 * Useful for pre-generating audio for all AWL words
 */
exports.generateBatchTTS = functions.https.onCall(async (data, context) => {
  try {
    const words = data.words; // Array of words
    
    if (!words || !Array.isArray(words)) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Words array is required'
      );
    }

    const results = [];

    for (const word of words) {
      const request = {
        input: { text: word },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Neural2-F',
          ssmlGender: 'FEMALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.85,
          pitch: 0.0,
          volumeGainDb: 0.0,
          sampleRateHertz: 24000
        }
      };

      const [response] = await ttsClient.synthesizeSpeech(request);
      const audioBase64 = response.audioContent.toString('base64');

      results.push({
        word: word,
        audioBase64: audioBase64
      });
    }

    console.log(`Batch TTS generated for ${words.length} words`);

    return {
      success: true,
      results: results
    };

  } catch (error) {
    console.error('Batch TTS Error:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to generate batch speech',
      error.message
    );
  }
});

/**
 * Health check endpoint
 */
exports.ttsHealthCheck = functions.https.onRequest((req, res) => {
  res.json({
    status: 'ok',
    service: 'Google Cloud Text-to-Speech',
    timestamp: new Date().toISOString()
  });
});
