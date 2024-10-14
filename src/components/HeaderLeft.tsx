import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from './Icon'

export const HeaderLeft = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={{
                marginLeft: 10,
            }}
            onPress={() => navigation.goBack()}>
            <Icon
                name="arrow-thin-left"
                color='black'
                size={20}
            />
        </TouchableOpacity>
    )
}
