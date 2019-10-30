import React from 'react';
import styled from 'styled-components/macro';
import { colorButtonData, mistakeSequenceData, startingSequenceData } from '../helpers/config';
import { getRandomColor } from '../helpers/utils';
import { media } from '../styles/breakpoints';
import ColorButton from './ColorButton';
import ControlBoard from './ControlBoard';

const StyledMain = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: lavender;
  justify-content: center;
  align-items: center;
  padding: 10px;

  ${media.phoneMd} {
    padding: 20px;
  }
`;

const StyledGameBoard = styled.div`
  position: relative;
  width: ${p => p.theme.breakpoint.phone - 20}px;
  height: ${p => p.theme.breakpoint.phone - 20}px;
  border-radius: 50%;
  background-color: ${p => p.theme.color.darkGrey};
  z-index: ${p => p.theme.zIndex.board};

  ${media.phoneMd} {
    width: ${p => p.theme.breakpoint.phoneMd - 40}px;
    height: ${p => p.theme.breakpoint.phoneMd - 40}px;
  }
`;

const initialProps = {
  activeColors: [],
  activeTimers: [],
  activeButtonSound: null,
  attempt: [],
  attemptSuccess: false,
  awaitingInput: false,
  mistakeMade: false,
  noStartButton: false,
  sequence: [],
  reject: null,
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialProps,
      strictMode: false,
    };

    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.toggleStrictMode = this.toggleStrictMode.bind(this);
    this.handleColorButtonClick = this.handleColorButtonClick.bind(this);
    this.addStepToSequence = this.addStepToSequence.bind(this);
    this.playSequence = this.playSequence.bind(this);
    this.activateColor = this.activateColor.bind(this);
    this.deactivateColor = this.deactivateColor.bind(this);
    this.initializeGame = this.initializeGame.bind(this);
    this.activateMistakeLights = this.activateMistakeLights.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  componentDidMount() {
    // mount event handlers for making game accessible
  }

  handleStartButtonClick() {
    const { sequence, strictMode, noStartButton } = this.state;
    if (noStartButton) { return; }
    if (sequence.length) {
      this.endGame();
    } else {
      this.initializeGame(strictMode);
    }
  }

  toggleStrictMode() {
    if (!this.state.sequence.length) {
      this.setState((prevState) => ({
        strictMode: !prevState.strictMode,
      }))
    }
  }

  handleColorButtonClick(color) {
    const {
      awaitingInput, sequence, attempt, mistakeMade,
    } = this.state;
    if (
      awaitingInput &&
      sequence.length &&
      (attempt.length < sequence.length) &&
      !mistakeMade) {
      this.activateColor(color);
      this.checkForMistake(color);
    }
  }

  checkForMistake(color) {
    const { sequence, attempt } = this.state;
    if (sequence[attempt.length] === color) {
      const newAttempt = [...attempt, color];
      if (newAttempt.length === sequence.length) {
        this.setState(prevState => ({
          attempt: [...prevState.attempt, color],
          attemptSuccess: true,
          awaitingInput: false,
        }));
      } else {
        this.setState(prevState => ({
          attempt: [...prevState.attempt, color],
        }));
      }
    } else {
      this.setState({
        mistake: true,
        awaitingInput: false,
      });
    }
  }

  addStepToSequence() {
    const newSequence = [...this.state.sequence, getRandomColor()];

    this.setState((prevState) => ({
      sequence: newSequence,
      awaitingInput: false,
      noStartButton: false,
    }));

    this.playSequence(newSequence)
      .then((value) => {
        this.setState({
          attempt: [],
          awaitingInput: true,
        });
      });
  }

  playSequence(sequence, activationDuration = 650, interval = 100) {
    let triggerActivation = function (color) {
      return function () {
        return new Promise((resolve, reject) => {
          this.activateColor(color);
          const deactivationTimer = window.setTimeout(() => { this.deactivateColor() }, activationDuration);
          this.setState((prevState) => ({
            activeTimers: [...prevState.activeTimers, deactivationTimer],
            reject,
          }));
          window.setTimeout(() => { resolve() }, (activationDuration + interval));
        });
      };
    };
    return sequence.reduce((acc, next) => acc.then(triggerActivation(next).bind(this)), Promise.resolve());
  }

  activateColor(color) {
    const { activeTimers, activeButtonSound } = this.state;

    if (activeTimers.length) {
      activeTimers.forEach(timer => { clearTimeout(timer); });
    }
    if (activeButtonSound) {
      activeButtonSound.stop();
    }

    const newActiveColors = Array.isArray(color) ? [...color] : [color];
    const newActiveButtonSound = Array.isArray(color) ? null : colorButtonData[color].sound;
    const timer = setTimeout(() => {
      this.deactivateColor();
    }, 700);

    if (newActiveButtonSound) {
      newActiveButtonSound.play();
    }
    this.setState({
      activeColors: newActiveColors,
      activeButtonSound: newActiveButtonSound,
      activeTimers: [timer],
    });
  }

  deactivateColor() {
    const { activeButtonSound, mistake, attemptSuccess } = this.state;
    if (activeButtonSound) {
      activeButtonSound.stop();
    }

    this.setState({
      activeColors: [],
      activeTimers: [],
    })

    if (mistake) {
      this.activateMistakeLights();
    } else if (attemptSuccess) {
      const timer = setTimeout(() => {
        this.addStepToSequence();
      }, 1250);
      this.setState(prevState => ({
        activeTimers: [...prevState.activeTimers, timer],
        attemptSuccess: false,
      }));
    }
  }

  activateMistakeLights() {
    const { strictMode, sequence } = this.state;
    const { sequence: mistakeSequence, activationDuration, interval } = mistakeSequenceData;

    this.setState({
      mistake: false,
    });

    this.playSequence(mistakeSequence, activationDuration, interval)
      .then((res) => {
        if (strictMode) {
          setTimeout(() => {
            this.endGame();
          }, 1000);
        } else {
          setTimeout(() => {
            this.playSequence(sequence)
              .then((res) => {
                this.setState({
                  awaitingInput: true,
                })
              })
          }, 1250);
        }
      });
  }

  initializeGame() {
    const { sequence, activationDuration, interval } = startingSequenceData;
    this.setState({
      noStartButton: true,
    })
    this.playSequence(sequence, activationDuration, interval)
      .then((res) => {
        const timer = setTimeout(() => {
          this.addStepToSequence();
        }, 750);
        this.setState(prevState => ({
          activeTimers: [...prevState.activeTimers, timer],
        }));
      })
  }

  endGame() {
    if (this.state.reject) {
      this.state.reject();
    }
    if (this.state.activeButtonSound) {
      this.state.activeButtonSound.stop();
      this.state.activeTimers.forEach(timer => { clearTimeout(timer); });
    }
    this.setState({
      ...initialProps,
    });
  }

  render() {
    const {
      activeColors,
      strictMode,
      sequence,
    } = this.state;

    const colorButtons = Object.values(colorButtonData).map(colorButton => (
      <ColorButton
        data={colorButton}
        key={colorButton.color}
        activeColors={activeColors}
        onButtonClick={this.handleColorButtonClick}
      />
    ));

    const count = sequence.length === 0 ? undefined : sequence.length;

    return (
      <StyledMain>
        <StyledGameBoard>
          {colorButtons}
          <ControlBoard
            onStartClick={this.handleStartButtonClick}
            onStrictClick={this.toggleStrictMode}
            strictMode={strictMode}
            count={count}
          />
        </StyledGameBoard>
      </StyledMain >
    );
  }
};

export default Main;
