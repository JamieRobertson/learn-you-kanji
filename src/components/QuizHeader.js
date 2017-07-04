import React from 'react';
import { Alert, Image, ProgressViewIOS, TouchableOpacity, View } from 'react-native';
import { styles, colors } from '../styles';

// TODO:
// Add close button - will call alert then go home

class QuizHeader extends React.Component {
  handleOnPress() {
    const { navigate } = this.props.navigation;

    Alert.alert(
      'Are you sure you want to quit?', 
      '',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Quit', onPress: () => navigate('Home') }
      ],
      { cancelable: true }
    );
  }
  render() {
    let { progress } = this.props;

    return (
      <View style={[styles.row, {alignItems: 'stretch', paddingTop: 15}]}>
        <View style={iconSize}>
          <TouchableOpacity
            onPress={ this.handleOnPress.bind(this) }
            style={{opacity: 0.3}}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../static/img/close-icon.png')}
              style={iconSize}
            />
          </TouchableOpacity>
        </View>
        <View style={progressStyle}>
          <ProgressViewIOS 
            progress={progress}
            progressTintColor={colors.green}
            // progressViewStyle={'default'}
            // trackTintColor={colors.greyLight}
          />
        </View>
      </View>
    );
  }
}

const iconSize = {
  width: 20,
  height: 20
};

const progressStyle = {
  flex: 1,
  justifyContent: 'center',
  marginLeft: 15
};

export default QuizHeader;
