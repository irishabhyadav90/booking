import { Routes, BrowserRouter as  Router, Route, Navigate} from 'react-router-dom'
import Layout from './layouts/Layout';
import Register from './pages/register';
import SignIn from './pages/signIn';

function App() {

  return (
  <Router>
    <Routes>
      <Route path="/" element={<Layout><p>Home</p></Layout>}/>
      <Route path="*" element={< Navigate to="/"/>}/>
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
    </Routes>
  </Router>
  )
}

export default App
