import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, View, Modal, Pressable, Alert } from 'react-native'
import { ProductInterface } from '../../repo-interview-main/src/interfaces/product.interface'
import { Text } from 'react-native'
import { styles } from '../theme/styles'
import { Separator } from '../components/Separator'
import clientApi from '../api/clientApi'
import Icon from '../components/Icon'

interface Props extends StackScreenProps<any, any> { }

export const ProductDetailScreen = ({ navigation, route }: Props) => {

    var product: ProductInterface = route.params ? route.params[0] : null;
    const [modalVisible, setModalVisible] = useState(false);

    const deleteRecord = async () => {
        try {
            const resp = await clientApi.delete(`products/${product.id}`)
            console.log(resp.data)
            if (resp.status == 200) {
                Alert.alert(
                    "Producto Eliminado",
                    `El Producto ${product.name} ha sido eliminado`, [

                    { text: "Ok", onPress: () => navigation.navigate('ProductScreen') }
                ]


                )
            } else {
                Alert.alert("Ocurrio un error", resp.data)
            }
        } catch (err: any) {
            console.log("err" + err)
        }
    }

    const deleteItem = () => {
        deleteRecord()
    }

    const editProduct = () => {
        console.log("gotodetail")
        navigation.navigate('EditProductScreen', [product])
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalWrap} >
                        <View style={styles.modalView}>
                            <View style={styles.modalViewHeader}>
                                <Pressable
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Icon
                                        name="close"
                                        color='black'
                                        size={20}
                                    />
                                </Pressable>
                            </View>
                            <Separator />
                            <View style={styles.modalViewContent}>
                                <Text style={styles.modalContentText}>
                                    Estás seguro de eliminar el producto "{product.name}"?
                                </Text>
                            </View>
                            <Separator />
                            <View style={styles.modalFooter}>
                                <TouchableOpacity onPress={deleteItem} style={[styles.btnPrimary,]}>
                                    <Text>Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={[styles.btnEdit, { marginTop: 10 }]}>
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </Modal>

            <View style={[styles.wrapper, { justifyContent: 'space-between' }]}>
                <View>
                    <Text style={styles.detailTitle}>
                        ID: {product.id}
                    </Text>
                    <Text style={styles.detailExtra}>
                        Información extra
                    </Text>
                    <View style={styles.detailContainItems}>
                        <View style={styles.detailContainItem}>
                            <Text style={styles.detailItem}>
                                Nombre
                            </Text>
                            <Text style={styles.detailItemText}>
                                {product.name}
                            </Text>
                        </View>
                        <View style={styles.detailContainItem}>
                            <Text style={styles.detailItem}>
                                Descripción
                            </Text>
                            <Text style={styles.detailItemText}>
                                {product.description}
                            </Text>
                        </View>
                        <View style={styles.detailContainItem}>
                            <Text style={styles.detailItem}>
                                Logo
                            </Text>
                            <Text style={styles.detailItemText}>
                            </Text>
                        </View>
                        <View style={styles.detailCard}>
                            {/* <Image source={{ uri: 'https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-classic-card-498x280.png' }} style={styles.detailImage} /> */}
                            <Image source={{ uri: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg' }} style={styles.detailImage} />
                        </View>
                        <View style={styles.detailContainItem}>
                            <Text style={styles.detailItem}>
                                Fecha Libreación
                            </Text>
                            <Text style={styles.detailItemText}>
                                {product.date_release.toString()}
                            </Text>
                        </View>
                        <View style={styles.detailContainItem}>
                            <Text style={styles.detailItem}>
                                Fecha Revisión
                            </Text>
                            <Text style={styles.detailItemText}>
                                {product.date_revision.toString()}
                            </Text>
                        </View>
                    </View>
                </View>
                <View >
                    <TouchableOpacity style={[styles.btnEdit]} onPress={editProduct}>
                        <Text>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.btnDelete, { marginTop: 10 }]}>
                        <Text style={styles.deleteText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    )
}
