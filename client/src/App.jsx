import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PredictPage from "./pages/PredictPage.jsx";
import SelectedCompanyPage from "./pages/SelectedCompanyPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/predict" element={<PredictPage />} />
      <Route path="/selectedCompany" element={<SelectedCompanyPage />} />
    </Routes>
  );
}

export default App;
