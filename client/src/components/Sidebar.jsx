import { Link, useLocation } from "react-router-dom";

const companies = [
  { name: "Apple", symbol: "AAPL" },
  { name: "Amazon", symbol: "AMZN" },
  { name: "Google", symbol: "GOOG" },
  { name: "Microsoft", symbol: "MSFT" },
  { name: "Facebook", symbol: "META" },
  { name: "Tesla", symbol: "TSLA" },
  { name: "Netflix", symbol: "NFLX" },
  { name: "Nvidia", symbol: "NVDA" },
  { name: "Adobe", symbol: "ADBE" },
  { name: "Salesforce", symbol: "CRM" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-base-100 h-full w-80 p-4 overflow-y-auto border-r border-base-200">
      <h2 className="text-xs font-bold text-base-content/50 uppercase tracking-widest mb-4 px-2">
        Market Watch
      </h2>

      <ul className="menu gap-2 p-0">
        {companies.map(({ name, symbol }) => {
          const isActive = location.search.includes(symbol);

          return (
            <li key={symbol}>
              <Link
                to={`/selectedCompany?symbol=${encodeURIComponent(
                  symbol
                )}&name=${encodeURIComponent(name)}`}
                className={`flex justify-between items-center rounded-xl px-4 py-3 transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-primary-content shadow-md scale-[1.02]"
                      : "hover:bg-base-200 hover:translate-x-1"
                  }
                `}
              >
                <span className="font-bold text-sm">{name}</span>
                <span
                  className={`text-xs font-mono ${isActive ? "text-primary-content/80" : "text-base-content/60"}`}
                >
                  {symbol}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
