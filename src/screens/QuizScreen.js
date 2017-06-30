import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Alert, Button, NativeModules, ScrollView, Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { styles } from '../styles';


// { answer: 'eye',
//     correctAnswerKey: 2,
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
      data: []
    }
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.loadData.bind(this, course=params.courseGrade)();
  }
  loadData(forGrade, maxQuestions=10, withChoices=true) {
    let { isLoaded, data } = this.state;

    let QuestionManager = NativeModules.QuestionManager;
    QuestionManager.getQuestions(forGrade, maxQuestions, withChoices, (err, res) => {
      console.log(err); console.log(res);
      
      this.setState({data: res}, () => {
        this.setState({isLoaded: true});
      });
    });    
  }
  renderQuizItems() {
    let { data } = this.state;

    return data.map((question, i) => {
      return (
        <View key={i}>
          <Text>{ question.id }</Text>
          <Text>{ question.question }</Text>
          <Text>{ question.answer }</Text>
          <Text>{ question.correctAnswerKey }</Text>
        </View>
      );
    });
  }
  render() {
    let { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <Grid>
          <ActivityIndicator size='large' />
        </Grid>
      );
    }

    return (
      <View>
        { this.renderQuizItems.bind(this)() }
      </View>
    );
  }
}

export default QuizScreen;
