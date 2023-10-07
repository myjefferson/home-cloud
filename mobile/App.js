import React, { Component, useRef } from 'react'
import {NavigationContainer} from 'react-navgation'
import { View, StyleSheet, NativeModules, SafeAreaView, Button, Text } from 'react-native'
import Home from './src/screens/home'
// import {WebView} from 'react-native-webview'

// let downloadDocument = async (downloadUrl) => {
//    let fileURI = await downloadAsync(
//       downloadUrl,
//       `${documentDirectory}name.pdf`,
//       {},
//    );
//    await onShare(fileURI.uri);
// };

// const onShare = async (url) => {
//    try {
//      return Share.share({
//        message: 'Choose location to save pdf file',
//        url: url,
//      });
//    } catch (error) {
//      return error;
//    }
//  };

export default props =>{
   return(
      <SafeAreaView>
         <Home/>
         <View>
            <Button
               title='Arquivos'
            />

         </View>
      </SafeAreaView>
   )
}

// export default props => {
//    const webViewRef = useRef(null)

//    const goback = () => {
//       webViewRef.current.goBack();
//    }

//    const goforward = () => {
//       webViewRef.current.goForward();
//    }

//    return (
//       <SafeAreaView style = {styles.container}>
//          <WebView
//             ref={webViewRef}
//             startInLoadingState={true}
//             allowUniversalAccessFromFileURLs={true}
//             javaScriptEnabled={true}
//             mixedContentMode={'always'}
//             originWhitelist={["*"]}
//             useWebKit
//             source = {{ 
//                uri: `192.168.15.7:3000` 
//             }}
//             domStorageEnabled={true}
//             allowFileAccess={true}
//             allowUniversalAccessFromFileURLs={true}
//             allowingReadAccessToURL={true}
//             onFileDownload={({ nativeEvent: { downloadUrl } }) =>
//                downloadDocument(downloadUrl)
//             }
//          />
//          <View style={styles.pagination}>
//             <Text style={styles.back}  onPress={goback}>Voltar</Text>
//             <Text style={styles.forward} onPress={goforward}>Avançar</Text>
//          </View>
//       </SafeAreaView>
//    )
// }

// const styles = StyleSheet.create({
//    container: {
//       height: "100%",
//    },
//    navbar: {
//       height: 40,
//       width: "100%",
//       flexDirection: "row-reverse",
//       paddingTop: 6,
//       backgroundColor: "#fefefe",
//       borderTopColor: "grey",
//       borderTopWidth: 1,
//     },
//     back: {
//       width: 100,
//       height: 45,
//       padding: 9,
//       fontSize: 16,
//       borderRadius: 100,
//       paddingBottom: 20,
//       textAlign: "center",
//       backgroundColor: '#1070ff',
//       color: "#FFF",
//     },
//     forward: {
//       width: 100,
//       height: 45,
//       padding: 9,
//       fontSize: 16,
//       borderRadius: 100,
//       textAlign: "center",
//       backgroundColor: '#1070ff',
//       color: "#FFF",
//     },
//     pagination: {
//       flexGrow: 1,
//       flexDirection: "row",
//       display: "flex",
//       position: "absolute",
//       bottom: 70,
//     }
// })