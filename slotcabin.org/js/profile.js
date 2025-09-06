// Profile page functionality

document.addEventListener('DOMContentLoaded', function() {
    checkUserAccess();
    loadUserProfile();
    initializeProfileForms();
});

function checkUserAccess() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = '../login/index.html';
        return;
    }
}

function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    // Update profile information
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('avatarInitials').textContent = user.username.charAt(0).toUpperCase();
    
    // Update stats
    document.getElementById('totalCoins').textContent = user.coins.toLocaleString();
    document.getElementById('gamesPlayed').textContent = user.gamesPlayed || 0;
    document.getElementById('totalScore').textContent = (user.totalScore || 0).toLocaleString();
    
    // Update member date
    const memberDate = new Date(user.registrationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
    document.getElementById('memberDate').textContent = memberDate;
    
    // Update settings form
    document.getElementById('settingsUsername').value = user.username;
    document.getElementById('settingsEmail').value = user.email;
    
    // Load user preferences
    loadUserPreferences();
    
    // Load activity and history
    loadRecentActivity();
    loadGameHistory();
}

function initializeProfileForms() {
    const settingsForm = document.getElementById('profileSettingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Preference checkboxes
    document.getElementById('soundEnabled').addEventListener('change', savePreferences);
    document.getElementById('notificationsEnabled').addEventListener('change', savePreferences);
}

function showProfileTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function handleProfileUpdate(event) {
    event.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const formData = new FormData(event.target);
    
    const newUsername = formData.get('username');
    const newEmail = formData.get('email');
    
    // Validate
    if (!newUsername || !newEmail) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Update user data
    user.username = newUsername;
    user.email = newEmail;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update display
    loadUserProfile();
    showNotification('Profile updated successfully!');
}

function loadUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    
    document.getElementById('soundEnabled').checked = preferences.soundEnabled !== false;
    document.getElementById('notificationsEnabled').checked = preferences.notificationsEnabled !== false;
}

function savePreferences() {
    const preferences = {
        soundEnabled: document.getElementById('soundEnabled').checked,
        notificationsEnabled: document.getElementById('notificationsEnabled').checked
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    showNotification('Preferences saved!');
}

function loadRecentActivity() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const activityList = document.getElementById('activityList');
    
    // Clear existing activity
    activityList.innerHTML = '';
    
    // Add registration activity
    const registrationActivity = document.createElement('div');
    registrationActivity.className = 'activity-item';
    registrationActivity.innerHTML = `
        <div class="activity-icon">🎉</div>
        <div class="activity-details">
            <p>Welcome to SlotCabin.org!</p>
            <span>Account created on ${new Date(user.registrationDate).toLocaleDateString()}</span>
        </div>
    `;
    activityList.appendChild(registrationActivity);
    
    // Add coin bonus activity
    const bonusActivity = document.createElement('div');
    bonusActivity.className = 'activity-item';
    bonusActivity.innerHTML = `
        <div class="activity-icon">🪙</div>
        <div class="activity-details">
            <p>Received 5,000 welcome coins</p>
            <span>Registration bonus</span>
        </div>
    `;
    activityList.appendChild(bonusActivity);
}

function loadGameHistory() {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    const historyContainer = document.getElementById('gameHistory');
    
    if (gameHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="history-empty">
                <p>No games played yet. <a href="/games/">Start playing!</a></p>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = '';
    gameHistory.forEach(game => {
        const historyItem = document.createElement('div');
        historyItem.className = 'activity-item';
        historyItem.innerHTML = `
            <div class="activity-icon">🎮</div>
            <div class="activity-details">
                <p>${game.name}</p>
                <span>Played on ${new Date(game.date).toLocaleDateString()}</span>
            </div>
        `;
        historyContainer.appendChild(historyItem);
    });
}

function showBuyCoinsModal() {
    document.getElementById('buyCoinsModal').style.display = 'block';
}

function buyCoins(amount) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        user.coins += amount;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update display
        document.getElementById('totalCoins').textContent = user.coins.toLocaleString();
        document.getElementById('coinBalance').textContent = `${user.coins.toLocaleString()} Coins`;
        
        closeModal('buyCoinsModal');
        showNotification(`You received ${amount.toLocaleString()} coins!`);
        
        // Add to activity
        addActivity('🪙', `Purchased ${amount.toLocaleString()} coins`, 'Coin purchase');
    }
}

function showDailyBonus() {
    const lastBonus = localStorage.getItem('lastDailyBonus');
    const today = new Date().toDateString();
    
    if (lastBonus === today) {
        showNotification('You already claimed your daily bonus today!', 'error');
        return;
    }
    
    document.getElementById('dailyBonusModal').style.display = 'block';
}

function claimDailyBonus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const bonusAmount = 500;
    
    user.coins += bonusAmount;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('lastDailyBonus', new Date().toDateString());
    
    // Update display
    document.getElementById('totalCoins').textContent = user.coins.toLocaleString();
    document.getElementById('coinBalance').textContent = `${user.coins.toLocaleString()} Coins`;
    
    closeModal('dailyBonusModal');
    showNotification(`Daily bonus claimed! You received ${bonusAmount} coins!`);
    
    // Add to activity
    addActivity('🎁', `Claimed daily bonus: ${bonusAmount} coins`, 'Daily bonus');
}

function addActivity(icon, text, type) {
    const activityList = document.getElementById('activityList');
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <div class="activity-icon">${icon}</div>
        <div class="activity-details">
            <p>${text}</p>
            <span>${type} - ${new Date().toLocaleDateString()}</span>
        </div>
    `;
    activityList.insertBefore(newActivity, activityList.firstChild);
}

function changeAvatar() {
    const colors = ['#00f7ff', '#9d4edd', '#ffb703', '#ff006e', '#8338ec', '#3a86ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const avatarCircle = document.getElementById('avatarCircle');
    avatarCircle.style.background = randomColor;
    
    showNotification('Avatar color changed!');
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userPreferences');
        localStorage.removeItem('gameHistory');
        localStorage.removeItem('lastDailyBonus');
        
        showNotification('Account deleted successfully. Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    }
}