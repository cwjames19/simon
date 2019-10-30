const countDisplay = $("#count-display-text")[0],
  sound = {
    red: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    }),
    blue: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    }),
    yellow: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    }),
    green: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    })
  };
var powerOn = false,
  awaitingInput = false,
  strictMode = false,
  currentGame = null,
  activeButton = null,
  activeButtonSound = null,
  activeTimer = null,
  deactiveateActiveButton = null;
function Game(strict) {
  var getRandomStep = function () {
    let newStep,
      num = Math.floor(Math.random() * 4);
    switch (num) {
      case 0:
        return "green";
        break;
      case 1:
        return "yellow";
        break;
      case 2:
        return "blue";
        break;
      case 3:
        return "red";
        break;
    }
  };
  this.strict = strictMode;
  this.awaitingInput = false;
  this.sequence = [];
  this.currentAttempt = null;
  this.addStep = function () {
    this.awaitingInput = false;
    if (this.sequence >= 20) {
      startingLights();
      endGame();
    }
    this.sequence.push(getRandomStep());
    countDisplay.textContent = this.sequence.length;
    window.setTimeout(this.playSequence.bind(this), 500);
  };
  this.playSequence = function () {
    let triggerActivation = function (color) {
      return function () {
        return new Promise((resolve, reject) => {
          activateColorButton(color);
          window.setTimeout(() => { deactivateActiveButton() }, 650);
          window.setTimeout(() => { resolve() }, 750);
        });
      };
    };
    this.sequence.reduce((a, b) => a.then(triggerActivation(b)), Promise.resolve())
      .then((value) => {
        this.currentAttempt = new Attempt();
        this.awaitingInput = true;
      });
  };
};
function Attempt() {
  this.attemptSequence = [];
};
Attempt.prototype.add = function (color) {
  this.attemptSequence.push(color);
  if (this.compare()) {
    if (this.attemptSequence.length == currentGame.sequence.length) {
      window.setTimeout(() => { currentGame.addStep() }, 750);
    }
  } else {
    errorLights()
      .then(wrongEntry());
  }
};
Attempt.prototype.compare = function () {
  return this.attemptSequence[this.attemptSequence.length - 1] == currentGame.sequence[this.attemptSequence.length - 1];
};

function activateColorButton(data) {
  if (!powerOn)
    return
  if (activeButton && currentGame.awaitingInput) {
    clearTimeout(activeTimer);
    deactivateActiveButton();
  }
  if (data.hasOwnProperty("target") && currentGame && currentGame.awaitingInput) {
    activeButton = $(`#${data.target.id}`);
    activeButtonSound = sound[`${data.target.id}`];
    currentGame.currentAttempt.add(activeButton[0].id);
    activeTimer = window.setTimeout(() => { deactivateActiveButton() }, 725);
  } else {
    activeButton = $(`#${data}`);
    activeButtonSound = sound[`${data}`];
  }
  activeButtonSound.play();
  activeButton.addClass("active");
}
function deactivateActiveButton() {
  activeButtonSound.stop();
  activeButton.removeClass("active");
  activeButtonSound = null;
  activeButton = null;
}
function wrongEntry() {
  currentGame.awaitingInput = false;
  if (strictMode) {
    endGame();
  } else {
    window.setTimeout(() => { currentGame.playSequence() }, 750);
  }
}
function powerSwitch(event) {
  if (powerOn) {
    powerOn = false;
    currentGame = null;
    if (strictMode) toggleStrictMode();
    $("#power-square").css("transform", "translate(0px, 0px)");
    $("#power-on-text").css("fill", "darkgrey");
    $("#power-off-text").css("fill", "black");
    countDisplay.style.display = "none";
    countDisplay.textContent = "00";
  } else {
    powerOn = true;
    $("#power-square").css("transform", "translate(18px, 0px)");
    $("#power-on-text").css("fill", "red");
    $("#power-off-text").css("fill", "darkgrey");
    countDisplay.style.display = "block";
  }
}
function startNewGame() {
  if (currentGame) return;
  startingLights()
    .then((value) => {
      currentGame = new Game(strictMode);
      currentGame.addStep();
    });
}
function endGame() {
  currentGame = null;
  countDisplay.textContent = "00";
}
function toggleStrictMode() {
  if (powerOn && !currentGame) {
    strictMode = !strictMode;
    $("#strict-mode-lamp").toggleClass("active");
  }
}
function startingLights() {
  let sequence = ['green', 'yellow', 'blue', 'red'];
  sequence = [...sequence, ...sequence, ...sequence];
  let triggerActivation = function (color) {
    return function () {
      return new Promise((resolve, reject) => {
        activateColorButton(color);
        window.setTimeout(() => deactivateActiveButton(), 40);
        window.setTimeout(() => resolve(), 45);
      });
    };
  };
  return sequence.reduce((a, b) => a.then(triggerActivation(b)), Promise.resolve())
    .then((value) => 'finished starting lights');
}
function errorLights() {
  let buttons = $(".color-button");
  return new Promise((resolve, reject) => {
    buttons.addClass("active");
    window.setTimeout(() => { buttons.removeClass("active") }, 75);
    window.setTimeout(() => { buttons.addClass("active") }, 80);
    window.setTimeout(() => { buttons.removeClass("active") }, 155);
    window.setTimeout(() => { buttons.addClass("active") }, 160);
    window.setTimeout(() => { buttons.removeClass("active") }, 235);
    window.setTimeout(() => { buttons.addClass("active") }, 240);
    window.setTimeout(() => { buttons.removeClass("active") }, 315);
    window.setTimeout(() => { resolve('finished error lights') }, 620);
  });
}

$().ready(function () {
  $(".color-button").on("click", activateColorButton);
  $("#power-switch").on("click", powerSwitch);
  $("#strict-mode-button").on("click", toggleStrictMode);
  $("#start-button").on("click", startNewGame);
});