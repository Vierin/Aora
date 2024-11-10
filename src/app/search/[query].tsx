import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '@/lib/useAppwrite';
import { searchPosts } from '@/lib/appwriteConfig';
import ImageCard from '@/components/ImageCard';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';

const Search = () => {
	const { query } = useLocalSearchParams();
	const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

	useEffect(() => {
		refetch();
	}, [query]);

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <ImageCard image={item} />}
				ListHeaderComponent={() => (
					<View className="flex my-6 px-4 space-y-6">
						<Text className="font-pmedium text-sm text-gray-100">
							Search results for
						</Text>

						<Text className="text-2xl font-semibold text-white">{query}</Text>

						<View className="mt-6 mb-8">
							<SearchInput initialQuery={query} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Images Found"
						subtitle="No videos found for the search query"
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default Search;
