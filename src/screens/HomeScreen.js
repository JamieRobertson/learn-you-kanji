import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Button, NativeModules, ScrollView, Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { styles } from '../styles';

/** 
 * Fetch all course data from CoreData.
 * Render course items with titles and button links.
 */
// const data = [
//     { 'grade': 1, 'name': 'foo 1' },
// ...
// ]

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
    // ,header: null
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
    QuestionManager.getCourses((err, res) => {
      console.log(err);
      console.log(res);
      this.setState({data: res}, () => {
        this.setState({isLoaded: true})  
      });
    });    
  }
  renderCourseItems() {
    const { navigate } = this.props.navigation;
    let { data } = this.state;

    return data.map(function (course, i) {
      return (
        <View key={i}>
          <Text style={ [styles.h3] }>
            { course.name }
          </Text>
          <View style={ [styles.row] }>
            <Button 
              title='Take test'
              onPress={ () => navigate('Quiz', { courseGrade: course.grade }) }
            />
            <Button 
              title='Practice'
              onPress={ () => navigate('Practice', { courseGrade: course.grade }) }
            />
          </View>
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
      <ScrollView contentContainerStyle={ [styles.container, styles.alignTop, styles.headerSpacing] }>
        { this.renderCourseItems.bind(this)() }
      </ScrollView>
    );
  }
}

export default HomeScreen;
