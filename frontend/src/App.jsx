import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CustomerPage from "./pages/CustomerPage";
import MerchantPage from "./pages/MerchantPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/customerPage" element={<CustomerPage />} />
        <Route path="/merchantPage" element={<MerchantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
