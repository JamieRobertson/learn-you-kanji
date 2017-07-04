'use strict';

import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen, QuizScreen, PracticeScreen } from './screens';
// , HighScoreScreen

const LearnYouKanji = StackNavigator({
  Home: { screen: HomeScreen },
  Quiz: { screen: QuizScreen },
  Practice: { screen: PracticeScreen }//,
  // HighScore: { screen: HighScoreScreen }
});

AppRegistry.registerComponent('LearnYouKanji', () => LearnYouKanji);
