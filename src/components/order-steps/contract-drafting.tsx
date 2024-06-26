import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import ThemeButton from '../theme-button.tsx';
import { Deal } from '../../types/asset.ts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/useRedux.ts';
import ThemeText from '../theme-text.tsx';
import tw from '../../lib/tailwind.ts';
import { isNil } from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import { uploadContract } from '../../state/asset/actions.ts';
import screens from '../../constants/screens.ts';
import { useNavigation } from '@react-navigation/native';

export default function ContractDrafting({
  nextStep,
  deal,
}: {
  nextStep: () => void;
  previousStep: () => void;
  deal: Deal;
}) {
  const navigation = useNavigation();
  const [selectedPdf, setSelectedPdf] = useState<
    DocumentPickerResponse | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [fileDownloadUrl, setFileDownloadUrl] = useState<string | null>(null);
  const user = useAppSelector(({ user: { user } }) => user);
  const dispatch = useAppDispatch();

  const uploadFile = async (fileUri: string) => {
    const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
    const reference = storage().ref(`contracts/${fileName}`);
    await reference.putFile(fileUri);
    const downloadURL = await reference.getDownloadURL();
    console.log('File uploaded successfully:', downloadURL);
    return downloadURL;
  };

  const handleSelectPdf = async () => {
    setLoading(true);
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      setSelectedPdf(doc);

      const url = await uploadFile(doc.uri);
      setFileDownloadUrl(url);
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log('User cancelled the upload', e);
      } else {
        console.log(e);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitContract =
    (type: 'signedContract' | 'originalContract') => async () => {
      setLoading(true);

      if (!fileDownloadUrl) {
        return;
      }

      try {
        let payload: {
          signedContract?: string;
          originalContract?: string;
        } = {};

        if (type === 'signedContract') {
          payload = {
            signedContract: fileDownloadUrl,
          };
        } else {
          payload = {
            originalContract: fileDownloadUrl,
          };
        }

        await dispatch(
          uploadContract({
            ...payload,
            dealUUID: deal.uuid,
          }),
        ).unwrap();

        Alert.alert(
          'Success',
          'The original contract was uploaded successfully',
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

  const UploadContract = ({
    type,
    message,
    buttonMessage,
  }: {
    type: 'signedContract' | 'originalContract';
    message: string;
    buttonMessage?: string;
  }) => {
    return (
      <>
        <ThemeText style={tw`text-center my-3`}>{message}</ThemeText>

        <TouchableOpacity
          onPress={handleSelectPdf}
          style={tw`h-40 items-center justify-center bg-gray-100 mb-4 rounded-md`}>
          <AntDesign name="addfile" size={50} />
        </TouchableOpacity>

        {selectedPdf?.name && <ThemeText>{selectedPdf.name}</ThemeText>}
        <ThemeButton
          loading={loading}
          disabled={!fileDownloadUrl}
          onPress={handleSubmitContract(type)}
          label={buttonMessage || 'Upload Contract'}
        />
      </>
    );
  };

  return (
    <View>
      {isNil(deal.originalContract) && (
        <View style={tw`mb-3`}>
          <>
            {deal.asset.owner.uuid === user.uuid && (
              <UploadContract
                type={'originalContract'}
                message={
                  'Please proceed with uploading the contract below so as to proceed'
                }
              />
            )}
          </>
          <>
            {deal.asset.owner.uuid !== user.uuid && (
              <>
                <ThemeText style={tw`text-center mb-3`}>
                  The owner is yet to upload a contract draft, please wait
                  before you can proceed with signing of the contract.
                </ThemeText>
              </>
            )}
          </>
        </View>
      )}

      {deal.originalContract && (
        <View style={tw`mb-3`}>
          <>
            {deal.asset.owner.uuid !== user.uuid && (
              <View>
                <ThemeButton
                  onPress={() => {
                    navigation.navigate(screens.PdfViewer, {
                      uri: deal.originalContract,
                    });
                  }}
                  style={tw`mt-2`}
                  label={'Download pdf'}
                  type="clear"
                  icon={
                    <>
                      <AntDesign name="pdffile1" size={20} style={tw`mr-2`} />
                    </>
                  }
                  disabled={!deal.originalContract}
                />
                <UploadContract
                  type={'signedContract'}
                  message={
                    'Please download the contract below, sign, then re-upload it so as to proceed to the next steps'
                  }
                  buttonMessage={'Upload signed contract'}
                />
              </View>
            )}
          </>
          <>
            {deal.asset.owner.uuid === user.uuid && (
              <>
                <ThemeText style={tw`text-center mb-3`}>
                  The buyer hasn't yet uploaded a signed contract. Please come
                  back once the document is signed so that you can proceed with
                  next steps
                </ThemeText>
              </>
            )}
          </>
        </View>
      )}

      {deal.signedContract && (
        <ThemeButton
          loading={loading}
          onPress={nextStep}
          style={tw`mt-2`}
          label={'Sign & Proceed'}
          disabled={!deal.originalContract}
        />
      )}
    </View>
  );
}
