// Firebase Configuration
// Firebase Console에서 복사한 설정을 여기에 붙여넣으세요

const firebaseConfig = {
  apiKey: "AIzaSyBg0uRLcdBLGbtEKbPYjUiUfXN2bSgR0xE",
  authDomain: "level-5-20887.firebaseapp.com",
  projectId: "level-5-20887",
  storageBucket: "level-5-20887.firebasestorage.app",
  messagingSenderId: "1013074201762",
  appId: "1:1013074201762:web:20b06c236a718c0526dbfb",
  measurementId: "G-1RN1HSY9ML"
};

// Firebase 초기화
let db = null;
let isFirebaseEnabled = false;

// Firebase 로드 시도
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    isFirebaseEnabled = true;
    console.log('✅ Firebase connected successfully');
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed:', error);
    console.log('📝 Using localStorage as fallback');
  }
} else {
  console.log('📝 Firebase not loaded, using localStorage');
}

// ========================================
// Unified Data Functions (Firebase + localStorage)
// ========================================

// 학생 정보 저장
async function saveStudentData(studentData) {
  if (isFirebaseEnabled && db) {
    try {
      await db.collection('students').doc(studentData.id).set(studentData);
      console.log('✅ Student saved to Firebase');
    } catch (error) {
      console.error('❌ Firebase save error:', error);
    }
  }
  
  // localStorage에도 백업
  localStorage.setItem('currentStudent', JSON.stringify(studentData));
}

// 학생 정보 불러오기
async function loadStudentData(studentId) {
  if (isFirebaseEnabled && db) {
    try {
      const doc = await db.collection('students').doc(studentId).get();
      if (doc.exists) {
        console.log('✅ Student loaded from Firebase');
        return doc.data();
      }
    } catch (error) {
      console.error('❌ Firebase load error:', error);
    }
  }
  
  // localStorage에서 불러오기
  const saved = localStorage.getItem('currentStudent');
  return saved ? JSON.parse(saved) : null;
}

// AWL 테스트 결과 저장
async function saveAWLTestResult(studentId, testData) {
  const result = {
    studentId: studentId,
    studentName: testData.studentName,
    score: testData.score,
    passed: testData.passed,
    answers: testData.answers,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    date: new Date().toISOString()
  };
  
  if (isFirebaseEnabled && db) {
    try {
      await db.collection('awl_tests').add(result);
      console.log('✅ AWL test result saved to Firebase');
    } catch (error) {
      console.error('❌ Firebase save error:', error);
    }
  }
  
  // localStorage에도 백업
  const key = `awl_test_${studentId}_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(result));
}

// 딕테이션 결과 저장
async function saveDictationResult(studentId, dictationData) {
  const result = {
    studentId: studentId,
    studentName: dictationData.studentName,
    day: dictationData.day,
    score: dictationData.score,
    answers: dictationData.answers,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    date: new Date().toISOString()
  };
  
  if (isFirebaseEnabled && db) {
    try {
      await db.collection('dictations').add(result);
      console.log('✅ Dictation result saved to Firebase');
    } catch (error) {
      console.error('❌ Firebase save error:', error);
    }
  }
  
  // localStorage에도 백업
  const key = `dictation_${studentId}_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(result));
}

// 논리구조도 결과 저장
async function saveLogicMapResult(studentId, logicMapData) {
  const result = {
    studentId: studentId,
    studentName: logicMapData.studentName,
    day: logicMapData.day,
    score: logicMapData.score,
    answers: logicMapData.answers,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    date: new Date().toISOString()
  };
  
  if (isFirebaseEnabled && db) {
    try {
      await db.collection('logic_maps').add(result);
      console.log('✅ Logic map result saved to Firebase');
    } catch (error) {
      console.error('❌ Firebase save error:', error);
    }
  }
  
  // localStorage에도 백업
  const key = `logic_map_${studentId}_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(result));
}

// Writing 제출물 저장 (NEW!)
async function saveWritingSubmission(studentId, writingData) {
  const result = {
    studentId: studentId,
    studentName: writingData.studentName,
    day: writingData.day || 1,
    sentences: writingData.sentences,
    fullText: writingData.fullText,
    score: writingData.score,
    detailedScores: writingData.detailedScores || {},
    feedback: writingData.feedback || [],
    wordCount: writingData.wordCount,
    charCount: writingData.charCount,
    timestamp: isFirebaseEnabled ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    date: new Date().toISOString()
  };
  
  if (isFirebaseEnabled && db) {
    try {
      await db.collection('writing_submissions').add(result);
      console.log('✅ Writing submission saved to Firebase');
      return true;
    } catch (error) {
      console.error('❌ Firebase save error:', error);
      return false;
    }
  }
  
  // localStorage에도 백업
  const existingData = JSON.parse(localStorage.getItem('writingSubmissions') || '[]');
  existingData.push(result);
  localStorage.setItem('writingSubmissions', JSON.stringify(existingData));
  return true;
}

// 문법 워크시트 결과 저장 (NEW!)
async function saveGrammarWorksheet(studentId, grammarData) {
  const result = {
    studentId: studentId,
    studentName: grammarData.studentName,
    day: grammarData.day || 1,
    patternHunting: grammarData.patternHunting || {},
    errorDetection: grammarData.errorDetection || {},
    score: grammarData.score,
    totalQuestions: grammarData.totalQuestions,
    timestamp: isFirebaseEnabled ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    date: new Date().toISOString()
  };
  
  if (isFirebaseEnabled && db) {
    try {
      await db.collection('grammar_worksheets').add(result);
      console.log('✅ Grammar worksheet saved to Firebase');
      return true;
    } catch (error) {
      console.error('❌ Firebase save error:', error);
      return false;
    }
  }
  
  // localStorage에도 백업
  const grammarResults = JSON.parse(localStorage.getItem('grammarResults') || '[]');
  grammarResults.push(result);
  localStorage.setItem('grammarResults', JSON.stringify(grammarResults));
  return true;
}

// 리스닝 딕테이션 결과 저장 (업데이트)
async function saveListeningDictation(studentId, dictationData) {
  const result = {
    studentId: studentId,
    studentName: dictationData.studentName,
    day: dictationData.day || 1,
    answers: dictationData.answers,
    correctAnswers: dictationData.correctAnswers,
    score: dictationData.score,
    total: dictationData.total,
    timestamp: isFirebaseEnabled ? firebase.firestore.FieldValue.serverTimestamp() : Date.now(),
    date: new Date().toISOString()
  };
  
  if (isFirebaseEnabled && db) {
    try {
      await db.collection('listening_dictations').add(result);
      console.log('✅ Listening dictation saved to Firebase');
      return true;
    } catch (error) {
      console.error('❌ Firebase save error:', error);
      return false;
    }
  }
  
  // localStorage에도 백업
  const key = `listening_dictation_${studentId}_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(result));
  return true;
}

