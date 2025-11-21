const fs=require('fs');const path=require('path');
const fetch=(...a)=>import('node-fetch').then(m=>m.default(...a));
const Sentiment=require('sentiment');const sentiment=new Sentiment();
const newsKey=process.env.NEWSAPI_KEY;const cmcKey=process.env.CMC_API_KEY;

async function fetchBTC(){return (await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')).json();}
async function fetchPI(){return (await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=PI',{headers:{'X-CMC_PRO_API_KEY':cmcKey}})).json();}
async function fetchNews(){const q=encodeURIComponent('bitcoin OR "pi network"');
return (await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=12&sortBy=publishedAt&language=en`,
{headers:{Authorization:`Bearer ${newsKey}`}})).json();}

function annotate(a){return a.map(x=>({...x,sentimentScore:sentiment.analyze((x.title||'')+' '+(x.description||'')).score}));}

(async()=>{
 const btc=await fetchBTC();const pi=await fetchPI();const news=await fetchNews();
 const out={generatedAt:new Date().toISOString(),
   bitcoin:{coinGeckoPrice:btc.bitcoin},
   pi:{cmc:pi},
   news:{articles:annotate(news.articles||[])}
 };
 fs.writeFileSync('data.json',JSON.stringify(out,null,2));
})();