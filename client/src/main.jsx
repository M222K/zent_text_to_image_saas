import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <App />
  </AppContextProvider>
  </BrowserRouter>

  //we will enclose our full app with browser router to set up routes

//   How it Works:
//   Wrap Your App: You place < BrowserRouter > (or createBrowserRouter in newer versions) at the root of your React component tree(usually in index.js).
// Define Routes: Inside, you use < Routes > and < Route > components to map specific URL paths(like / about, /contact) to the React components you want to render for those paths.
  // Navigate: Use < Link > components for navigation, which prevents page reloads and updates the URL.
)
