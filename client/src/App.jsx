import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("./pages/Home.jsx"));
const PredictPage = lazy(() => import("./pages/PredictPage.jsx"));
const SelectedCompanyPage = lazy(() => import("./pages/SelectedCompanyPage.jsx"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/selectedCompany" element={<SelectedCompanyPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
