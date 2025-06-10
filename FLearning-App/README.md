# 📱 FLEARNING-APP

A cross-platform **React Native** mobile application designed for flexible learning experiences. This app uses TypeScript and adheres to a modular, scalable architecture to ensure maintainability and ease of collaboration.

---

## 📁 Project Structure

```
FLEARNING-APP/
│
├── .vscode/                 # VSCode configuration (extensions, launch settings, etc.)
├── assets/                  # Static resources
│   ├── font/                # Custom fonts
│   └── images/              # App images and icons
│
├── node_modules/            # Project dependencies (auto-generated)
│
├── src/                     # Main source code
│   ├── components/          # Reusable UI components
│   ├── constants/           # Common constants (colors, API endpoints, etc.)
│   ├── contexts/            # React Contexts for global state
│   ├── hooks/               # Custom React hooks
│   ├── navigation/          # Navigation setup (React Navigation stacks, tab nav, etc.)
│   ├── screens/             # App screens (Home, Login, Profile, etc.)
│   ├── services/            # External service logic (e.g., API requests)
│   ├── store/               # Global state management (Redux/Zustand slices or stores)
│   ├── types/               # TypeScript type definitions and interfaces
│   └── utils/               # Utility/helper functions
│
├── .env                     # Environment variables
├── .gitignore               # Git ignored files/folders
├── app.json                 # App configuration (used by Expo or React Native CLI)
├── App.tsx                  # App entry point (typically wraps NavigationProvider)
├── index.ts                 # Entry file for React Native (registered via `AppRegistry`)
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Exact version lockfile
└── tsconfig.json            # TypeScript compiler configuration
```

---

## 📦 Key Technologies

- **React Native**: Core framework
- **TypeScript**: Static typing for better code quality
- **React Navigation**: Navigation between screens
- **Context API / Redux / Zustand**: (Based on actual implementation) for state management
- **Axios / Fetch**: For API service integration
- **Custom Hooks**: Encapsulate reusable logic
- **ESLint & Prettier**: Linting and formatting

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

2. **Configure environment variables**  
   Create a `.env` file based on the `.env.example` template (if provided).

3. **Run on device or simulator**
   ```bash
   npx react-native run-android
   npx react-native run-ios
   ```

---

## 🧪 Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Run Android app
npm run ios        # Run iOS app (macOS only)
npm run lint       # Lint the code
npm run format     # Format with Prettier
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) (or replace with your actual license).

---

## 🙌 Contributors

Feel free to contribute by submitting a PR or creating an issue!
