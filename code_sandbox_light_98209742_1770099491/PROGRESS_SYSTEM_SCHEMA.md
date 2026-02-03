/* =========================================
   진도 관리 시스템 - Firebase 데이터 구조
   ========================================= */

/*
  Firestore 컬렉션 구조:
  
  1. students (학생 기본 정보 + 진도)
  2. awl_tests (AWL 테스트 결과)
  3. writing_submissions (Writing 제출물)
  4. grammar_worksheets (문법 워크시트)
  5. listening_dictations (리스닝 딕테이션)
  6. logic_maps (논리구조도)
  7. individual_tasks (개별과제)
*/

// ===== 1. students 컬렉션 =====
const studentSchema = {
    id: "student_1234567890",              // 학생 ID (자동생성)
    name: "김영희",                          // 학생 이름
    email: "student@example.com",          // 이메일 (선택)
    level: 5,                              // 레벨 (1-5)
    
    // 진도 정보
    currentDay: 1,                         // 현재 학습중인 Day
    completedDays: [1, 2, 3],             // 완료한 Day 목록
    
    // Day별 진행 상황 (Day 1-96)
    progress: {
        day1: {
            // Step 1: Home Task
            awl_study: true,               // AWL 학습 완료 여부
            awl_study_completed_at: "2026-02-03T10:00:00Z",
            
            grammar_worksheet: true,       // 문법 워크시트 완료
            grammar_worksheet_score: 85,
            grammar_worksheet_completed_at: "2026-02-03T11:00:00Z",
            
            // Step 2: Booth
            awl_test: true,                // AWL 테스트 완료
            awl_test_score: 95,
            awl_test_passed: true,         // 95점 이상 통과
            awl_test_completed_at: "2026-02-03T14:00:00Z",
            
            reading: true,                 // Reading 완료
            reading_completed_at: "2026-02-03T14:10:00Z",
            
            listening: true,               // Listening 완료
            listening_completed_at: "2026-02-03T14:20:00Z",
            
            logic_map: true,               // 논리구조도 완료
            logic_map_score: 88,
            logic_map_completed_at: "2026-02-03T14:35:00Z",
            
            writing: true,                 // Writing 완료
            writing_score: 92,
            writing_passed: true,          // 90점 이상 통과
            writing_completed_at: "2026-02-03T14:50:00Z",
            
            // Day 완료 여부
            completed: true,               // 7개 과제 모두 완료
            completed_at: "2026-02-03T14:50:00Z",
            
            // 평균 점수
            average_score: 90
        },
        day2: {
            awl_study: false,
            grammar_worksheet: false,
            awl_test: false,
            reading: false,
            listening: false,
            logic_map: false,
            writing: false,
            completed: false
        }
        // ... day3 ~ day96
    },
    
    // 통계
    stats: {
        total_days_completed: 1,           // 완료한 총 Day 수
        total_awl_tests: 1,                // 응시한 AWL 테스트 수
        average_awl_score: 95,             // 평균 AWL 점수
        average_writing_score: 92,         // 평균 Writing 점수
        total_study_time: 120,             // 총 학습 시간 (분)
        last_activity: "2026-02-03T14:50:00Z"
    },
    
    // 개별과제
    individual_tasks: [
        {
            task_id: "task001",
            title: "관계대명사 심화 문제",
            assigned_by: "teacher_001",
            assigned_at: "2026-02-04T09:00:00Z",
            due_date: "2026-02-10T23:59:59Z",
            status: "in_progress",         // pending, in_progress, completed
            completed_at: null
        }
    ],
    
    // 메타 정보
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-03T14:50:00Z"
};

// ===== 2. awl_tests 컬렉션 =====
const awlTestSchema = {
    id: "test_1234567890",
    student_id: "student_1234567890",
    student_name: "김영희",
    day: 1,
    score: 95,
    total: 35,
    passed: true,                          // 95점 이상
    answers: {
        mcq: [/* 30개 객관식 답 */],
        spelling: [/* 5개 스펠링 답 */]
    },
    timestamp: 1706961600000,
    date: "2026-02-03T14:00:00Z"
};

