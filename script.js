async function load() {
  try {
    const res = await fetch('./data.json?t=' + Date.now());
    const d = await res.json();
    document.getElementById('btc').innerText = d?.bitcoin?.coinGeckoPrice?.usd ? '$' + d.bitcoin.coinGeckoPrice.usd : 'N/A';
    let piPrice = 'N/A';
    if (d?.pi?.cmc?.data) {
      const k = Object.keys(d.pi.cmc.data);
      if (k.length) piPrice = '$' + d.pi.cmc.data[k[0]].quote.USD.price;
    }
    document.getElementById('pi').innerText = piPrice;
    const newsElem = document.getElementById('news');
    const articles = d?.news?.articles ?? [];
    newsElem.innerHTML = articles.map(a=>{
      const score=a.sentimentScore||0;
      const cls=score>0?'pos':score<0?'neg':'neu';
      return `<div class='news-item'><a href='${a.url}' target='_blank'><strong>${a.title}</strong></a>
      <div class='badge ${cls}'>${score>0?'Positive':score<0?'Negative':'Neutral'}</div>
      <p>${a.description||''}</p></div>`;
    }).join('');
  } catch(e){console.error(e);}
}
load();
setInterval(load,60000);
