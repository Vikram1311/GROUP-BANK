# Group-Bank
small financing for -dream to reality

---

## 📱 Mobile App Download

> **Latest release:** Go to the [Releases](../../releases) page and download the Android `.apk`.

### Install the APK on your phone
1. Open the [Releases](../../releases) page on your phone.
2. Tap the `.apk` file to download it.
3. Open **Settings → Security** and enable **"Install from unknown sources"** (one-time step).
4. Open the downloaded APK and tap **Install**.
5. Open **SHG Bank** and log in.

### iOS build artifact (Simulator)
1. Go to **Actions** tab → **Build iOS App** workflow.
2. Open the latest run → scroll down to **Artifacts**.
3. Download **shg-bank-ios-simulator-app**.
4. This artifact is a simulator build (`App.app.zip`), not a signed App Store/TestFlight `.ipa`.

---

## 🛠️ Build APK Yourself (GitHub Actions)

A new APK is built automatically every time code is pushed to `main`:

1. Go to **Actions** tab → **Build Android APK** workflow.
2. Open the latest run → scroll down to **Artifacts**.
3. Download **shg-bank-apk** and install it.

### To publish a release APK with a version tag
```bash
git tag v1.0.0
git push origin v1.0.0
```
This triggers the workflow and creates a GitHub Release with the APK attached.

## 🍎 Build iOS Artifact (GitHub Actions)

An iOS simulator artifact is built automatically every time code is pushed to `main`/`master`:

1. Go to **Actions** tab → **Build iOS App** workflow.
2. Open the latest run → scroll down to **Artifacts**.
3. Download **shg-bank-ios-simulator-app**.

### Optional: Signed release APK
Add these secrets in **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `KEYSTORE_BASE64` | Base64-encoded `.keystore` file (`base64 release.keystore`) |
| `KEYSTORE_PASSWORD` | Keystore password |
| `KEY_PASSWORD` | Key alias password |

Without these secrets the workflow produces a **debug APK** (works fine for testing).

---

## 💻 Local Development

```bash
npm install
npm run dev          # start dev server at http://localhost:5173
```

### Build + sync to Android (requires Android Studio)
```bash
npm run cap:sync:android  # builds web assets and syncs to Android project
npm run cap:open     # opens Android Studio to build/run the app
```

### Build + sync to iOS (requires Xcode on macOS)
```bash
npm run cap:sync:ios   # builds web assets and syncs to iOS project
npm run cap:open:ios   # opens Xcode to build/run the app
```

---

## Cross-device data sharing (Laptop + Mobile)

By default, app data is stored in each browser's local storage.  
To sync updates across devices, configure a shared JSON API endpoint:

- `VITE_SHARED_STATE_URL` = shared endpoint URL
- `VITE_SHARED_STATE_TOKEN` = optional bearer token
- `VITE_SHARED_STATE_METHOD` = optional HTTP method (`PUT` default, supports `POST` / `PATCH`)

### Expected API behavior

- `GET VITE_SHARED_STATE_URL` should return either:
  - `{ "version": 1, "updatedAt": "...", "state": { ...appState } }`, or
  - direct state object `{ ...appState }`
- Write method (`PUT`/`POST`/`PATCH`) should accept the same envelope JSON body.

Once configured, admin changes made on laptop can be fetched by member mobile sessions using the same shared endpoint.
