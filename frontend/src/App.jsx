import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Protected from "./components/Protected";
import ProtectedCreateListing from "./components/ProtectedCreateListing";
import CreateListingPage from "./pages/CreateListingPage";
import RentPage from "./pages/RentPage";
import PgPage from "./pages/PgPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import BasicProfilePage from "./pages/BasicProfilePage";
import YourPropertyPage from "./pages/YourPropertyPage";
import CookieProtected from "./components/CookieProtected";
import MailVerification from "./components/MailVerification";
import MailVerificationPage from "./pages/MailVerificationPage";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import EditPage from "./pages/EditPage";
import FavouritePropperty from "./components/FavouritePropperty";
import NotFound from "./pages/NotFound";
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/search/:category?"
          element={<SearchPage showSuccessMessage={showSuccessMessage} />}
        />
        <Route path="/property/:category/:id?" element={<PropertyPage />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword showSuccessMessage={showSuccessMessage} />}
        ></Route>
        <Route
          path="/reset-password"
          element={<ResetPassword showSuccessMessage={showSuccessMessage} />}
        ></Route>
        <Route
          path="/signup"
          element={<SignupPage showSuccessMessage={showSuccessMessage} />}
        ></Route>
        <Route
          path="/login"
          element={<LoginPage showSuccessMessage={showSuccessMessage} />}
        ></Route>
        <Route
          path="/mail-verification"
          element={
            <MailVerificationPage showSuccessMessage={showSuccessMessage} />
          }
        ></Route>
        {/* <Route element={<CookieProtected />}></Route> */}
        <Route element={<Protected />}>
          <Route path="/create-listing" element={<CreateListingPage />}></Route>
          <Route
            path="/create-listing/pg"
            element={<PgPage showSuccessMessage={showSuccessMessage} />}
          ></Route>
          <Route
            path="/create-listing/rent"
            element={<RentPage showSuccessMessage={showSuccessMessage} />}
          ></Route>
          <Route
            path="/edit-property/:category/:id?"
            element={<EditPage showSuccessMessage={showSuccessMessage} />}
          />
          {/* Nested routes for profile */}
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
          </Route>
          {/* <Route path="/mail-verification" element={MailVerification} /> */}
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
}

export default App;

// reset-password
