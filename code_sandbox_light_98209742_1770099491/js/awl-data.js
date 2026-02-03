// AWL Word Data for Day 1
const awlWords = [
    // Group 1: 사회경제 및 격차 논리
    {
        id: 1,
        group: 1,
        word: "Controversial",
        pronunciation: "[kɒntrəˈvɜːʃl]",
        korean: "논란이 많은",
        definition: "causing much public disagreement",
        example: "School uniforms are a highly controversial topic.",
        exampleKorean: "교복은 매우 논란이 많은 주제이다."
    },
    {
        id: 2,
        group: 1,
        word: "Socioeconomic",
        pronunciation: "[ˌsoʊsioʊˌekəˈnɑːmɪk]",
        korean: "사회경제적인",
        definition: "relating to social and economic factors",
        example: "Uniforms can reduce socioeconomic barriers.",
        exampleKorean: "교복은 사회경제적 장벽을 줄일 수 있다."
    },
    {
        id: 3,
        group: 1,
        word: "Barrier",
        pronunciation: "[ˈbæriər]",
        korean: "장벽",
        definition: "a circumstance or obstacle that keeps people apart",
        example: "Education helps break down social barriers.",
        exampleKorean: "교육은 사회적 장벽을 허무는 데 도움이 된다."
    },
    {
        id: 4,
        group: 1,
        word: "Divide",
        pronunciation: "[dɪˈvaɪd]",
        korean: "격차, 분할",
        definition: "a wide difference between two groups",
        example: "The economic divide between rich and poor is growing.",
        exampleKorean: "부유층과 빈곤층 사이의 경제적 격차가 커지고 있다."
    },
    {
        id: 5,
        group: 1,
        word: "Inequality",
        pronunciation: "[ˌɪnɪˈkwɑːləti]",
        korean: "불평등",
        definition: "difference in size, degree, or circumstances",
        example: "Income inequality is a major social issue.",
        exampleKorean: "소득 불평등은 주요한 사회 문제이다."
    },
    {
        id: 6,
        group: 1,
        word: "Affiliation",
        pronunciation: "[əˌfɪliˈeɪʃn]",
        korean: "소속, 제휴",
        definition: "official connection to a group or organization",
        example: "His political affiliation is well known.",
        exampleKorean: "그의 정치적 소속은 잘 알려져 있다."
    },
    {
        id: 7,
        group: 1,
        word: "Conceal",
        pronunciation: "[kənˈsiːl]",
        korean: "숨기다",
        definition: "to keep from sight; hide",
        example: "Uniforms can conceal differences in wealth.",
        exampleKorean: "교복은 부의 차이를 숨길 수 있다."
    },
    {
        id: 8,
        group: 1,
        word: "Level the playing field",
        pronunciation: "[ˈlevl ðə ˈpleɪɪŋ fiːld]",
        korean: "공정한 경쟁 환경을 만들다",
        definition: "to create a situation where everyone has the same opportunities",
        example: "New policies aim to level the playing field for all students.",
        exampleKorean: "새로운 정책은 모든 학생들에게 공정한 경쟁 환경을 만드는 것을 목표로 한다."
    },
    {
        id: 9,
        group: 1,
        word: "Financial burden",
        pronunciation: "[faɪˈnænʃl ˈbɜːrdn]",
        korean: "경제적 부담",
        definition: "a heavy cost or responsibility related to money",
        example: "College tuition is a significant financial burden for families.",
        exampleKorean: "대학 등록금은 가족들에게 상당한 경제적 부담이다."
    },
    {
        id: 10,
        group: 1,
        word: "Significant",
        pronunciation: "[sɪɡˈnɪfɪkənt]",
        korean: "상당한, 중요한",
        definition: "great or important enough to be worthy of attention",
        example: "There has been a significant improvement in test scores.",
        exampleKorean: "시험 점수에 상당한 향상이 있었다."
    },

    // Group 2: 개성, 순응 및 사회적 가치
    {
        id: 11,
        group: 2,
        word: "Individuality",
        pronunciation: "[ˌɪndɪˌvɪdʒuˈæləti]",
        korean: "개성",
        definition: "the quality that makes a person different from others",
        example: "Students should be encouraged to express their individuality.",
        exampleKorean: "학생들은 자신의 개성을 표현하도록 격려받아야 한다."
    },
    {
        id: 12,
        group: 2,
        word: "Self-expression",
        pronunciation: "[ˌself ɪkˈspreʃn]",
        korean: "자기표현",
        definition: "the expression of one's feelings or thoughts",
        example: "Art provides an outlet for self-expression.",
        exampleKorean: "예술은 자기표현의 출구를 제공한다."
    },
    {
        id: 13,
        group: 2,
        word: "Indicate",
        pronunciation: "[ˈɪndɪkeɪt]",
        korean: "나타내다, 암시하다",
        definition: "to point out or show",
        example: "The data indicates a positive trend.",
        exampleKorean: "데이터는 긍정적인 추세를 나타낸다."
    },
    {
        id: 14,
        group: 2,
        word: "Punitive",
        pronunciation: "[ˈpjuːnətɪv]",
        korean: "응징적인, 가혹한",
        definition: "intended as punishment",
        example: "The school implemented punitive measures for dress code violations.",
        exampleKorean: "학교는 복장 규정 위반에 대해 응징적 조치를 시행했다."
    },
    {
        id: 15,
        group: 2,
        word: "Exclusively",
        pronunciation: "[ɪkˈskluːsɪvli]",
        korean: "독점적으로, 오로지",
        definition: "limited to a specific person or group",
        example: "This area is exclusively for staff members.",
        exampleKorean: "이 구역은 오로지 직원들만을 위한 것이다."
    },
    {
        id: 16,
        group: 2,
        word: "Proponent",
        pronunciation: "[prəˈpoʊnənt]",
        korean: "찬성론자",
        definition: "a person who advocates a theory or proposal",
        example: "Proponents of school uniforms argue they improve discipline.",
        exampleKorean: "교복 찬성론자들은 교복이 훈육을 향상시킨다고 주장한다."
    },
    {
        id: 17,
        group: 2,
        word: "Opponent",
        pronunciation: "[əˈpoʊnənt]",
        korean: "반대론자",
        definition: "someone who competes against or fights another",
        example: "Opponents of the policy believe it limits freedom.",
        exampleKorean: "그 정책의 반대론자들은 그것이 자유를 제한한다고 믿는다."
    },
    {
        id: 18,
        group: 2,
        word: "Enhance",
        pronunciation: "[ɪnˈhæns]",
        korean: "강화하다, 향상시키다",
        definition: "to intensify or increase the quality of",
        example: "Technology can enhance the learning experience.",
        exampleKorean: "기술은 학습 경험을 향상시킬 수 있다."
    },
    {
        id: 19,
        group: 2,
        word: "Conformity",
        pronunciation: "[kənˈfɔːrməti]",
        korean: "순응",
        definition: "compliance with standards, rules, or laws",
        example: "The debate centers on conformity versus individuality.",
        exampleKorean: "논쟁은 순응 대 개성을 중심으로 한다."
    },
    {
        id: 20,
        group: 2,
        word: "Authority",
        pronunciation: "[əˈθɔːrəti]",
        korean: "권위, 당국",
        definition: "the power to give orders and enforce obedience",
        example: "Students should learn to respect authority.",
        exampleKorean: "학생들은 권위를 존중하는 법을 배워야 한다."
    },

    // Group 3: 교육적 성과 및 논증 분석
    {
        id: 21,
        group: 3,
        word: "Outcome",
        pronunciation: "[ˈaʊtkʌm]",
        korean: "결과",
        definition: "the way a thing turns out; a consequence",
        example: "The outcome of the experiment was unexpected.",
        exampleKorean: "실험의 결과는 예상치 못한 것이었다."
    },
    {
        id: 22,
        group: 3,
        word: "Distraction",
        pronunciation: "[dɪˈstrækʃn]",
        korean: "방해 요소",
        definition: "a thing that prevents someone from giving full attention",
        example: "Smartphones can be a major distraction in class.",
        exampleKorean: "스마트폰은 수업 중 주요한 방해 요소가 될 수 있다."
    },
    {
        id: 23,
        group: 3,
        word: "Appearance",
        pronunciation: "[əˈpɪrəns]",
        korean: "외모, 겉모습",
        definition: "the way that someone or something looks",
        example: "Don't judge people by their appearance.",
        exampleKorean: "사람을 외모로 판단하지 마라."
    },
    {
        id: 24,
        group: 3,
        word: "Enforce",
        pronunciation: "[ɪnˈfɔːrs]",
        korean: "집행하다, 강요하다",
        definition: "to compel observance of a law or rule",
        example: "The school strictly enforces its uniform policy.",
        exampleKorean: "학교는 교복 정책을 엄격히 집행한다."
    },
    {
        id: 25,
        group: 3,
        word: "Measurable",
        pronunciation: "[ˈmeʒərəbl]",
        korean: "측정 가능한",
        definition: "able to be measured; significant",
        example: "The program showed measurable improvements in literacy.",
        exampleKorean: "그 프로그램은 문해력에서 측정 가능한 향상을 보여주었다."
    },
    {
        id: 26,
        group: 3,
        word: "Utility",
        pronunciation: "[juːˈtɪləti]",
        korean: "유용성",
        definition: "the state of being useful, profitable, or beneficial",
        example: "The utility of this tool is undeniable.",
        exampleKorean: "이 도구의 유용성은 부인할 수 없다."
    },
    {
        id: 27,
        group: 3,
        word: "Assert",
        pronunciation: "[əˈsɜːrt]",
        korean: "주장하다",
        definition: "to state a fact or belief confidently and forcefully",
        example: "She asserted her right to free speech.",
        exampleKorean: "그녀는 언론의 자유에 대한 자신의 권리를 주장했다."
    },
    {
        id: 28,
        group: 3,
        word: "Emphasis",
        pronunciation: "[ˈemfəsɪs]",
        korean: "강조",
        definition: "special importance, value, or prominence given to something",
        example: "The teacher placed emphasis on critical thinking.",
        exampleKorean: "교사는 비판적 사고에 강조를 두었다."
    },
    {
        id: 29,
        group: 3,
        word: "Reinforce",
        pronunciation: "[ˌriːɪnˈfɔːrs]",
        korean: "강화하다",
        definition: "to strengthen or support",
        example: "Practice will reinforce what you've learned.",
        exampleKorean: "연습은 당신이 배운 것을 강화할 것이다."
    },
    {
        id: 30,
        group: 3,
        word: "Prospect",
        pronunciation: "[ˈprɑːspekt]",
        korean: "전망, 가능성",
        definition: "the possibility or likelihood of some future event occurring",
        example: "The prospect of success motivated the team.",
        exampleKorean: "성공의 전망이 팀에게 동기를 부여했다."
    }
];

// Group names for reference
const groupNames = {
    1: "사회경제 및 격차 논리",
    2: "개성, 순응 및 사회적 가치",
    3: "교육적 성과 및 논증 분석"
};
