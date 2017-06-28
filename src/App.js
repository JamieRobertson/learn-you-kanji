'use strict';

import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen, QuizScreen, PracticeScreen, HighScoreScreen } from './screens';


const LearnYouKanji = StackNavigator({
  Home: { screen: HomeScreen }
  // ,
  // Quiz: { screen: QuizScreen },
  // Practice: { screen: PracticeScreen },
  // HighScore: { screen: HighScoreScreen }
});

AppRegistry.registerComponent('LearnYouKanji', () => LearnYouKanji);

// 'use strict';

// import React from 'react';
// import { AppRegistry, NativeModules, Text, View } from 'react-native';


// class LearnYouKanji extends React.Component {
//     render() {
//         let QuestionManager = NativeModules.QuestionManager;
//         QuestionManager.getQuestions(10, 1, true, (err, res) => {
//             console.log(err);
//             console.log(res);
//             // this.setState({data: res})
//             // this.setState({isLoaded: true});
//         });
//         return (
//             <View>
//                 <Text>Hello</Text>
//             </View>
//         );
//     }
// }

// AppRegistry.registerComponent('LearnYouKanji', () => LearnYouKanji);
