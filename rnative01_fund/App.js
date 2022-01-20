import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList
} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';



export default function App() {
  const [couseGoals, setCourseGoals] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const removeGoalHandler = (goalId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId)
    })
  }

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [...currentGoals, {
      id: Math.random().toString(),
      value: goalTitle
    }])
    setAddMode(false)
  };

  const cancelGoalAddHandler = () => {
    setAddMode(false);
  };


  return (

    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setAddMode(true)} />

      <GoalInput
        visible={addMode}
        addGoal={addGoalHandler}
        cancelGoal={cancelGoalAddHandler}
      />

      <FlatList
        keyExtractor={(item, index) => item.id}
        data={couseGoals}
        renderItem={itemData =>
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
