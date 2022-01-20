import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert, FlatList } from 'react-native';

import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

import defaultStyle from '../constants/default-style';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItems = (listLen, data) => (
  <View style={styles.listItem}>
    <BodyText># {listLen- data.index}</BodyText>
    <BodyText >{data.item}</BodyText>
  </View>
)

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuess(pastGuess => [nextNumber.toString(), ...pastGuess]);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyle.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>

        <CustomButton onPressButton={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={20} color="white" />
        </CustomButton>
        <CustomButton onPressButton={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={20} color="white" />
        </CustomButton>

      </Card>
      {/*
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {
            pastGuess.map((guess, index) => renderListItems(guess, pastGuess.length - index))
          }
        </ScrollView>
      </View>
      */}

      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuess}
          renderItem={renderListItems.bind(this, pastGuess.length,)}
          contentContainerStyle={styles.list}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '80%'
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    width: "60%",
    padding: 10,
    marginVertical: 7,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listContainer: {
    width: 300,
    flex: 1
  }
});

export default GameScreen;
