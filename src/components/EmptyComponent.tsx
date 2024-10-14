import React from 'react'
import { Text, View } from 'react-native'


interface Props {
    text: string
}
export const EmptyComponent = ({ text }: Props) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 100 }}>
            <Text style={{ width: '100%', textAlign: 'center' }}>{text}</Text>
        </View>
    )
}
