import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, FlatList, NativeModules, Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Flipper, H1 } from '../components';
import Dimensions from 'Dimensions';
import { styles } from '../styles';

/**
 * Simple practice screen.
 * Load all questions and answers (shuffled) for course.
 * Swipe back and forth to next/previous question.
 */

const {width, height} = Dimensions.get('window');
// const listItemWidth = (width * 0.75);

class PracticeScreen extends PureComponent {
  static navigationOptions = {
    title: 'Kanji practice'
  };
  renderItem = ({item}) => (
    <View style={[styles.container, styles.alignTop, {'width': width}]}>
      <Flipper 
        id={item.id}
      >
        <H1 
          title={item.question} 
          style={[styles.flipperFront]}
        />
        <Text style={[styles.flipperBack]}>
          { item.answer }
        </Text>
      </Flipper>
    </View>
  );
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: []
    }
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.loadData.bind(this, params.courseGrade, maxQuestions=-1, withChoices=false)();
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
  render() {
    let { isLoaded, data } = this.state;

    if (!isLoaded) {
      return (
        <View style={[styles.container]}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderItem}
        horizontal={true}
        pagingEnabled={true}
        initialNumToRender={1}
        style={[styles.row]}
        snapToAlignment={'center'}
        snapToInterval={1}
      />
    );

  }
}

export default PracticeScreen;
