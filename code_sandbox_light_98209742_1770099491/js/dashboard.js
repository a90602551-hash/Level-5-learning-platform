// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const student = getCurrentStudent();
    
    if (!student) {
        alert('로그인이 필요합니다.');
        location.href = 'index.html';
        return;
    }
    
    document.getElementById('studentName').textContent = student.name;
    
    loadDashboardData(student);
});

async function loadDashboardData(student) {
    // AWL Test Status
    if (student.awl_test_passed) {
        document.getElementById('awlScore').textContent = student.awl_test_score + '점';
        document.getElementById('awlStatus').textContent = '합격 ✓';
        document.getElementById('awlStatus').style.color = 'var(--success-color)';
        markTaskCompleted('taskAWLTest');
    } else if (student.awl_test_score > 0) {
        document.getElementById('awlScore').textContent = student.awl_test_score + '점';
        document.getElementById('awlStatus').textContent = '재시도 필요';
        document.getElementById('awlStatus').style.color = 'var(--danger-color)';
    }
    
    // Check AWL Study Progress
    const awlStudied = localStorage.getItem('awl_studied_words');
    if (awlStudied) {
        const studiedCount = JSON.parse(awlStudied).length;
        if (studiedCount > 0) {
            markTaskCompleted('taskAWLStudy');
        }
    }
    
    // Load dictation results
    try {
        const dictResponse = await fetch(`tables/dictation_results?student_id=${student.id}`);
        if (dictResponse.ok) {
            const dictData = await dictResponse.json();
            if (dictData.data && dictData.data.length > 0) {
                const latestDict = dictData.data[dictData.data.length - 1];
                document.getElementById('dictationScore').textContent = latestDict.score + '%';
                document.getElementById('dictationStatus').textContent = '완료 ✓';
                document.getElementById('dictationStatus').style.color = 'var(--success-color)';
                markTaskCompleted('taskTopicBuilder');
            }
        }
    } catch (error) {
        console.error('Error loading dictation results:', error);
    }
    
    // Load logic map results
    try {
        const logicResponse = await fetch(`tables/logic_map_results?student_id=${student.id}`);
        if (logicResponse.ok) {
            const logicData = await logicResponse.json();
            if (logicData.data && logicData.data.length > 0) {
                document.getElementById('logicMapScore').textContent = '완료';
                document.getElementById('logicMapStatus').textContent = '제출 완료 ✓';
                document.getElementById('logicMapStatus').style.color = 'var(--success-color)';
                markTaskCompleted('taskLogicMap');
            }
        }
    } catch (error) {
        console.error('Error loading logic map results:', error);
    }
    
    // Update overall progress
    updateOverallProgress();
}

function markTaskCompleted(taskId) {
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.classList.add('completed');
    }
}

function updateOverallProgress() {
    const tasks = document.querySelectorAll('.task-item');
    const completedTasks = document.querySelectorAll('.task-item.completed');
    
    const total = tasks.length;
    const completed = completedTasks.length;
    const percentage = Math.round((completed / total) * 100);
    
    document.getElementById('overallProgress').textContent = percentage + '%';
    
    // Update step status
    const step1Tasks = [
        document.getElementById('taskAWLStudy'),
        document.getElementById('taskTopicBuilder')
    ];
    
    const step1Completed = step1Tasks.every(task => task && task.classList.contains('completed'));
    
    if (step1Completed) {
        const step1Status = document.querySelector('#statusStep1Home .status-dot');
        if (step1Status) {
            step1Status.classList.remove('pending');
            step1Status.classList.add('completed');
        }
    }
    
    const step2Tasks = [
        document.getElementById('taskAWLTest'),
        document.getElementById('taskReading'),
        document.getElementById('taskListening'),
        document.getElementById('taskLogicMap')
    ];
    
    const step2Completed = step2Tasks.every(task => task && task.classList.contains('completed'));
    const step2InProgress = step2Tasks.some(task => task && task.classList.contains('completed'));
    
    const step2Status = document.querySelector('#statusStep2Booth .status-dot');
    if (step2Status) {
        if (step2Completed) {
            step2Status.classList.remove('pending', 'in-progress');
            step2Status.classList.add('completed');
        } else if (step2InProgress) {
            step2Status.classList.remove('pending');
            step2Status.classList.add('in-progress');
        }
    }
}
