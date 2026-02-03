/* =========================================
   진도 관리 시스템 - Progress Manager
   Level 5 Learning Platform
   ========================================= */

// Firebase 연결 확인
let isFirebaseReady = false;

// Firebase 초기화 대기
if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    isFirebaseReady = true;
    console.log('✅ Firebase connected for Progress Manager');
} else {
    console.warn('⚠️ Firebase not available, using localStorage only');
}

// ===== 학생 진도 관리 =====

/**
 * 학생 진도 데이터 초기화
 */
async function initializeStudentProgress(studentId, studentName) {
    try {
        if (isFirebaseReady) {
            const db = firebase.firestore();
            const studentRef = db.collection('students').doc(studentId);
            const doc = await studentRef.get();
            
            if (!doc.exists) {
                // 새 학생 생성
                const newStudent = {
                    id: studentId,
                    name: studentName,
                    level: 5,
                    currentDay: 1,
                    completedDays: [],
                    progress: createEmptyProgress(),
                    stats: {
                        total_days_completed: 0,
                        total_awl_tests: 0,
                        average_awl_score: 0,
                        average_writing_score: 0,
                        total_study_time: 0,
                        last_activity: firebase.firestore.FieldValue.serverTimestamp()
                    },
                    individual_tasks: [],
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    updated_at: firebase.firestore.FieldValue.serverTimestamp()
                };
                
                await studentRef.set(newStudent);
                console.log('✅ New student created:', studentId);
                return newStudent;
            } else {
                return doc.data();
            }
        } else {
            // localStorage fallback
            const stored = localStorage.getItem(`student_${studentId}`);
            if (stored) {
                return JSON.parse(stored);
            } else {
                const newStudent = {
                    id: studentId,
                    name: studentName,
                    level: 5,
                    currentDay: 1,
                    completedDays: [],
                    progress: createEmptyProgress(),
                    stats: {
                        total_days_completed: 0,
                        total_awl_tests: 0,
                        average_awl_score: 0,
                        average_writing_score: 0,
                        total_study_time: 0,
                        last_activity: new Date().toISOString()
                    },
                    individual_tasks: []
                };
                localStorage.setItem(`student_${studentId}`, JSON.stringify(newStudent));
                return newStudent;
            }
        }
    } catch (error) {
        console.error('❌ Error initializing student progress:', error);
        return null;
    }
}

/**
 * 빈 진도 객체 생성 (Day 1-96)
 */
function createEmptyProgress() {
    const progress = {};
    for (let day = 1; day <= 96; day++) {
        progress[`day${day}`] = {
            awl_study: false,
            awl_study_completed_at: null,
            grammar_worksheet: false,
            grammar_worksheet_score: null,
            grammar_worksheet_completed_at: null,
            awl_test: false,
            awl_test_score: null,
            awl_test_passed: false,
            awl_test_completed_at: null,
            reading: false,
            reading_completed_at: null,
            listening: false,
            listening_completed_at: null,
            logic_map: false,
            logic_map_score: null,
            logic_map_completed_at: null,
            writing: false,
            writing_score: null,
            writing_passed: false,
            writing_completed_at: null,
            completed: false,
            completed_at: null,
            average_score: 0
        };
    }
    return progress;
}

/**
 * 학생 진도 로드
 */
async function loadStudentProgress(studentId) {
    try {
        if (isFirebaseReady) {
            const db = firebase.firestore();
            const doc = await db.collection('students').doc(studentId).get();
            if (doc.exists) {
                return doc.data();
            }
        } else {
            const stored = localStorage.getItem(`student_${studentId}`);
            if (stored) {
                return JSON.parse(stored);
            }
        }
        return null;
    } catch (error) {
        console.error('❌ Error loading student progress:', error);
        return null;
    }
}

/**
 * 특정 과제 완료 표시
 */
async function markTaskCompleted(studentId, day, taskName, score = null) {
    try {
        const student = await loadStudentProgress(studentId);
        if (!student) {
            console.error('❌ Student not found:', studentId);
            return false;
        }
        
        const dayKey = `day${day}`;
        if (!student.progress[dayKey]) {
            console.error('❌ Invalid day:', day);
            return false;
        }
        
        // 과제 완료 표시
        student.progress[dayKey][taskName] = true;
        student.progress[dayKey][`${taskName}_completed_at`] = new Date().toISOString();
        
        // 점수가 있는 경우
        if (score !== null) {
            student.progress[dayKey][`${taskName}_score`] = score;
            
            // 통과 여부 체크
            if (taskName === 'awl_test') {
                student.progress[dayKey].awl_test_passed = score >= 95;
            } else if (taskName === 'writing') {
                student.progress[dayKey].writing_passed = score >= 90;
            }
        }
        
        // Day 완료 여부 체크
        const dayCompleted = isDayCompleted(student.progress[dayKey]);
        student.progress[dayKey].completed = dayCompleted;
        
        if (dayCompleted && !student.completedDays.includes(day)) {
            student.progress[dayKey].completed_at = new Date().toISOString();
            student.completedDays.push(day);
            student.currentDay = day + 1;
            student.stats.total_days_completed = student.completedDays.length;
        }
        
        // 평균 점수 계산
        student.progress[dayKey].average_score = calculateDayAverageScore(student.progress[dayKey]);
        
        // 마지막 활동 시간 업데이트
        student.stats.last_activity = new Date().toISOString();
        student.updated_at = new Date().toISOString();
        
        // 저장
        await saveStudentProgress(studentId, student);
        
        console.log(`✅ Task completed: Day ${day} - ${taskName}`);
        return true;
        
    } catch (error) {
        console.error('❌ Error marking task completed:', error);
        return false;
    }
}

