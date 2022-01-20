import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const GoalItem = ({
    onDelete,
    title,
    id
}) => {
    return (
        <TouchableOpacity onPress={onDelete.bind(this, id)}>
            <View style={styles.listItem}
                on
            >
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create(
    {
        listItem: {
            padding: 10,
            marginVertical: 10,
            backgroundColor: "#ccc",
            borderColor: "black",
            borderWidth: 1
        }
    }
)
export default GoalItem
