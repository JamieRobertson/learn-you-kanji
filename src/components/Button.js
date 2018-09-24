import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';


class Btn extends React.Component {
  handleOnPress() {
    let { onPress } = this.props;
    onPress && onPress();
  }
  render() {
    let { title, disabled } = this.props;
    
    let textStyle = this.props.textStyle || [];
    let buttonStyle = this.props.buttonStyle || [];
    let k = this.props.k || false;
    // inherit styles
    textStyle = [styles.btnText].concat(textStyle);
    buttonStyle = [styles.btn].concat(buttonStyle);

    return (
      <TouchableOpacity
        key={ k }
        style={ buttonStyle }
        onPress={ this.handleOnPress.bind(this) }
        activeOpacity={1}
        disabled={disabled || false}
      >
        <Text 
          style={ textStyle }
        >
          { title }
        </Text>
      </TouchableOpacity>
    );
  }
}

Btn.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  textStyle: PropTypes.array,
  buttonStyle: PropTypes.array,
  k: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

export default Btn;
