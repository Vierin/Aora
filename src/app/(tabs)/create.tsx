import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { createImage } from '@/lib/appwriteConfig';
import { useGlobalContext } from '@/context/GlobalProvider';

const Create = () => {
	const { user } = useGlobalContext();
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState({
		title: '',
		image: null,
		prompt: '',
	});

	const openPicker = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: ['image/png', 'image/jpg', 'image/jpeg'],
		});

		if (!result.canceled) {
			setForm({ ...form, image: result.assets[0] });
		} else {
			setTimeout(() => {
				Alert.alert('Document picked', JSON.stringify(result, null, 2));
			}, 100);
		}
	};

	const submit = async () => {
		if (!form.prompt || !form.title || !form.image) {
			return Alert.alert('Error', 'Please fill in all fields');
		}

		setUploading(true);

		try {
			await createImage({
				...form,
				userId: user.$id,
			});

			Alert.alert('Success', 'Image uploaded successfully');
			router.push('/home');
		} catch (error) {
			Alert.alert('Error', error.message);
		} finally {
			setForm({ title: '', image: null, prompt: '' });
			setUploading(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary min-h-[100vh]">
			<ScrollView className="px-4 my-6">
				<Text className="text-2xl text-white font-psemibold">Uplaod Image</Text>

				<FormField
					title="Image Title"
					value={form.title}
					placeholder="Give your image a catch title..."
					handleChangeText={(e) => setForm({ ...form, title: e })}
					otherStyles="mt-10"
				/>

				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">
						Upload Image
					</Text>

					<TouchableOpacity onPress={() => openPicker()}>
						{form.image ? (
							<Image
								source={{ uri: form.image }}
								className="w-full h-64 rounded-2xl"
								resizeMode="cover"
							/>
						) : (
							<View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
								<View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
									<Image
										source={icons.upload}
										resizeMode="contain"
										className="w-1/2 h-1/2"
									/>
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<FormField
					title="AI Prompt"
					value={form.prompt}
					placeholder="The prompt you used to create this image"
					handleChangeText={(e) => setForm({ ...form, prompt: e })}
					otherStyles="mt-7"
				/>

				<CustomButton
					title="Submit & Publish"
					handlePress={submit}
					containerStyles="mt-7"
					isLoading={uploading}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
