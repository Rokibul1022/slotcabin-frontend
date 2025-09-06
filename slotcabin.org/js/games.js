// Games page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    loadLeaderboard();
});

// Load games from data
async function loadGames() {
    try {
        const response = await fetch('../data/games.json');
        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error('Error loading games:', error);
        displayGames(getDefaultGames());
    }
}

// Display games in grid
function displayGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Create game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => playGame(game);
    
    card.innerHTML = `
        <div class="game-image" data-icon="${game.icon}">${game.icon}</div>
        <div class="game-info">
            <h3 class="game-title">${game.name}</h3>
            <p class="game-provider">${game.provider}</p>
            <p class="game-description">${game.description}</p>
            <button class="play-btn">Play Now</button>
        </div>
    `;
    
    return card;
}

// Play game function
function playGame(game) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        alert('Please login to play games!');
        return;
    }
    
    // Open game modal
    document.getElementById('gameTitle').textContent = game.name;
    document.getElementById('gameCoins').textContent = `Coins: ${user.coins.toLocaleString()}`;
    document.getElementById('gameModal').style.display = 'block';
    
    // Load the specific game
    loadGameContent(game);
}

// Close game modal
function closeGameModal() {
    document.getElementById('gameModal').style.display = 'none';
    document.getElementById('gameContainer').innerHTML = '';
}

// Load leaderboard
async function loadLeaderboard() {
    try {
        const response = await fetch('../data/leaderboard.json');
        const leaderboard = await response.json();
        displayLeaderboard(leaderboard);
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        displayLeaderboard(getDefaultLeaderboard());
    }
}

