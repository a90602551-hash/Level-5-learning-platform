# 🔥 Firebase 설정 가이드

## 📋 Firebase를 사용하는 이유

현재 앱은 **localStorage**를 사용하여 각 브라우저에만 데이터가 저장됩니다.
Firebase를 연동하면:

✅ **모든 학생 데이터가 중앙 서버에 저장**
✅ **교사가 모든 학생의 학습 기록 확인 가능**
✅ **어느 컴퓨터에서든 진도 동기화**
✅ **데이터 영구 보관 (브라우저 삭제해도 안전)**
✅ **교사 관리 대시보드 사용 가능**

---

## 🚀 Firebase 설정 방법 (20분)

### 1단계: Firebase 프로젝트 생성

1. **Firebase Console 접속**
   - https://console.firebase.google.com

2. **Google 계정으로 로그인**

3. **"프로젝트 추가" 클릭**
   - 프로젝트 이름: `Level5Academy`
   - Google Analytics: **비활성화** (필요없음)
   - "프로젝트 만들기" 클릭

---

### 2단계: Firestore Database 활성화

1. **좌측 메뉴에서 "Firestore Database" 클릭**

2. **"데이터베이스 만들기" 클릭**

3. **모드 선택:**
   - ✅ **"테스트 모드로 시작"** 선택
   - (30일 후 보안 규칙 업데이트 필요)

4. **위치 선택:**
   - `asia-northeast3 (Seoul)` 선택 (가장 빠름)

5. **"사용 설정" 클릭**

---

### 3단계: 보안 규칙 설정

1. **Firestore → "규칙" 탭 클릭**

2. **다음 규칙 입력:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 모든 사용자가 읽기/쓰기 가능 (학원 내부용)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. **"게시" 클릭**

⚠️ **주의:** 이 규칙은 개발/학원 내부용입니다. 외부 공개 시 보안 강화 필요.

---

### 4단계: Firebase SDK 설정 코드 복사

1. **프로젝트 설정 (톱니바퀴 아이콘) 클릭**

2. **"일반" 탭 선택**

3. **"내 앱" 섹션에서 웹 아이콘 `</>` 클릭**

4. **앱 닉네임 입력:**
   - 닉네임: `Level5Web`
   - Firebase Hosting 설정: **체크 안 함**
   - "앱 등록" 클릭

5. **Firebase SDK 설정 코드가 표시됩니다:**

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "level5academy.firebaseapp.com",
  projectId: "level5academy",
  storageBucket: "level5academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

6. **이 코드를 복사하세요!**

---

### 5단계: 프로젝트에 Firebase 설정 적용

1. **`js/firebase-config.js` 파일 열기**

2. **7-13줄의 `firebaseConfig` 부분을 위에서 복사한 코드로 교체:**

```javascript
// 이 부분을
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // ...
};

// 복사한 코드로 교체
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "level5academy.firebaseapp.com",
  // ...
};
```

3. **파일 저장**

---

### 6단계: 배포 및 테스트

1. **Netlify에 재배포**
   - 수정된 파일들을 다시 업로드

2. **웹사이트 접속**
   - 학생으로 로그인
   - AWL 테스트 완료

3. **Firebase Console에서 확인**
   - Firestore Database 탭
   - `students`, `awl_tests` 컬렉션에 데이터 확인

4. **교사 대시보드 접속**
   - `https://your-site.netlify.app/teacher-admin.html`
   - 학생 데이터 확인

---

## 📊 교사 대시보드 사용법

### 접속 방법:
```
https://your-site.netlify.app/teacher-admin.html
```

### 확인 가능한 정보:
- ✅ 전체 학생 수
- ✅ AWL 테스트 통과 학생 수
- ✅ 총 테스트 수
- ✅ 각 학생의 상세 기록
  - AWL 테스트 점수 및 히스토리
  - 딕테이션 결과
  - 논리구조도 제출 기록

### 데이터 내보내기:
1. Firebase Console 접속
2. Firestore Database 선택
3. 원하는 컬렉션 선택
4. 우측 상단 메뉴 → "내보내기"
5. CSV 또는 JSON 형식으로 다운로드

---

## 🔒 보안 강화 (선택사항)

현재는 누구나 데이터에 접근 가능합니다. 보안을 강화하려면:

### Option 1: IP 제한
학원 IP에서만 접속 가능하도록 설정

### Option 2: 비밀번호 인증
교사 대시보드에 비밀번호 추가

### Option 3: Firebase Authentication
Firebase 로그인 시스템 사용

---

## 💰 비용 안내

### Firebase 무료 플랜 (Spark):
- ✅ Firestore: 일 50,000 읽기, 20,000 쓰기
- ✅ 저장공간: 1GB
- ✅ **학원 규모(50명 이하)에 충분함**

### 비용 발생 시:
- 무료 한도 초과 시에만 과금
- 일반적으로 학원 규모에서는 **무료 사용 가능**

---

## 🆘 문제 해결

### Firebase가 연결되지 않을 때:
1. **브라우저 콘솔(F12) 확인**
   - Firebase 관련 에러 메시지 확인

2. **firebaseConfig 설정 재확인**
   - API Key가 정확한지 확인
   - 따옴표, 쉼표 누락 없는지 확인

3. **Firestore 규칙 확인**
   - 테스트 모드가 활성화되어 있는지 확인

4. **네트워크 확인**
   - Firebase 서버 접속 가능한지 확인

---

## 📞 다음 단계

Firebase 설정 완료 후:
1. ✅ 학생들이 학습 진행
2. ✅ 교사 대시보드에서 실시간 확인
3. ✅ 필요시 데이터 내보내기
4. ✅ 추가 기능 개발 (교사 리포트, 통계 등)

---

## 🎯 설정 체크리스트

- [ ] Firebase 프로젝트 생성
- [ ] Firestore Database 활성화
- [ ] 보안 규칙 설정
- [ ] Firebase SDK 설정 코드 복사
- [ ] firebase-config.js 파일 수정
- [ ] Netlify 재배포
- [ ] 학생 테스트 데이터 입력
- [ ] Firebase Console에서 데이터 확인
- [ ] teacher-admin.html 접속 확인
- [ ] 모든 기능 정상 작동 확인

---

**Firebase 설정이 완료되면 학생 데이터가 영구 보관되고, 교사가 실시간으로 학습 현황을 확인할 수 있습니다! 🎉**
