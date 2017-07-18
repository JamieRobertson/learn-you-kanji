import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert, Image, ProgressViewIOS, TouchableOpacity, View } from 'react-native';
import { Col, Row } from '../components';
import { styles, colors } from '../styles';


class QuizHeader extends Component {
  handleOnPress() {
    const { navigate, goBack } = this.props.navigation;

    Alert.alert(
      'Are you sure you want to quit?', 
      '',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Quit', onPress: () => goBack() }
      ],
      { cancelable: true }
    );
  }
  render() {
    let { progress } = this.props;

    return (
      <Row alignItems={'center'} style={[styles.header]}>
        <View>
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
      </Row>
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
