// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { productNew } = require('../models');

<<<<<<< HEAD:market_kurly.js
const db = require("./models");

const crawler = async () => {
  db.products.sync();
  try {
    (async () => {
      await db.sequelize.sync();
      // 브라우저를 실행한다.
      // 옵션으로 headless모드를 끌 수 있다.
      const browser = await puppeteer.launch({
        headless: false
      });

      // 새로운 페이지를 연다.
      const page = await browser.newPage();
      await page.setUserAgent( //
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
      );
      // 페이지의 크기를 설정한다.
      await page.setViewport({
        width: 1366,
        height: 768
      });
      // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
      await page.goto('https://www.kurly.com/shop/goods/goods_list.php?category=038');


      // 페이지의 HTML을 가져온다.
      const content = await page.content();
      // $에 cheerio를 로드한다.
      const $ = cheerio.load(content);
      // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
      const lists = $("#goodsList > div.list_goods > div > ul > li");
      // 모든 리스트를 순환한다.
      lists.each((index, list) => {
        const names = $(list).find("div > a > span.name").text();
        const imgs = $(list).find("div > a > img").attr("src");
        const prices = $(list).find("div > a > span.cost > span.price").text();
        const discounts = $(list).find("div > a > span.cost > span.dc").text();
        const originals = $(list).find("div > a > span.cost > span.original").text();
        const descs = $(list).find("div > a > span.desc").text();
        const kurlyOnlys = $(list).find("div > a > span.tag > span").text();
=======

(async(req, res) => {
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
>>>>>>> origin/jinwoo:market_page/market_kurlynew.js

  
    let title = "";
    let imgurl = "";
    let price = 0;
    let discount = 0;
    let originals = 0;
    let desc = "";
    let kurlyOnly = true;
    
  lists.each(async(index, list) => {
    title = $(list).find("div > a > span.name").text().trim();
    imgurl = $(list).find("div > div > a > img").attr("src");
    price = Number($(list).find("div > a > span.cost > span.price").text().replace(/[^0-9]/g,''));
    discount = Number($(list).find("div > a > span.cost > span.dc").text().replace(/[^0-9]/g,''));
    originals = Number($(list).find("div > a > span.cost > span.original").text().replace(/[^0-9]/g,''));
    desc = $(list).find("div > a > span.desc").text();
    exitedKurlyOnly =  $(list).find("div > a > span.tag > span").text();
    if(exitedKurlyOnly === ""){
      kurlyOnly = false
    }else {
      kurlyOnly = true
    }

<<<<<<< HEAD:market_kurly.js
        console.log({ index, names, imgs, prices, discounts, originals, descs, kurlyOnlys });
      });
      await Promise.all(
        result.map((r) => {
          return db.products.create({
            postId: r.postId,
            name: r.name,
            prices: r.prices,
            discounts: r.discounts,
            originals: originals,
            descs: r.descs,
            kurlyOnlys: r.kurlyOnlys,
          });
        })
      );
      // 브라우저를 종료한다.

      browser.close();
      db.sequelize.close();
    });
  } catch (err) {
    console.log(err);
  } finally {

  }
};

crawler();
=======
    console.log({index, title, price, discount, kurlyOnly, imgurl, originals, desc});
    await productNew.create({title, price, discount, kurlyOnly, imgurl, originals, desc})
  });
    

  // 브라우저를 종료한다.
  browser.close();
})();
>>>>>>> origin/jinwoo:market_page/market_kurlynew.js

// kurlyNew()
// #goodsList > div.list_goods > div > ul > li:nth-child(3) > div > div > a > img
// #goodsList > div.list_goods > div > ul > li:nth-child(2) > div > a > span.name
// #goodsList > div.list_goods > div > ul > li:nth-child(1) > div > a > span.cost > span.price
// #goodsList > div.list_goods > div > ul > li:nth-child(1) > div > a > span.cost > span.dc
// #goodsList > div.list_goods > div > ul > li:nth-child(1) > div > a > span.cost > span.original
// #goodsList > div.list_goods > div > ul > li:nth-child(5) > div > a > span.desc
// #goodsList > div.list_goods > div > ul > li:nth-child(7) > div > a > span.tag > span

// #goodsList > div.list_goods > div > ul > li:nth-child(46) > div > div > div > button > span
// #goodsList > div.list_goods > div > ul > li:nth-child(43) > div > div > div > button > span
// #sectionView > div > div.goods_info > dl.list.fst > dd
// #sectionView > div > div.goods_info > dl.list.fst > dd
// #sectionView > div > div.goods_info > dl.list.fst > dd