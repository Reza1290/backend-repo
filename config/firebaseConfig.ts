// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { config } from 'dotenv';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
config();

var admin = require("firebase-admin");
const pv = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/\\n/g, '\n') : ''
// Initialize Firebase
export const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
    credential: admin.credential.cert({
      "type": process.env.FIREBASE_TYPE,
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": pv,
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": process.env.FIREBASE_AUTH_URI,
      "token_uri": process.env.FIREBASE_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
      "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });

export const auth = getAuth(app);
export const db = getFirestore(app);

// export { db }
