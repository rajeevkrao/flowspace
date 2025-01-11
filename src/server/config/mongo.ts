import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

let cache:MongoClient;

export const initMongoDB = async () => {
	if (!cache) cache = new MongoClient(uri ?? '');
	// @ts-expect-error - Type Error but works
	if (!cache?.topology) await cache.connect(); 
	return cache;
};

export const getDB = async () => {
	const client = await initMongoDB();
	return client.db('blogs');
}

export const getCol = async () => {
	const db = await getDB();
	return db.collection('blogs');
}

