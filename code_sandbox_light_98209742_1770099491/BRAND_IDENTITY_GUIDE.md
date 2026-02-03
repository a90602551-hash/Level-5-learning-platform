# 🎨 브랜드 아이덴티티 시스템 적용 완료

## ✅ 완료 사항

### 1. 브랜드 컬러 시스템
- **파일**: `css/brand-colors.css`
- **메인 컬러**: #F6E27F (편안함, 말문 열기)
- **서브 컬러**: #1F2A44 (신뢰, 전문성)
- **보조 컬러**: 산호, 민트, 라벤더, 피치
- **상태 컬러**: 성공, 경고, 위험, 정보
- **그라데이션**: 히어로, 따뜻함, 시원함, 부드러움
- **그림자**: 4단계 깊이

### 2. 브랜드 폰트 시스템
- **파일**: `css/brand-fonts.css`
- **한글 폰트**: Pretendard
- **영문 폰트**: Inter
- **폰트 굵기**: 300~800 (6단계)
- **폰트 크기**: 12px~64px (반응형)
- **줄간격**: 4단계
- **자간**: 3단계

### 3. CSS 통합
- **css/style.css**: 브랜드 CSS 자동 import
- **레거시 호환**: 기존 변수명 유지
- **즉시 적용**: 모든 HTML 자동 반영

---

## 📂 파일 구조

```
css/
├── brand-colors.css  ✅ 브랜드 컬러 시스템
├── brand-fonts.css   ✅ 브랜드 폰트 시스템
├── style.css         ✅ 메인 CSS (브랜드 CSS import)
├── content.css       (기존)
├── dashboard.css     (기존)
└── grammar-worksheet.css (기존)
```

---

## 🎨 브랜드 컬러 사용법

### CSS 변수 사용

```css
/* 메인 컬러 */
background: var(--color-primary);        /* #F6E27F */
background: var(--color-primary-light);  /* 연한 노랑 */
background: var(--color-primary-dark);   /* 진한 노랑 */

/* 서브 컬러 */
background: var(--color-secondary);      /* #1F2A44 */
color: var(--color-secondary-light);     /* 연한 네이비 */

/* 보조 컬러 */
color: var(--color-accent-coral);        /* 산호색 */
color: var(--color-accent-mint);         /* 민트 */
color: var(--color-accent-lavender);     /* 라벤더 */

/* 상태 컬러 */
color: var(--color-success);             /* 성공 */
color: var(--color-warning);             /* 경고 */
color: var(--color-danger);              /* 위험 */
color: var(--color-info);                /* 정보 */

/* 그라데이션 */
background: var(--gradient-hero);        /* 히어로 */
background: var(--gradient-primary);     /* 메인 */
background: var(--gradient-warm);        /* 따뜻함 */
background: var(--gradient-cool);        /* 시원함 */

/* 그림자 */
box-shadow: var(--shadow-card);          /* 카드 */
box-shadow: var(--shadow-hover);         /* 호버 */
```

---

## 📝 브랜드 폰트 사용법

### CSS 클래스 사용

```html
<!-- 제목 -->
<h1 class="font-extrabold">Level 5 Learning</h1>
<h2 class="font-bold text-hero">환영합니다</h2>

<!-- 본문 -->
<p class="text-body">안녕하세요</p>
<p class="text-subtitle">부제목</p>
<p class="text-caption">작은 텍스트</p>

<!-- 점수/숫자 -->
<span class="font-numeric font-bold text-2xl">95점</span>

<!-- 버튼 -->
<button class="font-semibold">학습하기</button>
```

### CSS 변수 사용

```css
/* 폰트 패밀리 */
font-family: var(--font-combined);       /* 한글+영문 */
font-family: var(--font-korean);         /* 한글 */
font-family: var(--font-english);        /* 영문 */

/* 폰트 굵기 */
font-weight: var(--font-weight-regular); /* 400 */
font-weight: var(--font-weight-medium);  /* 500 */
font-weight: var(--font-weight-bold);    /* 700 */

/* 폰트 크기 */
font-size: var(--font-size-base);        /* 16px */
font-size: var(--font-size-lg);          /* 18px */
font-size: var(--font-size-2xl);         /* 24px */
```

