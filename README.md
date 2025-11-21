# BTC & Pi Monitor (GitHub Pages + GitHub Action)

## What this repo does
- Static frontend served on GitHub Pages (index.html)
- `data.json` is produced automatically every 15 minutes by a GitHub Action
- Action fetches:
  - Bitcoin price (CoinGecko)
  - Pi quote (CoinMarketCap)
  - News (NewsAPI) — annotated with sentiment

## Setup (one-time)
1. Create this repo on GitHub and push files.
2. Go to **Settings → Pages** and enable GitHub Pages (branch `main`, folder `/`).
3. Go to **Settings → Secrets and variables → Actions → New repository secret** and add:
   - `NEWSAPI_KEY` (your NewsAPI key)
   - `CMC_API_KEY` (your CoinMarketCap key)
4. Commit & push. Go to **Actions** and run the workflow manually once using **Run workflow** (workflow_dispatch).
5. When run completes it will create/overwrite `data.json`. The site will read `/data.json`.

## Notes
- CoinMarketCap free tier may have rate limits; be mindful.
- The Action runs every 15 minutes; change cron in `.github/workflows/fetch-data.yml` if needed.
- Do not commit your API keys to the repository.
# Crypto
shows all my crypto investments
