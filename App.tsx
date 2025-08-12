import React, {useCallback} from 'react';
import {SafeAreaView, Button, View, StyleSheet, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {PESDK} from 'react-native-photoeditorsdk';

// TODO add your license in the json file
const license = require('./psdk_license.json');
if (license && license.api_token) {
  PESDK.unlockWithLicense(license);
}

const App = () => {
  const handlePress = useCallback(() => {
    if (!license || !license.api_token) {
      Alert.alert(
        'Please add your PhotoEditor SDK license in psdk_license.json',
      );
      return;
    }
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets?.length && response.assets[0].uri) {
          PESDK.openEditor(response.assets[0].uri);
        }
      },
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button title="Test" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
});

export default App;
