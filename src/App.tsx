import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Navigation from './components/Navigation'
import TodosPage from './pages/TodosPage'
import PostsPage from './pages/PostsPage'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TodosPage />} />
              <Route path="/todos" element={<TodosPage />} />
              <Route path="/posts" element={<PostsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App
