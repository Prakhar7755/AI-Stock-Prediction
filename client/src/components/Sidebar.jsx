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
    <aside className="bg-base-200 h-full w-64 sm:w-72 p-4 overflow-y-auto">
      <h2 className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-4">
        Companies
      </h2>

      <ul className="menu menu-compact gap-1">
        {companies.map(({ name, symbol }) => {
          const isActive = location.search.includes(symbol);

          return (
            <li key={symbol}>
              <Link
                to={`/selectedCompany?symbol=${encodeURIComponent(
                  symbol
                )}&name=${encodeURIComponent(name)}`}
                className={`flex justify-between items-center rounded-lg transition
                  ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-300"
                  }
                `}
              >
                <span className="font-medium">{name}</span>
                <span className="text-xs opacity-70">{symbol}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
