import { View, Text, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants';

const ImageCard = ({
	image: {
		title,
		prompt,
		image,
		creator: { username, avatar },
	},
}) => {
	return (
		<View className="flex flex-col items-center px-4 mb-14">
			<View className="flex flex-row w-full gap-3 items-start">
				<View className="flex justify-center items-center flex-row flex-1">
					<View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
						<Image
							source={{ uri: avatar }}
							className="w-full h-full rounded-lg"
							resizeMode="cover"
						/>
					</View>

					<View className="flex justify-center flex-1 mx-3 gap-y-1">
						<Text
							className="font-psemibold text-sm text-white"
							numberOfLines={1}
						>
							{title}
						</Text>
						<Text
							className="text-xs text-gray-100 font-pregular"
							numberOfLines={1}
						>
							{username}
						</Text>
					</View>
				</View>

				<View className="pt-2">
					<Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
				</View>
			</View>

			<Image
				source={{ uri: image }}
				className="w-full h-60 rounded-xl mt-3"
				resizeMode="cover"
			/>
		</View>
	);
};

export default ImageCard;
