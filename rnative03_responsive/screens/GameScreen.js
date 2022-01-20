import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, Dimensions, View, Text, StyleSheet, Alert, FlatList } from 'react-native';

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
    <BodyText># {listLen - data.index}</BodyText>
    <BodyText >{data.item}</BodyText>
  </View>
)

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess.toString()]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height)

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  //Effect for managing Dimension Display Orientation
  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width)
      setDeviceHeight(Dimensions.get('window').height)
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  }, [])

  //Effect for managing guess at each re-render
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

  /*
  if(Dimensions.get('window')>600){
    return <View></View>
  }
  */

  let listContainerStyle = styles.listContainer;
  if (Dimensions.get('window').width < 350) {
    listContainerStyle = styles.listContainerBig
  }

  if (deviceHeight < 500) {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
          <View style={styles.screen}>
            <Text style={defaultStyle.title}>Opponent's Guess</Text>
            <View style={styles.controls}>
              <CustomButton onPressButton={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name="md-remove" size={20} color="white" />
              </CustomButton>
              <NumberContainer>{currentGuess}</NumberContainer>
              <CustomButton onPressButton={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="md-add" size={20} color="white" />
              </CustomButton>
            </View>
            <View style={listContainerStyle}>
              <FlatList
                keyExtractor={(item) => item}
                data={pastGuess}
                renderItem={renderListItems.bind(this, pastGuess.length,)}
                contentContainerStyle={styles.list}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }



  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
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

          <View style={listContainerStyle}>
            <FlatList
              keyExtractor={(item) => item}
              data={pastGuess}
              renderItem={renderListItems.bind(this, pastGuess.length,)}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginTop: Dimensions.get('window').height > 600 ? 10 : 5,
    width: 400,
    maxWidth: '80%'
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginVertical: 7,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  }
});

export default GameScreen;
