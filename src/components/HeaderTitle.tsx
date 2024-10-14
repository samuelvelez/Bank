import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../theme/styles';
import Icon from './Icon';
export const Header = () => {
    return (
        <View style={styles.header}>
            <Icon
                name="stack"
                color='black'
                size={20}
            />
            <Text>BANCO</Text>
        </View>
    )
}
