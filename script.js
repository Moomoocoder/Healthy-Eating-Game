document.addEventListener('DOMContentLoaded', function() {
    const pacman = document.getElementById('pacman');
    const healthyFoods = document.querySelectorAll('.food');
    const unhealthyFoods = document.querySelectorAll('.unhealthy-food');
    const scoreboard = document.getElementById('scoreboard');
    const gameOverMessage = document.createElement('div');
    gameOverMessage.style.display = 'none';
    gameOverMessage.style.color = 'red';
    gameOverMessage.style.fontSize = '24px';
    gameOverMessage.style.position = 'absolute';
    gameOverMessage.style.top = '50%';
    gameOverMessage.style.left = '50%';
    gameOverMessage.style.transform = 'translate(-50%, -50%)';
    gameOverMessage.innerText = 'Game Over! You lost.';
    document.body.appendChild(gameOverMessage);
    
    let posX = 0, posY = 0;
    const speed = 5;
    let score = 0;
    const container = document.getElementById('game-container');

    function movePacman(event) {
        switch(event.key) {
            case 'w': posY = Math.max(posY - speed, 0); break;
            case 's': posY = Math.min(posY + speed, container.clientHeight - pacman.clientHeight); break;
            case 'a': posX = Math.max(posX - speed, 0); break;
            case 'd': posX = Math.min(posX + speed, container.clientWidth - pacman.clientWidth); break;
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
                updateScore(10);
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
                updateScore(-5);
            }
        });
    }

    function updateScore(points) {
        score += points; // Update score based on points
        scoreboard.innerText = 'Score: ' + score;
        if (score <= 0) {
            endGame();
        }
    }

    function endGame() {
        // Stop the game
        document.removeEventListener('keydown', movePacman);
        gameOverMessage.style.display = 'block';
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

    document.addEventListener('keydown', movePacman);
});
