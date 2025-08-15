import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center px-4 bg-base-100 text-base-content">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
        Welcome to
        <br />
        <span className="text-primary">AI Stock Prediction App</span>
      </h1>

      <p className="text-lg sm:text-xl max-w-2xl mb-12 text-base-content/70">
        Analyze trends, forecast performance, and make smarter trading decisions
        — powered by machine learning.
      </p>

      <Link to="/predict">
        <button className="btn btn-primary btn-lg px-10 text-lg shadow-lg hover:scale-105 transition-transform duration-200">
          Get Started
        </button>
      </Link>

      <div className="mt-20 opacity-20 ">
        <img
          src="/svg1.svg"
          alt="logo"
          className="w-20 h-20 mx-auto"
          loading={"lazy"}
        />
      </div>
    </div>
  );
}
