document.addEventListener('DOMContentLoaded', function() {
    const pacman = document.getElementById('pacman');
    const healthyFoods = document.querySelectorAll('.food');
    const unhealthyFoods = document.querySelectorAll('.unhealthy-food');
    const scoreboard = document.getElementById('scoreboard');
    const livesContainer = document.getElementById('lives-container'); // Element to display lives
    const gameOverMessage = document.createElement('div');
    const winMessage = document.createElement('div');
    const restartButton = document.createElement('button');
    
    gameOverMessage.style.display = 'none';
    gameOverMessage.style.color = 'red';
    gameOverMessage.style.fontSize = '24px';
    gameOverMessage.style.position = 'absolute';
    gameOverMessage.style.top = '50%';
    gameOverMessage.style.left = '50%';
    gameOverMessage.style.transform = 'translate(-50%, -50%)';
    gameOverMessage.innerText = 'Game Over! You lost.';
    document.body.appendChild(gameOverMessage);
    
    winMessage.style.display = 'none';
    winMessage.style.color = 'green';
    winMessage.style.fontSize = '24px';
    winMessage.style.position = 'absolute';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.transform = 'translate(-50%, -50%)';
    winMessage.innerText = 'Congratulations! You win!';
    document.body.appendChild(winMessage);
    
    restartButton.innerText = 'Restart Game';
    restartButton.style.display = 'none';
    restartButton.style.position = 'absolute';
    restartButton.style.top = '60%';
    restartButton.style.left = '50%';
    restartButton.style.transform = 'translate(-50%, -50%)';
    restartButton.addEventListener('click', restartGame);
    document.body.appendChild(restartButton);

    let posX = 0, posY = 0;
    const speed = 10;
    let score = 0;
    let lives = 3; // Initial number of lives
    const container = document.getElementById('game-container');

    function movePacman(event) {
        switch(event.key) {
            case 'w':
            case 'ArrowUp': posY = Math.max(posY - speed, 0); break;
            case 's':
            case 'ArrowDown': posY = Math.min(posY + speed, container.clientHeight - pacman.clientHeight); break;
            case 'a':
            case 'ArrowLeft': posX = Math.max(posX - speed, 0); break;
            case 'd':
            case 'ArrowRight': posX = Math.min(posX + speed, container.clientWidth - pacman.clientWidth); break;
        }
        pacman.style.left = posX + 'px';
        pacman.style.top = posY + 'px';
        checkCollision();
    }

    function checkCollision() {
        healthyFoods.forEach(function(food) {
            const foodRect = food.getBoundingClientRect();
            const pacmanRect = pacman.getBoundingClientRect();

            if (pacmanRect.left < foodRect.right &&
                pacmanRect.right > foodRect.left &&
                pacmanRect.top < foodRect.bottom &&
                pacmanRect.bottom > foodRect.top) {
                respawnFood(food);
                updateScore(1);
            }
        });

        unhealthyFoods.forEach(function(food) {
            const foodRect = food.getBoundingClientRect();
            const pacmanRect = pacman.getBoundingClientRect();

            if (pacmanRect.left < foodRect.right &&
                pacmanRect.right > foodRect.left &&
                pacmanRect.top < foodRect.bottom &&
                pacmanRect.bottom > foodRect.top) {
                respawnFood(food);
                loseLife();
            }
        });
    }

    function updateScore(points) {
        score += points; // Update score based on points
        scoreboard.innerText = 'Score: ' + score;
        if (score >= 20) {
            endGame('win');
        }
    }

    function loseLife() {
        lives -= 1; // Decrease lives by 1
        updateHeartImage(); // Call to update heart image
        if (lives <= 0) {
            endGame('lost');
        }
    }

    function updateHeartImage() {
        livesContainer.innerHTML = ''; // Clear the current lives display
        for (let i = 0; i < lives; i++) {
            const heartImage = document.createElement('img');
            heartImage.src = 'images/heart_full.png'; // Path to the heart image
            heartImage.width = 30;
            heartImage.height = 30;
            livesContainer.appendChild(heartImage);
        }
    }

    function endGame(message) {
        // Stop the game
        document.removeEventListener('keydown', movePacman);
        if (message === 'lost') {
            gameOverMessage.style.display = 'block';
        } else if (message === 'win') {
            winMessage.style.display = 'block';
        }
        restartButton.style.display = 'block';
    }

    function restartGame() {
        posX = 0;
        posY = 0;
        score = 0;
        lives = 3; // Reset lives
        pacman.style.left = posX + 'px';
        pacman.style.top = posY + 'px';
        scoreboard.innerText = 'Score: ' + score;
        updateHeartImage(); // Reset lives display
        gameOverMessage.style.display = 'none';
        winMessage.style.display = 'none';
        restartButton.style.display = 'none';
        document.addEventListener('keydown', movePacman);
    }

    function respawnFood(food) {
        const maxX = container.clientWidth - food.clientWidth;
        const maxY = container.clientHeight - food.clientHeight;
        const newPosX = Math.floor(Math.random() * maxX);
        const newPosY = Math.floor(Math.random() * maxY);
        food.style.left = newPosX + 'px';
        food.style.top = newPosY + 'px';
        console.log(`Food respawned to (${newPosX}, ${newPosY})`);
    }

    updateHeartImage(); // Initialize the lives display
    document.addEventListener('keydown', movePacman);
});
