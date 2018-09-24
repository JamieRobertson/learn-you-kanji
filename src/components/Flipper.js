import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { H1 } from '../components';
import { styles, colors } from '../styles';


class Flipper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
      flipFrontValue: new Animated.Value(0),
      flipBackValue: new Animated.Value(1)
    };
  }
  onPress() {
    let { isFlipped, flipFrontValue, flipBackValue } = this.state;
    
    Animated.parallel([
      Animated.timing(flipFrontValue, {
        toValue: isFlipped ? 0 : 1,
        duration: 300
      }),
      Animated.timing(flipBackValue, {
        toValue: isFlipped ? 1 : 0,
        duration: 300
      })
    ]).start(() =>
      this.setState({isFlipped: !this.state.isFlipped})
    );
  }
  render() {
    let k = this.props.k || false;
    let { question, answer } = this.props;
    let { isFlipped, flipFrontValue, flipBackValue } = this.state;

    let interpolateValue = (value) => {
      return (
        value.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-180deg']
        })
      );
    };

    return (
      <TouchableWithoutFeedback onPress={ this.onPress.bind(this) }>
        <View style={[flipper]}>
          <Animated.View style={[flipperInner, {transform: [{rotateY: interpolateValue(flipFrontValue)}] } ]}>
            <H1 title={ question } />
            <View style={flipperIconWrapper}>
              <Image 
                source={require('../static/img/question-icon.png')}
                style={flipperIcon}
              />
            </View>
          </Animated.View>
          <Animated.View style={[flipperInner, {transform: [{rotateY: interpolateValue(flipBackValue)}] } ]}>
            <Text style={[{textAlign: 'center', fontWeight: '500', marginBottom: 15}]}>
              { answer }
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const flipper = {
  position: 'relative',
  width: '80%',
  height: '40%',
  marginBottom: 60
};
const flipperInner = {
  backfaceVisibility: 'hidden',
  backgroundColor: colors.white,
  // perspective: 400, // ?
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: 15,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: colors.greyLight,
  borderRadius: 2
};
const flipperIconWrapper = {
  position: 'absolute',
  bottom: 6,
  right: 6,
  width: 21,
  height: 21,
  padding: 4,
  borderRadius: (21 / 2),
  backgroundColor: colors.greyLight
};
const flipperIcon = {
  width: 13,
  height: 13
};

Flipper.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  k: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

export default Flipper;
