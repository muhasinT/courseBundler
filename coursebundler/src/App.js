import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Courses from './components/courses/Courses';
import Home from './components/home/Home';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';
import Contact from './components/contact/Contact';
import Request from './components/request/Request';
import About from './components/about/About';
import Subscribe from './components/payments/Subscribe';
import NotFound from './components/layout/notFound/NotFound';
import PaymentSuccess from './components/payments/PaymentSuccess';
import PaymentFail from './components/payments/PaymentFail';
import CoursePage from './components/coursePage/CoursePage';
import Profile from './components/profile/Profile';
import ChangePassword from './components/profile/ChangePassword';
import UpdateProfile from './components/profile/UpdateProfile';
import Dashboard from './components/admin/dashboard/Dashboard';
import CreateCourse from './components/admin/createCourse/CreateCourse';
import AdminCourses from './components/admin/adminCourses/AdminCourses';
import Users from './components/admin/users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/layout/loader/Loader';

function App() {

  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <Router>
      {
        loading ?
          (<Loader />)
          : (
            <>
              <Header isAuthenticated={isAuthenticated} user={user} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CoursePage user={user} />
                  </ProtectedRoute>
                } />
                <Route path="/contact" element={<Contact />} />
                <Route path="/request" element={<Request />} />
                <Route path="/about" element={<About />} />

                <Route path="/profile"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Profile user={user} />
                    </ProtectedRoute>

                  } />
                <Route path="/changepassword"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                    >

                      <ChangePassword />
                    </ProtectedRoute>
                  } />
                <Route path="/updateprofile"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                    >
                      <UpdateProfile user={user} />

                    </ProtectedRoute>
                  } />

                <Route path="/login"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <Login />
                    </ProtectedRoute>

                  } />
                <Route path="/register" element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <Register />
                  </ProtectedRoute>

                } />
                <Route path="/forgetpassword"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <ForgetPassword />
                    </ProtectedRoute>
                  } />

                <Route path="/resetpassword/:token"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <ResetPassword />
                    </ProtectedRoute>
                  }

                />

                <Route path="/subscribe" element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Subscribe user={user} />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />

                <Route path="/paymentsuccess" element={<PaymentSuccess />} />

                <Route path="/paymentfail" element={<PaymentFail />} />

                {/*Admin Routes*/}

                <Route path="/admin/dashboard"
                  element={
                    <ProtectedRoute
                      adminRoute={true}
                      isAuthenticated={isAuthenticated}
                      isAdmin={user && user.role === 'admin'}
                    >
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                <Route path="/admin/createcourse" element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAuthenticated={isAuthenticated}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <CreateCourse />

                  </ProtectedRoute>

                } />
                <Route path="/admin/courses"
                  element={
                    <ProtectedRoute
                      adminRoute={true}
                      isAuthenticated={isAuthenticated}
                      isAdmin={user && user.role === 'admin'}
                    >
                      <AdminCourses />
                    </ProtectedRoute>
                  } />
                <Route path="/admin/users" element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAuthenticated={isAuthenticated}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <Users />

                  </ProtectedRoute>
                } />

              </Routes>
              <Footer />
              <Toaster />
            </>
          )

      }
    </Router>
  );
};

export default App;
