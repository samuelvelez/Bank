import React, { useState } from 'react'
import { Alert, Button, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import clientApi from '../api/clientApi'
import { styles } from '../theme/styles'
//import { TextInput } from 'react-native-paper'
import { useForm } from '../hooks/useForm'
import DatePicker from 'react-native-date-picker'
import { useNavigation } from '@react-navigation/native'

export const AddProductScreen = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const [revisionDate, setRevisionDate] = useState<string>("");
    const [open, setOpen] = useState(false)
    const [errorId, setErrorId] = useState("")
    const [errorName, setErrorName] = useState("")
    const [errorDescription, setErrorDescription] = useState("")
    const [errorLogo, setErrorLogo] = useState("")
    const [errorRevisionDate, setErrorRevisionDate] = useState("")
    const [errorReleaseDate, setErrorReleaseDate] = useState("")

    const { id, name, description, logo, releaseDate, onChange, resetForm } = useForm({
        id: '',
        name: '',
        description: '',
        logo: '',
        releaseDate: '',

    });

    const enterDate = () => {
        setErrorReleaseDate("")
        setErrorRevisionDate("")
        setOpen(true)
    }

    const changeDate = (date: Date) => {
        setOpen(false)
        const releaseFormatted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        const revisionFormatted = (date.getFullYear() + 1) + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        onChange(releaseFormatted, 'releaseDate')

        setRevisionDate(revisionFormatted)
    }

    const addProduct = () => {
        let validated = true
        if (id.length == 0) {
            setErrorId("No puede estar vacio")
            validated = false
        }
        if (name.length == 0) {
            setErrorName("No puede estar vacio")
            validated = false
        }
        if (description.length == 0) {
            setErrorDescription("No puede estar vacio")
            validated = false
        }
        if (logo.length == 0) {
            setErrorLogo("No puede estar vacio")
            validated = false
        }
        if (revisionDate.length == 0) {
            setErrorRevisionDate("No puede estar vacio")
            validated = false
        }
        if (releaseDate.length == 0) {
            setErrorReleaseDate("No puede estar vacio")
            validated = false
        }
        if (validated) {
            sendInfo()
        }
    }

    const reiniciar = () => {
        resetForm()
        setErrorId("")
        setErrorName("")
        setErrorDescription("")
        setErrorLogo("")
        setErrorRevisionDate("")
        setErrorReleaseDate("")
        setRevisionDate("")

    }

    const verifyId = async () => {
        const resp = await clientApi.get(`products/verification/${id}`)
        return resp.data;
    }

    const validate = async (field: string) => {
        switch (field) {
            case 'id':
                if (id.length < 3) {
                    setErrorId("No puede tener una longitud menor 3")
                } else {
                    setErrorId("")
                }
                //verificar que no exista
                const idExist = verifyId()
                if (await idExist) {
                    setErrorId("Id ya existe")
                } else {
                    setErrorId("")
                }
                break;
            case 'name':
                if (name.length < 5) {
                    setErrorName("No puede tener una longitud menor 5")
                } else {
                    setErrorName("")
                }

            case 'description':
                if (name.length < 10) {
                    setErrorDescription("No puede tener una longitud menor 10")
                } else {
                    setErrorDescription("")
                }
            case 'logo':
                if (name.length < 1) {
                    setErrorLogo("No puede estar vacio")
                } else {
                    setErrorLogo("")
                }
                break;

            default:
                break;
        }
    }

    const sendInfo = async () => {
        console.log(id, name, description, logo, releaseDate, revisionDate)
        try {
            const response = await clientApi.post('products/',
                {
                    "id": id,
                    "name": name,
                    "description": description,
                    "logo": logo,
                    "date_release": releaseDate,
                    "date_revision": revisionDate
                });
            if (response.status == 200) {
                Alert.alert(
                    "Producto Creado",
                    `El Producto ${name} ha sido Creado`, [
                    { text: "Ok", onPress: () => navigation.navigate('ProductScreen' as never) }
                ])
            } else {
                Alert.alert("Ocurrio un error", response.data)
            }
        } catch (err: any) {
            console.log(err)
        }
    }
    return (
        <View style={styles.container}>

            <View style={[styles.wrapper, { justifyContent: 'space-between' }]}>
                <View style={{ flex: 0.8 }}>
                    <Text style={styles.formTitle}>
                        Formulario de Registro
                    </Text>
                    <View>
                        <Text style={styles.formLabel}>ID</Text>
                        <TextInput maxLength={10} style={[styles.formInput, errorId ? styles.errorFormInput : ""]} value={id} onChangeText={value => onChange(value, 'id')} onEndEditing={() => validate('id')} />
                        {errorId && <Text style={styles.errorFormText}>{errorId}</Text>}
                    </View>
                    <View>
                        <Text>Nombre</Text>
                        <TextInput maxLength={100} style={[styles.formInput, errorName ? styles.errorFormInput : ""]} value={name} onChangeText={value => onChange(value, 'name')} onEndEditing={() => validate('name')} />
                        {errorName && <Text style={styles.errorFormText}>{errorName}</Text>}
                    </View>
                    <View>
                        <Text>Descripción</Text>
                        <TextInput maxLength={200} style={[styles.formInput, errorDescription ? styles.errorFormInput : ""]} value={description} onChangeText={value => onChange(value, 'description')} onEndEditing={() => validate('description')} />
                        {errorDescription && <Text style={styles.errorFormText}>{errorDescription}</Text>}
                    </View>
                    <View>
                        <Text>Logo</Text>
                        <TextInput style={[styles.formInput, errorLogo ? styles.errorFormInput : ""]} value={logo} onChangeText={value => onChange(value, 'logo')} onEndEditing={() => validate('logo')} />
                        {errorLogo && <Text style={styles.errorFormText}>{errorLogo}</Text>}
                    </View>
                    <View>
                        <Text>Fecha Liberación</Text>
                        <TextInput style={[styles.formInput, errorReleaseDate ? styles.errorFormInput : ""]} value={releaseDate} onPressIn={enterDate} onChangeText={value => onChange(value, 'releaseDate')} readOnly />
                        {errorReleaseDate && <Text style={styles.errorFormText}>{errorReleaseDate}</Text>}
                    </View>
                    <View>
                        <Text>Fecha Revisión</Text>
                        <TextInput style={[styles.formInput, errorRevisionDate ? styles.errorFormInput : ""]} readOnly value={revisionDate} />
                        {errorRevisionDate && <Text style={styles.errorFormText}>{errorRevisionDate}</Text>}
                    </View>

                    <DatePicker
                        modal
                        minimumDate={new Date()}
                        open={open}
                        mode='date'
                        date={new Date()}
                        onConfirm={changeDate}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <View style={{ flex: 0.2 }}>
                    <TouchableOpacity onPress={addProduct} style={[styles.btnPrimary]}>
                        <Text>Enviar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={reiniciar} style={[styles.btnEdit, { marginTop: 10 }]}>
                        <Text>Reiniciar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}