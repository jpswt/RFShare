import * as dotenv from 'dotenv';
dotenv.config();

export default {
	firebaseConfig: {
		projectId: process.env.PROJECT_ID,
		clientEmail: process.env.CLIENT_EMAIL,
		apiKey: process.env.FIREBASE_API_KEY,
		storageBucket: process.env.BUCKET_URL,
	},
};
