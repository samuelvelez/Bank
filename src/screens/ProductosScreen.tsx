import React, { useEffect, useState } from 'react'
import { TextInput, SafeAreaView, Text, Touchable, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native'
import clientApi from '../api/clientApi'
import { StackScreenProps } from '@react-navigation/stack';
import { Header } from '../components/HeaderTitle'
import { styles } from '../theme/styles';
import { ProductItem } from '../components/product/ProductItem';
import { EmptyComponent } from '../components/EmptyComponent';
import { Separator } from '../components/Separator';
import { useForm } from '../hooks/useForm';
import { Producto } from '../interface/ProductoInterface';

interface Props extends StackScreenProps<any, any> { }


export const ProductosScreen = ({ navigation }: Props) => {
    const [data, setData] = useState<Producto[]>()
    const [initialValues, setInitialValues] = useState<Producto[]>()
    //const [product, setProduct] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { product, onChange, resetForm } = useForm({
        product: ''
    });
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <>
                    <Header />
                </>
            )
        })
    })

    useEffect(() => {
        navigation.addListener('focus', () => {
            getProducts()
        });
    }, [navigation])

    const getProducts = async () => {
        try {
            const url = 'products'
            const resp = await clientApi.get(url)
            setData(resp.data.data)
            setInitialValues(resp.data.data)
            setIsLoading(false)
        }
        catch (err: any) {
            console.log(err)
        }
    }

    const findProduct = () => {
        console.log(data)
        let filtered = initialValues!.filter(x => x.name.toUpperCase().includes(product.toUpperCase()));
        console.log(filtered)
        setData(filtered)

    }

    useEffect(() => {
        if (product.length > 0) {
            console.log(product)
            findProduct()
        } else {
            setData(initialValues)
        }
    }, [product])

    const addProduct = () => {
        console.log("GoTo AddProductScreen")
        navigation.navigate('AddProductScreen')

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput style={styles.input} placeholder='Search...' onChangeText={value => onChange(value, 'product')} />
                <Text style={styles.quantity}>Cantidad:{data ? data!.length : 0}</Text>

                {isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={180} color={"rgb(49,22,175)"} />
                    </View>
                    : <View style={styles.productList} >
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <ProductItem item={item} />}
                            ItemSeparatorComponent={() => <Separator />}
                            ListEmptyComponent={() => <EmptyComponent text='No hay Productos disponibles' />}
                        />
                    </View>}
                <TouchableOpacity onPress={addProduct} style={[styles.btnPrimary, styles.btnBottom]}>
                    <Text>Agregar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