// ========================================
// Teacher Dashboard Functions
// ========================================

// 모든 학생 목록 가져오기
async function getAllStudents() {
  if (!isFirebaseEnabled || !db) {
    console.warn('Firebase not available');
    return [];
  }
  
  try {
    const snapshot = await db.collection('students').orderBy('name').get();
    const students = [];
    snapshot.forEach(doc => {
      students.push({ id: doc.id, ...doc.data() });
    });
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

// 특정 학생의 모든 AWL 테스트 결과
async function getStudentAWLTests(studentId) {
  if (!isFirebaseEnabled || !db) return [];
  
  try {
    const snapshot = await db.collection('awl_tests')
      .where('studentId', '==', studentId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const tests = [];
    snapshot.forEach(doc => {
      tests.push({ id: doc.id, ...doc.data() });
    });
    return tests;
  } catch (error) {
    console.error('Error fetching AWL tests:', error);
    return [];
  }
}

// 특정 학생의 모든 딕테이션 결과
async function getStudentDictations(studentId) {
  if (!isFirebaseEnabled || !db) return [];
  
  try {
    const snapshot = await db.collection('dictations')
      .where('studentId', '==', studentId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const dictations = [];
    snapshot.forEach(doc => {
      dictations.push({ id: doc.id, ...doc.data() });
    });
    return dictations;
  } catch (error) {
    console.error('Error fetching dictations:', error);
    return [];
  }
}

// 특정 학생의 모든 논리구조도 결과
async function getStudentLogicMaps(studentId) {
  if (!isFirebaseEnabled || !db) return [];
  
  try {
    const snapshot = await db.collection('logic_maps')
      .where('studentId', '==', studentId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const logicMaps = [];
    snapshot.forEach(doc => {
      logicMaps.push({ id: doc.id, ...doc.data() });
    });
    return logicMaps;
  } catch (error) {
    console.error('Error fetching logic maps:', error);
    return [];
  }
}

// 특정 학생의 모든 Writing 제출물 (NEW!)
async function getStudentWritings(studentId) {
  if (!isFirebaseEnabled || !db) return [];
  
  try {
    const snapshot = await db.collection('writing_submissions')
      .where('studentId', '==', studentId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const writings = [];
    snapshot.forEach(doc => {
      writings.push({ id: doc.id, ...doc.data() });
    });
    return writings;
  } catch (error) {
    console.error('Error fetching writings:', error);
    return [];
  }
}

// 특정 학생의 모든 문법 워크시트 결과 (NEW!)
async function getStudentGrammarWorksheets(studentId) {
  if (!isFirebaseEnabled || !db) return [];
  
  try {
    const snapshot = await db.collection('grammar_worksheets')
      .where('studentId', '==', studentId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const worksheets = [];
    snapshot.forEach(doc => {
      worksheets.push({ id: doc.id, ...doc.data() });
    });
    return worksheets;
  } catch (error) {
    console.error('Error fetching grammar worksheets:', error);
    return [];
  }
}

// 특정 학생의 모든 리스닝 딕테이션 결과 (NEW!)
async function getStudentListeningDictations(studentId) {
  if (!isFirebaseEnabled || !db) return [];
  
  try {
    const snapshot = await db.collection('listening_dictations')
      .where('studentId', '==', studentId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const dictations = [];
    snapshot.forEach(doc => {
      dictations.push({ id: doc.id, ...doc.data() });
    });
    return dictations;
  } catch (error) {
    console.error('Error fetching listening dictations:', error);
    return [];
  }
}

// 전체 통계
async function getOverallStatistics() {
  if (!isFirebaseEnabled || !db) return null;
  
  try {
    const studentsSnapshot = await db.collection('students').get();
    const awlTestsSnapshot = await db.collection('awl_tests').get();
    const writingsSnapshot = await db.collection('writing_submissions').get();
    const grammarsSnapshot = await db.collection('grammar_worksheets').get();
    const dictationsSnapshot = await db.collection('listening_dictations').get();
    const logicMapsSnapshot = await db.collection('logic_maps').get();
    
    return {
      totalStudents: studentsSnapshot.size,
      totalAWLTests: awlTestsSnapshot.size,
      totalWritings: writingsSnapshot.size,
      totalGrammars: grammarsSnapshot.size,
      totalDictations: dictationsSnapshot.size,
      totalLogicMaps: logicMapsSnapshot.size,
      passedStudents: studentsSnapshot.docs.filter(doc => doc.data().awl_test_passed).length
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return null;
  }
}
