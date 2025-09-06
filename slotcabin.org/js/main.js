// Main JavaScript functionality for SlotCabin.org

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAgeVerification();
    checkCookieConsent();
    checkUserLogin();
    initializeEventListeners();
    
    // Always load featured games and leaderboard
    loadFeaturedGames();
    loadHomeLeaderboard();
    
    // Initialize testimonials slider
    setTimeout(() => {
        initTestimonialsSlider();
    }, 1000);
});

// Handle window resize for responsive slider
window.addEventListener('resize', function() {
    if (featuredGamesData.length > 0) {
        updateSlidesPerView();
        createDots();
        currentSlide = 0;
        const slider = document.getElementById('gamesSlider');
        if (slider) {
            slider.style.transform = 'translateX(0)';
        }
    }
});

// Age Verification
function checkAgeVerification() {
    const ageVerified = localStorage.getItem('ageVerified');
    const verificationDate = localStorage.getItem('ageVerificationDate');
    
    if (!ageVerified || isExpired(verificationDate, 30)) {
        document.getElementById('ageModal').style.display = 'block';
    }
}

function verifyAge(isOver18) {
    if (isOver18) {
        localStorage.setItem('ageVerified', 'true');
        localStorage.setItem('ageVerificationDate', new Date().toISOString());
        document.getElementById('ageModal').style.display = 'none';
    } else {
        alert('You must be 18 or older to access this site.');
        window.location.href = 'https://www.google.com';
    }
}

// Cookie Consent
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        document.getElementById('cookieConsent').style.display = 'block';
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.getElementById('cookieConsent').style.display = 'none';
}

// User Authentication
function checkUserLogin() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        showUserInfo(user);
    }
}

function showUserInfo(user) {
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('welcomeText').textContent = `Welcome, ${user.username}`;
    document.getElementById('coinBalance').textContent = `${user.coins.toLocaleString()} Coins`;
    
    // Switch to logged-in hero
    switchToLoggedInHero(user);
}

function hideUserInfo() {
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('authButtons').style.display = 'flex';
    
    // Switch back to guest hero
    switchToGuestHero();
}

// Registration Modal
function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event Listeners
function initializeEventListeners() {
    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Handle Registration
function handleRegistration(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    if (username && email && password) {
        const user = {
            username: username,
            email: email,
            coins: 5000,
            registrationDate: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        showUserInfo(user);
        closeModal('registerModal');
        
        // Show success message
        showNotification('Registration successful! You received 5,000 free coins!');
    }
}

// Utility Functions
function isExpired(dateString, days) {
    if (!dateString) return true;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > days;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00f7ff, #9d4edd);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    hideUserInfo();
    
    // Determine correct path based on current location
    const currentPath = window.location.pathname;
    if (currentPath.includes('/profile/') || currentPath.includes('/games/') || 
        currentPath.includes('/contact/') || currentPath.includes('/login/')) {
        window.location.href = '../index.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Update coins (for buy coins functionality)
function updateCoins(amount) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        user.coins += amount;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('coinBalance').textContent = `${user.coins.toLocaleString()} Coins`;
        
        // Update hero stats if elements exist
        const heroCoins = document.getElementById('heroCoins');
        if (heroCoins) {
            heroCoins.textContent = user.coins.toLocaleString();
        }
        return true;
    }
    return false;
}

// Hero section switching
function switchToLoggedInHero(user) {
    const guestHero = document.getElementById('guestHero');
    const loggedInHero = document.getElementById('loggedInHero');
    
    if (guestHero && loggedInHero) {
        guestHero.style.display = 'none';
        loggedInHero.style.display = 'block';
        
        // Update hero stats
        document.getElementById('heroCoins').textContent = user.coins.toLocaleString();
        document.getElementById('heroGames').textContent = user.gamesPlayed || 0;
    }
}

function switchToGuestHero() {
    const guestHero = document.getElementById('guestHero');
    const loggedInHero = document.getElementById('loggedInHero');
    
    if (guestHero && loggedInHero) {
        guestHero.style.display = 'block';
        loggedInHero.style.display = 'none';
    }
}

// Games slider functionality
let currentSlide = 0;
let featuredGamesData = [];
let slidesPerView = 4;

function loadFeaturedGames() {
    featuredGamesData = [
        { id: 1, name: "Mystic Fortune", provider: "Hacksaw Gaming", icon: "🔮", category: "Slots" },
        { id: 2, name: "Dragon's Gold", provider: "Pragmatic Play", icon: "🐉", category: "Slots" },
        { id: 3, name: "Spin the Wheel", provider: "Nolimit City", icon: "🎡", category: "Wheel" },
        { id: 4, name: "Ocean's Treasure", provider: "Evolution Gaming", icon: "🌊", category: "Dice" },
        { id: 5, name: "Wild West Gold", provider: "Peter & Sons", icon: "🤠", category: "Slots" },
        { id: 6, name: "Space Adventure", provider: "Hacksaw Gaming", icon: "🚀", category: "Slots" },
        { id: 7, name: "Fruit Fiesta", provider: "Pragmatic Play", icon: "🍎", category: "Classic" },
        { id: 8, name: "Pirate's Quest", provider: "Nolimit City", icon: "🏴☠️", category: "Adventure" },
        { id: 9, name: "Egyptian Secrets", provider: "Evolution Gaming", icon: "🏺", category: "Slots" },
        { id: 10, name: "Viking Legends", provider: "Peter & Sons", icon: "⚔️", category: "Adventure" }
    ];
    
    updateSlidesPerView();
    displayGamesSlider();
    createDots();
}

function updateSlidesPerView() {
    const width = window.innerWidth;
    if (width < 480) slidesPerView = 1;
    else if (width < 768) slidesPerView = 2;
    else slidesPerView = 3;
}

function displayGamesSlider() {
    const slider = document.getElementById('gamesSlider');
    if (!slider) return;
    
    slider.innerHTML = '';
    
    featuredGamesData.forEach(game => {
        const gameSlide = document.createElement('div');
        gameSlide.className = 'game-slide';
        gameSlide.onclick = () => playFeaturedGame(game);
        
        gameSlide.innerHTML = `
            <div class="game-slide-image">
                <div class="game-poster">
                    <div class="game-icon">${game.icon}</div>
                    <div class="game-category">${game.category}</div>
                </div>

            </div>
            <div class="game-slide-info">
                <h3 class="game-slide-title">${game.name}</h3>
                <p class="game-slide-provider">${game.provider}</p>
            </div>
        `;
        
        slider.appendChild(gameSlide);
    });
}

function createDots() {
    const dotsContainer = document.getElementById('sliderDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(featuredGamesData.length / slidesPerView);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function slideGames(direction) {
    const slider = document.getElementById('gamesSlider');
    const slideWidth = window.innerWidth < 768 ? 260 : 320;
    const maxSlides = Math.max(0, featuredGamesData.length - slidesPerView);
    
    currentSlide += direction * slidesPerView;
    
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= featuredGamesData.length) currentSlide = Math.max(0, featuredGamesData.length - slidesPerView);
    
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateDots();
}

function goToSlide(slideIndex) {
    const slider = document.getElementById('gamesSlider');
    const slideWidth = window.innerWidth < 768 ? 260 : 320;
    
    currentSlide = slideIndex * slidesPerView;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    const activeDot = Math.floor(currentSlide / slidesPerView);
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDot);
    });
}

