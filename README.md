# User Management App

This is a React Native mobile application developed using Expo.  
The app fetches user data from an API, displays it in a list, supports searching, marking favorites, pull-to-refresh, and local notifications when a user is added to favorites.

------------------------------------------------------------

## Features
- Fetch users from API
- Display name, email, and city
- Search users by name or email
- Pull to refresh
- Mark / unmark favorites
- Favorites stored using AsyncStorage
- Favorites persist after app restart
- Local notification when user added to favorites
- Loading and error handling

------------------------------------------------------------

## Tech Stack
- React Native
- Expo
- Functional Components
- React Hooks (useState, useEffect)
- AsyncStorage
- Expo Notifications
- dotenv (.env for API URL)

------------------------------------------------------------

## Installation & Setup

1. Clone repository
git clone https://github.com/YOUR_USERNAME/User-Management-App.git
cd User-Management-App

2. Install dependencies
npm install

3. Create .env file in root
API_URL=https://jsonplaceholder.typicode.com/users

4. Start the app
npx expo start

------------------------------------------------------------

## Babel Configuration
Ensure `babel.config.js` exists in root:

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};

------------------------------------------------------------

## Folder Structure
screens/
components/
storage/
utils/
App.js
babel.config.js
.env

------------------------------------------------------------

## Troubleshooting
If bundler misbehaves:
npx expo start -c

If dependencies break:
npm install again

------------------------------------------------------------

## Status
Project completed for assignment.
