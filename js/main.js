/* ============================================================================
   ZABDESK Faculty Portal - Main JavaScript
   ============================================================================
   
   This file contains:
   - Mock data for courses and users
   - Navigation functions
   - UI interactions and event handlers
   ============================================================================ */

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Mock user accounts for login
 * In a real system, this would be handled by authentication backend
 */
const mockUsers = [
    {
        id: 'FAC001',
        password: 'password123',
        name: 'Dr. Ahmed Hassan',
        email: 'ahmed.hassan@university.edu',
        contact: '+92-51-4863363-434',
        consultationTime: 'Thursday, 08:45 - 10:45',
        role: 'faculty'
    },
    {
        id: 'FAC002',
        password: 'password456',
        name: 'Prof. Sarah Khan',
        email: 'sarah.khan@university.edu',
        contact: '+92-21-35800000',
        consultationTime: 'Monday, 11:00 - 12:30',
        role: 'faculty'
    }
];

/**
 * Mock courses assigned to faculty
 * Each course includes: code, title, semester, students count, status
 */
const mockCourses = [
    {
        id: 1,
        code: 'CS101',
        shortName: 'FOP',
        title: 'Fundamentals of Programming',
        semester: 'Fall 2024',
        instructor: 'Dr. Ahmed Hassan',
        className: 'BCS/BS-1 (D)',
        classTiming: '2:00 - 3:30 , 8:00 - 9:30 ORIC Hall',
        sessionDays: 'Wednesday , Friday',
        creditHours: '3/class hours(per week) | 1/lab hours(per week)',
        prerequisites: '—'
    },
    {
        id: 2,
        code: 'CS201',
        shortName: 'OOP',
        title: 'Object-Oriented Programming',
        semester: 'Fall 2024',
        instructor: 'Dr. Ahmed Hassan',
        className: 'BCS/BS-1 (D)',
        classTiming: '10:00 - 11:30 , 2:00 - 3:30 Lab-01',
        sessionDays: 'Tuesday , Thursday',
        creditHours: '3/class hours(per week)',
        prerequisites: 'CS101'
    },
    {
        id: 3,
        code: 'MATH301',
        shortName: 'DM',
        title: 'Discrete Mathematics',
        semester: 'Fall 2024',
        instructor: 'Dr. Ahmed Hassan',
        className: 'BCS/BS-1 (D)',
        classTiming: '11:30 - 1:00 Auditorium',
        sessionDays: 'Monday , Wednesday',
        creditHours: '3/class hours(per week)',
        prerequisites: 'None'
    },
    {
        id: 4,
        code: 'CS202',
        shortName: 'DSA',
        title: 'Data Structures and Algorithms',
        semester: 'Fall 2024',
        instructor: 'Dr. Ahmed Hassan',
        className: 'BCS/BS-1 (D)',
        classTiming: '8:00 - 9:30 ORIC Hall',
        sessionDays: 'Monday , Thursday',
        creditHours: '3/class hours(per week)',
        prerequisites: 'CS201'
    },
    {
        id: 5,
        code: 'CS401',
        shortName: 'DBMS',
        title: 'Database Management Systems',
        semester: 'Spring 2025',
        instructor: 'Dr. Ahmed Hassan',
        className: 'BCS/BS-1 (D)',
        classTiming: '9:45 - 11:15 Lab-02',
        sessionDays: 'Wednesday , Friday',
        creditHours: '3/class hours(per week) | 1/lab hours(per week)',
        prerequisites: 'CS202'
    },
    {
        id: 6,
        code: 'CS301',
        shortName: 'WD',
        title: 'Web Development',
        semester: 'Spring 2025',
        instructor: 'Dr. Ahmed Hassan',
        className: 'BCS/BS-1 (D)',
        classTiming: '1:30 - 3:00 Innovation Lab',
        sessionDays: 'Tuesday , Thursday',
        creditHours: '2/class hours(per week) | 2/lab hours(per week)',
        prerequisites: 'CS101'
    }
];

