const puppeteer = require('puppeteer');

const crawler = async() => {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });
        // 새로운 페이지를 연다.
        const page = await browser.newPage();
        // 페이지의 크기를 설정한다.
        await page.setViewport({
            width: 1920,
            height: 1080
        });
        let urlString = "https://www.airbnb.co.kr/rooms/33816652?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-08-08&check_out=2022-08-15&federated_search_id=0b5c0aec-4f5d-4e7b-b194-8350ef0bb2da&source_impression_id=p3_1645435331_J48WQMlw6Ff%2FX0lq"
        let urlObject = url.parse(urlString, true); // url 주소내에 파싱할 것이 있을 경우, urlString을 Object 형태로 변환해준다.

        await page.goto(urlString);
        await page.waitForTimeout(10000); // 페이지 로딩이 되기까지 잠시 기다린다. 테스트 중인 기기의 사양이나 인터넷 속도, 웹서버의 속도 따라 경험적으로 테스트해야함.

        // 숙소 호스팅 유저 이름
        let host_name = await page.$eval(
            "#site-content > div > div:nth-child(1) > div:nth-child(6) > div > div > div > div:nth-child(2) > section > div.c6y5den.dir.dir-ltr > div.tehcqxo.dir.dir-ltr > h2", element => {
                return element.textContent;
            }); // 원하는 html 태그를 copy selector 로 가져온 후, textContent만 추출한다.
        
        console.log(host_name) // Andrew님
        await page.waitForTimeout(3000);
        await browser.close();
    } catch (e) {
        console.error(e);
    }}