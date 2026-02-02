import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 border-b border-base-200">
      <div className="navbar-start">
        <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
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
          className="text-lg sm:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary hover:opacity-80 transition-opacity"
        >
          <span className="hidden sm:inline">AI Stock Prediction</span>
          <span className="sm:hidden">AI Stock</span>
        </Link>
      </div>

      <div className="navbar-end">
        <Link to="/predict">
          <button className="btn btn-primary btn-sm sm:btn-md shadow-lg hover:shadow-primary/40 transition-all rounded-full px-3 sm:px-6">
            <span className="hidden sm:inline">Custom Analysis</span>
            <span className="sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