const defaultLectureProgress = [
    { lectureNo: 1, date: '2025-09-15', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Introduction to Computer Programming, Introduction to Problem Solving, Evolution of Programming Languages, Structured Programming' },
    { lectureNo: 2, date: '2025-09-17', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Structured Programming vs Modular Programming, Brief review of Von-Neumann Architecture' },
    { lectureNo: 3, date: '2025-09-23', startTime: '10:00', endTime: '11:30', status: 'Held', hours: '01:30', topics: 'Processing of C++ Program, Role of compiler and linker, Flowcharts, Types of Flowchart, Introduction to Code Blocks and C++ Environment' },
    { lectureNo: 4, date: '2025-09-24', startTime: '11:00', endTime: '12:30', status: 'Held', hours: '01:30', topics: 'Data Types, Variables and Naming Conventions, Input function usage, Output formatting' },
    { lectureNo: 5, date: '2025-09-26', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Arithmetic, Logical and Relational Operators, Introduction to Algorithms' },
    { lectureNo: 6, date: '2025-09-29', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Conditional Statements and execution flow for conditional statements' },
    { lectureNo: 7, date: '2025-10-01', startTime: '11:00', endTime: '12:30', status: 'Held', hours: '01:30', topics: 'Control Structures: if...else, Nested if...else...else' },
    { lectureNo: 8, date: '2025-10-06', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Control Structures: Nested if...else...else, Switch statements vs if...else ladder' },
    { lectureNo: 9, date: '2025-10-08', startTime: '11:00', endTime: '12:30', status: 'Held', hours: '01:30', topics: 'Control Structures: Introduction to Loop, While, do While Loop, Nested while and do while loop' },
    { lectureNo: 10, date: '2025-10-13', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Control Structures: for Loop, Nested for Loop, for Loop vs While Loop' },
    { lectureNo: 11, date: '2025-10-20', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Control Structures: for Loop, Nested for Loop, for Loop vs While Loop (Exercises)' },
    { lectureNo: 12, date: '2025-10-22', startTime: '11:00', endTime: '12:30', status: 'Held', hours: '01:30', topics: 'Introduction to User Defined Functions: void Functions' },
    { lectureNo: 13, date: '2025-10-27', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Void Functions, Value Returning Functions, Return Statements, Parameters' },
    { lectureNo: 14, date: '2025-10-29', startTime: '11:00', endTime: '12:30', status: 'Held', hours: '01:30', topics: 'Function Overloading, Mid Term Review' },
    { lectureNo: 15, date: '2025-11-04', startTime: '08:30', endTime: '10:00', status: 'Held', hours: '01:30', topics: 'Mid Term Exam' },
    { lectureNo: 16, date: '2025-11-10', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Introduction to Arrays, Indexing, Initialization of Char Arrays' },
    { lectureNo: 17, date: '2025-11-17', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Multidimensional Arrays, Dynamic Arrays' },
    { lectureNo: 18, date: '2025-11-24', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Function Overloading with Arrays, Review for Withdraw cases' },
    { lectureNo: 19, date: '2025-11-26', startTime: '11:00', endTime: '12:30', status: 'Held', hours: '01:30', topics: 'String Functions in C++, Stacks using Arrays' },
    { lectureNo: 20, date: '2025-12-01', startTime: '08:00', endTime: '09:30', status: 'Held', hours: '01:30', topics: 'Array Searching, Sorting Algorithms (Insertion, Selection, Bubble, Merge)' }
];

const mockLectureProgress = {
    1: defaultLectureProgress,
    2: defaultLectureProgress,
    3: defaultLectureProgress,
    4: defaultLectureProgress,
    5: defaultLectureProgress,
    6: defaultLectureProgress,
    default: defaultLectureProgress
};

/**
 * Mock roles in the system
 */
const mockRoles = [
    {
        id: 'faculty',
        name: 'Faculty',
        icon: '👨‍🏫',
        description: 'Manage courses, assignments, and student progress',
        enabled: true
    },
    {
        id: 'student',
        name: 'Student',
        icon: '👨‍🎓',
        description: 'View courses, submit assignments, and check grades',
        enabled: false
    },
    {
        id: 'admin',
        name: 'Administrator',
        icon: '⚙️',
        description: 'System administration and user management',
        enabled: false
    }
];

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Get the current logged-in user from session storage
 * @returns {Object|null} User object or null if not logged in
 */
function getCurrentUser() {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

/**
 * Set the current user in session storage
 * @param {Object} user - User object to store
 */
function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * Clear the session (logout)
 */
function clearSession() {
    sessionStorage.removeItem('currentUser');
}

// ============================================================================
// LOGIN PAGE FUNCTIONS
// ============================================================================

/**
 * Handle login form submission
 * @param {Event} event - Form submit event
 */
function handleLogin(event) {
    event.preventDefault();

    // Get form values
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    // Validate against mock users
    const user = mockUsers.find(u => u.id === userId && u.password === password);

    if (user) {
        // Store user in session
        setCurrentUser(user);
        
        // Redirect to role selection page
        window.location.href = 'roles.html';
    } else {
        // Show error message
        alert('Invalid User ID or Password. Please try again.');
        document.getElementById('password').value = '';
    }
}

// ============================================================================
// ROLE SELECTION PAGE FUNCTIONS
// ============================================================================

/**
 * Handle role selection
 * @param {string} roleName - The role selected by user
 */
function selectRole(roleName) {
    const role = mockRoles.find(r => r.id === roleName);

    if (!role.enabled) {
        alert('This role is not available yet. Please select Faculty.');
        return;
    }

    // Store selected role in session
    sessionStorage.setItem('selectedRole', roleName);

    // Navigate based on role
    if (roleName === 'faculty') {
        window.location.href = 'faculty-courses.html';
    } else if (roleName === 'student') {
        window.location.href = 'student-dashboard.html';
    } else if (roleName === 'admin') {
        window.location.href = 'admin-dashboard.html';
    }
}

// ============================================================================
// FACULTY COURSES PAGE FUNCTIONS
// ============================================================================

/**
 * Display all courses assigned to the faculty
 * This function populates the simple courses list
 */
function displayFacultyCourses() {
    const coursesList = document.getElementById('coursesList');

    if (!coursesList) {
        console.warn('Course list container not found');
        return;
    }

    // Clear existing courses
    coursesList.innerHTML = '';

    // Create course rows for each course
    mockCourses.forEach(course => {
        const courseRow = createCourseRow(course);
        coursesList.appendChild(courseRow);
    });
}

/**
 * Create a compact course row element
 * @param {Object} course - Course object
 * @returns {HTMLElement} Course row element
 */
function createCourseRow(course) {
    const row = document.createElement('div');
    row.className = 'course-row';
    row.dataset.courseId = course.id;

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'course-button-wrapper';

    const actionButton = document.createElement('button');
    actionButton.type = 'button';
    actionButton.className = 'course-code-btn';
    actionButton.textContent = `${course.shortName || course.code} (${course.code})`;
    actionButton.addEventListener('click', () => openCourseShell(course));

    buttonWrapper.appendChild(actionButton);

    const infoBlock = document.createElement('div');
    infoBlock.className = 'course-info-block';
    infoBlock.innerHTML = `
        <div class="course-short">${course.shortName || course.code}</div>
        <div class="course-title">${course.title}</div>
        <div class="course-meta"><span>Semester:</span>${course.semester}</div>
        <div class="course-meta"><span>Faculty:</span>${course.instructor}</div>
    `;

    row.appendChild(buttonWrapper);
    row.appendChild(infoBlock);

    return row;
}

/**
 * Placeholder redirect for course button
 * @param {Object} course - Course object
 */
function openCourseShell(course) {
    const target = `course-hub.html?courseId=${course.id}`;
    window.location.href = target;
}

// ============================================================================
// NAVIGATION AND LOGOUT FUNCTIONS
// ============================================================================

/**
 * Handle logout action
 */
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        clearSession();
        sessionStorage.removeItem('selectedRole');
        window.location.href = 'index.html';
    }
}

/**
 * Check if user is authenticated
 * If not, redirect to login page
 */
function checkAuthentication() {
    const currentUser = getCurrentUser();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Allow index.html without authentication
    if (currentPage === 'index.html' || currentPage === '') {
        return;
    }

    // Redirect to login if not authenticated
    if (!currentUser) {
        window.location.href = 'index.html';
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format date to readable format
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatLectureDateParts(dateString) {
    if (!dateString) {
        return { top: '—', bottom: '' };
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return { top: dateString, bottom: '' };
    }
    const top = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const bottom = date.getFullYear();
    return { top, bottom };
}

/**
 * Extract program and section from class name string like "BCS/BS-1 (D)"
 * @param {string} className
 * @returns {{program: string, section: string}}
 */
function extractProgramAndSection(className) {
    if (!className) {
        return { program: '—', section: '—' };
    }
    const match = className.match(/^(.*?)(?:\(([^)]+)\))?$/);
    if (match) {
        return {
            program: match[1].trim() || '—',
            section: match[2] ? match[2].trim() : '—'
        };
    }
    return { program: className, section: '—' };
}

/**
 * Get initials for avatar badges
 * @param {string} name - Full name string
 * @returns {string} Initials
 */
function getInitials(name = '') {
    const initials = name
        .split(' ')
        .filter(Boolean)
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    return initials || 'FM';
}

/**
 * Get course statistics
 * @returns {Object} Statistics object
 */
function getCourseStatistics() {
    return {
        totalCourses: mockCourses.length
    };
}

function getLectureProgressForCourse(courseId) {
    if (courseId && mockLectureProgress[courseId]) {
        return mockLectureProgress[courseId];
    }
    return mockLectureProgress.default || [];
}

function parseHoursToMinutes(value) {
    if (!value) {
        return 0;
    }
    const [hours = '0', minutes = '0'] = value.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

function formatTotalMinutes(totalMinutes) {
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const minutes = String(totalMinutes % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * Get a query parameter value from current URL
 * @param {string} key - query key
 * @returns {string|null}
 */
function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

/**
 * Populate the course outline page with dynamic data
 */
function populateCourseOutlinePage() {
    const facultyNameEl = document.getElementById('outlineFacultyName');
    if (!facultyNameEl) {
        return;
    }

    const instructorEl = document.getElementById('outlineInstructor');
    const semesterEl = document.getElementById('outlineSemester');
    const courseTitleEl = document.getElementById('outlineCourseTitle');
    const classNameEl = document.getElementById('outlineClassName');
    const classTimingEl = document.getElementById('outlineClassTiming');
    const sessionDaysEl = document.getElementById('outlineSessionDays');
    const creditHoursEl = document.getElementById('outlineCreditHours');
    const prerequisitesEl = document.getElementById('outlinePrerequisites');
    const consultationEl = document.getElementById('outlineConsultation');
    const emailEl = document.getElementById('outlineEmail');
    const contactEl = document.getElementById('outlineContact');
    const sidebarNameEl = document.getElementById('outlineSidebarName');
    const sidebarInitialsEl = document.getElementById('outlineSidebarInitials');
    const sidebarEmailEl = document.getElementById('outlineSidebarEmail');
    const sidebarContactEl = document.getElementById('outlineSidebarContact');
    const sidebarConsultationEl = document.getElementById('outlineSidebarConsultation');

    const currentUser = getCurrentUser();
    if (currentUser) {
        facultyNameEl.textContent = currentUser.name;
        if (instructorEl) {
            instructorEl.textContent = currentUser.name;
        }
        if (emailEl) {
            emailEl.textContent = currentUser.email;
        }
        if (consultationEl && currentUser.consultationTime) {
            consultationEl.textContent = currentUser.consultationTime;
        }
        if (contactEl && currentUser.contact) {
            contactEl.textContent = currentUser.contact;
        }
        if (sidebarNameEl) {
            sidebarNameEl.textContent = currentUser.name;
        }
        if (sidebarInitialsEl) {
            sidebarInitialsEl.textContent = getInitials(currentUser.name);
        }
        if (sidebarEmailEl) {
            sidebarEmailEl.textContent = currentUser.email;
        }
        if (sidebarContactEl) {
            sidebarContactEl.textContent = currentUser.contact;
        }
        if (sidebarConsultationEl) {
            sidebarConsultationEl.textContent = currentUser.consultationTime || '—';
        }
    }

    const courseIdParam = getQueryParam('courseId');
    let selectedCourse = null;
    if (courseIdParam) {
        selectedCourse = mockCourses.find(course => String(course.id) === courseIdParam);
    }
    if (!selectedCourse && mockCourses.length) {
        selectedCourse = mockCourses[0];
    }

    if (selectedCourse) {
        if (courseTitleEl) {
            courseTitleEl.textContent = `${selectedCourse.code} ${selectedCourse.title}`;
        }
        if (semesterEl) {
            semesterEl.textContent = selectedCourse.semester;
        }
        if (classNameEl && selectedCourse.className) {
            classNameEl.textContent = selectedCourse.className;
        }
        if (classTimingEl && selectedCourse.classTiming) {
            classTimingEl.textContent = selectedCourse.classTiming;
        }
        if (sessionDaysEl && selectedCourse.sessionDays) {
            sessionDaysEl.textContent = selectedCourse.sessionDays;
        }
        if (creditHoursEl && selectedCourse.creditHours) {
            creditHoursEl.textContent = selectedCourse.creditHours;
        }
        if (prerequisitesEl && selectedCourse.prerequisites) {
            prerequisitesEl.textContent = selectedCourse.prerequisites;
        }
        if (!currentUser && instructorEl) {
            instructorEl.textContent = selectedCourse.instructor;
            if (sidebarNameEl) {
                sidebarNameEl.textContent = selectedCourse.instructor;
            }
            if (sidebarInitialsEl) {
                sidebarInitialsEl.textContent = getInitials(selectedCourse.instructor);
            }
        }
        if (!currentUser && sidebarEmailEl) {
            sidebarEmailEl.textContent = selectedCourse.instructorEmail || '—';
        }
        if (!currentUser && sidebarContactEl) {
            sidebarContactEl.textContent = selectedCourse.instructorContact || '—';
        }
        if (!currentUser && sidebarConsultationEl) {
            sidebarConsultationEl.textContent = selectedCourse.consultationTime || '—';
        }

        const outlineBtn = document.getElementById('outlineNavBtn');
        const progressBtn = document.getElementById('progressNavBtn');
        const outlineTarget = `course-outline.html?courseId=${selectedCourse.id}`;
        const progressTarget = `post-class-progress.html?courseId=${selectedCourse.id}`;

        if (outlineBtn) {
            outlineBtn.addEventListener('click', () => {
                window.location.href = outlineTarget;
            });
        }

        if (progressBtn) {
            progressBtn.addEventListener('click', () => {
                window.location.href = progressTarget;
            });
        }
    }
}

function populateLectureProgressPage() {
    const facultyNameEl = document.getElementById('progressFacultyName');
    if (!facultyNameEl) {
        return;
    }

    const semesterEl = document.getElementById('progressSemester');
    const programEl = document.getElementById('progressProgram');
    const sectionEl = document.getElementById('progressSection');
    const courseTitleEl = document.getElementById('progressCourseTitle');
    const instructorEl = document.getElementById('progressInstructor');
    const tableBody = document.getElementById('lectureTableBody');
    const totalHoursEl = document.getElementById('progressTotalHours');

    const sidebarNameEl = document.getElementById('progressSidebarName');
    const sidebarInitialsEl = document.getElementById('progressSidebarInitials');
    const sidebarEmailEl = document.getElementById('progressSidebarEmail');
    const sidebarContactEl = document.getElementById('progressSidebarContact');
    const sidebarConsultationEl = document.getElementById('progressSidebarConsultation');

    const currentUser = getCurrentUser();
    if (currentUser) {
        facultyNameEl.textContent = currentUser.name;
        instructorEl.textContent = currentUser.name;
        if (sidebarNameEl) {
            sidebarNameEl.textContent = currentUser.name;
        }
        if (sidebarInitialsEl) {
            sidebarInitialsEl.textContent = getInitials(currentUser.name);
        }
        if (sidebarEmailEl) {
            sidebarEmailEl.textContent = currentUser.email;
        }
        if (sidebarContactEl) {
            sidebarContactEl.textContent = currentUser.contact;
        }
        if (sidebarConsultationEl) {
            sidebarConsultationEl.textContent = currentUser.consultationTime || '—';
        }
    }

    const courseIdParam = getQueryParam('courseId');
    let selectedCourse = null;
    if (courseIdParam) {
        selectedCourse = mockCourses.find(course => String(course.id) === courseIdParam);
    }
    if (!selectedCourse && mockCourses.length) {
        selectedCourse = mockCourses[0];
    }

    if (!selectedCourse) {
        return;
    }

    if (semesterEl) {
        semesterEl.textContent = selectedCourse.semester;
    }
    if (courseTitleEl) {
        courseTitleEl.textContent = selectedCourse.title;
    }

    const { program, section } = extractProgramAndSection(selectedCourse.className || '');
    if (programEl) {
        programEl.textContent = program;
    }
    if (sectionEl) {
        sectionEl.textContent = section;
    }

    if (!currentUser && instructorEl) {
        instructorEl.textContent = selectedCourse.instructor;
        if (sidebarNameEl) {
            sidebarNameEl.textContent = selectedCourse.instructor;
        }
        if (sidebarInitialsEl) {
            sidebarInitialsEl.textContent = getInitials(selectedCourse.instructor);
        }
    }

    const lectures = getLectureProgressForCourse(selectedCourse.id);
    if (tableBody) {
        tableBody.innerHTML = '';
        let totalMinutes = 0;
        lectures.forEach(lecture => {
            totalMinutes += parseHoursToMinutes(lecture.hours);
            const { top, bottom } = formatLectureDateParts(lecture.date);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lecture.lectureNo}</td>
                <td><div class="date-stack"><span>${top}</span><span>${bottom}</span></div></td>
                <td>${lecture.startTime}</td>
                <td>${lecture.endTime}</td>
                <td>${lecture.status}</td>
                <td>${lecture.hours}</td>
            `;
            tableBody.appendChild(row);

            const topicsRow = document.createElement('tr');
            topicsRow.className = 'topics-row';
            topicsRow.innerHTML = `
                <td colspan="6" class="topic-cell"><span>Topics Covered:</span> ${lecture.topics}</td>
            `;
            tableBody.appendChild(topicsRow);
        });

        if (totalHoursEl) {
            totalHoursEl.textContent = formatTotalMinutes(totalMinutes);
        }
    }

    const outlineBtn = document.getElementById('outlineNavBtn');
    const progressBtn = document.getElementById('progressNavBtn');
    const outlineTarget = `course-outline.html?courseId=${selectedCourse.id}`;
    const progressTarget = `post-class-progress.html?courseId=${selectedCourse.id}`;

    if (outlineBtn) {
        outlineBtn.addEventListener('click', () => {
            window.location.href = outlineTarget;
        });
    }

    if (progressBtn) {
        progressBtn.addEventListener('click', () => {
            window.location.href = progressTarget;
        });
    }

    const nextLectureForm = document.getElementById('nextLectureForm');
    if (nextLectureForm) {
        nextLectureForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Lecture progress submission is not wired to the backend in this demo.');
        });
    }
}

/**
 * Populate the intermediate course hub page
 */
function populateCourseHubPage() {
    const courseTitleEl = document.getElementById('hubCourseTitle');
    if (!courseTitleEl) {
        return;
    }

    const codeEl = document.getElementById('hubCourseCode');
    const semesterEl = document.getElementById('hubCourseSemester');
    const classEl = document.getElementById('hubCourseClass');
    const timingEl = document.getElementById('hubClassTiming');
    const daysEl = document.getElementById('hubSessionDays');
    const creditEl = document.getElementById('hubCreditHours');
    const prereqEl = document.getElementById('hubPrerequisites');

    const facultyNameEl = document.getElementById('hubFacultyName');
    const facultyInitialsEl = document.getElementById('hubFacultyInitials');
    const facultyEmailEl = document.getElementById('hubFacultyEmail');
    const facultyContactEl = document.getElementById('hubFacultyContact');
    const consultationEl = document.getElementById('hubConsultationTime');

    const currentUser = getCurrentUser();
    if (currentUser) {
        if (facultyNameEl) {
            facultyNameEl.textContent = currentUser.name;
        }
        if (facultyInitialsEl) {
            facultyInitialsEl.textContent = getInitials(currentUser.name);
        }
        if (facultyEmailEl) {
            facultyEmailEl.textContent = currentUser.email;
        }
        if (facultyContactEl) {
            facultyContactEl.textContent = currentUser.contact;
        }
        if (consultationEl) {
            consultationEl.textContent = currentUser.consultationTime || '—';
        }
    }

    const courseIdParam = getQueryParam('courseId');
    let selectedCourse = null;
    if (courseIdParam) {
        selectedCourse = mockCourses.find(course => String(course.id) === courseIdParam);
    }
    if (!selectedCourse && mockCourses.length) {
        selectedCourse = mockCourses[0];
    }

    if (!selectedCourse) {
        return;
    }

    courseTitleEl.textContent = selectedCourse.title;
    if (codeEl) {
        codeEl.textContent = `${selectedCourse.shortName || selectedCourse.code} (${selectedCourse.code})`;
    }
    if (semesterEl) {
        semesterEl.textContent = selectedCourse.semester;
    }
    if (classEl) {
        classEl.textContent = selectedCourse.className || 'N/A';
    }
    if (timingEl) {
        timingEl.textContent = selectedCourse.classTiming || '—';
    }
    if (daysEl) {
        daysEl.textContent = selectedCourse.sessionDays || '—';
    }
    if (creditEl) {
        creditEl.textContent = selectedCourse.creditHours || '—';
    }
    if (prereqEl) {
        prereqEl.textContent = selectedCourse.prerequisites || '—';
    }

    const outlineBtn = document.getElementById('outlineNavBtn');
    const progressBtn = document.getElementById('progressNavBtn');
    const outlineTarget = `course-outline.html?courseId=${selectedCourse.id}`;
    const progressTarget = `post-class-progress.html?courseId=${selectedCourse.id}`;

    if (outlineBtn) {
        outlineBtn.addEventListener('click', () => {
            window.location.href = outlineTarget;
        });
    }

    if (progressBtn) {
        progressBtn.addEventListener('click', () => {
            window.location.href = progressTarget;
        });
    }
}

// ============================================================================
// PAGE INITIALIZATION
// ============================================================================

/**
 * Initialize page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication on every page load
    checkAuthentication();

    // Log current user for debugging (remove in production)
    const currentUser = getCurrentUser();
    if (currentUser) {
        console.log('Logged in as:', currentUser.name);
        const userInfoEls = document.querySelectorAll('.user-info');
        userInfoEls.forEach(el => {
            el.textContent = currentUser.name;
        });
    }

    // Populate course hub page if applicable
    if (document.getElementById('hubCourseTitle')) {
        populateCourseHubPage();
    }

    if (document.getElementById('progressFacultyName')) {
        populateLectureProgressPage();
    }

    // Populate course outline page if applicable
    if (document.getElementById('outlineFacultyName')) {
        populateCourseOutlinePage();
    }
});

// ============================================================================
// END OF MAIN.JS
// ============================================================================
