// Day 1 AWL Vocabulary - Elementary Level (초4-예비중1)
// 총 30개 단어 (기초 15개 + 중급 15개)

const day1Vocabulary = [
    // ============================================
    // Group 1: 기초 어휘 (초4-초5 수준)
    // ============================================
    {
        id: 1,
        word: "important",
        pronunciation: "[ɪmˈpɔːrtənt]",
        koreanMeaning: "중요한",
        definition: "having great value or meaning",
        example: "Studying is important for good grades.",
        koreanExample: "공부는 좋은 성적을 위해 중요하다.",
        group: 1
    },
    {
        id: 2,
        word: "student",
        pronunciation: "[ˈstuːdnt]",
        koreanMeaning: "학생",
        definition: "a person who is learning at a school",
        example: "Every student should try their best.",
        koreanExample: "모든 학생은 최선을 다해야 한다.",
        group: 1
    },
    {
        id: 3,
        word: "learn",
        pronunciation: "[lɜːrn]",
        koreanMeaning: "배우다",
        definition: "to get knowledge or skill",
        example: "Students learn new things every day.",
        koreanExample: "학생들은 매일 새로운 것을 배운다.",
        group: 1
    },
    {
        id: 4,
        word: "help",
        pronunciation: "[help]",
        koreanMeaning: "돕다, 도움",
        definition: "to make something easier for someone",
        example: "Teachers help students understand difficult topics.",
        koreanExample: "선생님은 학생들이 어려운 주제를 이해하도록 돕는다.",
        group: 1
    },
    {
        id: 5,
        word: "need",
        pronunciation: "[niːd]",
        koreanMeaning: "필요하다",
        definition: "to require something",
        example: "Students need good study habits.",
        koreanExample: "학생들은 좋은 공부 습관이 필요하다.",
        group: 1
    },
    {
        id: 6,
        word: "try",
        pronunciation: "[traɪ]",
        koreanMeaning: "노력하다, 시도하다",
        definition: "to make an effort to do something",
        example: "You should try to do your homework every day.",
        koreanExample: "너는 매일 숙제를 하려고 노력해야 한다.",
        group: 1
    },
    {
        id: 7,
        word: "work",
        pronunciation: "[wɜːrk]",
        koreanMeaning: "일하다, 공부하다",
        definition: "to do an activity that requires effort",
        example: "Students work hard to get good results.",
        koreanExample: "학생들은 좋은 결과를 얻기 위해 열심히 공부한다.",
        group: 1
    },
    {
        id: 8,
        word: "know",
        pronunciation: "[noʊ]",
        koreanMeaning: "알다",
        definition: "to have information in your mind",
        example: "Good students know how to manage their time.",
        koreanExample: "좋은 학생들은 시간을 관리하는 법을 안다.",
        group: 1
    },
    {
        id: 9,
        word: "think",
        pronunciation: "[θɪŋk]",
        koreanMeaning: "생각하다",
        definition: "to use your mind to understand something",
        example: "Teachers want students to think carefully.",
        koreanExample: "선생님들은 학생들이 신중하게 생각하기를 원한다.",
        group: 1
    },
    {
        id: 10,
        word: "make",
        pronunciation: "[meɪk]",
        koreanMeaning: "만들다, ~하게 하다",
        definition: "to cause something to happen",
        example: "Hard work makes you successful.",
        koreanExample: "열심히 하는 것이 너를 성공하게 만든다.",
        group: 1
    },

    // ============================================
    // Group 2: 기초-중급 어휘 (초5-초6 수범)
    // ============================================
    {
        id: 11,
        word: "goal",
        pronunciation: "[ɡoʊl]",
        koreanMeaning: "목표",
        definition: "something you want to achieve",
        example: "My goal is to get better grades this year.",
        koreanExample: "내 목표는 올해 더 좋은 성적을 받는 것이다.",
        group: 2
    },
    {
        id: 12,
        word: "skill",
        pronunciation: "[skɪl]",
        koreanMeaning: "기술, 능력",
        definition: "the ability to do something well",
        example: "Reading is an important skill for students.",
        koreanExample: "읽기는 학생들에게 중요한 능력이다.",
        group: 2
    },
    {
        id: 13,
        word: "future",
        pronunciation: "[ˈfjuːtʃər]",
        koreanMeaning: "미래",
        definition: "the time that will come after now",
        example: "Education prepares you for the future.",
        koreanExample: "교육은 너를 미래를 위해 준비시킨다.",
        group: 2
    },
    {
        id: 14,
        word: "prepare",
        pronunciation: "[prɪˈper]",
        koreanMeaning: "준비하다",
        definition: "to make ready for something",
        example: "Students prepare for tests by studying.",
        koreanExample: "학생들은 공부함으로써 시험을 준비한다.",
        group: 2
    },
    {
        id: 15,
        word: "problem",
        pronunciation: "[ˈprɑːbləm]",
        koreanMeaning: "문제",
        definition: "something difficult that needs to be solved",
        example: "Math helps you solve problems.",
        koreanExample: "수학은 너가 문제를 풀도록 돕는다.",
        group: 2
    },

    // ============================================
    // Group 3: 중급 어휘 (초6-예비중1 수준)
    // ============================================
    {
        id: 16,
        word: "achieve",
        pronunciation: "[əˈtʃiːv]",
        koreanMeaning: "달성하다",
        definition: "to successfully complete or gain",
        example: "You can achieve your goals with hard work.",
        koreanExample: "너는 열심히 하면 목표를 달성할 수 있다.",
        group: 3
    },
    {
        id: 17,
        word: "standard",
        pronunciation: "[ˈstændərd]",
        koreanMeaning: "기준, 표준",
        definition: "a level of quality or achievement",
        example: "Schools have academic standards for students.",
        koreanExample: "학교는 학생들을 위한 학업 기준이 있다.",
        group: 3
    },
    {
        id: 18,
        word: "challenge",
        pronunciation: "[ˈtʃælɪndʒ]",
        koreanMeaning: "도전",
        definition: "a difficult task that tests ability",
        example: "Learning English is a challenge for many students.",
        koreanExample: "영어를 배우는 것은 많은 학생들에게 도전이다.",
        group: 3
    },
    {
        id: 19,
        word: "support",
        pronunciation: "[səˈpɔːrt]",
        koreanMeaning: "지원하다, 도움",
        definition: "to help or encourage someone",
        example: "Parents support their children's education.",
        koreanExample: "부모님은 자녀의 교육을 지원한다.",
        group: 3
    },
    {
        id: 20,
        word: "improve",
        pronunciation: "[ɪmˈpruːv]",
        koreanMeaning: "향상시키다",
        definition: "to make something better",
        example: "Reading every day improves your vocabulary.",
        koreanExample: "매일 읽는 것은 너의 어휘를 향상시킨다.",
        group: 3
    },
    {
        id: 21,
        word: "develop",
        pronunciation: "[dɪˈveləp]",
        koreanMeaning: "개발하다, 발전시키다",
        definition: "to grow or cause to grow",
        example: "Schools help students develop important skills.",
        koreanExample: "학교는 학생들이 중요한 기술을 개발하도록 돕는다.",
        group: 3
    },
    {
        id: 22,
        word: "experience",
        pronunciation: "[ɪkˈspɪriəns]",
        koreanMeaning: "경험",
        definition: "knowledge gained by doing something",
        example: "Students gain experience through practice.",
        koreanExample: "학생들은 연습을 통해 경험을 얻는다.",
        group: 3
    },
    {
        id: 23,
        word: "focus",
        pronunciation: "[ˈfoʊkəs]",
        koreanMeaning: "집중하다",
        definition: "to give attention to something",
        example: "You need to focus during class.",
        koreanExample: "너는 수업 중에 집중해야 한다.",
        group: 3
    },
    {
        id: 24,
        word: "understand",
        pronunciation: "[ˌʌndərˈstænd]",
        koreanMeaning: "이해하다",
        definition: "to know the meaning of something",
        example: "It's important to understand what you read.",
        koreanExample: "네가 읽은 것을 이해하는 것이 중요하다.",
        group: 3
    },
    {
        id: 25,
        word: "succeed",
        pronunciation: "[səkˈsiːd]",
        koreanMeaning: "성공하다",
        definition: "to achieve something you planned",
        example: "Students who work hard usually succeed.",
        koreanExample: "열심히 하는 학생들은 보통 성공한다.",
        group: 3
    },
    {
        id: 26,
        word: "expect",
        pronunciation: "[ɪkˈspekt]",
        koreanMeaning: "기대하다",
        definition: "to think that something will happen",
        example: "Teachers expect students to do their homework.",
        koreanExample: "선생님들은 학생들이 숙제를 하기를 기대한다.",
        group: 3
    },
    {
        id: 27,
        word: "require",
        pronunciation: "[rɪˈkwaɪər]",
        koreanMeaning: "요구하다",
        definition: "to need something",
        example: "Good grades require regular study.",
        koreanExample: "좋은 성적은 규칙적인 공부를 요구한다.",
        group: 3
    },
    {
        id: 28,
        word: "benefit",
        pronunciation: "[ˈbenɪfɪt]",
        koreanMeaning: "이익, 혜택",
        definition: "something that helps or improves",
        example: "Reading has many benefits for students.",
        koreanExample: "읽기는 학생들에게 많은 이익이 있다.",
        group: 3
    },
    {
        id: 29,
        word: "progress",
        pronunciation: "[ˈprɑːɡres]",
        koreanMeaning: "진보, 발전",
        definition: "movement toward a better state",
        example: "You can see your progress over time.",
        koreanExample: "너는 시간이 지나면 너의 발전을 볼 수 있다.",
        group: 3
    },
    {
        id: 30,
        word: "confident",
        pronunciation: "[ˈkɑːnfɪdənt]",
        koreanMeaning: "자신감 있는",
        definition: "feeling sure about your abilities",
        example: "Studying makes you feel more confident.",
        koreanExample: "공부하는 것은 너를 더 자신감 있게 만든다.",
        group: 3
    }
];

// 그룹별 단어 개수
const vocabularyStats = {
    total: 30,
    group1: 10,  // 기초 (초4-초5)
    group2: 5,   // 기초-중급 (초5-초6)
    group3: 15   // 중급 (초6-예비중1)
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { day1Vocabulary, vocabularyStats };
}
