import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Protected from "./components/Protected";
import ProtectedCreateListing from "./components/ProtectedCreateListing";
import CreateListingPage from "./pages/CreateListingPage";

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
        <Route element={<ProtectedCreateListing />}>
          <Route path="/create-listing" element={<CreateListingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
