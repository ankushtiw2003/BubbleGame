document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("howToPlayModal");
    var startGameBtn = document.getElementById("startGameBtn");

    // Show "How to Play" modal when the page loads
    modal.style.display = "flex";

    // Start game when the button is clicked
    startGameBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Hide modal
        startGame(); // Start the game
    });
});

function startGame() {
    console.log("Game Started!"); // Debugging log

    var timer = 60; // Reset Timer
    var score = 0; // Reset Score
    var hitrn; // Store the current number to hit

    // Update Score Display
    function increaseScore() {
        score += 10;
        document.querySelector("#scoreval").textContent = score;
    }

    // Generate a new "Hit" number
    function getNewHit() {
        hitrn = Math.floor(Math.random() * 10);
        document.querySelector("#hitval").textContent = hitrn;
    }

    // Generate Bubbles based on screen size
    function makeBubble() {
        var clutter = "";
        var numBubbles = window.innerWidth <= 480 ? 50 : 102; // Adjust for mobile

        for (var i = 1; i <= numBubbles; i++) {
            var rn = Math.floor(Math.random() * 10);
            clutter += `<div class="bubble">${rn}</div>`;
        }

        document.querySelector("#pbtm").innerHTML = clutter; // Add bubbles
        console.log("Bubbles Generated!"); // Debugging log
    }

    // Timer function
    function runTimer() {
        var timerInt = setInterval(function () {
            if (timer > 0) {
                timer--;
                document.querySelector("#timerval").textContent = timer;
            } else {
                clearInterval(timerInt);
                showGameOverScreen(); // Show Game Over Message
            }
        }, 1000);
    }

    // Show Game Over Screen with Restart Button
function showGameOverScreen() {
    document.querySelector("#pbtm").innerHTML = `
        <div class="game-over">
            <h1>Game Over</h1>
            <h2>Your Score: <span>${score}</span></h2>
            <button id="restartGameBtn">Restart Game</button>
        </div>
    `;

    // Restart the game when the button is clicked
    document.getElementById("restartGameBtn").addEventListener("click", function () {
        startGame();
    });
}

    // Bubble Click Event
    document.querySelector("#pbtm").addEventListener("click", function (event) {
        var clickednum = Number(event.target.textContent);
        if (!isNaN(clickednum) && clickednum === hitrn) {
            increaseScore();
            makeBubble();
            getNewHit();
        }
    });

    // Reset UI and Start the Game
    document.querySelector("#scoreval").textContent = "0"; // Reset Score Display
    document.querySelector("#timerval").textContent = "60"; // Reset Timer Display
    document.querySelector("#pbtm").innerHTML = ""; // Clear any previous content

    makeBubble();
    runTimer();
    getNewHit();
}
