const fetch = require("node-fetch");
const Sentiment = require("sentiment");
const fs = require("fs");

const sentiment = new Sentiment();

async function fetchJSON(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

(async () => {
  try {
    console.log("Fetching BTC price...");
    const btcData = await fetchJSON("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");

    console.log("Fetching Pi (IOU) price...");
    const piData = await fetchJSON(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=PI",
      { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY }
    );

    console.log("Fetching news...");
    const newsData = await fetchJSON(
      `https://newsapi.org/v2/everything?q=Bitcoin OR crypto OR Pi Network&language=en&pageSize=10&apiKey=${process.env.NEWSAPI_KEY}`
    );

    const scoredNews = newsData.articles.map(article => ({
      title: article.title,
      url: article.url,
      sentiment: sentiment.analyze(article.title).score
    }));

    const finalData = {
      updatedAt: new Date().toISOString(),
      btc_usd: btcData.bitcoin.usd,
      pi_usd: piData.data.PI.quote.USD.price,
      news: scoredNews
    };

    fs.writeFileSync("data.json", JSON.stringify(finalData, null, 2));
    console.log("data.json updated successfully!");

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    process.exit(1);
  }
})();
