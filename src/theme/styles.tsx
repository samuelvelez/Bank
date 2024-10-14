import React from 'react'
import { StyleSheet } from 'react-native'

const primaryColor = "rgb(249,222,75)";
const backgroundPrimary = "#FFF";
const lightgrayColor = "#cccccc";
const graycolor = "#777777";


export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: backgroundPrimary,
        height: '100%',
        overflow: 'scroll'

    },
    wrapper: {
        paddingVertical: 30,
        marginHorizontal: 20,
        height: '100%'
    },
    input: {
        backgroundColor: backgroundPrimary,
        borderColor: lightgrayColor,
        borderWidth: 1,
        padding: 10,
        fontSize: 18
    },
    quantity: {
        marginTop: 20,
        textAlign: 'right'
    },
    productList: {
        marginVertical: 0,
        borderWidth: 1,
        borderColor: lightgrayColor,
        borderRadius: 10
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    productText: {

    },
    productTitle: {

    },
    productSubtitle: {
        color: graycolor
    },
    btnPrimary: {
        backgroundColor: primaryColor,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    btnBottom: {
        position: 'absolute',
        bottom: 20
    },

    detailTitle: {
        paddingTop: 20,
        fontSize: 24,
        fontWeight: '600'
    },
    detailExtra: {
        paddingTop: 5,
        color: graycolor,
        fontSize: 16
    },
    detailContainItems: {
        paddingVertical: 30
    },
    detailContainItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    detailItem: {
        //padding: 5,
        color: graycolor,
        fontSize: 16
    },
    detailItemText: {
        color: '#222',
        fontSize: 18
    },
    detailCard: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10
    },
    detailImage: {
        width: 200, height: 120
    },
    btnEdit: {
        backgroundColor: lightgrayColor,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    btnDelete: {
        backgroundColor: '#FF0000',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    deleteText: {
        color: backgroundPrimary,

    },
    modalContainer: {
        height: '100%',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalWrap: {
        justifyContent: 'flex-end',
        flex: 1
    },
    modalView: {
        height: 300,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modalViewHeader: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20
    },
    modalViewContent: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    modalContentText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 500
    },
    modalFooter: {
        flex: 0.3,
        marginHorizontal: 20,
        marginTop: 10
    },
    formTitle: {
        fontSize: 36
    },
    formLabel: {

    },
    formInput: {
        borderColor: lightgrayColor,
        backgroundColor: backgroundPrimary,
        borderWidth: 1,
        padding: 15,
        marginVertical: 5,
        color: '#111',
    },
    errorFormInput: {
        borderColor: '#FF0000'
    },
    errorFormText: {
        color: "#FF0000",
        marginBottom: 5
    }





})