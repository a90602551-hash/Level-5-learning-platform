# Google Cloud TTS + Firebase Functions 배포 가이드

## 🎯 목표
Google Cloud Text-to-Speech API를 사용하여 AWL 단어의 완벽한 발음 제공

---

## 📋 Step 1: Google Cloud 설정

### 1-1. Google Cloud Console 접속
1. https://console.cloud.google.com/ 접속
2. Firebase 프로젝트 선택 또는 새 프로젝트 생성

### 1-2. Text-to-Speech API 활성화
1. 좌측 메뉴 → **APIs & Services** → **Library**
2. 검색: "Cloud Text-to-Speech API"
3. **ENABLE** 클릭

### 1-3. 결제 계정 설정 (필수)
⚠️ **중요**: 무료 티어를 사용하려면 결제 계정 등록 필요 (실제 과금 없음)

1. 좌측 메뉴 → **Billing**
2. **Link a billing account** 클릭
3. 신용카드 등록 (무료 한도 내 사용 시 과금 안 됨)

**무료 한도:**
- 월 100만 자 무료
- 예상 사용량: 월 20만 자 (학생 100명 기준)
- **결론: 완전 무료! 💰✅**

---

## 📦 Step 2: Firebase Functions 배포

### 2-1. Firebase CLI 설치
```bash
npm install -g firebase-tools
```

### 2-2. Firebase 로그인
```bash
firebase login
```

### 2-3. 프로젝트 초기화 (이미 했다면 skip)
```bash
firebase init functions
```

선택 옵션:
- Language: **JavaScript**
- ESLint: No
- Install dependencies: **Yes**

### 2-4. Functions 코드 복사
이미 생성된 파일들:
- `functions/package.json` ✅
- `functions/index.js` ✅

### 2-5. Dependencies 설치
```bash
cd functions
npm install
```

### 2-6. Functions 배포
```bash
firebase deploy --only functions
```

**예상 소요 시간**: 2-3분

배포 완료 후 출력:
```
✔  Deploy complete!

Functions:
  generateTTS(us-central1)
  generateBatchTTS(us-central1)
  ttsHealthCheck(us-central1)
```

---

## 🧪 Step 3: 테스트

### 3-1. 브라우저 콘솔에서 테스트
```javascript
// Firebase Functions 호출
const functions = firebase.functions();
const generateTTS = functions.httpsCallable('generateTTS');

generateTTS({ text: 'hello' })
  .then(result => {
    console.log('Success!', result.data);
    
    // 오디오 재생
    const audio = new Audio(`data:audio/mp3;base64,${result.data.audioBase64}`);
    audio.play();
  })
  .catch(error => console.error('Error:', error));
```

### 3-2. Health Check
브라우저에서 접속:
```
https://us-central1-[YOUR-PROJECT-ID].cloudfunctions.net/ttsHealthCheck
```

예상 응답:
```json
{
  "status": "ok",
  "service": "Google Cloud Text-to-Speech",
  "timestamp": "2026-02-03T10:30:00.000Z"
}
```

---

## ✅ Step 4: 클라이언트 코드 통합 (이미 완료!)

### 4-1. TTS Helper 스크립트 추가 ✅
```html
<script src="js/tts-helper.js"></script>
```

### 4-2. 코드 수정 완료 ✅
- `js/awl-test.js` → Firebase TTS 사용
- `js/awl-study.js` → Firebase TTS 사용
- `awl-test.html` → TTS helper 추가
- `awl-study.html` → TTS helper 추가

### 4-3. Fallback 처리 ✅
Firebase TTS 실패 시 자동으로 Web Speech API 사용

---

## 🚀 Step 5: 배포 및 확인

### 5-1. Netlify에 배포
```bash
# 전체 프로젝트 폴더를 Netlify에 드래그 앤 드롭
```

### 5-2. 테스트
1. AWL 학습 페이지 → 단어 클릭 → 발음 확인
2. AWL 테스트 → 스펠링 5문제 → "발음 듣기" 버튼

### 5-3. 예상 결과
- ✅ 자연스러운 미국 영어 발음
- ✅ 정확한 단어 강세
- ✅ 부드러운 음성 품질

---

## 📊 모니터링

### Firebase Functions 로그 확인
```bash
firebase functions:log
```

### Google Cloud 사용량 확인
1. https://console.cloud.google.com/
2. APIs & Services → Dashboard
3. "Cloud Text-to-Speech API" 선택
4. Metrics 탭 → 사용량 확인

---

## 💰 비용 예측

### 사용량 계산
| 항목 | 수치 |
|------|------|
| 평균 단어 길이 | 8자 |
| 스펠링 문제 수 | 5개 |
| 1회 테스트 문자 수 | 40자 |
| 학생 수 | 100명 |
| 주당 테스트 | 2회 |
| 월 테스트 수 | 800회 |
| **월 총 문자 수** | **32,000자** |

### 비용
- 무료 한도: 1,000,000자/월
- 사용량: 32,000자/월 (3.2%)
- **비용: $0** ✅

**결론**: 학생 500명까지도 무료! 🎉

---

## 🔧 Troubleshooting

### Error: "Text-to-Speech API has not been used in project"
**해결**: Google Cloud Console에서 API 활성화

### Error: "Cloud Functions deployment failed"
**해결**: 
```bash
cd functions
rm -rf node_modules package-lock.json
npm install
firebase deploy --only functions
```

### Error: "CORS policy blocked"
**해결**: Firebase Functions는 자동으로 CORS 허용

### 발음이 이상한 단어가 있다면?
**옵션 1**: `functions/index.js`에서 음성 변경
```javascript
voice: {
  name: 'en-US-Neural2-M', // Male voice로 변경
  ssmlGender: 'MALE'
}
```

**옵션 2**: 특정 단어 발음 강제 수정
```javascript
const pronunciationMap = {
  'live': '<phoneme alphabet="ipa" ph="lɪv">live</phoneme>'
};
```

---

## 🎓 다음 단계

### 추가 최적화 (선택)
1. **Pre-loading**: AWL 30개 단어 사전 생성
2. **Caching**: Firebase Storage에 오디오 저장
3. **CDN**: CloudFlare CDN 사용

### 확장 (나중에)
1. Day 2-96 단어 추가
2. 여러 음성 선택 옵션
3. 속도 조절 기능

---

## ✅ 체크리스트

배포 전 확인:
- [ ] Google Cloud TTS API 활성화
- [ ] 결제 계정 연결 (무료 사용)
- [ ] Firebase Functions 배포
- [ ] 테스트 성공
- [ ] Netlify 재배포
- [ ] 실제 발음 확인

---

**질문이나 문제가 있으면 말씀해주세요!** 😊
