import React from 'react';
import {  Dimensions, Image, View, StyleSheet } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import CustomButton from '../components/CustomButton';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/xd.png')}
          source={{ uri: "https://www.elsoldetlaxcala.com.mx/incoming/sk14n2-balltzehk/alternates/LANDSCAPE_768/Balltzehk" }}
        />
      </View>
      <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
      {/* <BodyText>Number was: {props.userNumber}</BodyText> */}
      <BodyText>You were Cheemsified!!!</BodyText>
      <CustomButton onPressButton={props.onRestart}>
        NEW GAME
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  }
  , screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default GameOverScreen;
