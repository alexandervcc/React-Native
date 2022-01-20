import React from 'react'
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native'

import colors from "../constants/colors";

const CustomButton = (props) => {
    return (
         <TouchableHighlight onPress={props.onPressButton} >
            <View style={styles.button}>
                <Text style={styles.buttonText} >
                    {props.children}
                </Text>
            </View>
          </TouchableHighlight> 
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius:25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default CustomButton
