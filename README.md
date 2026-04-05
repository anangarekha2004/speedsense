# SpeedSense: Retro-Futurist Personal Finance Tracker

**SpeedSense** is a high-performance personal finance application built with **Kotlin** and **Jetpack Compose**. It features a unique "Glitch Art" aesthetic and is designed for the modern grid operator.

## Features
- **Expense Tracking**: Log transactions with categories (Food, Transport, Bills, Shopping, Others).
- **Dashboard**: Real-time monthly spending summary and recent transaction logs.
- **Insights**: Visual data analysis using Vico charts to monitor spending patterns.
- **Authentication**: Secure Email/Password login and registration via Firebase.
- **Material 3 UI**: Modern, responsive design with custom retro-futurist themes.

## Tech Stack
- **Language**: Kotlin
- **UI Toolkit**: Jetpack Compose
- **Architecture**: MVVM (Model-View-ViewModel)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Charts**: Vico Compose M3

## Project Structure
- `app/src/main/java/com/speedsense/app/`
  - `data/model/`: Data entities (Expense, Category).
  - `ui/navigation/`: Navigation logic and screen definitions.
  - `ui/screens/`: Individual screen implementations (Home, Add, Insights, Profile, Auth).
  - `ui/theme/`: Custom Material 3 theme and typography.
  - `MainActivity.kt`: Entry point of the application.

## Setup
Refer to [ANDROID_SETUP.md](./ANDROID_SETUP.md) for detailed instructions on configuring Firebase and building the project.
