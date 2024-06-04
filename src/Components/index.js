import React from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {Color} from '../utils/Color';

const CustomLoader = props => {
  const {loading} = props;

  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={Color.PRIMARY}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;
