let buttons = document.querySelectorAll("button");
let string = "";
let display = document.getElementById("button");

const clickSound = document.getElementById("click-sound");
const errorSound = document.getElementById("error-sound");
const resultSound = document.getElementById("result-sound");

function playClickSound() {
  clickSound.play();
}

function playErrorSound() {
  errorSound.play();
}

function playResultSound() {
  resultSound.play();
}

buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    playClickSound();  
    let value = e.target.innerHTML;

    if (value === "=") {
      try {
        string = eval(string) || "";
        playResultSound();  
      } catch {
        string = "Error";
        playErrorSound(); 
      }
    } else if (value === "AC") {
      string = "";
    } else if (value === "C") {
      if (string !== "Error") {
        string = string.slice(0, -1);
      } else {
        string = "";
      }
    } else {
      if (string === "Error") {
        string = "";
      }
      string += value;
    }

    display.value = string;
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/'].includes(key) || key === '.') {
    playClickSound();  
    string += key;
  } else if (key === 'Enter') {
    try {
      string = eval(string) || "";
      playResultSound();  
    } catch {
      string = "Error";
      playErrorSound(); 
    }
  } else if (key === 'Backspace') {
    if (string !== "Error") {
      string = string.slice(0, -1);
    } else {
      string = "";
    }
  } else if (key === 'Escape') {
    string = "";
  }
  display.value = string;
});
