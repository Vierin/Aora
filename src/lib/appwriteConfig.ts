import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
	Storage,
	ImageGravity,
} from 'react-native-appwrite';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.jsm.aora-vierin',
	projectId: '672f76760011d27f595c',
	databaseId: '672f798d000e2eb77a61',
	userCollectionId: '672f79ba00307b9cf057',
	imageCollectionId: '6730ab280025345051c5',
	storageId: '672f7b28002c7808796c',
};

const client = new Client()
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(email, password, username) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		throw new Error(error);
	}
}

export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		throw new Error(error);
	}
};

export const getAllPosts = async () => {
	try {
		const user = await getCurrentUser();
		if (!user) throw new Error('User is not authenticated');

		const posts = await databases.listDocuments(
			config.databaseId,
			config.imageCollectionId
		);

		if (!posts) throw Error;

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.imageCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(7)]
		);

		if (!posts) throw Error;

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const searchPosts = async (query) => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.imageCollectionId,
			[Query.search('title', query)]
		);

		if (!posts) throw Error;

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getUserPosts = async (userId) => {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.imageCollectionId,
			[Query.equal('creator', userId)]
		);

		if (!posts) throw Error;

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const signOut = async () => {
	try {
		const session = await account.deleteSession('current');

		return session;
	} catch (error) {
		throw new Error(error);
	}
};

export const getFilePreview = async (fileId) => {
	let fileUrl;

	try {
		fileUrl = await storage.getFilePreview(
			config.storageId,
			fileId,
			2000,
			2000,
			'top' as ImageGravity,
			100
		);

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error) {
		throw new Error(error);
	}
};

export const uploadFile = async (file) => {
	if (!file) throw new Error('No file provided');

	const { mimeType, ...rest } = file;
	const asset = { type: mimeType, ...rest };

	try {
		const uploadedFile = await storage.createFile(
			config.storageId,
			ID.unique(),
			asset
		);

		const fileUrl = await getFilePreview(uploadedFile.$id);

		return fileUrl;
	} catch (error) {
		throw new Error(error);
	}
};

export const createImage = async (form) => {
	try {
		const imageUrl = await uploadFile(form.image);

		const newPost = await databases.createDocument(
			config.databaseId,
			config.imageCollectionId,
			ID.unique(),
			{
				title: form.title,
				image: imageUrl,
				prompt: form.prompt,
				creator: form.userId,
			}
		);

		return newPost;
	} catch (error) {
		throw new Error(error);
	}
};
