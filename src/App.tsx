import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Header from './components/Header'
import Footer from './components/Footer'
import BlogsPage from './pages/BlogsPage'
import Blog from './pages/Blog'
import Publish from './pages/Publish'
import SendOTP from './components/SendOTP'

function App() {

  return (
    <>
      <BrowserRouter>
      <div className='flex flex-col min-h-screen bg-gray-100 justify-between'>
        <Header />
        <Routes>
          <Route path='/send-otp' element={<SendOTP />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<BlogsPage unique={false} />} />
          <Route path="/blog/:id" element={<Blog unique={true}  />} />
          <Route path='/others-blog/:id' element={<Blog unique={false} />} />
          <Route path='/publish' element={<Publish />} />
          <Route path='/my-posts' element={<BlogsPage unique={true} />} />
          <Route path="*" element={<Navigate to="/send-otp" replace />} />
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
