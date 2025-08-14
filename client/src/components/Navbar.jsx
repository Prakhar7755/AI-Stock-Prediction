import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            className="inline-block h-5 w-5 stroke-current"
            fill="none"
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
      <div className="flex-1 text-center text-6xl lg:text-2xl font-bold tracking-wide text-primary hover:text-primary-focus transition duration-200">
        <Link to={"/"} className="ml-28 btn btn-ghost text-xl">
          AI STOCK PREDICTION
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/predict">
          <button className="btn bg-blue-500 btn-sm px-4 text-sm shadow hover:scale-105 transition-transform duration-200">
            CUSTOM ANALYSIS
          </button>
        </Link>
      </div>
    </div>
  );
}
