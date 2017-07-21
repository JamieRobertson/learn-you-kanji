import { StyleSheet } from 'react-native';

// See:
// https://github.com/vhpoet/react-native-styling-cheat-sheet

const colors = {
  black: '#1e1a1a',  // slight red
  greyDarker: '#1a1a1a',
  greyDark: '#4a4a4a',
  grey: '#a7a7a7',
  greyLight: '#cdcdcd',
  red: '#ff896f',
  redLight: '#f2847e',
  green: '#0dbf40',
  greenLight: '#64e297',
  greenDark: '#128e0c',
  blue: '#007aff',
  blueLight: '#5ac8fa',
  white: 'white',
  offWhite: '#efefef'
};

const $borderRadius = 10;

const $fontSize = {
  h1: 140,
  h2: 45,
  h3: 30,
  h4: 21,
  p: 17
};

const $dropShadow = {
  shadowColor: colors.greyLight,
  shadowOffset: {width: 0, height: 0},
  shadowRadius: 2,
  shadowOpacity: 1
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    paddingHorizontal: 15
  },
  alignTop: {
    justifyContent: 'space-between'
  },
  header: {
    marginTop: 20, // statusBar: 20
    height: 44
  },
  headerMargin: {
    marginTop: 64
  },
  row: {
    flexDirection: 'row',
    width: '100%'
  },
  icon: {
    width: 33,
    height: 33, 
    marginVertical: 2
  },
  dropShadow: {
    shadowColor: $dropShadow.shadowColor,
    shadowOffset: $dropShadow.shadowOffset,
    shadowRadius: $dropShadow.shadowRadius,
    shadowOpacity: $dropShadow.shadowOpacity
  },
  choiceItem: {
    height: 42,
    margin: 5,
    padding: 11,
    backgroundColor: colors.white
  },
  choiceItem_active: {
    backgroundColor: colors.blue
  },
  btn: {
    backgroundColor: colors.blue,
    opacity: 0.82,
    width: '100%',
    borderRadius: $borderRadius,
    paddingTop: 15,
    marginBottom: 10, 
    minHeight: 50
  },
  btnDisabled: {
    backgroundColor: colors.greyLight,
  },
  btnSuccess: {
    backgroundColor: colors.green,
  },
  btnError: {
    backgroundColor: colors.red,
  },
  btnGhost: {
    backgroundColor: 'transparent',
  },
  btnSm: {
    paddingTop: 12,
    minHeight: 44,
    marginBottom: 0
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  flipper: {
    marginBottom: 30,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.greyLight,
    borderRadius: 2,
    padding: 15,
    width: '80%'
  },
  flipperBack: {
    // position: 'absolute',
    // top: 0, right: 0, left: 0, bottom: 0,
    textAlign: 'center'
  },
  contentCard: {
    paddingTop: 12,
    marginBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },
  modalWrapper: {
    position: 'absolute',
    top: 64, bottom: 80,
    left: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column'
  },
  modal: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: $borderRadius,
    opacity: 0.95
  },
  modalText: {
    fontWeight: '500',
    fontSize: $fontSize.h4,
    lineHeight: ($fontSize.h4 * 1.1),
    color: 'white',
    textAlign: 'center'
  },
  h1: {
    fontSize: $fontSize.h1,
    lineHeight: ($fontSize.h1 * 1.1),
    color: colors.greyDarker,
    minWidth: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '900',
    textShadowColor: colors.greyLight,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2
  },
  h3: {
    fontSize: $fontSize.h3,
    lineHeight: ($fontSize.h3 * 1.2),
    fontWeight: '500',
    color: colors.greyDarker,
    marginBottom: 12
  },
  p: {
    fontSize: $fontSize.p,
    lineHeight: ($fontSize.p * 1.3),
    textAlign: 'left',
    color: colors.greyDark,
    marginBottom: 15
  }
});

export {styles, colors};
