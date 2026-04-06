
# Bollini

Web testing deployment:

1. Build the Expo web app with `npm run web:build`
2. Deploy it to Firebase Hosting with `npm run hosting:deploy` or `npm run web:deploy`
3. Share the Firebase Hosting URL with testers

This project is already linked to Firebase project `bollini-c20e7`, so Firebase Hosting will publish under that project unless you change `.firebaserc`.

Private Android distribution for the Bollini app is handled through a rolling GitHub Release.

Stable APK link:

https://github.com/shibainutil/bollini/releases/download/android-latest/bollini-latest.apk

That URL stays the same. Each successful push to `main` should rebuild the Android APK and replace the release asset behind that link.

Required GitHub repository secrets:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`
- `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID`

Set them in GitHub under Settings > Secrets and variables > Actions before expecting the Android release workflow to succeed.

