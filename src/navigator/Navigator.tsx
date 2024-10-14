import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ProductosScreen } from '../screens/ProductosScreen';
import { AddProductScreen } from '../screens/AddProductScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { HeaderLeft } from '../components/HeaderLeft';
import { Header } from '../components/HeaderTitle';
import { EditProductScreen } from '../screens/EditProductScreen';

const Stack = createNativeStackNavigator();
export const Navigator = () => {

    const options = {
        headerLeft: () => <HeaderLeft />,
        headerTitle: () => <Header />,

    }
    return (
        <Stack.Navigator>
            <Stack.Screen name='ProductScreen' component={ProductosScreen}></Stack.Screen>
            <Stack.Screen name='AddProductScreen' component={AddProductScreen} options={options}></Stack.Screen>
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={options}></Stack.Screen>
            <Stack.Screen name='EditProductScreen' component={EditProductScreen} options={options}></Stack.Screen>
        </Stack.Navigator >
    )
}
