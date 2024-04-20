import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route element={<Protected />}>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Route>
        <Route  element={<ProtectedCreateListing />}>
          <Route path="/create-listing" element={<CreateListingPage/>} ></Route>
          <Route path="/create-listing/pg" element={<PgPage/>} ></Route>
          <Route path="/create-listing/rent" element={<RentPage/>} ></Route>
        </Route>
        {/* <Route path="/create-listing/"/> */}
        
      </Routes>
    </Router>
  );
}

export default App;