function playFeaturedGame(game) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        // Show registration modal for guests
        showRegisterModal();
        return;
    }
    
    // Store selected game and redirect to games page for logged-in users
    localStorage.setItem('selectedGame', JSON.stringify(game));
    window.location.href = 'games/index.html';
}

// Load leaderboard for homepage
function loadHomeLeaderboard() {
    const leaderboardData = [
        { username: "DragonSlayer99", score: 125000, coins: 15000 },
        { username: "LuckyCharm", score: 118500, coins: 12500 },
        { username: "GoldRush", score: 112300, coins: 11000 },
        { username: "MysticWins", score: 108900, coins: 10500 },
        { username: "CasinoKing", score: 105600, coins: 9800 }
    ];
    
    const leaderboardEl = document.getElementById('homeLeaderboard');
    if (!leaderboardEl) return;
    
    leaderboardEl.innerHTML = `
        <div class="leaderboard-header">
            <div>Rank</div>
            <div>Player</div>
            <div>Score</div>
            <div>Coins</div>
        </div>
        <div class="leaderboard-list"></div>
    `;
    
    const listEl = leaderboardEl.querySelector('.leaderboard-list');
    
    leaderboardData.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${index < 3 ? 'top-3' : ''}`;
        
        item.innerHTML = `
            <div class="leaderboard-rank">#${index + 1}</div>
            <div class="leaderboard-player">${player.username}</div>
            <div class="leaderboard-score">${player.score.toLocaleString()}</div>
            <div class="leaderboard-coins">${player.coins.toLocaleString()}</div>
        `;
        
        listEl.appendChild(item);
    });
}

// Testimonials slider functionality
let currentTestimonial = 0;
let testimonialCount = 15;

function initTestimonialsSlider() {
    createTestimonialsDots();
    startTestimonialsAutoSlide();
}

function createTestimonialsDots() {
    const dotsContainer = document.getElementById('testimonialsDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < testimonialCount; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToTestimonial(i);
        dotsContainer.appendChild(dot);
    }
}

function slideTestimonials(direction) {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;
    
    currentTestimonial += direction;
    
    if (currentTestimonial < 0) {
        currentTestimonial = testimonialCount - 1;
    } else if (currentTestimonial >= testimonialCount) {
        currentTestimonial = 0;
    }
    
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    updateTestimonialsDots();
}

function goToTestimonial(index) {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;
    
    currentTestimonial = index;
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    updateTestimonialsDots();
}

function updateTestimonialsDots() {
    const dots = document.querySelectorAll('#testimonialsDots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function startTestimonialsAutoSlide() {
    setInterval(() => {
        slideTestimonials(1);
    }, 10000); // Auto-slide every 10 seconds (slower)
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navMenu.classList.toggle('active');
    mobileBtn.classList.toggle('active');
}

// Close mobile menu when clicking on links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        const navMenu = document.getElementById('navMenu');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (navMenu && mobileBtn) {
            navMenu.classList.remove('active');
            mobileBtn.classList.remove('active');
        }
    }
});

// FAQ toggle functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Most Played Games functionality
function playMostPlayedGame(gameId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        // Show registration modal for guests
        showRegisterModal();
        return;
    }
    
    // Game data for most played games
    const mostPlayedGames = {
        'neon-slots': { id: 1, name: "Neon Slots Deluxe", provider: "SlotCabin Studios", icon: "🌟", category: "Slots" },
        'mega-wheel': { id: 2, name: "Mega Fortune Wheel", provider: "SlotCabin Studios", icon: "🎡", category: "Wheel" },
        'crystal-dice': { id: 3, name: "Crystal Dice Master", provider: "SlotCabin Studios", icon: "💎", category: "Dice" }
    };
    
    const selectedGame = mostPlayedGames[gameId];
    if (selectedGame) {
        // Store selected game and redirect to games page
        localStorage.setItem('selectedGame', JSON.stringify(selectedGame));
        window.location.href = 'games/index.html';
    }
}