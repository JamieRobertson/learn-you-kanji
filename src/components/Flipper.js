import React from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { H1 } from '../components';
import { styles, colors } from '../styles';


class Flipper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.flipValue = new Animated.Value(0);
    this.state = {
      showFront: true//,
      // flipValue: new Animated.Value(0)
    };
    // Animated.timing(this.flipValue, {
    //     toValue: 1,
    //     duration: 3000
    // });
  }
  componentDidMount() {
    this.flipValue.timing(this.flipValue, {
        toValue: 1,
        duration: 3000
    });
  }
  render() {
    let k = this.props.k || false;
    let { question, answer } = this.props;
    let { showFront, flipValue } = this.state;

    const flipInterpolation = flipValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    });
    const flipInterpolationReverse = flipValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-180deg', '0deg']
    });
    let isFlipped =  {
      front: this.state.showFront ?  { transform: [{rotateY: flipInterpolation}] } : { transform: [{rotateY: flipInterpolation}] },
      back: this.state.showFront ? { transform: [{rotateY: flipInterpolationReverse}] } : { transform: flipInterpolationReverse }
    };

    return (
      <View 
        style={[flipperContainer]}
      >
        <TouchableWithoutFeedback     
          onPress={ () => this.setState({showFront: !this.state.showFront}) }
        >
          
            <View style={[flipper]}>
              <Animated.View style={[flipperInner, isFlipped.front]}>
                <H1 title={ question } />
              </Animated.View>
              <Animated.View style={[flipperInner, isFlipped.back]}>
                <Text style={[{textAlign: 'center', fontWeight: '500', marginBottom: 15}]}>
                  { answer }
                </Text>
              </Animated.View>
            </View>
          
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const flipperContainer = {
  position: 'relative',
  marginBottom: 30,
  backgroundColor: colors.white,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: colors.greyLight,
  borderRadius: 2,
  padding: 15,
  width: '80%',
  height: '40%'
};
const flipper = {
  position: 'relative',
  height: '100%'
};
const flipperInner = {
  backfaceVisibility: 'hidden',
  // perspective: 400, // ?
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%'
};

export default Flipper;
