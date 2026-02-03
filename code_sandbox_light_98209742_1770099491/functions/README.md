# Firebase Functions for TTS

## Setup Instructions

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Functions (if not already done)
```bash
firebase init functions
```

### 4. Add Google Cloud Service Account Key

**Option A: Using Application Default Credentials (Recommended)**
```bash
# Set environment variable for local development
export GOOGLE_APPLICATION_CREDENTIALS="path/to/serviceAccountKey.json"
```

**Option B: Set in Firebase Functions config**
```bash
firebase functions:config:set google.credentials="$(cat serviceAccountKey.json)"
```

### 5. Install Dependencies
```bash
cd functions
npm install
```

### 6. Deploy Functions
```bash
firebase deploy --only functions
```

## Available Functions

### `generateTTS`
Generates audio from text using Google Cloud TTS.

**Input:**
```javascript
{
  text: "hello",
  languageCode: "en-US" // optional
}
```

**Output:**
```javascript
{
  success: true,
  audioBase64: "...",
  contentType: "audio/mp3"
}
```

### `generateBatchTTS`
Generates audio for multiple words at once.

**Input:**
```javascript
{
  words: ["important", "student", "learn"]
}
```

**Output:**
```javascript
{
  success: true,
  results: [
    { word: "important", audioBase64: "..." },
    { word: "student", audioBase64: "..." },
    { word: "learn", audioBase64: "..." }
  ]
}
```

## Usage in Client Code

```javascript
// Initialize Firebase
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

// Generate TTS for single word
async function playSpelling(word) {
  const generateTTS = httpsCallable(functions, 'generateTTS');
  
  try {
    const result = await generateTTS({ text: word });
    const audioBase64 = result.data.audioBase64;
    
    // Play audio
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    audio.play();
  } catch (error) {
    console.error('TTS Error:', error);
  }
}
```

## Cost Estimation

### Google Cloud TTS Pricing
- **Free tier**: 1 million characters per month
- **After free tier**: $4 per 1 million characters

### Example Usage
- 30 AWL words × average 8 characters = 240 characters per test
- 100 students × 2 tests per week × 4 weeks = 800 tests/month
- Total: 240 × 800 = 192,000 characters/month
- **Cost**: FREE (within 1 million free tier)

## Voice Options

Available high-quality voices:
- `en-US-Neural2-F` (Female, natural)
- `en-US-Neural2-M` (Male, natural)
- `en-US-Wavenet-F` (Female, expressive)
- `en-US-Wavenet-M` (Male, expressive)

Change voice in `functions/index.js`:
```javascript
voice: {
  languageCode: 'en-US',
  name: 'en-US-Neural2-M', // Change here
  ssmlGender: 'MALE'
}
```

## Security Notes

1. **Service Account Key**: Keep `serviceAccountKey.json` secret!
2. **Add to .gitignore**: 
   ```
   functions/serviceAccountKey.json
   ```
3. **Firebase Functions**: Automatically secured with Firebase Authentication
4. **CORS**: Enabled for your domain only

## Testing Locally

```bash
# Start emulator
cd functions
npm run serve

# Test in browser console
const functions = firebase.functions();
const generateTTS = functions.httpsCallable('generateTTS');
generateTTS({ text: 'hello' }).then(result => console.log(result));
```

## Troubleshooting

### Error: "Could not load the default credentials"
**Solution**: Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable

### Error: "Text-to-Speech API has not been enabled"
**Solution**: Enable API at https://console.cloud.google.com/

### Error: "Billing account not configured"
**Solution**: Add billing account (free tier still applies)

## Monitoring

View function logs:
```bash
firebase functions:log
```

View usage in Google Cloud Console:
- APIs & Services → Dashboard
- Select "Cloud Text-to-Speech API"
- View metrics and quotas
