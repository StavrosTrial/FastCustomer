document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector('.game-container');
    const startMessage = document.getElementById('startMessage');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const scoreboard = document.getElementById('scoreboard');
    const player = document.getElementById('player');
    const imagePaths = [
        './images/bananas.png',
        './images/bottle.png',
        './images/bread.png',
        './images/calliflower.png',
        './images/eggplant.png',
        './images/eggs.png',
        './images/frozen.png',
        './images/green apple.png',
        './images/ketchup.png',
        './images/milk.png',
        './images/pepper.png',
        './images/pink.png',
        './images/popcorn.png',
        './images/potatoes.png',
        './images/tomatoes.png',
        './images/veggie 2.png',
        './images/veggie.png'
    ];
    const positions = ['38%', '47%', '56%']; // Predefined horizontal positions for falling images
    const positions2 = ['35%', '44%', '53%']; // Predefined horizontal positions for the player
    let score = 0;
    let gameInterval;
    let playerPosition = 1; // 0: left, 1: center, 2: right

    // Function to start the game
    function startGame() {
        score = 0;
        updateScore();
        startMessage.style.display = 'none';
        gameOverMessage.style.display = 'none';
        player.style.left = positions2[playerPosition];

        gameInterval = setInterval(() => {
            createFallingImage();
        }, 1000); // Change interval as needed
    }

    // Function to end the game
    function endGame() {
        clearInterval(gameInterval);
        gameOverMessage.style.display = 'block';
        // Remove all falling images
        const fallingImages = gameContainer.querySelectorAll('.falling-image');
        fallingImages.forEach(image => image.remove());
        document.addEventListener('keydown', restartGame, { once: true });
    }

    // Function to restart the game
    function restartGame(event) {
        if (event.key === 'Enter') {
            startGame();
        }
    }

    // Function to update the score
    function updateScore() {
        scoreboard.textContent = `Score: ${score}`;
    }

    // Function to create and animate a falling image
    const positionValues = {
        '38%': 1,
        '47%': 2,
        '56%': 3
    };
    
    const playerPositionValues = {
        '35%': 1,
        '44%': 2,
        '53%': 3
    };
    
    // Function to create and animate a falling image
    function createFallingImage() {
        const img = document.createElement('img');
        img.src = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        img.className = 'falling-image';
        const startPosIndex = Math.floor(Math.random() * positions.length);
        const bottomPositionValue = positionValues[positions[startPosIndex]] + 5; // Adding 5 for 20% from the bottom
        
        img.style.left = positions[startPosIndex];
        img.style.top = '23%'; // Start 20% from the top
    
        gameContainer.appendChild(img);
    
        // Trigger the animation
        setTimeout(() => {
            img.style.transition = 'top 1s linear';
            img.style.top = '80%'; // End 10% from the bottom
        }, 20);
    
        // Check for collision with player's position
        setTimeout(() => {
            const playerBottomPositionValue = playerPositionValues[positions2[playerPosition]] + 5; // Adding 5 for 20% from the bottom
    
            if (playerBottomPositionValue === bottomPositionValue) {
                score++;
                updateScore();
            } else {
                endGame();
            }
            img.remove();
        }, 1000); // Duration matches the CSS transition
    }

    // Function to handle player movement
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && playerPosition > 0) {
            playerPosition--;
        } else if (event.key === 'ArrowRight' && playerPosition < 2) {
            playerPosition++;
        }
        player.style.left = positions2[playerPosition];
    });

    // Start the game when Enter is pressed initially
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            startGame();
        }
    }, { once: true });
});