// Display leaderboard
function displayLeaderboard(leaderboard) {
    const leaderboardEl = document.getElementById('leaderboard');
    leaderboardEl.innerHTML = '';
    
    leaderboard.slice(0, 10).forEach((player, index) => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${index < 3 ? 'top-3' : ''}`;
        
        item.innerHTML = `
            <div class="leaderboard-rank">#${index + 1}</div>
            <div class="leaderboard-user">${player.username}</div>
            <div class="leaderboard-score">${player.score.toLocaleString()} pts</div>
        `;
        
        leaderboardEl.appendChild(item);
    });
}

// Buy coins functionality
function showBuyCoinsModal() {
    document.getElementById('buyCoinsModal').style.display = 'block';
}

function buyCoins(amount) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        user.coins += amount;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('coinBalance').textContent = `${user.coins.toLocaleString()} Coins`;
        closeModal('buyCoinsModal');
        showNotification(`You received ${amount.toLocaleString()} coins!`);
    }
}

// Default games data (fallback)
function getDefaultGames() {
    return [
        {
            id: 1,
            name: "Mystic Fortune",
            provider: "Hacksaw Gaming",
            description: "Ancient mysteries await in this magical slot adventure",
            icon: "🔮",
            url: "about:blank"
        },
        {
            id: 2,
            name: "Dragon's Gold",
            provider: "Pragmatic Play",
            description: "Collect treasures from the dragon's lair",
            icon: "🐉",
            url: "about:blank"
        },
        {
            id: 3,
            name: "Spin the Wheel",
            provider: "Nolimit City",
            description: "Spin the wheel of fortune for big wins",
            icon: "🎡",
            url: "about:blank"
        },
        {
            id: 4,
            name: "Ocean's Treasure",
            provider: "Evolution Gaming",
            description: "Dive deep for underwater riches",
            icon: "🌊",
            url: "about:blank"
        },
        {
            id: 5,
            name: "Wild West Gold",
            provider: "Peter & Sons",
            description: "Strike it rich in the old frontier",
            icon: "🤠",
            url: "about:blank"
        },
        {
            id: 6,
            name: "Space Adventure",
            provider: "Hacksaw Gaming",
            description: "Explore galaxies for cosmic rewards",
            icon: "🚀",
            url: "about:blank"
        },
        {
            id: 7,
            name: "Fruit Fiesta",
            provider: "Pragmatic Play",
            description: "Classic fruit machine with modern twists",
            icon: "🍎",
            url: "about:blank"
        },
        {
            id: 8,
            name: "Pirate's Quest",
            provider: "Nolimit City",
            description: "Sail the seven seas for buried treasure",
            icon: "🏴‍☠️",
            url: "about:blank"
        },
        {
            id: 9,
            name: "Egyptian Secrets",
            provider: "Evolution Gaming",
            description: "Uncover ancient pharaoh's hidden wealth",
            icon: "🏺",
            url: "about:blank"
        },
        {
            id: 10,
            name: "Viking Legends",
            provider: "Peter & Sons",
            description: "Join Norse warriors on epic raids",
            icon: "⚔️",
            url: "about:blank"
        },
        {
            id: 11,
            name: "Jungle Explorer",
            provider: "Hacksaw Gaming",
            description: "Navigate through dangerous jungle paths",
            icon: "🌴",
            url: "about:blank"
        },
        {
            id: 12,
            name: "Crystal Caverns",
            provider: "Pragmatic Play",
            description: "Mine precious gems in underground caves",
            icon: "💎",
            url: "about:blank"
        }
    ];
}

// Load game content based on game type
function loadGameContent(game) {
    const container = document.getElementById('gameContainer');
    
    switch(game.id) {
        case 1:
        case 2:
        case 5:
            loadSlotGame(container, game);
            break;
        case 3:
            loadWheelGame(container, game);
            break;
        case 4:
            loadDiceGame(container, game);
            break;
        default:
            loadSlotGame(container, game);
    }
}

// Simple Slot Game
function loadSlotGame(container, game) {
    container.innerHTML = `
        <div class="slot-game">
            <div class="slot-machine">
                <div class="slot-reels">
                    <div class="reel" id="reel1">${game.icon}</div>
                    <div class="reel" id="reel2">${game.icon}</div>
                    <div class="reel" id="reel3">${game.icon}</div>
                </div>
                <div class="slot-controls">
                    <div class="bet-controls">
                        <label>Bet: </label>
                        <select id="betAmount">
                            <option value="10">10 Coins</option>
                            <option value="25">25 Coins</option>
                            <option value="50">50 Coins</option>
                            <option value="100">100 Coins</option>
                        </select>
                    </div>
                    <button onclick="spinSlots()" class="spin-btn" id="spinBtn">SPIN</button>
                </div>
                <div class="game-result" id="gameResult"></div>
            </div>
        </div>
    `;
}

// Dice Game
function loadDiceGame(container, game) {
    container.innerHTML = `
        <div class="dice-game">
            <div class="dice-container">
                <div class="dice" id="dice1">🎲</div>
                <div class="dice" id="dice2">🎲</div>
            </div>
            <div class="dice-controls">
                <div class="bet-section">
                    <label>Bet Amount:</label>
                    <select id="diceBet">
                        <option value="20">20 Coins</option>
                        <option value="50">50 Coins</option>
                        <option value="100">100 Coins</option>
                    </select>
                </div>
                <div class="prediction-section">
                    <label>Predict:</label>
                    <button onclick="rollDice('high')" class="btn-primary">High (8-12)</button>
                    <button onclick="rollDice('low')" class="btn-secondary">Low (2-6)</button>
                    <button onclick="rollDice('seven')" class="btn-gold">Lucky 7</button>
                </div>
            </div>
            <div class="dice-result" id="diceResult"></div>
        </div>
    `;
}

// Spin the Wheel Game
function loadWheelGame(container, game) {
    container.innerHTML = `
        <div class="wheel-game">
            <div class="wheel-container">
                <div class="wheel-pointer">▼</div>
                <div class="wheel" id="wheel">
                    <div class="wheel-section section-1">2x</div>
                    <div class="wheel-section section-2">5x</div>
                    <div class="wheel-section section-3">3x</div>
                    <div class="wheel-section section-4">10x</div>
                    <div class="wheel-section section-5">4x</div>
                    <div class="wheel-section section-6">20x</div>
                </div>
            </div>
            <div class="wheel-controls">
                <div class="bet-section">
                    <label>Bet Amount:</label>
                    <select id="wheelBet">
                        <option value="25">25 Coins</option>
                        <option value="50">50 Coins</option>
                        <option value="100">100 Coins</option>
                    </select>
                </div>
                <button onclick="spinWheel()" class="spin-btn" id="wheelSpinBtn">SPIN WHEEL</button>
            </div>
            <div class="wheel-result" id="wheelResult"></div>
        </div>
    `;
}

// Game Logic Functions
function spinSlots() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const bet = parseInt(document.getElementById('betAmount').value);
    
    if (user.coins < bet) {
        document.getElementById('gameResult').innerHTML = '<p style="color: red;">Not enough coins!</p>';
        return;
    }
    
    const symbols = ['🔮', '🐉', '⚡', '🌊', '🤠', '🚀', '🍎', '🏴☠️', '🏺', '⚔️'];
    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];
    
    document.getElementById('reel1').textContent = reel1;
    document.getElementById('reel2').textContent = reel2;
    document.getElementById('reel3').textContent = reel3;
    
    let winAmount = 0;
    if (reel1 === reel2 && reel2 === reel3) {
        winAmount = bet * 10;
    } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        winAmount = bet * 2;
    }
    
    user.coins -= bet;
    user.coins += winAmount;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    document.getElementById('gameCoins').textContent = `Coins: ${user.coins.toLocaleString()}`;
    
    if (winAmount > 0) {
        document.getElementById('gameResult').innerHTML = `<p style="color: gold;">You won ${winAmount} coins!</p>`;
    } else {
        document.getElementById('gameResult').innerHTML = `<p style="color: red;">Try again!</p>`;
    }
}

function rollDice(prediction) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const bet = parseInt(document.getElementById('diceBet').value);
    
    if (user.coins < bet) {
        document.getElementById('diceResult').innerHTML = '<p style="color: red;">Not enough coins!</p>';
        return;
    }
    
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    
    document.getElementById('dice1').textContent = '⚀⚁⚂⚃⚄⚅'[dice1-1];
    document.getElementById('dice2').textContent = '⚀⚁⚂⚃⚄⚅'[dice2-1];
    
    let won = false;
    let multiplier = 0;
    
    if (prediction === 'high' && total >= 8 && total <= 12) {
        won = true;
        multiplier = 2;
    } else if (prediction === 'low' && total >= 2 && total <= 6) {
        won = true;
        multiplier = 2;
    } else if (prediction === 'seven' && total === 7) {
        won = true;
        multiplier = 5;
    }
    
    user.coins -= bet;
    if (won) {
        user.coins += bet * multiplier;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    document.getElementById('gameCoins').textContent = `Coins: ${user.coins.toLocaleString()}`;
    
    if (won) {
        document.getElementById('diceResult').innerHTML = `<p style="color: gold;">Total: ${total} - You won ${bet * multiplier} coins!</p>`;
    } else {
        document.getElementById('diceResult').innerHTML = `<p style="color: red;">Total: ${total} - Try again!</p>`;
    }
}

// Lucky Wheel Game Logic
let wheelRotation = 0;

function spinWheel() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const bet = parseInt(document.getElementById('wheelBet').value);
    
    if (user.coins < bet) {
        document.getElementById('wheelResult').innerHTML = '<p style="color: red;">Not enough coins!</p>';
        return;
    }
    
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('wheelSpinBtn');
    
    // Disable button during spin
    spinBtn.disabled = true;
    spinBtn.textContent = 'SPINNING...';
    
    const multipliers = [2, 5, 3, 10, 4, 20];
    const randomIndex = Math.floor(Math.random() * multipliers.length);
    const multiplier = multipliers[randomIndex];
    
    // Always spin at least 5 full rotations (1800deg) + target position
    const baseSpins = 1800; // 5 full rotations
    const targetRotation = randomIndex * 60; // 60 degrees per section
    const totalRotation = baseSpins + targetRotation;
    
    wheelRotation += totalRotation;
    
    wheel.style.transform = `rotate(${wheelRotation}deg)`;
    wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    setTimeout(() => {
        user.coins -= bet;
        const winAmount = bet * multiplier;
        user.coins += winAmount;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        document.getElementById('gameCoins').textContent = `Coins: ${user.coins.toLocaleString()}`;
        document.getElementById('wheelResult').innerHTML = `<p style="color: gold;">You won ${winAmount} coins! (${multiplier}x multiplier)</p>`;
        
        // Re-enable button
        spinBtn.disabled = false;
        spinBtn.textContent = 'SPIN WHEEL';
    }, 4000);
}

// Default leaderboard data (fallback)
function getDefaultLeaderboard() {
    return [
        { username: "DragonSlayer99", score: 125000 },
        { username: "LuckyCharm", score: 118500 },
        { username: "GoldRush", score: 112300 },
        { username: "MysticWins", score: 108900 },
        { username: "CasinoKing", score: 105600 },
        { username: "SlotMaster", score: 102400 },
        { username: "WinnerTakesAll", score: 98700 },
        { username: "JackpotHunter", score: 95200 },
        { username: "SpinDoctor", score: 91800 },
        { username: "LuckyStrike", score: 88500 }
    ];
}