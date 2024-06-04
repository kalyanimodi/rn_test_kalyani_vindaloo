import {StyleSheet} from 'react-native';
import {Color} from '../utils/Color';

export default StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: 'center',
    backgroundColor: Color.TEXT_PLACEHOLDER,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalBackground: {
    flex: 1,
  },
});