// ===== 3. writing_submissions 컬렉션 =====
const writingSubmissionSchema = {
    id: "writing_1234567890",
    student_id: "student_1234567890",
    student_name: "김영희",
    day: 1,
    
    // 작성 내용
    sentences: [
        "I agree that high standards are important.",
        "First, they help students develop skills.",
        // ... 5문장
    ],
    full_text: "I agree that... (전체 텍스트)",
    word_count: 89,
    char_count: 450,
    
    // 첨삭 결과
    score: 92,
    detailed_scores: {
        basic: 8,
        tense: 12,
        agreement: 12,
        pattern: 8,
        grammar: 15,
        verbals: 10,
        voice: 10,
        vocabulary: 10,
        connectors: 10,
        structure: 5
    },
    feedback: [
        "✅ 문장이 잘 작성되었습니다.",
        // ... 피드백
    ],
    passed: true,                          // 90점 이상
    
    timestamp: 1706962200000,
    date: "2026-02-03T14:50:00Z"
};

// ===== 4. grammar_worksheets 컬렉션 =====
const grammarWorksheetSchema = {
    id: "grammar_1234567890",
    student_id: "student_1234567890",
    student_name: "김영희",
    day: 1,
    
    pattern_hunting: {
        sentence1: "...",
        sentence2: "...",
        sentence3: "..."
    },
    
    error_detection: {
        sentenceA: "...",
        sentenceB: "...",
        sentenceC: "..."
    },
    
    score: 85,
    timestamp: 1706958600000,
    date: "2026-02-03T11:00:00Z"
};

// ===== 5. listening_dictations 컬렉션 =====
const listeningDictationSchema = {
    id: "dictation_1234567890",
    student_id: "student_1234567890",
    student_name: "김영희",
    day: 1,
    
    answers: {
        blank1: "students",
        blank2: "teachers",
        // ... 8개
    },
    
    correct_answers: {
        blank1: "students",
        blank2: "teachers",
        // ... 8개
    },
    
    score: 7,
    total: 8,
    percentage: 88,
    
    timestamp: 1706960400000,
    date: "2026-02-03T14:20:00Z"
};

// ===== 6. logic_maps 컬렉션 =====
const logicMapSchema = {
    id: "logic_1234567890",
    student_id: "student_1234567890",
    student_name: "김영희",
    day: 1,
    
    answers: {
        reading_claim: "...",
        reading_point1: "...",
        reading_point2: "...",
        reading_conclusion: "...",
        listening_claim: "...",
        listening_point1: "...",
        listening_point2: "...",
        listening_conclusion: "..."
    },
    
    score: 7,
    total: 8,
    percentage: 88,
    
    timestamp: 1706961300000,
    date: "2026-02-03T14:35:00Z"
};

// ===== 7. individual_tasks 컬렉션 =====
const individualTaskSchema = {
    id: "task_1234567890",
    student_id: "student_1234567890",
    student_name: "김영희",
    
    title: "관계대명사 심화 문제",
    description: "관계대명사 that, which, who 구분 연습 문제 20개",
    type: "grammar_practice",              // grammar_practice, reading, vocabulary, etc.
    
    assigned_by: "teacher_001",
    assigned_by_name: "김선생님",
    assigned_at: "2026-02-04T09:00:00Z",
    
    due_date: "2026-02-10T23:59:59Z",
    status: "pending",                     // pending, in_progress, completed, overdue
    
    // 과제 콘텐츠 (나중에 추가)
    content: {
        url: "individual-task.html?taskId=task_1234567890",
        data: {/* 과제 데이터 */}
    },
    
    // 제출 정보
    submitted_at: null,
    submission_data: null,
    score: null,
    feedback: null,
    
    created_at: "2026-02-04T09:00:00Z",
    updated_at: "2026-02-04T09:00:00Z"
};

// ===== Helper 함수 예시 =====

// Day 완료 조건 체크
function isDayCompleted(dayProgress) {
    return dayProgress.awl_study &&
           dayProgress.grammar_worksheet &&
           dayProgress.awl_test &&
           dayProgress.awl_test_passed &&
           dayProgress.reading &&
           dayProgress.listening &&
           dayProgress.logic_map &&
           dayProgress.writing &&
           dayProgress.writing_passed;
}

// 다음 Day 해제 가능 여부
function canUnlockNextDay(student, currentDay) {
    if (currentDay >= 96) return false;
    
    const dayProgress = student.progress[`day${currentDay}`];
    return isDayCompleted(dayProgress);
}

// Day 진행률 계산
function calculateDayProgress(dayProgress) {
    const tasks = [
        'awl_study',
        'grammar_worksheet',
        'awl_test',
        'reading',
        'listening',
        'logic_map',
        'writing'
    ];
    
    const completedTasks = tasks.filter(task => dayProgress[task]).length;
    return Math.round((completedTasks / tasks.length) * 100);
}

// 전체 진행률 계산
function calculateOverallProgress(student) {
    return Math.round((student.completedDays.length / 96) * 100);
}
