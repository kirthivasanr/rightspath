# Firebase Setup Instructions

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "RightsPath")
4. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and add your project's domains

## 3. Enable Firestore Database

1. Go to "Firestore Database" in the sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location close to your users

## 4. Get Your Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and select the web icon (</>)
4. Register your app with a name
5. Copy the configuration object

## 5. Update Firebase Configuration

Replace the placeholder values in `src/lib/firebase.ts` with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## 6. Security Rules for Firestore

Go to Firestore Database > Rules and update them to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own question history
    match /questionHistory/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 7. Test the Setup

1. Run `npm run dev` to start your development server
2. Try creating an account using the Signup page
3. Test Google authentication
4. Test asking questions and viewing history

## Features Implemented

- ✅ User registration with email/password
- ✅ Google authentication
- ✅ User login/logout
- ✅ Question history storage
- ✅ Protected routes
- ✅ Multi-language support
- ✅ User profile in navbar
- ✅ Automatic question saving to history

## Troubleshooting

1. **Authentication errors**: Check that your domain is added to authorized domains in Firebase
2. **Firestore permission errors**: Verify your security rules
3. **Google Sign-in issues**: Ensure Google provider is enabled and configured
