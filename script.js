var timer = 60;
var score = 0;
var hitrn;

// Function to get a new target number
function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

// Function to dynamically determine the number of bubbles based on screen size
function getBubbleCount() {
    let screenWidth = window.innerWidth;

    if (screenWidth > 1024) {
        return 102;  // Desktop
    } else if (screenWidth > 768) {
        return 81;   // Tablet
    } else {
        return 49;   // Mobile
    }
}

// Function to generate bubbles
function makeBubble() {
    var bubbleContainer = document.querySelector("#pbtm");

    if (!bubbleContainer) {
        console.error("Error: #pbtm element not found!");
        return;
    }

    var clutter = "";
    var bubbleCount = getBubbleCount();  // Function to determine bubble count dynamically

    for (var i = 1; i <= bubbleCount; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;  // ✅ Corrected syntax
    }

    bubbleContainer.innerHTML = clutter;
}

// Function to increase the score
function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

// Timer function
function runTimer() {
    var timerint = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerint);

            // Display "Game Over" and "Your Score"
            document.querySelector("#pbtm").innerHTML = `
                <div class="game-over">
                    <h1>Game Over</h1>
                    <h2>Your Score: <span>${score}</span></h2>
                </div>
            `;
        }
    }, 1000);
}

// Event listener for bubble clicks
document.querySelector("#pbtm").addEventListener("click", function (event) {
    if (event.target.classList.contains("bubble")) {
        var clickedNum = Number(event.target.textContent);
        if (clickedNum === hitrn) {
            increaseScore();
            makeBubble();
            getNewHit();
        }
    }
});

// Ensure script runs after the page loads
document.addEventListener("DOMContentLoaded", function () {
    makeBubble();
    runTimer();
    getNewHit();
});

// Ensure bubbles adjust dynamically on screen resize
window.addEventListener("resize", makeBubble);
