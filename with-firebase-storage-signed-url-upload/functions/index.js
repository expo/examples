const functions = require("firebase-functions");
const { initializeApp } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

// Initialize the default app
const projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId
initializeApp({
	storageBucket: `${projectId}.appspot.com`
});
const bucket = getStorage().bucket();

exports.getResumableUploadUrl = functions.https.onCall(async (data, context) => {
	const {storagePath, metadata} = data

	// skip checking auth for this example
	// if(!context.auth) throw new HttpsError('unauthenticated', "unauthenticated")

	// create signed url
	const [url] = await bucket
		.file(storagePath)
		.createResumableUpload({
			metadata
		});

	return {url}
});
