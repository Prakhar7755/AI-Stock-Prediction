import yahooFinance from "yahoo-finance2";

export async function getHistoricalData(symbol, period1Input, period2Input) {
  try {
    const now = new Date();
    // Parse input dates or fallback to default last 7 days
    const period1 = period1Input ? new Date(period1Input) : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const period2 = period2Input ? new Date(period2Input) : now;

    // Validate that period1 <= period2 (optional)
    if (period1 > period2) {
      throw new Error("period1 must be earlier than or equal to period2");
    }

    const result = await yahooFinance.chart(symbol, {
      period1,
      period2,
      interval: "1d",
    });

    if (process.env.NODE_ENV !== "production") {
      console.log("Yahoo result:", JSON.stringify(result, null, 2));
    }

    if (!result || !result.quotes || result.quotes.length === 0) {
      return null;
    }

    const formatted = result.quotes.map((q) => ({
      date: (typeof q.date === "string" ? q.date : q.date?.toISOString())?.split("T")[0],
      open: q.open,
      high: q.high,
      low: q.low,
      close: q.close,
      volume: q.volume,
    }));

    return formatted;
  } catch (err) {
    console.error("❌ Failed to fetch the data:", err);
    return null;
  }
}




// import yahooFinance from "yahoo-finance2";

// export async function getHistoricalData(symbol) {
//   try {
//     const now = new Date();
//     const period1 = new Date(now);
//     period1.setDate(now.getDate() - 4);

//     const result = await yahooFinance.chart(symbol, {
//       period1,
//       period2: now,
//       interval: "1d",
//     });

//     console.log("Yahoo result:", JSON.stringify(result, null, 2));

//     // Check for quotes array
//     if (!result || !result.quotes || result.quotes.length === 0) {
//       return null;
//     }

//     // Map quotes to desired format
//     const formatted = result.quotes.map((q) => ({
//       date: (typeof q.date === "string" ? q.date : q.date.toISOString()).split(
//         "T"
//       )[0],
//       open: q.open,
//       high: q.high,
//       low: q.low,
//       close: q.close,
//       volume: q.volume,
//     }));

//     return formatted;
//   } catch (err) {
//     console.error("Failed to fetch the data", err);
//     return null;
//   }
// }
