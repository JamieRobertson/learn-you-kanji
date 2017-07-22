import React from 'react';
import { LayoutAnimation, Easing, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { H1 } from '../components';
import { styles, colors } from '../styles';


class Flipper extends React.PureComponent {
  constructor(props) {
    super(props);
    LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
    this.state = {
      isFlipped: false
    };
  }
  onPress() {
    
    this.setState({isFlipped: !this.state.isFlipped});
  }
  render() {
    let k = this.props.k || false;
    let { question, answer } = this.props;
    let { isFlipped } = this.state;

    return (
      <TouchableWithoutFeedback onPress={ this.onPress.bind(this) }>
        <View style={[flipperContainer]}>

          <View style={[flipper]}>
            <View style={[flipperInner, isFlipped ? {transform: [{rotateY: '-180deg'}]} : {transform: [{rotateY: '0deg'}]} ]}>
              <H1 title={ question } />
            </View>
            <View style={[flipperInner, isFlipped ? {transform: [{rotateY: '0deg'}]} : {transform: [{rotateY: '-180deg'}]} ]}>
              <Text style={[{textAlign: 'center', fontWeight: '500', marginBottom: 15}]}>
                { answer }
              </Text>
            </View>
          </View>
        
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const animations = {
  layout: {
    spring: {
      duration: 750,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 400,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

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
  // 0: {
  //   transform: [{rotateY: '0deg'}]
  // },
  // 1: {
  //   transform: [{rotateY: '-180deg'}]
  // }
};

export default Flipper;
