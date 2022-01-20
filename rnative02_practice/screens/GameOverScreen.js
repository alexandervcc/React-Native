import React from 'react';
import { Image, View, StyleSheet, Button } from 'react-native';

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
    width: '80%',
    height: 300,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 25
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
