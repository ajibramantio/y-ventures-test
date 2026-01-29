# Y Ventures Test Project

A modern frontend application built with React, TypeScript, Redux Toolkit, and React Router. This project demonstrates a complete implementation of a Todos management system and a Posts viewer with API integration.

## 🚀 Features

### Core Features
- **TypeScript**: Fully typed React application
- **React Router**: Navigation between Todos and Posts pages
- **Redux Toolkit**: Global state management for todos
- **Modern UI**: Responsive design with loading, empty, and error states

### Todos Page
- ✅ Add new tasks
- ✅ Mark tasks as completed
- ✅ Delete tasks
- ✅ Filter tasks by All / Completed / Pending (Bonus)
- ✅ Persist tasks to localStorage (Bonus)

### Posts Page
- ✅ Fetch and display posts from JSONPlaceholder API
- ✅ Search posts by ID
- ✅ Fetch and display comments for searched posts
- ✅ Full UI state handling (loading, empty, error)

### Additional Features (Bonus)
- ✅ Unit tests with Jest
- ✅ Comprehensive README documentation
- ✅ Well-structured codebase with TypeScript

## 📋 Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd y-ventures-test
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173` (or the next available port).

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## 📁 Project Structure

```
y-ventures-test/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── LoadingState.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   ├── pages/              # Page components
│   │   ├── TodosPage.tsx
│   │   └── PostsPage.tsx
│   ├── store/              # Redux store configuration
│   │   ├── store.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       ├── todosSlice.ts
│   │       └── __tests__/
│   │           └── todosSlice.test.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   ├── App.css             # App styles
│   └── index.css           # Global styles
├── public/                 # Static assets
├── jest.config.js          # Jest configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json
```

## 🧪 Testing

The project includes unit tests for the Redux todos slice. Tests are located in `src/store/slices/__tests__/todosSlice.test.ts`.

To run tests:
```bash
npm test
```

## 🌐 API Integration

The Posts page integrates with the JSONPlaceholder API:
- **Posts API**: `https://jsonplaceholder.typicode.com/posts`
- **Comments API**: `https://jsonplaceholder.typicode.com/comments?postId={id}`

## 🎨 UI States

All pages implement comprehensive UI state handling:

- **Loading State**: Shown while fetching data
- **Empty State**: Displayed when no data is available
- **Error State**: Shown when API requests fail, with retry functionality

## 💾 Data Persistence

Todos are automatically saved to `localStorage` and restored on page reload. This ensures your tasks persist across browser sessions.

## 🛠️ Technologies Used

- **React 19**: UI library
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **Vite**: Build tool and dev server
- **Jest**: Testing framework
- **Testing Library**: React component testing utilities

## 📝 Notes for Reviewers

1. **TypeScript**: The entire project is written in TypeScript with strict type checking enabled.

2. **State Management**: Redux Toolkit is used for managing todos state, demonstrating global state management capabilities.

3. **Code Organization**: The codebase follows a clear structure with separation of concerns:
   - Components for reusable UI elements
   - Pages for route-level components
   - Store for state management
   - Tests co-located with the code they test

4. **Error Handling**: Comprehensive error handling is implemented for all API calls with user-friendly error messages and retry functionality.

5. **Responsive Design**: The UI is responsive and works well on different screen sizes.

6. **Accessibility**: Basic accessibility features are implemented, including proper ARIA labels and keyboard navigation support.

## 📄 License

This project is created for testing purposes.
