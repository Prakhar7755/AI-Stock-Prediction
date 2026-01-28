import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost btn-square "
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      <div className="navbar-center">
        <Link
          to="/"
          className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide text-primary hover:text-primary-focus transition"
        >
          AI Stock Prediction
        </Link>
      </div>

      <div className="navbar-end">
        <Link to="/predict">
          <button className="btn btn-primary btn-sm sm:btn-md shadow hover:scale-105 transition-transform">
            Custom Analysis
          </button>
        </Link>
      </div>
    </div>
  );
}
