# Cool Pic - Photo Filters App

A React application for applying filters to your photos, with Google and Apple authentication.

## Features

- Authentication with Google and Apple
- Protected routes
- User session management
- Modern and responsive UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd cool-pic
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication and add Google and Apple providers
   - Get your Firebase configuration

4. Create a `.env.local` file in the root directory and add your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── contexts/
  │   └── AuthContext.jsx    # Authentication context
  ├── lib/
  │   └── firebase.js        # Firebase configuration
  ├── pages/
  │   ├── index.jsx         # Home page
  │   └── login.jsx         # Login page
  ├── App.js                # Main app component
  └── App.css               # Global styles
```

## Authentication Flow

1. Users can sign in with Google or Apple
2. Authentication state is managed through React Context
3. Protected routes redirect to login if not authenticated
4. User session persists across page reloads

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
