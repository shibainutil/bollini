# Bollini Daycare

Cross-platform Expo app for Android, iPhone, and web with real Firebase authentication.

## What is included

- Expo Router app structure for mobile and web.
- Login and create-account flow as the first screen.
- Existing `bollini.png` used in the auth screen.
- Firebase Authentication for real account creation and login.
- Firestore user document creation on account signup.
- Protected home screen shown only to authenticated users.

## Setup

1. Install Node.js 20 or newer.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your Firebase project values.
4. In Firebase Authentication, enable the Email/Password sign-in provider.
5. In Firestore, create a database for the project.
6. Set your Firebase CLI to the correct project and deploy the Firestore rules:

   ```bash
   firebase use bollini-c20e7
   npm run firestore:deploy
   ```

7. Start the app:

   ```bash
   npm run start
   ```

8. Open the Expo QR code on Android or iPhone, or press `w` for the web app.

## Distribution

- The GitHub repository link is a source code link, not an install link for Android users.
- This repository now supports a rolling Android APK release through GitHub Actions.
- Stable APK link: `https://github.com/shibainutil/bollini/releases/download/android-latest/bollini-latest.apk`
- That link stays the same and is overwritten with the newest APK whenever `main` is pushed successfully.
- Before the workflow can build the APK correctly, add the Firebase values as GitHub repository secrets with the same names as the `EXPO_PUBLIC_FIREBASE_*` environment variables.
- After the first Android install, this app is configured for Expo over-the-air updates for JavaScript and bundled assets.
- iPhone distribution still has to follow Apple's allowed channels such as TestFlight or managed enterprise distribution.

## Firebase notes

- New accounts are created in Firebase Authentication.
- A Firestore document is written to the `users` collection with the user ID, email, full name, and creation timestamp.
- The app reads Firebase config from Expo public environment variables.
- For web login persistence, the app uses browser local persistence.
- Mobile auth uses the standard Firebase Auth client from the web SDK in this Expo setup.
- Firestore rules are defined in `firestore.rules` and only allow each signed-in user to read or write their own `users/{uid}` document.

## Firebase config values

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`
- `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID` is optional.

## Suggested next features

- Daily updates and classroom feed.
- Child pickup contacts and authorization.
- Messaging between daycare staff and parents.
- Attendance and absence reporting.