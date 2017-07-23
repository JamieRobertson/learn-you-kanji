'use strict';

import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen, QuizScreen, QuizScoreScreen, PracticeScreen } from './screens';

const LearnYouKanji = StackNavigator({
  Home: { screen: HomeScreen },
  Quiz: { screen: QuizScreen },
  Practice: { screen: PracticeScreen },
  QuizScore: { screen: QuizScoreScreen }
});

AppRegistry.registerComponent('LearnYouKanji', () => LearnYouKanji);
