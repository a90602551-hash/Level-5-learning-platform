// Writing Advanced Grammar Checker for Day 1
// 고급 문법 체크 함수들

// 1. 시제 체크 (Tense Check)
function checkTense(sentences) {
    const feedback = [];
    let score = 12;
    const fullText = sentences.join(' ').toLowerCase();

    // 현재 시제 동사 패턴
    const presentTensePatterns = [
        /\b(is|are|am)\b/g,
        /\b(has|have)\b/g,
        /\b(do|does)\b/g,
        /\b(help|helps|learn|learns|need|needs|make|makes|become|becomes)\b/g
    ];

    // 과거 시제 혼용 체크
    const pastTensePatterns = [
        /\b(was|were)\b/g,
        /\b(had)\b/g,
        /\b(did)\b/g,
        /\b(helped|learned|needed|made|became)\b/g
    ];

    let presentCount = 0;
    let pastCount = 0;

    presentTensePatterns.forEach(pattern => {
        const matches = fullText.match(pattern);
        if (matches) presentCount += matches.length;
    });

    pastTensePatterns.forEach(pattern => {
        const matches = fullText.match(pattern);
        if (matches) pastCount += matches.length;
    });

    // 시제 일관성 체크
    if (presentCount > 0 && pastCount > 0) {
        feedback.push({
            type: 'warning',
            message: '⚠️ 현재 시제와 과거 시제가 혼용되었습니다. 하나의 시제로 통일하세요.'
        });
        score -= 5;
    }

    // 각 문장별 시제 체크
    sentences.forEach((text, index) => {
        if (!text) return;
        
        const lowerText = text.toLowerCase();
        
        // 3인칭 단수 주어 + 동사원형 오류 체크
        const thirdPersonErrors = lowerText.match(/\b(student|he|she|it)\s+(learn|help|need|make|become|support|develop)\b/g);
        if (thirdPersonErrors) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 3인칭 단수 주어 뒤에 동사원형이 사용되었습니다. (예: student learn → student learns)`
            });
            score -= 3;
        }

        // 복수 주어 + s동사 오류 체크
        const pluralErrors = lowerText.match(/\b(students|they|we)\s+(learns|helps|needs|makes|becomes|supports|develops)\b/g);
        if (pluralErrors) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 복수 주어 뒤에 s가 붙은 동사가 사용되었습니다. (예: students learns → students learn)`
            });
            score -= 3;
        }
    });

    if (feedback.length === 0) {
        feedback.push({
            type: 'success',
            message: '✅ 시제가 일관되게 사용되었습니다.'
        });
    }

    return { score: Math.max(0, score), feedback };
}

// 2. 수 일치 체크 (Subject-Verb Agreement)
function checkAgreement(sentences) {
    const feedback = [];
    let score = 12;

    sentences.forEach((text, index) => {
        if (!text) return;
        
        const lowerText = text.toLowerCase();

        // 단수 주어 + are/were 오류
        const singularAreErrors = lowerText.match(/\b(student|standard|goal|problem|school|teacher)\s+(are|were)\b/g);
        if (singularAreErrors) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 단수 주어와 복수 동사의 불일치. (예: student are → student is)`
            });
            score -= 5;
        }

        // 복수 주어 + is/was 오류
        const pluralIsErrors = lowerText.match(/\b(students|standards|goals|problems|schools|teachers)\s+(is|was)\b/g);
        if (pluralIsErrors) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 복수 주어와 단수 동사의 불일치. (예: students is → students are)`
            });
            score -= 5;
        }

        // there is/are 체크
        const thereIsPlural = lowerText.match(/\bthere\s+is\s+\w+s\b/g);
        if (thereIsPlural) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: "There is" 뒤에 복수 명사가 사용되었습니다. (There is students → There are students)`
            });
            score -= 3;
        }

        const thereAreSingular = lowerText.match(/\bthere\s+are\s+a\s+\w+\b/g);
        if (thereAreSingular) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: "There are" 뒤에 단수 명사가 사용되었습니다. (There are a student → There is a student)`
            });
            score -= 3;
        }
    });

    if (feedback.length === 0) {
        feedback.push({
            type: 'success',
            message: '✅ 주어와 동사의 수가 일치합니다.'
        });
    }

    return { score: Math.max(0, score), feedback };
}