/**
 * 학생 진도 저장
 */
async function saveStudentProgress(studentId, studentData) {
    try {
        if (isFirebaseReady) {
            const db = firebase.firestore();
            await db.collection('students').doc(studentId).set(studentData, { merge: true });
            console.log('✅ Progress saved to Firebase');
        }
        
        // localStorage 백업
        localStorage.setItem(`student_${studentId}`, JSON.stringify(studentData));
        console.log('✅ Progress backed up to localStorage');
        
        return true;
    } catch (error) {
        console.error('❌ Error saving student progress:', error);
        return false;
    }
}

/**
 * Day 완료 여부 확인
 */
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

/**
 * Day 진행률 계산
 */
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

/**
 * Day 평균 점수 계산
 */
function calculateDayAverageScore(dayProgress) {
    const scores = [];
    
    if (dayProgress.awl_test_score) scores.push(dayProgress.awl_test_score);
    if (dayProgress.grammar_worksheet_score) scores.push(dayProgress.grammar_worksheet_score);
    if (dayProgress.logic_map_score) scores.push(dayProgress.logic_map_score);
    if (dayProgress.writing_score) scores.push(dayProgress.writing_score);
    
    if (scores.length === 0) return 0;
    
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / scores.length);
}

/**
 * 전체 진행률 계산
 */
function calculateOverallProgress(student) {
    return Math.round((student.completedDays.length / 96) * 100);
}

/**
 * 다음 Day 해제 가능 여부
 */
function canUnlockDay(student, day) {
    if (day === 1) return true;
    if (day > 96) return false;
    
    const previousDay = day - 1;
    return student.completedDays.includes(previousDay);
}

/**
 * Day 상태 가져오기
 */
function getDayStatus(student, day) {
    if (!canUnlockDay(student, day)) {
        return 'locked';
    }
    
    const dayProgress = student.progress[`day${day}`];
    if (dayProgress.completed) {
        return 'completed';
    }
    
    const progress = calculateDayProgress(dayProgress);
    if (progress > 0) {
        return 'in_progress';
    }
    
    return 'available';
}

// ===== 교사용 함수 =====

/**
 * 모든 학생 목록 가져오기
 */
async function getAllStudents() {
    try {
        if (isFirebaseReady) {
            const db = firebase.firestore();
            const snapshot = await db.collection('students').get();
            return snapshot.docs.map(doc => doc.data());
        } else {
            // localStorage에서 모든 학생 데이터 가져오기
            const students = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('student_')) {
                    const data = JSON.parse(localStorage.getItem(key));
                    students.push(data);
                }
            }
            return students;
        }
    } catch (error) {
        console.error('❌ Error getting all students:', error);
        return [];
    }
}

/**
 * 학생별 통계 계산
 */
function calculateStudentStats(student) {
    const stats = {
        totalDays: 96,
        completedDays: student.completedDays.length,
        currentDay: student.currentDay,
        overallProgress: calculateOverallProgress(student),
        averageScore: 0,
        totalTests: 0
    };
    
    // 평균 점수 계산
    const scores = [];
    student.completedDays.forEach(day => {
        const dayProgress = student.progress[`day${day}`];
        if (dayProgress.average_score > 0) {
            scores.push(dayProgress.average_score);
        }
    });
    
    if (scores.length > 0) {
        stats.averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    
    stats.totalTests = student.stats.total_awl_tests || 0;
    
    return stats;
}

// ===== Export (전역 함수로 사용) =====
window.ProgressManager = {
    initializeStudentProgress,
    loadStudentProgress,
    markTaskCompleted,
    saveStudentProgress,
    isDayCompleted,
    calculateDayProgress,
    calculateDayAverageScore,
    calculateOverallProgress,
    canUnlockDay,
    getDayStatus,
    getAllStudents,
    calculateStudentStats
};

console.log('✅ Progress Manager loaded');
