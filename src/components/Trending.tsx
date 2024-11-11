import { View, Text, FlatList, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import * as Animatable from 'react-native-animatable';

const zoomIn = {
	from: {
		scale: 0.9,
	},
	to: {
		scale: 1,
	},
};

const zoomOut = {
	from: {
		scale: 1,
	},
	to: {
		scale: 0.9,
	},
};

const TrendingItem = ({ activeItem, item }) => {
	return (
		<Animatable.View
			className="mr-5"
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			<Image
				source={{ uri: item.image }}
				className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
				resizeMode="cover"
			/>
		</Animatable.View>
	);
};

const Trending = ({ posts }) => {
	const [activeItem, setActiveItem] = useState(posts[1]);

	const viewableItemsChanged = useCallback(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key);
		}
	}, []);

	return (
		<FlatList
			data={posts}
			horizontal
			keyExtractor={(item) => item.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			onViewableItemsChanged={viewableItemsChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{ x: 100, y: 0 }}
		/>
	);
};

export default Trending;
