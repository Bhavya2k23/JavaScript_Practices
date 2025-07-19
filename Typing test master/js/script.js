const typingText = document.querySelector(".typing-text p"),
      inpField = document.querySelector(".input-field"),
      tryAgainBtn = document.querySelector(".try-again"),
      newTextBtn = document.querySelector(".new-text"),
      timeTag = document.querySelector(".time b"),
      wpmTag = document.querySelector(".wpm"),
      cpmTag = document.querySelector(".cpm"),
      accuracyTag = document.querySelector(".accuracy"),
      mistakeTag = document.querySelector(".mistake"),
      notification = document.querySelector(".notification"),
      themeToggle = document.querySelector(".theme-toggle");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

// Load random paragraph
function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    
    // Focus input field on any key press or click
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

// Initialize typing
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    const typedChar = inpField.value.split("")[charIndex];
    
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
            showNotification("Test started! Begin typing...");
        }
        
        // Backspace handling
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            // Character matching
            if(characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
                // Add pulse animation
                characters[charIndex].style.animation = "pulse 0.3s";
                setTimeout(() => {
                    characters[charIndex].style.animation = "";
                }, 300);
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
                // Add shake animation
                characters[charIndex].style.animation = "shake 0.3s";
                setTimeout(() => {
                    characters[charIndex].style.animation = "";
                }, 300);
            }
            charIndex++;
        }
        
        // Update active character
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        
        // Calculate stats
        const timeElapsed = maxTime - timeLeft;
        const wpm = timeElapsed > 0 ? Math.round(((charIndex - mistakes) / 5) / (timeElapsed / 60)) : 0;
        const accuracy = charIndex > 0 ? Math.round(((charIndex - mistakes) / charIndex) * 100) : 0;
        
        // Update UI
        wpmTag.textContent = wpm;
        cpmTag.textContent = charIndex - mistakes;
        accuracyTag.textContent = `${accuracy}%`;
        mistakeTag.textContent = mistakes;
        
        // Update progress
        const progress = (charIndex / characters.length) * 100;
        document.documentElement.style.setProperty('--progress', `${progress}%`);
        
    } else {
        // Test completed
        clearInterval(timer);
        inpField.value = "";
        if(timeLeft <= 0) {
            showNotification("Time's up! Your results are ready.");
        }
    }
}

// Timer function
function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.textContent = timeLeft;
        
        // Warning when time is running low
        if(timeLeft <= 10) {
            timeTag.parentElement.style.color = "var(--error)";
            timeTag.parentElement.style.fontWeight = "700";
        }
    } else {
        clearInterval(timer);
    }
}

// Reset game
function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.textContent = timeLeft;
    wpmTag.textContent = "0";
    cpmTag.textContent = "0";
    accuracyTag.textContent = "0%";
    mistakeTag.textContent = "0";
    timeTag.parentElement.style.color = "";
    timeTag.parentElement.style.fontWeight = "";
    showNotification("Test reset! Ready when you are.");
}

// Load new text
function loadNewText() {
    resetGame();
    showNotification("New text loaded! Good luck!");
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.style.bottom = "30px";
    notification.style.opacity = "1";
    
    setTimeout(() => {
        notification.style.bottom = "-100px";
        notification.style.opacity = "0";
    }, 3000);
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const icon = themeToggle.querySelector("i");
    if(document.body.classList.contains("dark-theme")) {
        icon.classList.replace("fa-moon", "fa-sun");
        showNotification("Dark mode enabled");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        showNotification("Light mode enabled");
    }
}

// Event listeners
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
newTextBtn.addEventListener("click", loadNewText);
themeToggle.addEventListener("click", toggleTheme);

// Initialize
loadParagraph();