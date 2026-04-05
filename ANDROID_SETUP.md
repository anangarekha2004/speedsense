# SpeedSense Android Setup Guide

This project is built using **Kotlin** and **Jetpack Compose**. It uses **Firebase** for authentication and data storage.

## Prerequisites
- Android Studio Hedgehog (2023.1.1) or newer
- A Firebase project

## Setup Instructions

### 1. Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing one.
3. Add an Android app to your project.
   - Package name: `com.speedsense.app`
4. Download the `google-services.json` file.
5. Place the `google-services.json` file in the `app/` directory of this project.

### 2. Enable Firebase Services
1. **Authentication**: Enable the "Email/Password" and "Google" sign-in providers.
2. **Firestore**: Create a Firestore database in "Production" or "Test" mode.
   - Ensure the security rules allow authenticated users to read/write their own data.

### 3. Build and Run
1. Open the project in Android Studio.
2. Wait for Gradle to sync.
3. Run the app on an emulator or a physical device.

## Project Architecture
- **MVVM**: Model-View-ViewModel architecture for clean separation of concerns.
- **Jetpack Compose**: Modern declarative UI toolkit.
- **Navigation Compose**: Type-safe navigation between screens.
- **Firebase SDK**: Direct integration with Firestore and Auth.

## Features
- **Expense Tracking**: Add and view transactions.
- **Dashboard**: Monthly summary and recent logs.
- **Insights**: Visual charts using the Vico library.
- **Authentication**: Secure login and signup.
- **Retro-Futurist Theme**: Custom Material 3 theme with high-contrast colors.
