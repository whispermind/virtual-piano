let piano = document.querySelector(".container-piano"),
  pianoButtonsDescription = document.querySelector(".container-buttons"),
  pianoButtons = document.querySelectorAll(".butt"),
  fullScreenButton = document.querySelector(".fullscreen-button"),
  hotkeys = ["Z", "X", "C", "V", "B", "N", "M", "S", "D", "G", "H", "J"];

document.addEventListener("keypress", (event) => {
  console.log(event.key);
  if (!hotkeys.includes(event.key.toUpperCase())) return;
  document.querySelector(`[data-hotkey='${event.key.toUpperCase()}']`).click();
});

fullScreenButton.addEventListener("click", (event) => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen();
    document.addEventListener("fullscreenchange", changeBg);
  }
  function changeBg() {
    if (document.fullscreenElement) {
      fullScreenButton.style.backgroundImage =
        "url(assets/svg/fullscreen-exit.svg)";
    } else {
      fullScreenButton.style.backgroundImage = "";
      document.removeEventListener("fullscreenchange", changeBg);
    }
  }
});

piano.addEventListener("click", (event) => {
  if (!event.target.classList.contains("butt")) return;
  event.target.addEventListener("transitionend", () =>
    event.target.classList.remove("active-size")
  );
  event.target.classList.add("active-size");
  playAudio(event.target.dataset.note);
});

pianoButtonsDescription.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("button-active") ||
    event.target.tagName != "BUTTON"
  )
    return;
  pianoButtonsDescription.children[0].classList.toggle("button-active");
  pianoButtonsDescription.children[1].classList.toggle("button-active");
  if (event.target == pianoButtonsDescription.children[0])
    pianoButtons.forEach((elem) => applyNotes(elem));
  else pianoButtons.forEach((elem) => applyLetters(elem));
  function applyLetters(elem) {
    if (elem.classList.contains("white-key")) {
      elem.classList.remove("white-notes");
      elem.classList.add("white-letters");
    } else {
      elem.classList.remove("black-notes");
      elem.classList.add("black-letters");
    }
  }
  function applyNotes(elem) {
    if (elem.classList.contains("white-key")) {
      elem.classList.remove("white-letters");
      elem.classList.add("white-notes");
    } else {
      elem.classList.remove("black-letters");
      elem.classList.add("black-notes");
    }
  }
});

document.addEventListener("mousedown", (event) => {
  let current = null;
  document.addEventListener("mousemove", cursorOver);
  document.addEventListener("mouseup", (event) =>
    document.removeEventListener("mousemove", cursorOver)
  );
  function cursorOver(event) {
    if (!event.target.classList.contains("butt")) return;
    if (event.target != current) {
      current = event.target;
      event.target.click();
    }
  }
});

function playAudio(str) {
  if (str.length != 1) str = str[0] + "c";
  new Audio(`assets/audio/${str}.mp3`).play();
}
