import React from "react"
import { StyleSheet, Text, View } from "react-native"

const InfoCard = (props) => {
    
    const styles = StyleSheet.create({
        card: {
            alignItems: 'center',
            margin: 8,
            minWidth: 110,
        },
        text: {
            color: '#e8e8e8',
            margin: 5,
            fontSize: 16,
            fontWeight: 'bold',
        },
        subtitle: {
            color: 'white',
            margin: 5,
            fontSize: 18,
        }
    });

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.value}</Text>
        </View>
    )
}

export default InfoCard