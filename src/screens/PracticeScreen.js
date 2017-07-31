import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Button, FlatList, NativeModules, Text, View } from 'react-native';
import { Col, Flipper, Row } from '../components';
import Dimensions from 'Dimensions';
import { styles } from '../styles';

// Simple practice screen.
// Load all questions and answers (shuffled) for course.
// Swipe back and forth to next/previous question.

// Math.round / floor should be used to make sure 
// listItemWidth is a whole number. 
// This is important for snapToInterval param
const {width, height} = Dimensions.get('window');
const listItemWidth = Math.floor((width * 0.74));  // 0.76 works
const listItemSpacing = ((width - listItemWidth) / 2)

class PracticeScreen extends PureComponent {
  static navigationOptions = {
    title: 'Kanji practice',
    headerBackTitle: 'Home',
    gesturesEnabled: false
  };
  renderFooter = (navigation) => (
    <Col flex={1} alignItems={'center'} justifyContent={'flex-start'} 
      style={[{'width': listItemWidth, paddingHorizontal: 0, paddingTop: 30}]}
    >
      <Text style={[styles.p]}>
        Congratulations! {'\n\n'}
        You've reached the end of all the flashcards in this section. {'\n\n'}
        Continue your practice by shuffling these kanji cards.
      </Text>
      <Button 
        title='Shuffle cards' 
        onPress={ () => navigation.navigate('Practice', { courseGrade: navigation.state.params.courseGrade }) }
      />
    </Col>
  );
  renderItem = ({item, index}) => (
    <Col flex={1} alignItems={'center'} justifyContent={'center'} 
      style={[{'width': listItemWidth, paddingHorizontal: 0}]}
    >
      <Flipper 
        id={item.id}
        question={item.question}
        answer={item.answer}
      />
    </Col>
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

    this.loadData.bind(this, params.courseGrade, maxQuestions=0, withChoices=false)();
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
        <Col alignItems={'center'} justifyContent={'center'} flex={1}>
          <ActivityIndicator size='large' />
        </Col>
      );
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderItem}
        horizontal={true}
        pagingEnabled={false}  // or snapToInterval wont work
        initialNumToRender={3}
        contentContainerStyle={
          [{flexDirection: 'row', alignItems: 'center', paddingHorizontal: listItemSpacing}]
        }
        // snapToAlignment={'start'}
        // centerContent={true} // not applicable
        // scrollEventThrottle={100}
        snapToInterval={listItemWidth}
        ListFooterComponent={this.renderFooter.bind(this, this.props.navigation)}  // end of list message - 'shuffle and start again'
      />
    );
  }
}

export default PracticeScreen;
