import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DefaultText from "components/DefaultText";

const UserStatistic = (props) => {

    return (
        <View style={styles.container}> 
            <DefaultText style={styles.number}>{props.value}</DefaultText>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

export default UserStatistic

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    number: {
        fontFamily: "latoBold",
    }
})
