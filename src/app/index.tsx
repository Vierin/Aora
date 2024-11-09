import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Page() {
	return (
		<View className="flex-1 justify-center items-center">
			<Text className="font-pblack">Hello</Text>
			<Link href="/profile">Profile</Link>
		</View>
	);
}
