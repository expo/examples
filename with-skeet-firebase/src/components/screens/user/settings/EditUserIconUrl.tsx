import tw from '@/lib/tailwind'
import clsx from 'clsx'
import { Image } from 'expo-image'
import { View, Pressable, Text } from 'react-native'
import { PencilSquareIcon } from 'react-native-heroicons/outline'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { doc, updateDoc } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import { auth, db, storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { blurhash } from '@/utils/placeholder'
import { getImageBlob } from '@/utils/storage'
import Toast from 'react-native-toast-message'
import { signOut } from 'firebase/auth'

export default function EditUserIconUrl() {
  const { t } = useTranslation()
  const [user, setUser] = useRecoilState(userState)

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        exif: false,
        allowsMultipleSelection: false,
      })

      if (
        !result.canceled &&
        result.assets[0] &&
        storage &&
        user.uid !== '' &&
        db
      ) {
        const blob: Blob = (await getImageBlob(result.assets[0].uri)) as Blob
        const newProfileIconRef = ref(
          storage,
          `User/${user.uid}/profileIcon/profile.${blob.type.split('/')[1]}`
        )
        await uploadBytes(newProfileIconRef, blob)

        const downloadUrl = await getDownloadURL(newProfileIconRef)

        const docRef = doc(db, 'User', user.uid)
        await updateDoc(docRef, { iconUrl: downloadUrl })
        setUser({
          ...user,
          iconUrl: downloadUrl,
        })

        Toast.show({
          type: 'success',
          text1: t('settings.avatarUpdated') ?? 'Avatar Updated.',
          text2:
            t('settings.avatarUpdatedMessage') ??
            'Successfully updated your avatar.',
        })
      }
    } catch (err) {
      console.error(err)
      if (
        err instanceof Error &&
        (err.message.includes('Firebase ID token has expired.') ||
          err.message.includes('Error: getUserAuth'))
      ) {
        Toast.show({
          type: 'error',
          text1: t('errorTokenExpiredTitle') ?? 'Token Expired.',
          text2: t('errorTokenExpiredBody') ?? 'Please sign in again.',
        })
        if (auth) {
          signOut(auth)
        }
      } else {
        Toast.show({
          type: 'error',
          text1: t('settings.avatarUpdatedError') ?? 'Avatar Update Error.',
          text2:
            t('settings.avatarUpdatedErrorMessage') ??
            'Something went wrong... Please try it again later.',
        })
      }
    }
  }, [user, setUser, t])

  return (
    <>
      <View style={tw`p-2`}>
        <Image
          source={user.iconUrl === '' ? null : user.iconUrl}
          placeholder={blurhash}
          contentFit="cover"
          style={tw`w-32 h-32 rounded-full`}
        />
      </View>
      <View style={tw`flex flex-col items-center justify-center`}>
        <Pressable
          style={tw`${clsx(
            'flex flex-row items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-50'
          )}`}
          onPress={() => {
            pickImage()
          }}
        >
          <PencilSquareIcon style={tw`${clsx('mr-3 h-6 w-6 flex-shrink-0')}`} />
          <Text
            style={tw`py-2 font-loaded-medium text-gray-900 dark:text-gray-50`}
          >
            {t('settings.editIconUrl')}
          </Text>
        </Pressable>
      </View>
    </>
  )
}