// 3. 문장 형식 준수 체크 (Basic Sentence Patterns)
function checkSentencePattern(sentences) {
    const feedback = [];
    let score = 8;

    sentences.forEach((text, index) => {
        if (!text) return;
        
        const lowerText = text.toLowerCase();

        // 주어 없는 문장 체크 (접속사로 시작하지 않는 경우)
        const startsWithVerb = lowerText.match(/^(is|are|was|were|have|has|do|does|can|should|will)\s/);
        const startsWithConjunction = lowerText.match(/^(first|also|however|therefore|for example|because|when|if|although)\b/i);
        
        if (startsWithVerb && !startsWithConjunction) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 주어 없이 동사로 시작했습니다.`
            });
            score -= 3;
        }

        // 동사 없는 문장 체크 (명사구만 있는 경우)
        const hasVerb = lowerText.match(/\b(is|are|am|was|were|have|has|had|do|does|did|can|could|will|would|should|make|makes|help|helps|learn|learns|become|becomes|feel|feels|support|supports|develop|develops|succeed|succeeds|require|requires|cause|causes)\b/);
        
        if (!hasVerb && text.split(' ').length > 3) {
            feedback.push({
                type: 'warning',
                message: `⚠️ Sentence ${index + 1}: 동사가 없는 것 같습니다. 문장을 확인하세요.`
            });
            score -= 2;
        }
    });

    if (feedback.length === 0) {
        feedback.push({
            type: 'success',
            message: '✅ 기본 문장 구조가 올바릅니다.'
        });
    }

    return { score: Math.max(0, score), feedback };
}

// 4. 타겟 문법 준수 (Target Grammar: 관계사절)
function checkTargetGrammar(sentences) {
    const feedback = [];
    let score = 15;
    const fullText = sentences.join(' ').toLowerCase();

    // 관계사절 패턴 체크
    const relativeClausePatterns = [
        /\bwho\s+\w+\s+(believe|think|say|know)\s+\w+/g,  // who + 주어 + 동사 + 동사
        /\bwhich\s+\w+\s+(believe|think|say|know)\s+\w+/g,
        /\bthat\s+\w+\s+(believe|think|say|know)\s+\w+/g,
        /\bwho\s+(work|learn|study|try|help|succeed)/g,  // 일반 관계사절
        /\bwhich\s+(is|are|has|have|provide|offer)/g,
        /\bthat\s+(is|are|has|have|provide|offer)/g
    ];

    let relativeClauseCount = 0;
    relativeClausePatterns.forEach(pattern => {
        const matches = fullText.match(pattern);
        if (matches) relativeClauseCount += matches.length;
    });

    if (relativeClauseCount === 0) {
        feedback.push({
            type: 'warning',
            message: '⚠️ Day 1 타겟 문법인 관계사절을 사용하지 않았습니다. (who, which, that를 사용해보세요)'
        });
        score -= 10;
    } else if (relativeClauseCount < 2) {
        feedback.push({
            type: 'success',
            message: `✅ 관계사절을 ${relativeClauseCount}개 사용했습니다.`
        });
        score -= 5;
    } else {
        feedback.push({
            type: 'success',
            message: `🌟 관계사절을 ${relativeClauseCount}개 사용했습니다! 문법 워크시트와 연계되었습니다.`
        });
    }

    // 관계사 오류 체크
    sentences.forEach((text, index) => {
        if (!text) return;
        
        const lowerText = text.toLowerCase();

        // who + 사물 오류
        const whoObjectError = lowerText.match(/\b(standard|school|goal|method|problem|skill)\s+who\b/g);
        if (whoObjectError) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 사물에 "who"를 사용했습니다. "which" 또는 "that"을 사용하세요.`
            });
            score -= 3;
        }

        // which + 사람 오류
        const whichPersonError = lowerText.match(/\b(student|teacher|people|person)\s+which\b/g);
        if (whichPersonError) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 사람에 "which"를 사용했습니다. "who"를 사용하세요.`
            });
            score -= 3;
        }
    });

    return { score: Math.max(0, score), feedback };
}

// 5. 준동사 준수 체크 (Verbals: to-infinitive, gerund)
function checkVerbals(sentences) {
    const feedback = [];
    let score = 10;

    sentences.forEach((text, index) => {
        if (!text) return;
        
        const lowerText = text.toLowerCase();

        // to 부정사 오류: to + 동사ing
        const toGerundError = lowerText.match(/\bto\s+(learning|helping|studying|working|trying|becoming)\b/g);
        if (toGerundError) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: "to" 뒤에 동명사(~ing)가 사용되었습니다. 동사원형을 사용하세요. (to learning → to learn)`
            });
            score -= 3;
        }

        // 동명사 필요: enjoy, finish, stop, keep 등 뒤
        const needGerund = lowerText.match(/\b(enjoy|finish|stop|keep|avoid|consider)\s+(to\s+\w+)\b/g);
        if (needGerund) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: 동명사가 필요한 동사 뒤에 to부정사를 사용했습니다. (enjoy to learn → enjoy learning)`
            });
            score -= 3;
        }

        // to부정사 필요: want, need, hope, plan 등 뒤
        const needInfinitive = lowerText.match(/\b(want|need|hope|plan|decide|expect)\s+(\w+ing)\b/g);
        if (needInfinitive) {
            feedback.push({
                type: 'error',
                message: `❌ Sentence ${index + 1}: to부정사가 필요한 동사 뒤에 동명사를 사용했습니다. (want learning → want to learn)`
            });
            score -= 3;
        }
    });

    if (feedback.length === 0) {
        feedback.push({
            type: 'success',
            message: '✅ 준동사 사용이 올바릅니다.'
        });
    }

    return { score: Math.max(0, score), feedback };
}

// 6. 수동/능동 준수 체크 (Voice)
function checkVoice(sentences) {
    const feedback = [];
    let score = 10;

    sentences.forEach((text, index) => {
        if (!text) return;
        
        const lowerText = text.toLowerCase();

        // 불필요한 수동태 체크
        const unnecessaryPassive = lowerText.match(/\b(is|are|was|were)\s+(learned|studied|improved|developed)\s+by\s+(students|people|we|I)\b/g);
        if (unnecessaryPassive) {
            feedback.push({
                type: 'warning',
                message: `⚠️ Sentence ${index + 1}: 불필요한 수동태가 사용되었습니다. 능동태로 바꾸면 더 명확합니다.`
            });
            score -= 2;
        }

        // 수동태 필요한 곳에 능동태 사용 (주어가 불명확한 경우)
        // 예: "They say that..." → "It is said that..."
        const needPassive = lowerText.match(/\b(they|people)\s+(say|believe|think|know)\s+that\b/g);
        if (needPassive) {
            feedback.push({
                type: 'info',
                message: `💡 Sentence ${index + 1}: "They say..." 대신 "It is said..."를 사용하면 더 학술적입니다.`
            });
        }

        // be동사 + 과거분사 형태는 있지만 by가 없는 경우 (상태 vs 수동)
        const passiveWithoutBy = lowerText.match(/\b(is|are|was|were)\s+(stressed|worried|challenged|prepared|supported)\b/g);
        if (passiveWithoutBy && !lowerText.includes(' by ')) {
            // 이건 정상 (상태를 나타냄)
        }
    });

    if (feedback.length === 0 || feedback.every(f => f.type === 'info')) {
        feedback.push({
            type: 'success',
            message: '✅ 태(수동/능동) 사용이 적절합니다.'
        });
    }

    return { score: Math.max(0, score), feedback };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkTense,
        checkAgreement,
        checkSentencePattern,
        checkTargetGrammar,
        checkVerbals,
        checkVoice
    };
}
