import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Alert, NativeModules, ScrollView, Text, View } from 'react-native';
import { Btn, Choice, H1, QuizHeader } from '../components';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dimensions from 'Dimensions';
import { styles } from '../styles';

/**
 * Render questions with multiple choices.
 * If you select the correct choice you get a point.
 */

const {width, height} = Dimensions.get('window');
const widthPadding = 30;

// { answer: 'eye', correctAnswerKey: 2,
//     choices: [ 'dog', 'book', 'eye', 'eye', 'fire' ],
//     id: 75,
//     question: '目' },

class QuizScreen extends Component {
  static navigationOptions = {
    // title: 'Quiz'
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      totalScore: 0,
      currentQuestion: 0,
      chosenAnswer: null,
      hasSubmittedAnswer: false,
      chosenAnswerIsCorrect: false
    }
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.loadData.bind(this, params.courseGrade, maxQuestions=10, withChoices=true)();
  }
  loadData(forGrade, maxQuestions, withChoices) {
    let { isLoaded, data } = this.state;

    let QuestionManager = NativeModules.QuestionManager;
    QuestionManager.getQuestions(forGrade, maxQuestions, withChoices, (err, res) => {
      console.log(err); console.log(res);
      
      this.setState({data: res}, () => {
        this.setState({isLoaded: true});
      });
    });    
  }
  showNextQuestion() {
    let { currentQuestion } = this.state;
    // Reset states
    this.setState({hasSubmittedAnswer: false});
    this.setState({chosenAnswer: null});
    // Increment question index
    this.setState({currentQuestion: currentQuestion + 1}, () => {
      // Move scrollView to next item
      let scrollToX = ((width - widthPadding) * (currentQuestion + 1));
      this._scrollView.scrollTo({x: scrollToX, y: 0, animated: true});
    });
  }
  onSubmitAnswer() {
    // grade the answer then show 'next question' title
    const { navigate } = this.props.navigation;
    let { 
      currentQuestion, hasSubmittedAnswer, chosenAnswerIsCorrect, 
      totalScore, chosenAnswer, data
    } = this.state;

    // if an answer is selected:
    if (hasSubmittedAnswer) {
      // go to next question
      if (currentQuestion < (data.length - 1)) {
        this.showNextQuestion();
      } else {
        // go to score screen
        navigate('HighScore', { totalScore: totalScore });
      }
    
    // user is submitting answer
    } else {
      this.setState({hasSubmittedAnswer: true});
      // check if correct
      if (chosenAnswerIsCorrect) {
        this.setState({totalScore: totalScore + 1});
        // increase question strength
        // let QuestionManager = NativeModules.QuestionManager;
        // let currentQuestionId = data[currentQuestion].id;
        // QuestionManager.strengthenQuestion(currentQuestionId);
      }
    }
  }
  onChooseAnswer(choiceIndex, isCorrect) {
    // Highlight choice by setting chosenAnswer
    this.setState({chosenAnswer: choiceIndex});

    // Has user selected correct answer?
    if (isCorrect) {
      this.setState({chosenAnswerIsCorrect: true});
    } else {
      this.setState({chosenAnswerIsCorrect: false});
    }
  }
  renderChoices(choices, correctAnswerKey, scrollItemId) {
    let { chosenAnswer, currentQuestion } = this.state;
    // isActive style - must check current 
    // question currentQuestion id to be more specific

    return choices.map((choice, i) => {
      return (
        <Choice 
          key={ i }
          title={ choice }
          choiceIndex={ i }
          isCorrect={ correctAnswerKey === i }
          isActive={ currentQuestion === scrollItemId && chosenAnswer === i }
          onPress={ this.onChooseAnswer.bind(this) }
        />
      );
    });
  }
  renderQuizItems() {
    let { data } = this.state;

    return data.map((question, i) => {
      return (
        <View 
          key={question.id}
          style={[styles.alignTop, {width: width - widthPadding}]}
        >
          <View style={{flex: 4, paddingBottom: 15}}>
            <H1 title={ question.question } />
            <Text>{ question.answer }</Text>
            <Text>{ question.correctAnswerKey }</Text>
          </View>
          <View style={[styles.row, styles.floatLeft]}>
            { this.renderChoices.bind(
                this,
                question.choices,
                question.correctAnswerKey,
                i
              )() }
          </View>
        </View>
      );
    });
  }
  render() {
    let { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <View style={[styles.container]}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View>
        <ScrollView
          ref={(x) => this._scrollView = x}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          snapToAlignment={'center'}
          snapToInterval={1}
        >
          { this.renderQuizItems.bind(this)() }
        </ScrollView>
      </View>
    );
  }
}

export default QuizScreen;
