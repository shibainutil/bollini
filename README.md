
# Bollini

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

