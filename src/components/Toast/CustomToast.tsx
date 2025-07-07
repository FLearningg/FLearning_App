import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CustomToast({ text1, text2, props, status }: any) {
    return (
        <View style={[styles.container, props?.status === 'error' ? { borderColor: 'red' } : { borderColor: 'green' }]}>
            {props?.imageUrl && (
                <Image source={props.imageUrl} style={styles.image} />
            )}
            <View>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 20,
    },
    image: { width: 40, height: 40, marginRight: 10, borderRadius: 20 },
    text1: { fontWeight: 'bold', fontSize: 16 },
    text2: { fontSize: 14 },
});

// NOTE: this is toast component (can be custom here)
// USAGE: using in event handler 
//Example:
// const handleSignIn = () => {
//     //logic implement here
//     Toast.show({
//         type: 'custom_with_image',
//         text1: 'Login Successful',
//         text2: 'Welcome back!',
//         props: {
//             imageUrl: require('../../../assets/images/LOGO.png'),
//             status: 'success',
//         },
//         position: 'top',
//         visibilityTime: 3000,
//         autoHide: false, // This is for testing, set to true in production
//     });
//     navigation.navigate('Home') //pass parameter here
// }