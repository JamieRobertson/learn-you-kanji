import { StyleSheet } from 'react-native';

// See:
// https://github.com/vhpoet/react-native-styling-cheat-sheet


const colors = {
  black: '#1e1a1a',  // slight red
  greyDark: '#4a4a4a',
  grey: '#a7a7a7',
  greyLight: '#cdcdcd',
  red: '#ff896f',
  green: '#0dbf40',
  greenDark: '#128e0c',
  blue: '#39c',
  blueAlt: '#00aaff',
  white: 'white',
  offWhite: '#efefef'
}

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
  headerSpacing: {
    paddingTop: 44  // statusBar: 20, totalHeight: 64
  },
  row: {
    flexDirection: 'row',
    width: '100%'
  },
  floatLeft: {
    flexWrap: 'wrap',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },
  choiceItem: {
    height: 40,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: colors.greyLight,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1
  },
  choiceItem_active: {
    backgroundColor: colors.blue
  },
  btn: {
    backgroundColor: colors.blue,
    opacity: 0.82,
    width: '100%',
    borderRadius: 10, // 4
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
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  flipper: {
    marginTop: 30,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.greyLight,
    borderRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  flipperBack: {
    // position: 'absolute',
    // top: 0, right: 0, left: 0, bottom: 0,
    textAlign: 'center'
  },
  h1: {
    fontSize: 140,
    color: colors.black,
    textAlign: 'center',
    textShadowColor: colors.greyLight,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  h3: {
    fontSize: 40,
    color: colors.black,
    marginBottom: 10
  },
  p: {
    fontSize: 17,
    textAlign: 'left',
    color: colors.black
  }
});

export {styles, colors};
