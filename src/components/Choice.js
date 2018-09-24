import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight } from 'react-native';
import { styles, colors } from '../styles';


class Choice extends React.Component {
  handleOnPress() {
    let { onPress, choiceIndex, isCorrect } = this.props;
    onPress && onPress(choiceIndex, isCorrect);
  }
  render() {
    let { isActive, title } = this.props;
    let buttonStyle = isActive ? [
        styles.choiceItem, styles.dropShadow, styles.choiceItem_active
      ] : [styles.choiceItem, styles.dropShadow];
    let textStyle = isActive ? [styles.p, {color: 'white'}] : [styles.p];

    return (
      <TouchableHighlight
        style={ buttonStyle }
        onPress={ this.handleOnPress.bind(this) }
        underlayColor={ colors.blue }
      >
        <Text style={textStyle}>
          { title }
        </Text>
      </TouchableHighlight>
    );
  }
}

Choice.propTypes = {
  onPress: PropTypes.func,
  choiceIndex: PropTypes.number,
  isCorrect: PropTypes.bool,
  isActive: PropTypes.bool,
  title: PropTypes.string
}

export default Choice;
