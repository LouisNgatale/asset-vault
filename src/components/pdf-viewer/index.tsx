import Pdf, { Source } from 'react-native-pdf';
import { Circle } from 'react-native-progress';
import tw from '../../lib/tailwind.ts';
import { colors } from '../../constants/colors.ts';
import { useEffect, useState } from 'react';
import RNFetchBlob from 'react-native-blob-util';
import { Alert, Platform, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';

export default function PdfViewer({ route }: { route: any }) {
  const params = route.params;
  const [source, setSource] = useState<Source | undefined>(undefined);

  useEffect(() => {
    setSource({
      uri: params?.uri,
      cache: true,
    });
  }, [params?.uri]);

  const handleDownloadFile = async (file: string) => {
    const { config, fs } = RNFetchBlob;
    const downloadsDirectory =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;

    const items = file.split('/');
    const formattedFileName = items[items.length - 1];

    // TODO: Fix extension
    const filePath = `${downloadsDirectory}/${formattedFileName}`;

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${formattedFileName}.pdf`,
        path: filePath,
        description: 'Legal Document Download',
      },
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: `${formattedFileName}.pdf`,
      path: filePath,
    };

    try {
      const configOptions = Platform.select({
        ios: options,
        android: options,
      });
      const response = await config(configOptions || {})
        .fetch('GET', params?.uri)
        .then((res) => {
          if (Platform.OS === 'ios') {
            console.log({ configOptions });
            RNFetchBlob.fs.writeFile(configOptions.path, res.data, 'base64');
            RNFetchBlob.ios.previewDocument(configOptions.path);
          }

          return res;
        });

      if (response) {
        Alert.alert('Download success');
      }
      // Share the file
      try {
        if (Platform.OS === 'ios') {
          await Share.open({
            url: `file://${filePath}`,
            title: 'Save the file',
            type: 'application/pdf',
          });
        }
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      Alert.alert('Download failed');

      console.error({ error });
    }
  };

  const requestDownloadPermissions = (file: string) => async () => {
    if (Platform.OS === 'ios') {
      return handleDownloadFile(file);
    }

    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //     {
    //       title: translation('permissions.storage.title'),
    //       message: translation('permissions.storage.message'),
    //       buttonNegative: translation('global.genericAlertCancelText'),
    //       buttonPositive: translation('global.genericAlertOkText'),
    //     },
    //   );
    //
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     await handleDownloadFile(file);
    //   } else {
    //     if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    //       return Alert.alert(
    //         translation('permissions.storage.permissionDeniedTitle'),
    //         translation('permissions.storage.permissionDeniedMessage'),
    //       );
    //     }
    //
    //     console.warn('Download permission denied');
    //   }
    // } catch (error) {
    //   console.error('DOWNLOAD ERROR => ', error);
    //   Alert.alert(
    //     translation('permissions.storage.permissionDeniedTitle'),
    //     translation('permissions.storage.permissionDeniedMessage'),
    //   );
    // }
  };

  return (
    <>
      {source && (
        <>
          <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onError={(error) => {
              console.error(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            renderActivityIndicator={(progress) => (
              <Circle
                size={80}
                indeterminate={true}
                color={colors.purple}
                borderWidth={10}
              />
            )}
            style={tw`flex-1 w-full h-full`}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 25,
              right: 8,
            }}>
            <TouchableOpacity
              onPress={requestDownloadPermissions(source.uri!)}
              style={{
                borderRadius: 50,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
              }}>
              <Ionicons
                name={'cloud-download'}
                size={35}
                color={colors.purple}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}
