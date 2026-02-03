// AWL Word Data for Day 1 (Easy Level - 난이도 하향)
const awlWords = [
    // Group 1: 학교 생활 기본 어휘 (8개)
    {
        id: 1,
        group: 1,
        word: "Student",
        pronunciation: "[ˈstuːdnt]",
        korean: "학생",
        definition: "a person who is studying at a school",
        example: "Every student should wear a school uniform.",
        exampleKorean: "모든 학생은 교복을 입어야 한다."
    },
    {
        id: 2,
        group: 1,
        word: "School",
        pronunciation: "[skuːl]",
        korean: "학교",
        definition: "a place where children go to learn",
        example: "My school has many students.",
        exampleKorean: "우리 학교에는 많은 학생들이 있다."
    },
    {
        id: 3,
        group: 1,
        word: "Uniform",
        pronunciation: "[ˈjuːnɪfɔːrm]",
        korean: "교복",
        definition: "special clothes worn by all students",
        example: "I wear my school uniform every day.",
        exampleKorean: "나는 매일 교복을 입는다."
    },
    {
        id: 4,
        group: 1,
        word: "Teacher",
        pronunciation: "[ˈtiːtʃər]",
        korean: "선생님",
        definition: "a person who teaches students",
        example: "My teacher says uniforms are important.",
        exampleKorean: "우리 선생님은 교복이 중요하다고 말씀하신다."
    },
    {
        id: 5,
        group: 1,
        word: "Rule",
        pronunciation: "[ruːl]",
        korean: "규칙",
        definition: "an instruction about what people must do",
        example: "Our school has a rule about uniforms.",
        exampleKorean: "우리 학교에는 교복에 관한 규칙이 있다."
    },
    {
        id: 6,
        group: 1,
        word: "Important",
        pronunciation: "[ɪmˈpɔːrtnt]",
        korean: "중요한",
        definition: "having great value or meaning",
        example: "Education is very important for students.",
        exampleKorean: "교육은 학생들에게 매우 중요하다."
    },
    {
        id: 7,
        group: 1,
        word: "Help",
        pronunciation: "[help]",
        korean: "돕다",
        definition: "to make something easier or better",
        example: "Uniforms can help students focus on study.",
        exampleKorean: "교복은 학생들이 공부에 집중하도록 도울 수 있다."
    },
    {
        id: 8,
        group: 1,
        word: "Same",
        pronunciation: "[seɪm]",
        korean: "같은",
        definition: "not different; exactly alike",
        example: "All students wear the same uniform.",
        exampleKorean: "모든 학생들이 같은 교복을 입는다."
    },

    // Group 2: 의견과 생각 표현 (6개)
    {
        id: 9,
        group: 2,
        word: "Think",
        pronunciation: "[θɪŋk]",
        korean: "생각하다",
        definition: "to have an opinion or belief",
        example: "I think uniforms are good for students.",
        exampleKorean: "나는 교복이 학생들에게 좋다고 생각한다."
    },
    {
        id: 10,
        group: 2,
        word: "Believe",
        pronunciation: "[bɪˈliːv]",
        korean: "믿다",
        definition: "to feel sure that something is true",
        example: "Many people believe uniforms reduce bullying.",
        exampleKorean: "많은 사람들이 교복이 괴롭힘을 줄인다고 믿는다."
    },
    {
        id: 11,
        group: 2,
        word: "Agree",
        pronunciation: "[əˈɡriː]",
        korean: "동의하다",
        definition: "to have the same opinion",
        example: "Some parents agree with the uniform policy.",
        exampleKorean: "일부 부모들은 교복 정책에 동의한다."
    },
    {
        id: 12,
        group: 2,
        word: "Disagree",
        pronunciation: "[ˌdɪsəˈɡriː]",
        korean: "반대하다",
        definition: "to have a different opinion",
        example: "Other students disagree with wearing uniforms.",
        exampleKorean: "다른 학생들은 교복 착용에 반대한다."
    },
    {
        id: 13,
        group: 2,
        word: "Opinion",
        pronunciation: "[əˈpɪnjən]",
        korean: "의견",
        definition: "what you think about something",
        example: "Everyone has a different opinion about uniforms.",
        exampleKorean: "모두가 교복에 대해 다른 의견을 가지고 있다."
    },
    {
        id: 14,
        group: 2,
        word: "Reason",
        pronunciation: "[ˈriːzn]",
        korean: "이유",
        definition: "the cause or explanation for something",
        example: "There are many reasons to wear uniforms.",
        exampleKorean: "교복을 입어야 하는 많은 이유가 있다."
    },

    // Group 3: 장단점 표현 (6개)
    {
        id: 15,
        group: 3,
        word: "Good",
        pronunciation: "[ɡʊd]",
        korean: "좋은",
        definition: "of high quality; positive",
        example: "Uniforms have many good points.",
        exampleKorean: "교복은 많은 좋은 점이 있다."
    },
    {
        id: 16,
        group: 3,
        word: "Bad",
        pronunciation: "[bæd]",
        korean: "나쁜",
        definition: "of poor quality; negative",
        example: "Some people say uniforms are bad for creativity.",
        exampleKorean: "어떤 사람들은 교복이 창의성에 나쁘다고 말한다."
    },
    {
        id: 17,
        group: 3,
        word: "Advantage",
        pronunciation: "[ədˈvæntɪdʒ]",
        korean: "장점",
        definition: "something that helps you or is good",
        example: "One advantage of uniforms is saving money.",
        exampleKorean: "교복의 한 가지 장점은 돈을 절약하는 것이다."
    },
    {
        id: 18,
        group: 3,
        word: "Disadvantage",
        pronunciation: "[ˌdɪsədˈvæntɪdʒ]",
        korean: "단점",
        definition: "something that makes things difficult",
        example: "A disadvantage is that uniforms can be expensive.",
        exampleKorean: "단점은 교복이 비쌀 수 있다는 것이다."
    },
    {
        id: 19,
        group: 3,
        word: "Problem",
        pronunciation: "[ˈprɑːbləm]",
        korean: "문제",
        definition: "something difficult that needs a solution",
        example: "The main problem is the cost of uniforms.",
        exampleKorean: "주요 문제는 교복의 비용이다."
    },
    {
        id: 20,
        group: 3,
        word: "Solution",
        pronunciation: "[səˈluːʃn]",
        korean: "해결책",
        definition: "a way to solve a problem",
        example: "One solution is to make uniforms cheaper.",
        exampleKorean: "한 가지 해결책은 교복을 더 저렴하게 만드는 것이다."
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = awlWords;
}
