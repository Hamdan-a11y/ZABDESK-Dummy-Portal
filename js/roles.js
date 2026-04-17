// ============================================================================
// Roles Page Script - Legacy ZABDESK Experience
// ============================================================================

/**
 * Initialize event bindings when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    hydrateUserName();
    wireFacultyPanel();
    wireSignOut();
    enforceAuthentication();
});

/**
 * Populate the top bar with the current user's name.
 * Falls back to a generic label if no session exists yet.
 */
function hydrateUserName() {
    const userLabel = document.querySelector('.top-username');
    const storedUser = sessionStorage.getItem('currentUser');

    if (!userLabel) {
        return;
    }

    if (storedUser) {
        const user = JSON.parse(storedUser);
        userLabel.textContent = user.name || 'Faculty Member';
    } else {
        userLabel.textContent = 'Guest User';
    }
}

/**
 * Make the faculty panel interactive so it navigates to the assigned courses.
 */
function wireFacultyPanel() {
    const panel = document.querySelector('.faculty-panel');
    if (!panel) {
        return;
    }

    const navigate = () => {
        sessionStorage.setItem('selectedRole', 'faculty');
        window.location.href = 'faculty-courses.html';
    };

    panel.addEventListener('click', navigate);
    panel.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigate();
        }
    });
}

/**
 * Attach logout behaviour to the Sign out button.
 */
function wireSignOut() {
    const signOutButton = document.querySelector('[data-action="signout"]');
    if (!signOutButton) {
        return;
    }

    signOutButton.addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('selectedRole');
        window.location.href = 'index.html';
    });
}

/**
 * Redirect unauthenticated visitors back to login.
 */
function enforceAuthentication() {
    const storedUser = sessionStorage.getItem('currentUser');
    if (!storedUser) {
        window.location.href = 'index.html';
    }
}
// ============================================================================
