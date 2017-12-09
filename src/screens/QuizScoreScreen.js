import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Button, Text } from 'react-native';
import { Btn, Col } from '../components';
import { styles, colors } from '../styles';


class QuizScoreScreen extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
  }
  printMessage() {
    const { params } = this.props.navigation.state;
    const { totalScore } = params;
    let text = `Your score was: ${params.totalScore}\n`;
    let s = totalScore === 1 ? '': 's';

    if (totalScore > 9) { text += `Wow, you got all these questions correct. Try again and you will have new questions.` }
    else if (totalScore > 5) { text += `You answered more than half these questions correctly.` }
    else if (totalScore > 4) { text += `You got half the questions correct.` }
    else if (totalScore > 0) { text += `You got ${totalScore} question${s} correct.` }
    else { text += `Oh no, you didn't get any questions correct. Practice makes perfect.` }

    return text;
  }
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return(
      <Col alignItems={'center'} justifyContent={'center'} flex={1}>
        <Text style={[styles.p]}>
          { this.printMessage.bind(this)() }
        </Text>
        <Btn
          title='Try again'
          buttonStyle={[styles.btnGhost, styles.btnSm]}
          textStyle={[{color: colors.blue, fontWeight: '500'}]}
          onPress={ () => navigate('Quiz', { courseGrade: params.courseGrade }) }
        />
        <Btn
          title='Back to home'
          buttonStyle={[styles.btnGhost, styles.btnSm]}
          textStyle={[{color: colors.blue, fontWeight: '500'}]}
          onPress={ () => navigate('Home') }
        />
      </Col>
    );
  }
}

export default QuizScoreScreen;
