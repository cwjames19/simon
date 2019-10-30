import { css } from 'styled-components/macro';
import { Howl } from 'howler';

export const colorButtonData = {
  red: {
    index: 0,
    color: 'red',
    viewBox: '0 -240 240 240',
    path: 'M12.790226720622947,-209.61013835317A210,210,0,0,1,209.61013835317,-12.790226720622956L124.34391863068761,-12.790226720622956A125,125,0,0,0,12.790226720622954,-124.34391863068761Z',
    styles: css`
      top: 0px;
      right: 0px;
    `,
    sound: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    }),
  },
  blue: {
    index: 1,
    color: 'blue',
    viewBox: '-240 -240 240 240',
    path: 'M-209.61013835317,-12.790226720622908A210,210,0,0,1,-12.790226720623066,-209.61013835317L-12.790226720623023,-124.34391863068761A125,125,0,0,0,-124.34391863068761,-12.79022672062293Z',
    styles: css`
      top: 0px;
      left: 0px;
    `,
    sound: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    }),
  },
  yellow: {
    index: 2,
    color: 'yellow',
    viewBox: '-240 0 240 240',
    path: 'M-12.79022672062292,209.61013835317A210,210,0,0,1,-209.61013835317,12.79022672062296L-124.34391863068761,12.790226720622961A125,125,0,0,0,-12.790226720622938,124.34391863068761Z',
    styles: css`
      bottom: 0px;
      left: 0px;
    `,
    sound: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    }),
  },
  green: {
    index: 3,
    color: 'green',
    viewBox: '0 0 240 240',
    path: 'M209.61013835317,12.790226720622956A210,210,0,0,1,12.790226720622947,209.61013835317L12.790226720622954,124.34391863068761A125,125,0,0,0,124.34391863068761,12.790226720622956Z',
    styles: css`
      bottom: 0px;
      right: 0px;
    `,
    sound: new Howl({
      src: ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"],
      volume: 1.0,
      autoplay: false,
      html5: true,
      loop: false,
      rate: 0.55
    })
  },
};

export const mistakeSequenceData = {
  sequence: [
    ['red', 'blue', 'yellow', 'green'],
    ['red', 'blue', 'yellow', 'green'],
    ['red', 'blue', 'yellow', 'green'],
    ['red', 'blue', 'yellow', 'green'],
  ],
  activationDuration: 75,
  interval: 75,
}

export const startingSequenceData = {
  sequence: [
    ['red'],
    ['blue'],
    ['yellow'],
    ['green'],
    ['red'],
    ['blue'],
    ['yellow'],
    ['green'],
    ['red'],
    ['blue'],
    ['yellow'],
    ['green'],
    ['red'],
  ],
  activationDuration: 40,
  interval: 10,
}