import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Text, View } from 'react-native';
import { Row } from '../components';
// import Dimensions from 'Dimensions';
import { styles } from '../styles';


class QuizModal extends Component {
  render() {
    let { isModalVisible, isCorrect } = this.props;
    let content = isCorrect ? 'Correct!' : 'Incorrect';
    let bgColor = isCorrect ? 'teal' : 'tomato';

    return (
      <Modal
        style={[styles.modal, {backgroundColor: bgColor}]}
        animationType={'slide'}
        transparent={true}
        visible={isModalVisible}
      >
        <Row justifyContent={'center'}>
          <Text style={[styles.h3]}>
            { content }
          </Text>
        </Row>
      </Modal>
    );
  }
}

export default QuizModal;
