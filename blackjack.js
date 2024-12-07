// Chemin des images des cartes
const cardImages = {
    '2-H': 'cards/2-H.png',
    '3-H': 'cards/3-H.png',
    '4-H': 'cards/4-H.png',
    '5-H': 'cards/5-H.png',
    '6-H': 'cards/6-H.png',
    '7-H': 'cards/7-H.png',
    '8-H': 'cards/8-H.png',
    '9-H': 'cards/9-H.png',
    '10-H': 'cards/10-H.png',
    'J-H': 'cards/J-H.png',
    'Q-H': 'cards/Q-H.png',
    'K-H': 'cards/K-H.png',
    'A-H': 'cards/A-H.png',
    '2-D': 'cards/2-D.png',
    '3-D': 'cards/3-D.png',
    '4-D': 'cards/4-D.png',
    '5-D': 'cards/5-D.png',
    '6-D': 'cards/6-D.png',
    '7-D': 'cards/7-D.png',
    '8-D': 'cards/8-D.png',
    '9-D': 'cards/9-D.png',
    '10-D': 'cards/10-D.png',
    'J-D': 'cards/J-D.png',
    'Q-D': 'cards/Q-D.png',
    'K-D': 'cards/K-D.png',
    'A-D': 'cards/A-D.png',
    '2-C': 'cards/2-C.png',
    '3-C': 'cards/3-C.png',
    '4-C': 'cards/4-C.png',
    '5-C': 'cards/5-C.png',
    '6-C': 'cards/6-C.png',
    '7-C': 'cards/7-C.png',
    '8-C': 'cards/8-C.png',
    '9-C': 'cards/9-C.png',
    '10-C': 'cards/10-C.png',
    'J-C': 'cards/J-C.png',
    'Q-C': 'cards/Q-C.png',
    'K-C': 'cards/K-C.png',
    'A-C': 'cards/A-C.png',
    '2-S': 'cards/2-S.png',
    '3-S': 'cards/3-S.png',
    '4-S': 'cards/4-S.png',
    '5-S': 'cards/5-S.png',
    '6-S': 'cards/6-S.png',
    '7-S': 'cards/7-S.png',
    '8-S': 'cards/8-S.png',
    '9-S': 'cards/9-S.png',
    '10-S': 'cards/10-S.png',
    'J-S': 'cards/J-S.png',
    'Q-S': 'cards/Q-S.png',
    'K-S': 'cards/K-S.png',
    'A-S': 'cards/A-S.png',
    'BACK': 'cards/BACK.png'
};

const playerCards = [];
const dealerCards = [];

let playerScore = 0;
let dealerScore = 0;
let deck = [];
let gameOver = false;

// Initialisation du jeu
function initGame() {
    deck = shuffleDeck(createDeck());
    playerCards.length = 0;
    dealerCards.length = 0;
    playerScore = 0;
    dealerScore = 0;
    gameOver = false;

    document.getElementById('game-result').innerText = '';
    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stand-btn').disabled = false;

    // Vider les cartes affichées
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';
    document.getElementById('player-score').innerText = `Score: ${playerScore}`;
    document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;

    // Distribution initiale des cartes
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());

    updateGame();
}

// Création du deck
function createDeck() {
    const suits = ['H', 'D', 'C', 'S'];  // Cœurs, Diamants, Clubs, Spades
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];

    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(`${value}-${suit}`);
        });
    });
    return deck;
}

// Mélange du deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Permuter les cartes
    }
    return deck;
}

// Calculer la valeur d'une carte
function getCardValue(card) {
    const value = card.split('-')[0];  // Extrait la valeur de la carte (par exemple, 'Ace', '10')
    if (value === 'J' || value === 'Q' || value === 'K') {
        return 10;
    }
    if (value === 'A') {
        return 11;  // L'As peut valoir 1 ou 11, ajusté après le calcul du score
    }
    return parseInt(value);
}

// Calculer le score d'une main
function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;

    cards.forEach(card => {
        score += getCardValue(card);
        if (card.startsWith('A')) {
            aceCount++;
        }
    });

    // Ajuster la valeur des As si nécessaire
    while (score > 21 && aceCount > 0) {
        score -= 10;  // L'As devient 1 au lieu de 11
        aceCount--;
    }

    return score;
}

// Afficher les cartes d'un joueur
function displayCards(cards, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    cards.forEach((card) => {
        const cardImage = document.createElement('div');
        cardImage.classList.add('card');
        cardImage.style.backgroundImage = `url('${cardImages[card]}')`;
        container.appendChild(cardImage);
    });
}

// Mettre à jour l'affichage du jeu
function updateGame() {
    // Afficher les cartes
    displayCards(playerCards, 'player-cards');
    displayCards(dealerCards, 'dealer-cards');

    // Afficher les scores
    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);
    document.getElementById('player-score').innerText = `Score: ${playerScore}`;
    document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;

    // Vérifier si le joueur a perdu (score > 21)
    if (playerScore > 21) {
        gameOver = true;
        document.getElementById('game-result').innerText = "Vous avez dépassé 21, vous avez perdu !";
        endGame();
    }
}

// Actions quand le joueur tire une carte
document.getElementById('hit-btn').addEventListener('click', () => {
    if (!gameOver) {
        playerCards.push(deck.pop());
        updateGame();
    }
});

// Actions quand le joueur passe
document.getElementById('stand-btn').addEventListener('click', () => {
    if (!gameOver) {
        while (dealerScore < 17) {
            dealerCards.push(deck.pop());
            dealerScore = calculateScore(dealerCards);
        }
        updateGame();
        checkWinner();
    }
});

// Recommencer une nouvelle partie
document.getElementById('reset-btn').addEventListener('click', initGame);

// Vérifier le gagnant
function checkWinner() {
    if (dealerScore > 21) {
        document.getElementById('game-result').innerText = "Le croupier a perdu, vous avez gagné !";
    } else if (dealerScore > playerScore) {
        document.getElementById('game-result').innerText = "Le croupier a gagné.";
    } else if (dealerScore < playerScore) {
        document.getElementById('game-result').innerText = "Vous avez gagné !";
    } else {
        document.getElementById('game-result').innerText = "Égalité.";
    }
    endGame();
}

// Terminer le jeu
function endGame() {
    gameOver = true;
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;
}

// Initialiser la partie dès le début
initGame();