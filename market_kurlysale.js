// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async() => {
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
  // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
  await page.goto('https://www.kurly.com/shop/goods/goods_list.php?list=sale');


  // 페이지의 HTML을 가져온다.
  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const lists = $("#goodsList > div.list_goods > div > ul > li");
  // 모든 리스트를 순환한다.
  lists.each((index, list) => {
    const names = $(list).find("div > a > span.name").text().trim();
    const imgs = $(list).find("div > div > a > img").attr("src");
    const prices = $(list).find("div > a > span.cost > span.price").text().replace(/[^0-9]/g,'');
    const discounts = $(list).find("div > a > span.cost > span.dc").text().replace(/[^0-9]/g,'');
    const originals = $(list).find("div > a > span.cost > span.original").text().replace(/[^0-9]/g,'');
    const descs = $(list).find("div > a > span.desc").text();
    const kurlyOnlys =  $(list).find("div > a > span.tag > span").text();


    console.log({index, names, imgs, prices, discounts, originals, descs, kurlyOnlys});
  });
  // 브라우저를 종료한다.
  browser.close();
})();

// #goodsList > div.list_goods > div > ul > li:nth-child(1) > div > div > a > img