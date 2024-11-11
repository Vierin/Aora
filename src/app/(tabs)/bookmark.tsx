import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageCard from '@/components/ImageCard';
import EmptyState from '@/components/EmptyState';

const Bookmark = () => {
	return (
		<SafeAreaView className="bg-primary min-h-[100vh]">
			<FlatList
				data={[]}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <ImageCard image={item} />}
				ListHeaderComponent={() => (
					<View className="flex my-6 px-4 space-y-6">
						<Text className="font-pmedium text-sm text-gray-100">
							Saved Images
						</Text>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState title="No Images Found" subtitle="No images saved" />
				)}
			/>
		</SafeAreaView>
	);
};

export default Bookmark;
