import { Link } from "react-router-dom";

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
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 overflow-y-auto">
      {companies.map(({ name, symbol }) => (
        <li key={symbol} className="mb-2">
          <Link
            to={`/selectedCompany?symbol=${encodeURIComponent(
              symbol
            )}&name=${encodeURIComponent(name)}`}
            className="hover:bg-blue-200 rounded px-2 py-1 block"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
