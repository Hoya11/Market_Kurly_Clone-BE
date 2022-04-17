// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { market_kurlynew } = require('./models');


const kurlyNew = (async(req, res) => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 768
  });

  await page.goto('https://www.kurly.com/shop/goods/goods_list.php?category=038');


  // 페이지의 HTML을 가져온다.
  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const lists = $("#goodsList > div.list_goods > div > ul > li");
  // 모든 리스트를 순환한다.

  
  
  lists.each((index, list) => {
    const title = $(list).find("div > a > span.name").text().trim();
    const imgurl = $(list).find("div > div > a > img").attr("src");
    const price = $(list).find("div > a > span.cost > span.price").text().replace(/[^0-9]/g,'');
    const discount = $(list).find("div > a > span.cost > span.dc").text().replace(/[^0-9]/g,'');
    const originals = $(list).find("div > a > span.cost > span.original").text().replace(/[^0-9]/g,'');
    const desc = $(list).find("div > a > span.desc").text();
    const kurlyOnly =  $(list).find("div > a > span.tag > span").text();
    // creates(title, imgurl, price, discount, originals, desc, kurlyOnly);

    console.log({index, title, price, discount, kurlyOnly, imgurl, originals, desc});
    
    
  });
  // function creates(title, imgurl, price, discount, originals, desc, kurlyOnly) {
  //   market_kurlynew.create({title: title, price: price, discount: discount, kurlyOnly: kurlyOnly, imgurl: imgurl, originals: originals, desc: desc})
  // }

  // 브라우저를 종료한다.
  browser.close();
})();

// kurlyNew()
// #goodsList > div.list_goods > div > ul > li:nth-child(3) > div > div > a > img
// #goodsList > div.list_goods > div > ul > li:nth-child(2) > div > a > span.name
// #goodsList > div.list_goods > div > ul > li:nth-child(1) > div > a > span.cost > span.price
// #goodsList > div.list_goods > div > ul > li:nth-child(1) > div > a > span.cost > span.dc
// #goodsList > div.list_goods > div > ul > li:nth-child(1) > div > a > span.cost > span.original
// #goodsList > div.list_goods > div > ul > li:nth-child(5) > div > a > span.desc
// #goodsList > div.list_goods > div > ul > li:nth-child(7) > div > a > span.tag > span
