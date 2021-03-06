import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Modal } from "react-native"

const GoalInput = (props) => {
    const [enteredGoal, setEnteredGoal] = useState("");

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
    }

    const addGoalHandler = () => {
        props.addGoal(enteredGoal)
        setEnteredGoal("")
    }

    return (
        <Modal visible={props.visible} animationType="slide" >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course Goal"
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" color="red" onPress={props.cancelGoal} />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Add"
                            onPress={addGoalHandler}
                        />
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '45%'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '40%'
    },
    inputContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",

    },
    input: {
        width: "80%",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
})

export default GoalInput
