import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants';
import FormField from '@/components/FormField';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwriteConfig';

const SignUp = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		email: '',
		username: '',
		password: '',
	});

	const submit = async () => {
		if (form.username === '' || form.email === '' || form.password === '') {
			Alert.alert('Error', 'Please fill in all fields');
		}

		setIsSubmitting(true);

		try {
			const result = await createUser(form.email, form.password, form.username);

			router.replace('/home');
		} catch (error) {
			Alert.alert('Error', error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full flex justify-center min-h-[85vh] px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>

					<Text className="text-2xl text-white mt-10 text-semibold font-psemibold">
						Sign up to Aora
					</Text>

					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-7"
						placeholder={'Enter your email'}
					/>

					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						placeholder={'Enter your email'}
						keyboardType="email-address"
					/>

					<FormField
						title="Password"
						value={form.password}
						placeholder={'Enter your password'}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-10"
					/>

					<CustomButton
						title="Sign Up"
						handlePress={submit}
						containerStyles="mt-7"
						textStyles=""
						isLoading={isSubmitting}
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?{' '}
							<Link
								href="/sign-in"
								className="text-lg text-secondary font-psemibold"
							>
								Sign In
							</Link>
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
