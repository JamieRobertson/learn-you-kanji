import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, NativeModules, Text } from 'react-native';
import { Btn, Col } from '../components';
import { styles, colors } from '../styles';

class QuizScoreScreen extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true
    }
  }
  componentDidMount() {
    // use this function to submit current high score for this course grade
    // Will be used as overall strength of this course?
    // Then set state isLoaded to true
  }
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let { isLoaded } = this.state;

    if (!isLoaded) {
      return (
         <Col alignItems={'center'} justifyContent={'center'} flex={1}>
          <ActivityIndicator size='large' />
        </Col>
      );
    }

    return(
      <Col alignItems={'center'} justifyContent={'center'} flex={1}>
        <Text style={[styles.p]}>Your score was: { params.totalScore }</Text>
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