---

## 🚀 적용 방법

### 새 HTML 파일 생성 시

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>페이지 제목</title>
    
    <!-- 브랜드 CSS 추가 (순서 중요!) -->
    <link rel="stylesheet" href="css/brand-colors.css">
    <link rel="stylesheet" href="css/brand-fonts.css">
    <link rel="stylesheet" href="css/style.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
</head>
<body>
    <!-- 내용 -->
</body>
</html>
```

### 기존 HTML 파일 수정

1. 기존 폰트 CDN 링크 삭제
2. 브랜드 CSS 3개 추가

```html
<!-- 삭제 -->
<link href="https://fonts.googleapis.com/..." rel="stylesheet">

<!-- 추가 -->
<link rel="stylesheet" href="css/brand-colors.css">
<link rel="stylesheet" href="css/brand-fonts.css">
<link rel="stylesheet" href="css/style.css">
```

---

## 🎨 브랜드 철학

### 메인 컬러 (#F6E27F - 따뜻한 노란색)
- **의미**: 편안함 (Comfort)
- **목적**: 아이들이 긴장하지 않고 말을 꺼낼 수 있도록
- **메시지**: "틀려도 괜찮다"는 공간의 분위기
- **효과**: 아이의 말문과 자신감을 부드럽게 열어줌

### 서브 컬러 (#1F2A44 - 깊은 네이비)
- **의미**: 신뢰 (Trust)
- **목적**: 학부모가 아이를 믿고 맡길 수 있도록
- **메시지**: "가볍지 않은 학원", "오래 맡길 수 있는 교육 공간"
- **효과**: 아이의 성장을 믿고 맡길 수 있다는 확신

### 전체 톤
- ✅ 즐겁고 편안하게 공부
- ✅ 전문성과 정확함 유지
- ✅ 초등~성인 모두에게 어색하지 않음
- ✅ 딱딱하지 않으면서 진지함

---

## 📋 체크리스트

### 현재 적용된 파일
- [x] css/brand-colors.css
- [x] css/brand-fonts.css
- [x] css/style.css (브랜드 CSS import)

### 적용 필요 파일 (자동 적용됨)
- [ ] index.html
- [ ] student-dashboard.html
- [ ] student-dashboard-demo.html
- [ ] teacher-admin.html
- [ ] teacher-dashboard-demo.html
- [ ] awl-study.html
- [ ] grammar-worksheet-day1.html
- [ ] awl-test.html
- [ ] reading-day1-final.html
- [ ] toefl-listening-day1.html
- [ ] logic-map-day1.html
- [ ] writing-day1.html

**참고**: 위 파일들은 `css/style.css`를 사용하므로 **자동으로 브랜드 컬러/폰트가 적용**됩니다!

---

## 🔄 TTF 폰트로 교체하는 방법 (나중에)

1. `fonts/` 폴더 생성
2. TTF 파일 업로드
3. `css/brand-fonts.css` 수정:

```css
/* 기존 CDN import 삭제 */
/* @import url('https://cdn.jsdelivr.net/...'); */

/* 로컬 폰트 추가 */
@font-face {
    font-family: 'YourBrand-KR';
    src: url('../fonts/YourBrand-KR.woff2') format('woff2'),
         url('../fonts/YourBrand-KR.ttf') format('truetype');
    font-weight: 400;
}

:root {
    --font-korean: 'YourBrand-KR', sans-serif;
}
```

---

## 📞 문의

브랜드 컬러/폰트 관련 수정이 필요하면:
1. `css/brand-colors.css` 수정
2. `css/brand-fonts.css` 수정
3. 모든 페이지 자동 반영!

---

**최종 업데이트**: 2026-02-03
**버전**: v2.0 - 브랜드 아이덴티티 적용
