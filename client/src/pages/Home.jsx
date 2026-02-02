import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero min-h-[calc(100vh-5rem)] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <div className="mb-8 inline-block p-4 rounded-full bg-base-100 shadow-xl">
            <img
              src="/svg1.svg"
              alt="logo"
              className="w-20 h-20 mx-auto"
              loading={"lazy"}
            />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI Stock Prediction
          </h1>

          <p className="text-xl sm:text-2xl mb-10 text-base-content/70 leading-relaxed">
            Analyze trends, forecast performance, and make smarter trading
            decisions — powered by{" "}
            <span className="font-bold text-base-content">
              machine learning
            </span>
            .
          </p>

          <Link to="/predict">
            <button className="btn btn-primary btn-lg px-12 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg font-bold">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
