import React from 'react'
import { Producto } from '../../interface/ProductoInterface'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../theme/styles'
import { useNavigation } from '@react-navigation/native'
import Icon from '../Icon'

interface props {
    item: Producto,

}

export const ProductItem = ({ item }: props) => {
    const navigation = useNavigation()

    const goToDetail = () => {
        navigation.navigate('ProductDetail', [item])
    }
    return (
        <View style={styles.productItem}>
            <View style={styles.productText}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productSubtitle}>ID: {item.id}</Text>
            </View>
            <TouchableOpacity onPress={goToDetail}>
                <Icon
                    name="cheveron-right"
                    color='black'
                    size={20}
                />
            </TouchableOpacity>
        </View>
    )
}
