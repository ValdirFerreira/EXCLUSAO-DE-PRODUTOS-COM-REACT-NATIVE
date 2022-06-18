import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import CardMensagem from '../componentes/CardMensagem'
import api from '../services/api';

export default function Delete({ route, navigation }) {

    const { Codigo } = route.params;

    useEffect(() => {

        const subs = navigation.addListener('focus', () => {
            api.post('GetOne',
                {
                    Codigo: Codigo

                }).then(({ data }) => {
                    setDescricao(data.Descricao)
                });
        })

    }, {})


    const [descricao, setDescricao] = useState("");

    function Deletar() {
        try {
            const response = api.post('Delete',
                {
                    Codigo: Codigo                               
                });

            setDescricao("");

            navigation.goBack();

        } catch (error) {

        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <Text style={styles.titulo} >Deletar produto!</Text>
            </View>

            <View style={styles.container}>
                <TextInput style={styles.inputCadastro}
                    placeholder="Nome do Produto"                 
                    value={descricao} />
            </View>

            <View style={styles.container}>
                <Button style={styles.btnCadastro} onPress={() => Deletar()} title="Deletar" ></Button>
                <StatusBar style="auto" />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:
    {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },

    btnCadastro:
    {
        backgroundColor: '#fff',
        fontSize: 19,
        marginBottom: 15,
        padding: 7,
        borderRadius: 8,
        width: 280,
        alignItems: 'center',
        alignSelf: 'center'
    },

    inputCadastro:
    {
        borderRadius: 1,
        width: 350,
        border: 'solid 1px gray',
        margin: '20px 5px',
        outline: 'solid 1px silver',
        padding: 4,
        fontSize: 14,
        marginBottom: 10
    },
});
