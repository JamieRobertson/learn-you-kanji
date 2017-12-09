import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Button, Image, NativeModules, ScrollView, Text, View } from 'react-native';

import { Row, Col, Btn } from '../components';
import { styles, colors } from '../styles';

/** 
 * Fetch all course data from CoreData.
 * Render course items with titles and button links.
 */
const homeIcons = [
  require('../static/img/course-icon-01.png'),
  require('../static/img/course-icon-02.png'),
  require('../static/img/course-icon-03.png'),
  require('../static/img/course-icon-04.png'),
  require('../static/img/course-icon-05.png'),
  require('../static/img/course-icon-06.png'),
  require('../static/img/course-icon-07.png'),
  require('../static/img/course-icon-08.png'),
  require('../static/img/course-icon-09.png'),
  require('../static/img/course-icon-10.png'),
  require('../static/img/course-icon-11.png')
]

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
    gesturesEnabled: false
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
      // console.log(err); // console.log(res);
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
        <View key={i} style={[ styles.contentCard, styles.dropShadow ]}>
          <Row>
            <Col flex={1}>
              <Image source={homeIcons[i]} style={styles.icon} />
            </Col>
            <Col flex={11}>
              <Text style={ [styles.h3] }>
                { course.name }
              </Text>
            </Col>
          </Row>
          <Row>
            <Col flex={12}>
              <Text style={ [styles.p] }>
                Lorem ipsum dolor set amat.
              </Text>
            </Col>
          </Row>
          <Row style={[{borderColor: colors.grey, borderTopWidth: 1 }]}>
            <Col flex={6} style={[{borderColor: colors.grey, borderRightWidth: 1 }]}>
              <Btn
                title='Practice'
                buttonStyle={[styles.btnGhost, styles.btnSm]}
                textStyle={[{color: colors.blue, fontWeight: '500'}]}
                onPress={ () => navigate('Practice', { courseGrade: course.grade }) }
              />
            </Col>
            <Col flex={6}>
              <Btn
                title='Test'
                buttonStyle={[styles.btnGhost, styles.btnSm]}
                textStyle={[{color: colors.blue, fontWeight: '500'}]}
                onPress={ () => navigate('Quiz', { courseGrade: course.grade }) }
              />
            </Col>
          </Row>
        </View>
      );
    });
  }
  render() {
    let { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <Col alignItems={'center'} justifyContent={'center'} flex={1}>
          <ActivityIndicator size='large' />
        </Col>
      );
    }

    return (
      <ScrollView>
        <Col style={[styles.headerMargin, {paddingTop: 15, paddingBottom: 60}]}>
          { this.renderCourseItems.bind(this)() }
        </Col>
      </ScrollView>
    );
  }
}

export default HomeScreen;
