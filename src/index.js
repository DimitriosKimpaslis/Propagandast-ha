import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './route/App';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/views/Home';
import User from './components/views/User';
import Reviews from './components/views/Reviews';
import ReviewPage from './components/views/ReviewPage';
import UserData from './components/children/UserData';
import UserReviews from './components/children/UserReviews';
import PostReview from './components/views/PostReview';
import ProtectedRoutes from './route/ProtectedRoutes';
import PostBasicInfo from './components/children/PostBasicInfo';
import PostReviewBody from './components/children/PostReviewBody';
import Preview from './components/children/Preview';
import Auth from './components/views/Auth';
import Signin from './components/children/Signin';
import Signup from './components/children/Signup';
import Contact from './components/views/Contact';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/:id" element={<ReviewPage />} />
          <Route path='auth' element={<Auth />}>
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='contact' element={<Contact />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="post" element={<PostReview />} >
              <Route index element={<PostBasicInfo />} />
              <Route path="review-body" element={<PostReviewBody />} />
              <Route path="preview" element={<Preview />} />
            </Route>
            <Route path="user" element={<User />}>
              <Route index element={<UserData />} />
              <Route path="reviews" element={<UserReviews />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
