import * as admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const setAdminClaim = async (email: string) => {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set custom admin claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`✅ Admin claims set for user: ${email}`);
    console.log(`User UID: ${user.uid}`);
    
  } catch (error) {
    console.error('❌ Error setting admin claims:', error);
  }
};

// Replace with your admin email
setAdminClaim('admin@lesothopos.com');