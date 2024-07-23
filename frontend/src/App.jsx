import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";
import PropertyByCity from "./pages/PropertyByCity";
import PropertyYouContacted from "./pages/PropertyYouContacted";
import PublicRoute from "./components/PublicRoute";
import Protected from "./components/Protected";

// Example components for lazy loading
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
// const Protected = React.lazy(() => import("./components/Protected"));
const CreateListingPage = React.lazy(() => import("./pages/CreateListingPage"));
const RentPage = React.lazy(() => import("./pages/RentPage"));
const PgPage = React.lazy(() => import("./pages/PgPage"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const BasicProfilePage = React.lazy(() => import("./pages/BasicProfilePage"));
const YourPropertyPage = React.lazy(() => import("./pages/YourPropertyPage"));
const FavouritePropperty = React.lazy(() =>
  import("./components/FavouritePropperty")
);
const MailVerificationPage = React.lazy(() =>
  import("./pages/MailVerificationPage")
);
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const PropertyPage = React.lazy(() => import("./pages/PropertyPage"));
const EditPage = React.lazy(() => import("./pages/EditPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
// Importing toastify module
import { toast, ToastContainer } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,

// import utility csss-----
import "./styles/Utility.css";

// toastify
const showSuccessMessage = (msg) => {
  // console.log(msg);
  toast.success(msg, {
    position: "top-right", // Top-right mein position set kiya gaya hai
    autoClose: 3000, // 3 seconds ke baad automatically close hoga
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      width: "200px", // Toast ki width 200px set ki gayi hai
      marginTop: "10px", // Margin top 10px set kiya gaya hai
      textTransform: "capitalize",
      fontFamily: "sans-serif",
      fontSize: "13px",
    },
  });
};

function App() {
  // toast.success("Action completed!")

  return (
    <Router>
      <Header showSuccessMessage={showSuccessMessage} />
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<HomePage showSuccessMessage={showSuccessMessage} />}
          />
          <Route
            path="/contact"
            element={<ContactPage showSuccessMessage={showSuccessMessage} />}
          />
          <Route
            path="/about"
            element={<AboutPage showSuccessMessage={showSuccessMessage} />}
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage showSuccessMessage={showSuccessMessage} />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage showSuccessMessage={showSuccessMessage} />
              </PublicRoute>
            }
          />

          <Route
            path="/create-listing"
            element={
              <CreateListingPage showSuccessMessage={showSuccessMessage} />
            }
          />
               <Route
            path="/create-listing/pg"
            element={<PgPage showSuccessMessage={showSuccessMessage} />}
             />
          <Route
            path="/create-listing/rent"
            element={<RentPage showSuccessMessage={showSuccessMessage} />}
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword showSuccessMessage={showSuccessMessage} />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword showSuccessMessage={showSuccessMessage} />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={<ProfilePage showSuccessMessage={showSuccessMessage} />}
          >
            <Route
              path="myProfile"
              element={
                <BasicProfilePage showSuccessMessage={showSuccessMessage} />
              }
            />
            <Route
              path="yourPropertyList"
              element={
                <YourPropertyPage showSuccessMessage={showSuccessMessage} />
              }
            />
            <Route
              path="favourite"
              element={
                <FavouritePropperty showSuccessMessage={showSuccessMessage} />
              }
            />
            <Route
              path="property-you-contacted"
              element={
                <PropertyYouContacted showSuccessMessage={showSuccessMessage} />
              }
            />
          </Route>
          <Route
            path="/mail-verification"
            element={
              <Protected>
                {" "}
                <MailVerificationPage showSuccessMessage={showSuccessMessage} />
              </Protected>
            }
          />
          <Route
            path="/search/:category?"
            element={<SearchPage showSuccessMessage={showSuccessMessage} />}
          />
          <Route
            path="/property/:category/:id?"
            element={<PropertyPage showSuccessMessage={showSuccessMessage} />}
          />
          <Route
            path="/edit-property/:category/:id?"
            element={
              <Protected>
                <EditPage showSuccessMessage={showSuccessMessage} />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
