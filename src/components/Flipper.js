import React from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles';


class Flipper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFront: true
    };
  }
  render() {
    let k = this.props.k || false;

    return (
      <View 
        style={[styles.flipper]}
      >
        <TouchableWithoutFeedback     
          onPress={ () => this.setState({showFront: !this.state.showFront}) }
        >
          <Animated.View>
            { this.props.children }
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Flipper;
