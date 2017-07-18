import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

// Parent component
class Grid extends Component {
  render() {
    const gridStyle = this.props.gridType === 'col' ? gridStyles.col : gridStyles.row;
    // const flex = { flex: this.props.flex } || {};
    const k = this.props.k || false;
    const flex = this.props.flex ? { flex: this.props.flex } : '';
    console.log(k);
    console.log(flex);

    let style = [
      gridStyle,
      { alignItems: this.props.alignItems || 'flex-start' },
      { justifyContent: this.props.justifyContent || 'flex-start' },
      { alignSelf: this.props.alignSelf || 'auto' },
      flex
    ].concat(
      this.props.style
    );

    return (
      <View key={ k } style={ style }>
        { this.props.children }
      </View>
    );
  }
}

class Col extends Component {
  render() {
    return (
      <Grid gridType='col' { ...this.props }>
        { this.props.children }
      </Grid>
    );
  }
}

class Row extends Component {
  render() {const k = this.props.k || false;
    return (
      <Grid gridType='row' { ...this.props }>
        { this.props.children }
      </Grid>
    );
  }
}

const gridStyles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    // minWidth: '100%',
    paddingHorizontal: 15
  },
  row: {
    flexDirection: 'row',
    minWidth: '100%',
    // flex: 1,
    // paddingHorizontal: 15,
    // marginLeft: -15,
    // marginRight: -15
  }
});

export { Col, Row };

/*
  alignItems:
  flex-start (my default), flex-end, center, stretch (default)
      alignItems aligns children in the cross direction. 
      For example, if children are flowing vertically, 
      alignItems controls how they align horizontally.
  
  alignSelf:
  auto, flex-start, flex-end, center, stretch
  
  flexDirection:
  row, row-reverse, column, column-reverse
  
  justifyContent:
  flex-start (my default), flex-end, center, space-between, space-around
      justifyContent aligns children in the main direction. 
      For example, if children are flowing vertically, 
      justifyContent controls how they align vertically
  
  flex (2:10 etc)

  row: {
    flexDirection: 'row',
    width: '100%'
  },

*/
