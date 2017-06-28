import React, {Component, PropTypes} from 'react';
import { ActivityIndicator, Alert, Button, NativeModules, ScrollView, Text, View } from 'react-native';
import { styles } from '../styles';

/** 
 * Fetch all course data from CoreData.
 * Render course items with titles and button links.
 */
// const data = [
//     { 'grade': 1, 'name': 'foo 1' },
//     { 'grade': 2, 'name': 'foo 2' },
//     { 'grade': 3, 'name': 'foo 3' },
//     { 'grade': 4, 'name': 'foo 4' },
//     { 'grade': 5, 'name': 'foo 5' }
// ]

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
    //,header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: []
    }
  }
  componentDidMount() {
    this.loadData.bind(this, course=2)();
  }
  loadData(maxQuestions=10, course=1, withChoices=true) {
    let { isLoaded, data } = this.state;

    let QuestionManager = NativeModules.QuestionManager;
    QuestionManager.getQuestions(maxQuestions, course, withChoices, (err, res) => {
      console.log(err);
      console.log(res);
      this.setState({data: res})
      this.setState({isLoaded: true});
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
      <View style={[styles.container]}>
        <Text>Loaded</Text>
      </View>
    );
  }
}

export default HomeScreen;
