const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
const parts = html.split('<article class="portfolio-card"');
for (let i = 1; i < parts.length; i++) {
  const urlMatch = parts[i].match(/<a href="([^"]+)"/);
  if (urlMatch) {
    let url = urlMatch[1].trim();
    if (url.endsWith('/')) url = url.slice(0, -1);
    const svgRegex = /<svg width="80" height="40"[\s\S]*?<\/svg>/;
    const imgTag = `<img src="https://image.thum.io/get/width/800/crop/800/${url}" alt="" class="portfolio-card__image" loading="lazy" onerror="this.style.display='none'">`;
    parts[i] = parts[i].replace(svgRegex, imgTag);
  }
}
fs.writeFileSync('index.html', parts.join('<article class="portfolio-card"'));
console.log('done');
