import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  ActivityIndicator, Modal, NativeModules, 
  ScrollView, Text, TouchableOpacity, View 
} from 'react-native';

import { 
  Btn, Choice, Col, H1, Row, QuizHeader, QuizModal 
} from '../components';

import Dimensions from 'Dimensions';
import { styles, colors } from '../styles';

/**
 * Render questions with multiple choices.
 * If you select the correct choice you get a point.
 */

const maxQuestions = 10;
const {width, height} = Dimensions.get('window');
const widthPadding = 30;
const gridWidth = width - widthPadding;


class QuizScreen extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
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
      chosenAnswerIsCorrect: false, 
      isModalVisible: false
    }
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.loadData.bind(this, params.courseGrade, maxQuestions=maxQuestions, withChoices=true)();
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
  setModalVisibility(visible) {
    this.setState({isModalVisible: visible});
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
        this.setModalVisibility(false);
        this.showNextQuestion();
      } else {
        // go to score screen
        navigate('HighScore', { totalScore: totalScore });
      }
    
    // user is submitting answer
    } else {
      this.setState({hasSubmittedAnswer: true});
      this.setModalVisibility(true);
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
  renderModal() {
    let { data, currentQuestion, isModalVisible, chosenAnswerIsCorrect } = this.state;
    let modalText = {
      correct: 'Correct!',
      incorrect: 'Correct answer:\n'+ data[currentQuestion].answer
    };

    //     onPress={() => this.setModalVisibility(false)}
    if (isModalVisible) {
      return (
        <TouchableOpacity style={[styles.modalWrapper]}>
          <View style={[styles.modal, styles.dropShadow, {backgroundColor: chosenAnswerIsCorrect ? colors.greenLight : colors.redLight}]}>
            <Text style={[styles.modalText]}>
              { chosenAnswerIsCorrect ? modalText.correct : modalText.incorrect }
            </Text>
          </View>
        </TouchableOpacity>
      );
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

    // <Text>{ question.answer }</Text>
    // <Text>{ question.correctAnswerKey }</Text>

    return data.map((question, i) => {
      return (
        <Col 
          key={question.id}
          alignItems={'center'}
          style={[{width: gridWidth}]}
        >
          <H1 title={ question.question } />
          
          <Row 
            justifyContent={'center'} 
            style={[{flexWrap: 'wrap'}]}
          >
            {this.renderChoices.bind( 
              this,
              question.choices,
              question.correctAnswerKey,
              i 
            )()}
          </Row>
        </Col>
      );
    });
  }
  render() {
    let { navigation } = this.props;
    let { 
      isLoaded, chosenAnswer, 
      hasSubmittedAnswer, currentQuestion 
    } = this.state;

    let submitButtonStyle = chosenAnswer === null ? [styles.btnDisabled] : [styles.btnSuccess];

    if (!isLoaded) {
      return (
         <Col alignItems={'center'} justifyContent={'center'} flex={1}>
          <ActivityIndicator size='large' />
        </Col>
      );
    }

    return (
      <Col alignItems={'center'} flex={1}>
        <QuizHeader navigation={navigation} progress={currentQuestion / maxQuestions} />
        <Row>
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
        </Row>
        <Row style={[{position: 'absolute', bottom: 5}]}>
          <Btn 
            title={ hasSubmittedAnswer === false ? 'Check answer' : 'Next question' } 
            buttonStyle={ submitButtonStyle }
            disabled={ chosenAnswer === null ? true : false}
            onPress={ this.onSubmitAnswer.bind(this) }
          />
        </Row>
        { this.renderModal.bind(this)() }
      </Col>
    );
  }
}

export default QuizScreen;
