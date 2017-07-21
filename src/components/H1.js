import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles';


class H1 extends React.Component {
  render() {
    let style = this.props.style || [];
    let h1Style = [styles.h1].concat(style);

    return (
      <Text 
        style={h1Style}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}
      >
        { this.props.title }
      </Text>
    );
  }
}

export default H1;
