import {Dimensions, StyleSheet} from 'react-native';
import {Color} from '../../../utils/Color';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

export default StyleSheet.create({
  label: {
    color: Color.TEXT_PRIMARY,
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 0,
  },
  titleTextStyle: {
    fontSize: 25,
    color: Color.TEXT_PRIMARY,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: Height / 80,
  },
  errorLabel: {
    color: Color.RED,
    marginTop: 5,
    marginLeft: 0,
    fontSize: 12,
  },
  button: {
    marginTop: 40,
    height: Height / 17,
    backgroundColor: Color.PRIMARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: Height / 17,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Color.PRIMARY_BACKGROUND,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
    color: Color.TEXT_PRIMARY,
  },
  buttonTextStyle: {
    fontSize: 20,
    color: Color.WHITE,
    fontWeight: 'bold',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 5,
    flexDirection: 'row',
  },
  signupLabel: {
    color: Color.TEXT_SECONDARY,
    fontSize: 17,
  },
});
