# 폰트 파일 업로드 가이드

## 📁 폰트 파일 제공 방법

### 1. 폰트 파일 준비
다음 형식의 폰트 파일을 준비해주세요:
- `.woff2` (권장, 최신 브라우저 지원)
- `.woff` (구형 브라우저 호환)
- `.ttf` (변환 가능)
- `.otf` (변환 가능)

### 2. 필요한 폰트
- **한글 폰트**: 1개 (예: YourBrand-KR.woff2)
- **영문 폰트**: 1개 (예: YourBrand-EN.woff2)

### 3. 폰트 Weight (굵기)
가능하면 여러 굵기를 제공해주세요:
- Regular (400) - 필수
- Medium (500) - 권장
- SemiBold (600) - 권장
- Bold (700) - 권장

### 4. 파일 이름 예시
```
fonts/
├── YourBrand-KR-Regular.woff2
├── YourBrand-KR-Medium.woff2
├── YourBrand-KR-Bold.woff2
├── YourBrand-EN-Regular.woff2
├── YourBrand-EN-Medium.woff2
└── YourBrand-EN-Bold.woff2
```

---

## 🔄 대안: 폰트 정보만 제공

폰트 파일이 없다면, **폰트 이름**만 알려주세요:

### Google Fonts 사용 (무료)
- 한글: Noto Sans KR, Pretendard, Spoqa Han Sans 등
- 영문: Inter, Roboto, Poppins, Open Sans 등

### 예시:
```
한글 폰트: Pretendard
영문 폰트: Inter
```

---

## 📤 제공 방법

### 방법 1: 파일 업로드
폰트 파일을 준비하신 후, 다음 명령어로 업로드해주세요:
```
"폰트 파일 업로드할게" → 파일 제공
```

### 방법 2: 폰트 이름만 제공
```
"한글 폰트: Pretendard, 영문 폰트: Inter"
```

### 방법 3: 기존 사용 중인 폰트 URL
```
"https://your-cdn.com/fonts/..."
```

---

## ⚠️ 참고사항

1. **폰트 파일이 크면** → CDN 사용 권장 (Google Fonts 등)
2. **라이센스 확인** → 상업적 사용 가능한 폰트인지 확인
3. **웹폰트 최적화** → .woff2 형식 권장 (용량 작음)

---

준비되시면 알려주세요! 😊
