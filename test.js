require("dotenv").config();
const { default: mongoose } = require("mongoose");
const puppeteer = require('puppeteer');
const url = require('url');
const connect = require("./models");
const Homes = require("./models/homeSchema");

connect();

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const crawler = async() => {
    // 브라우저를 실행한다.
    // 옵션으로 headless모드를 끌 수 있다.
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

        // URL에 plus 가 들어가면 div 2개씩 밀려서 host name 가져올때 깨짐. 에어비앤비 플러스?
        // 호스트가 슈퍼호스트인 숙소 정보 기준으로 작성.

        /**
         *  초소형 주택
         *  Base URL : https://www.airbnb.co.kr/s/homes?search_mode=flex_destinations_search&date_picker_type=flexible_dates&tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=seven_days_starting_long_weekend&location_search=MIN_MAP_BOUNDS&category_tag=Tag%3A8186&superhost=true&ne_lat=56.842052203795284&ne_lng=36.22297938432226&sw_lat=6.040578930343457&sw_lng=-127.51725499067777&zoom=4&search_by_map=true&search_type=user_map_move
         *  슈퍼호스트 필터 on
         **/
        // URL PACK 1
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/45861225?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-05-20&check_out=2022-05-27&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424377_yyDRZZ6c7kBCGfDX',
        //     'https://www.airbnb.co.kr/rooms/38209667?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-08-14&check_out=2022-08-21&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424381_zpTopfFaG4zvBBcx',
        //     'https://www.airbnb.co.kr/rooms/43910434?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-09-25&check_out=2022-10-02&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424382_ytATv7Q6I40uM%2BU2',
        //     'https://www.airbnb.co.kr/rooms/36629243?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-05-02&check_out=2022-05-09&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424383_%2BGoSBHBsxWebabhR',
        //     'https://www.airbnb.co.kr/rooms/47074929?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-05-29&check_out=2022-06-05&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424384_FQwv%2BvXFy324ZwmI',
        //     'https://www.airbnb.co.kr/rooms/43620123?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-13&check_out=2022-03-20&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424385_TuWOGy6oNJ51QU8S',
        //     'https://www.airbnb.co.kr/rooms/47291538?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-28&check_out=2022-04-04&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424386_SrBCs239vZL7bFee',
        //     'https://www.airbnb.co.kr/rooms/48249966?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-27&check_out=2022-04-03&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424386_Kjs2lqnxa24vJxai',
        //     'https://www.airbnb.co.kr/rooms/41130790?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-08-01&check_out=2022-08-08&federated_search_id=9bc50d6a-424d-4de1-b9bd-155dc80757ee&source_impression_id=p3_1645424386_fJIQcHTcjtxqUS8J',
        //     'https://www.airbnb.co.kr/rooms/43170457?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-11&check_out=2022-03-18&federated_search_id=b4b1c2bd-89bd-4c37-b7fd-0d97da435224&source_impression_id=p3_1645424656_r5L7L9VE40qH3ZLL'
        // ]
        // URL PACK 2
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/45389004?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=8eb729d0-aae2-4cf8-bffb-6c0db86da6d7&source_impression_id=p3_1645514047_W76CCJ7%2Fz%2BTuKqqW',
        //     'https://www.airbnb.co.kr/rooms/26654530?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-20&check_out=2022-03-27&federated_search_id=8eb729d0-aae2-4cf8-bffb-6c0db86da6d7&source_impression_id=p3_1645514048_om37qujtUFmRQDI%2B',
        //     'https://www.airbnb.co.kr/rooms/33279980?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=6cd2bd90-6e9b-4bae-9a96-b01fbef0810c&source_impression_id=p3_1645514051_HpDUEZgzeTAQS7zx',
        //     'https://www.airbnb.co.kr/rooms/34692739?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-09-25&check_out=2022-10-02&federated_search_id=7a71aab7-ea71-4d43-aec0-b840676ae636&source_impression_id=p3_1645515323_plRmUZpbn%2Bp1ruXx',
        //     'https://www.airbnb.co.kr/rooms/44516383?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-04-02&check_out=2022-04-09&federated_search_id=7a71aab7-ea71-4d43-aec0-b840676ae636&source_impression_id=p3_1645515420_NUGOOnwKjiHpgJXW',
        //     'https://www.airbnb.co.kr/rooms/25250701?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=209e4ca0-e5d0-473a-9f3c-71c35327570b&source_impression_id=p3_1645514063_TGt9ZSMp4L%2Bdz9q%2F',
        //     'https://www.airbnb.co.kr/rooms/50161670?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-11&check_out=2022-03-18&federated_search_id=b979fd9a-7e61-4ce0-9a93-3205187b3c90&source_impression_id=p3_1645514073_ZjJxK59LbfTDxER2',
        //     'https://www.airbnb.co.kr/rooms/51418870?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-06-05&check_out=2022-06-12&federated_search_id=94223bea-6f2f-40ef-9b63-193c4f04f4d1&source_impression_id=p3_1645517556_yO3hRkszsBpPixg%2B',
        //     'https://www.airbnb.co.kr/rooms/8691829?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=5f58ccf3-1385-427f-b894-7b0197a15eaa&source_impression_id=p3_1645514078_shpkSYhqJ%2BJN4dO9',
        //     'https://www.airbnb.co.kr/rooms/34795107?category_tag=Tag%3A8186&adults=1&children=0&infants=0&check_in=2022-04-29&check_out=2022-05-06&federated_search_id=5f58ccf3-1385-427f-b894-7b0197a15eaa&source_impression_id=p3_1645514081_aZRuPAvTuyiu%2F90s'
        // ]

        /**
         *  해변 근처
         *  Base URL : https://www.airbnb.co.kr/s/homes?search_mode=flex_destinations_search&date_picker_type=flexible_dates&tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=seven_days_starting_long_weekend&location_search=MIN_MAP_BOUNDS&category_tag=Tag%3A789&search_type=user_map_move&ne_lat=62.79663482232676&ne_lng=36.545088548884564&sw_lat=17.64756552904328&sw_lng=-127.19514582611544&zoom=4&search_by_map=true
         *  슈퍼호스트 필터 on 
         **/
        // URL PACK 1
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/6552766?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-04-24&check_out=2022-05-01&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430734_ilvn1vKy%2BpwOwzVf',
        //     'https://www.airbnb.co.kr/rooms/47583975?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-03-20&check_out=2022-03-27&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430734_sEveqxwB0iI8fMhl',
        //     'https://www.airbnb.co.kr/rooms/46037105?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430736_1DHyN3o0NwHdgbmD',
        //     'https://www.airbnb.co.kr/rooms/48185511?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-03-19&check_out=2022-03-26&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430737_4WefnYzkD39Z04Xl',
        //     'https://www.airbnb.co.kr/rooms/44606924?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430738_TnCjjBH7XfHnB6vw',
        //     'https://www.airbnb.co.kr/rooms/48578472?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-04-17&check_out=2022-04-24&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430738_3Uo09bMLw9p2M6MV',
        //     'https://www.airbnb.co.kr/rooms/47795506?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-04-01&check_out=2022-04-08&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430739_9KzO6LCJQdwqGBOQ',
        //     'https://www.airbnb.co.kr/rooms/44647951?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-04-10&check_out=2022-04-17&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430739_qck50bF5vBmOZ%2B8L',
        //     'https://www.airbnb.co.kr/rooms/30253502?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-06-04&check_out=2022-06-11&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645430741_SH4XGe%2F7XfdRvmOH',
        //     'https://www.airbnb.co.kr/rooms/48692786?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-05-06&check_out=2022-05-13&federated_search_id=3c025c36-f747-43af-ab0a-d238994ef4e9&source_impression_id=p3_1645431619_IAaeO7t2PCmvD1yB'
        // ]
        // URL PACK 2
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/19118457?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-08-26&check_out=2022-09-02&federated_search_id=badecb6f-814d-4e97-b799-45b94e6de958&source_impression_id=p3_1645512881_KxoJivezQP6WBVOX',
        //     'https://www.airbnb.co.kr/rooms/48005577?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-06-10&check_out=2022-06-17&federated_search_id=b9640c09-a11e-4db3-b79a-4187395937b3&source_impression_id=p3_1645512885_hAua64RFlFLOrPOZ',
        //     'https://www.airbnb.co.kr/rooms/23696868?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-06-25&check_out=2022-07-02&federated_search_id=b9640c09-a11e-4db3-b79a-4187395937b3&source_impression_id=p3_1645512889_pBCvDZ2KS9pDtUwa',
        //     'https://www.airbnb.co.kr/rooms/21922277?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-03-25&check_out=2022-04-01&federated_search_id=b9640c09-a11e-4db3-b79a-4187395937b3&source_impression_id=p3_1645512891_DF8x%2BbfOzgtbNlP1',
        //     'https://www.airbnb.co.kr/rooms/40816365?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-04-08&check_out=2022-04-15&federated_search_id=b9640c09-a11e-4db3-b79a-4187395937b3&source_impression_id=p3_1645512899_RcppQxtanzie%2BHt4',
        //     'https://www.airbnb.co.kr/rooms/47067413?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-04-04&check_out=2022-04-11&federated_search_id=b9640c09-a11e-4db3-b79a-4187395937b3&source_impression_id=p3_1645512901_XdB5Wr26j%2FYeL2YB',
        //     'https://www.airbnb.co.kr/rooms/27898050?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-04-24&check_out=2022-05-01&federated_search_id=189f0208-649a-4403-a0d2-a118df796939&source_impression_id=p3_1645512904_dmV25wUpOFsnzIyk',
        //     'https://www.airbnb.co.kr/rooms/5017633?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-03-28&check_out=2022-04-04&federated_search_id=189f0208-649a-4403-a0d2-a118df796939&source_impression_id=p3_1645512905_xiquEj6E1bHt1M6r',
        //     'https://www.airbnb.co.kr/rooms/51727079?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-05-23&check_out=2022-05-30&federated_search_id=99c0c8ea-ba3a-4225-b83c-b0fdd6a88ddf&source_impression_id=p3_1645512913_Uy%2FHRCHCEWPrldco',
        //     'https://www.airbnb.co.kr/rooms/40936276?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-05-06&check_out=2022-05-13&federated_search_id=99c0c8ea-ba3a-4225-b83c-b0fdd6a88ddf&source_impression_id=p3_1645512925_MbsgjZc8z87RkohS'
        // ]
        
        /**
         *  멋진 수영장
         *  Base URL : https://www.airbnb.co.kr/s/homes?search_mode=flex_destinations_search&date_picker_type=flexible_dates&tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=seven_days_starting_long_weekend&location_search=MIN_MAP_BOUNDS&search_type=filter_change&ne_lat=62.79663482232676&ne_lng=36.545088548884564&sw_lat=17.64756552904328&sw_lng=-127.19514582611544&zoom=4&search_by_map=true&category_tag=Tag%3A677
         *  슈퍼호스트 필터 on 
         **/
        // URL PACK 1
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/14326412?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433607_b7eZEh3%2B%2FZOdfaqW',
        //     'https://www.airbnb.co.kr/rooms/48469648?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-04-24&check_out=2022-05-01&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433609_24dE70s9QnCWuVI0',
        //     'https://www.airbnb.co.kr/rooms/19186457?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433610_Fp7rHJ0NtU3fVlS8',
        //     'https://www.airbnb.co.kr/rooms/493845?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-06-26&check_out=2022-07-03&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433611_RBetV2GlKU0cjE2V',
        //     'https://www.airbnb.co.kr/rooms/32694?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-07-03&check_out=2022-07-10&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433613_a282tO2uEtlbDE5i',
        //     'https://www.airbnb.co.kr/rooms/47535161?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-07-02&check_out=2022-07-09&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433613_SP319PbJn2vIEdlh',
        //     'https://www.airbnb.co.kr/rooms/36346364?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-06-18&check_out=2022-06-25&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433614_aZRYRm1d8c8nXqHh',
        //     'https://www.airbnb.co.kr/rooms/19729534?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-05-30&check_out=2022-06-06&federated_search_id=023aefd5-c27b-47d3-b5f3-e75c7caf771f&source_impression_id=p3_1645433614_ikPpwLnDGxjVlMSG',
        //     'https://www.airbnb.co.kr/rooms/47748440?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-05-08&check_out=2022-05-15&federated_search_id=c0bb98ac-2d74-4f44-9096-22c4cf9f6df1&source_impression_id=p3_1645433629_omh5FXh4p44GaExL',
        //     'https://www.airbnb.co.kr/rooms/45063249?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-28&check_out=2022-04-04&federated_search_id=c0bb98ac-2d74-4f44-9096-22c4cf9f6df1&source_impression_id=p3_1645433634_p%2BO%2BNHNmBXbrd3fc'
        // ]
        // URL PACK 2
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/469374?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-19&check_out=2022-03-26&federated_search_id=cbab77c4-cdee-4d35-9687-f79c916c79f6&source_impression_id=p3_1645520999_MNLZmlc3Kb%2FLath%2B',
        //     'https://www.airbnb.co.kr/rooms/29372488?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=d5cc552e-698a-4dbc-88a1-6b6b9af77609&source_impression_id=p3_1645518895_2unnHEQOjuFMMXSi',
        //     'https://www.airbnb.co.kr/rooms/38143173?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-13&check_out=2022-03-20&federated_search_id=d5cc552e-698a-4dbc-88a1-6b6b9af77609&source_impression_id=p3_1645518897_YzeIx8HQpl%2FCQAUu',
        //     'https://www.airbnb.co.kr/rooms/34523097?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-04-01&check_out=2022-04-08&federated_search_id=6356b618-d75b-4c79-9406-d5b4ac927314&source_impression_id=p3_1645521155_SzwRA1eY4MpgCxIA',
        //     'https://www.airbnb.co.kr/rooms/10982288?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-04-30&check_out=2022-05-07&federated_search_id=7e388dc0-2484-479d-b839-3930913861f0&source_impression_id=p3_1645518901_Ma%2FkolufxcnM3oLL',
        //     'https://www.airbnb.co.kr/rooms/41674547?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-04-01&check_out=2022-04-08&federated_search_id=02cdeb3d-58de-4823-a8f3-2daa43d36676&source_impression_id=p3_1645518909_L7Y4zMkV1QGELov8',
        //     'https://www.airbnb.co.kr/rooms/46440615?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-12&check_out=2022-03-19&federated_search_id=6356b618-d75b-4c79-9406-d5b4ac927314&source_impression_id=p3_1645523384_%2F0sJEqQTnDrLGCwD',
        //     'https://www.airbnb.co.kr/rooms/44366873?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=6356b618-d75b-4c79-9406-d5b4ac927314&source_impression_id=p3_1645523954_%2BjKyRNronkgGgPWm',
        //     'https://www.airbnb.co.kr/rooms/292757?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-10-31&check_out=2022-11-07&federated_search_id=7ffb575d-0204-49d0-9287-0f75df8078bb&source_impression_id=p3_1645524091_o6YTHXlHxtlqa5Pq',
        //     'https://www.airbnb.co.kr/rooms/47749181?category_tag=Tag%3A677&adults=1&children=0&infants=0&check_in=2022-05-08&check_out=2022-05-15&federated_search_id=1cb82e34-3392-407f-9077-6cac11a1a0ae&source_impression_id=p3_1645520604_pcngY4SryTZSTbFQ'
        // ]

        /**
         *  농장
         *  Base URL : https://www.airbnb.co.kr/s/homes?search_mode=flex_destinations_search&date_picker_type=flexible_dates&tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=seven_days_starting_long_weekend&location_search=MIN_MAP_BOUNDS&ne_lat=62.79663482232676&ne_lng=36.545088548884564&sw_lat=17.64756552904328&sw_lng=-127.19514582611544&zoom=4&search_by_map=true&superhost=true&category_tag=Tag%3A8175&search_type=filter_change
         *  슈퍼호스트 필터 on 
         **/
        // URL PACK 1
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/42043514?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-10-10&check_out=2022-10-17&federated_search_id=d09730e7-4c42-434d-a6a3-34c000005de0&source_impression_id=p3_1645434149_Ftwri0G9gIuYXm4d',
        //     'https://www.airbnb.co.kr/rooms/42491538?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-18&check_out=2022-03-25&federated_search_id=d09730e7-4c42-434d-a6a3-34c000005de0&source_impression_id=p3_1645434155_NeYZN1Ad4taGz7Dq',
        //     'https://www.airbnb.co.kr/rooms/32302794?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-07-08&check_out=2022-07-15&federated_search_id=d09730e7-4c42-434d-a6a3-34c000005de0&source_impression_id=p3_1645434156_aAoiotqkxWAW3lF6',
        //     'https://www.airbnb.co.kr/rooms/27421783?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-08-05&check_out=2022-08-12&federated_search_id=d09730e7-4c42-434d-a6a3-34c000005de0&source_impression_id=p3_1645434158_VrnQ%2F8MVcdCsKnN%2F',
        //     'https://www.airbnb.co.kr/rooms/41659817?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-04-24&check_out=2022-05-01&federated_search_id=1a40602f-03a2-4c08-a9f4-aa0fdf309963&source_impression_id=p3_1645434171_fKh8IbUr8FajXD1N',
        //     'https://www.airbnb.co.kr/rooms/49530607?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-05-06&check_out=2022-05-13&federated_search_id=ec2bc797-9f1a-4a2a-b54c-1d55fe51f5d0&source_impression_id=p3_1645434185_1xob0gwrnDg1RnpS',
        //     'https://www.airbnb.co.kr/rooms/50368300?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-05-22&check_out=2022-05-29&federated_search_id=196095d4-4e30-460f-a1b6-e01b2b6296a0&source_impression_id=p3_1645434209_y0SreQ8EykNB4nKp',
        //     'https://www.airbnb.co.kr/rooms/44116837?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-10-09&check_out=2022-10-16&federated_search_id=196095d4-4e30-460f-a1b6-e01b2b6296a0&source_impression_id=p3_1645434215_zPy%2Br1U%2FYGQgr4b%2F',
        //     'https://www.airbnb.co.kr/rooms/44787980?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-07-24&check_out=2022-07-31&federated_search_id=d2581c46-ed48-471e-bbcd-169188eea165&source_impression_id=p3_1645434234_AuO8du%2BffcoY%2Bobe',
        //     'https://www.airbnb.co.kr/rooms/11209686?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-06-04&check_out=2022-06-11&federated_search_id=0ce9a9f1-1dfb-48cb-8ffb-411a727d19bd&source_impression_id=p3_1645434278_1MjtTFf1UKqXQ6bS'
        // ]
        // URL PACK 2
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/27892080?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-07&check_out=2022-03-14&federated_search_id=95b7988e-e886-4b3a-91aa-1a11c19f1c55&source_impression_id=p3_1645524213_Ov7eOcpbHOgzRP%2Bv',
        //     'https://www.airbnb.co.kr/rooms/29274659?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-05-06&check_out=2022-05-13&federated_search_id=4f5d6c65-0563-45a4-b196-3479bba62e2d&source_impression_id=p3_1645524226_Sn7fqiwnixhZ17q4',
        //     'https://www.airbnb.co.kr/rooms/51976968?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-05-09&check_out=2022-05-16&federated_search_id=4f5d6c65-0563-45a4-b196-3479bba62e2d&source_impression_id=p3_1645524231_X8dUz5xXzCyjNpAT',
        //     'https://www.airbnb.co.kr/rooms/28901855?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-26&check_out=2022-04-02&federated_search_id=f82e097c-ba04-42ac-803b-dea5f88ac65e&source_impression_id=p3_1645524237_Z2zl4wr447IgMWhC',
        //     'https://www.airbnb.co.kr/rooms/28261654?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-06-19&check_out=2022-06-26&federated_search_id=343b51a0-5bc0-4406-aa47-c7019f7604d0&source_impression_id=p3_1645524293_C0huZOWovMHDtAgh',
        //     'https://www.airbnb.co.kr/rooms/25932885?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=13a38d06-e6c8-48aa-b94b-b177a865e89d&source_impression_id=p3_1645524300_GriRocggIdwDTGX8',
        //     'https://www.airbnb.co.kr/rooms/46399847?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-27&check_out=2022-04-03&federated_search_id=13a38d06-e6c8-48aa-b94b-b177a865e89d&source_impression_id=p3_1645524304_jgTLav%2BMEUAVPHMC',
        //     'https://www.airbnb.co.kr/rooms/49413232?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=18081474-6757-420a-abfb-888339050a53&source_impression_id=p3_1645524346_MU6YrQv%2BVNmw1%2FIk',
        //     'https://www.airbnb.co.kr/rooms/51382633?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-21&check_out=2022-03-28&federated_search_id=4d1fbb9b-9877-43e0-9877-36eda99f381f&source_impression_id=p3_1645525870_gK86%2FLtE4Koivs01',
        //     'https://www.airbnb.co.kr/rooms/42257291?category_tag=Tag%3A8175&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=f722a0da-4487-43e0-8319-26278077a09e&source_impression_id=p3_1645525547_YN192qzshK4huGk5'
        // ]
        /**
         *  통나무집
         *  Base URL : https://www.airbnb.co.kr/s/homes?search_mode=flex_destinations_search&date_picker_type=flexible_dates&tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=seven_days_starting_long_weekend&location_search=MIN_MAP_BOUNDS&ne_lat=69.43117192657034&ne_lng=108.24721055008024&sw_lat=32.520516629071636&sw_lng=-55.49302382491976&zoom=4&search_by_map=true&superhost=true&search_type=user_map_move&category_tag=Tag%3A5348
         *  슈퍼호스트 필터 on 
         **/
        // URL PACK 1
        // const urllist = [
        //     'https://www.airbnb.co.kr/rooms/14032398?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-10-09&check_out=2022-10-16&federated_search_id=586610f9-43b0-4fc0-8734-c7fd2c98bc04&source_impression_id=p3_1645435276_5XN6001%2Fw06m9bX8',
        //     'https://www.airbnb.co.kr/rooms/49173949?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-06-27&check_out=2022-07-04&federated_search_id=3e49fa5d-3f2d-43b8-96c7-1ca0e82fdcd1&source_impression_id=p3_1645435280_vywkhCaRPQSNpjPz',
        //     'https://www.airbnb.co.kr/rooms/43635072?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-05-06&check_out=2022-05-13&federated_search_id=3e49fa5d-3f2d-43b8-96c7-1ca0e82fdcd1&source_impression_id=p3_1645435286_B6brKamG3ybu5tY%2F',
        //     'https://www.airbnb.co.kr/rooms/46864981?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-03-11&check_out=2022-03-18&federated_search_id=3e49fa5d-3f2d-43b8-96c7-1ca0e82fdcd1&source_impression_id=p3_1645435292_0ZkWJQ4X8XQzOAeF',
        //     'https://www.airbnb.co.kr/rooms/46830178?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-07-08&check_out=2022-07-15&federated_search_id=f5d1ad26-2fab-4f84-a448-850dc47316d2&source_impression_id=p3_1645435308_vmNgqDE%2F90j0NR6s',
        //     'https://www.airbnb.co.kr/rooms/37775472?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-04-22&check_out=2022-04-29&federated_search_id=f5d1ad26-2fab-4f84-a448-850dc47316d2&source_impression_id=p3_1645435314_IaT6f5KX7czrcqWM',
        //     'https://www.airbnb.co.kr/rooms/36224527?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-04-01&check_out=2022-04-08&federated_search_id=fdb46499-5871-4b72-acec-5ad1cc098b69&source_impression_id=p3_1645435317_o6rk9TdLY%2FK%2B%2FUHf',
        //     'https://www.airbnb.co.kr/rooms/42006894?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-05-02&check_out=2022-05-09&federated_search_id=fdb46499-5871-4b72-acec-5ad1cc098b69&source_impression_id=p3_1645435325_UDxJLU%2FxHUz%2BVKSj',
        //     'https://www.airbnb.co.kr/rooms/16661795?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-06-24&check_out=2022-07-01&federated_search_id=fdb46499-5871-4b72-acec-5ad1cc098b69&source_impression_id=p3_1645435327_Vrasj4cJ69wNya2K',
        //     'https://www.airbnb.co.kr/rooms/33816652?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-08-08&check_out=2022-08-15&federated_search_id=0b5c0aec-4f5d-4e7b-b194-8350ef0bb2da&source_impression_id=p3_1645435331_J48WQMlw6Ff%2FX0lq'
        // ]
        // URL PACK 2
        const urllist = [
            'https://www.airbnb.co.kr/rooms/34113796?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-04-08&check_out=2022-04-15&federated_search_id=bea0ef6f-c6b6-44a5-b21f-4a975c586c61&source_impression_id=p3_1645526421_iLXFYZoIC1qyWWyW',
            'https://www.airbnb.co.kr/rooms/39113140?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-03-18&check_out=2022-03-25&federated_search_id=bea0ef6f-c6b6-44a5-b21f-4a975c586c61&source_impression_id=p3_1645526423_T5yVElRqOLmvueFC',
            'https://www.airbnb.co.kr/rooms/37676806?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-03-11&check_out=2022-03-18&federated_search_id=bea0ef6f-c6b6-44a5-b21f-4a975c586c61&source_impression_id=p3_1645526453_RZCv1TkQq%2FK4hpbg',
            'https://www.airbnb.co.kr/rooms/5608532?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-03-14&check_out=2022-03-21&federated_search_id=bea0ef6f-c6b6-44a5-b21f-4a975c586c61&source_impression_id=p3_1645526455_ox%2BpPQ1zJj6iV0Rt',
            'https://www.airbnb.co.kr/rooms/4562944?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-04-24&check_out=2022-05-01&federated_search_id=735d7180-7ea6-4b93-8777-0cf1a128d454&source_impression_id=p3_1645526511_HwzIFuLEY2B2p935',
            'https://www.airbnb.co.kr/rooms/23578827?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-03-04&check_out=2022-03-11&federated_search_id=5e9c299d-988d-464d-a227-e04572a431e6&source_impression_id=p3_1645526753_z6O8u44zi2a369mm',
            'https://www.airbnb.co.kr/rooms/47464388?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-11-13&check_out=2022-11-20&federated_search_id=6ead3121-8fcc-4887-a8e5-e47df6891371&source_impression_id=p3_1645526526_FI2Ogpd0%2BOUP3yIO',
            'https://www.airbnb.co.kr/rooms/47844900?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-04-24&check_out=2022-05-01&federated_search_id=1b015ac3-23e4-47a5-8317-3e6ca33d83dd&source_impression_id=p3_1645526528_RlgxyqH0RUyG5DTk',
            'https://www.airbnb.co.kr/rooms/43635829?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-03-20&check_out=2022-03-27&federated_search_id=8f722b8e-a5f6-4138-8808-ac49c16104d1&source_impression_id=p3_1645526552_x1epni5FGSgwCKtL',
            'https://www.airbnb.co.kr/rooms/20818189?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-07-01&check_out=2022-07-08&federated_search_id=8f722b8e-a5f6-4138-8808-ac49c16104d1&source_impression_id=p3_1645526555_0YlnGFpXDQBDknKs'
        ]
        
        for (const urlString of urllist) {
            // let urlString = 'https://www.airbnb.co.kr/rooms/34043729?category_tag=Tag%3A789&adults=1&children=0&infants=0&check_in=2022-05-21&check_out=2022-05-28&federated_search_id=3bfb4c81-6f76-4f3d-87ce-233f8af13b5f&source_impression_id=p3_1645359387_GgDVUVUH%2BJC%2BK6wC'
            let urlObject = url.parse(urlString, true); // urlString을 객체 형태로 파싱
            let category = '';
            let convenience = new Array();
            convenience = ['온수', '여분의 베개와 담요', 'TV', '유아용 식탁의자', '반려 동물 입실 가능', '주방', '기본 조리 도구', '식기류', '단층 주택', '자전거']
            if (urlObject.query.category_tag === 'Tag:8186'){
                category = "초소형 주택"
                // convenience = ['온수', '여분의 베개와 담요', 'TV', '유아용 식탁의자', '반려 동물 입실 가능', '주방', '기본 조리 도구', '식기류', '단층 주택', '자전거']
            } else if (urlObject.query.category_tag === 'Tag:789') {
                category = "해변 근처"
                // convenience = ['해변과 인접 - 해변', '주방', '무선 인터넷', '건물 내 무료 주차', '헤어드라이어', '의류 보관 공간: 벽장', '도서 및 읽을 거리', '커피메이커: 네스프레소', '야외 식사 공간', '소형 냉장고']
            } else if (urlObject.query.category_tag === 'Tag:677') {
                category = "멋진 수영장"
                // convenience = ['수영장', '에어컨', '파티오 또는 발코니', '야외 샤워 시설', '유아용 식탁 의자', '무선 인터넷', '식기류', '커피메이커', '전용 야외 주방', '해수욕 필수품']
            } else if (urlObject.query.category_tag === 'Tag:8175') {
                category = "농장"
                // convenience = ['자쿠지', '온수', '뒷마당', '주방', '무선 인터넷', 'TV', '건물 내 무료 주차', '건조기', '기본 조리도구', '파티오 또는 발코니']
            } else if (urlObject.query.category_tag === 'Tag:5348') {
                category = "통나무집"
                // convenience = ['정원 전망', '산 전망', '주방', '무선 인터넷', '건물 내 무료 주차', '세탁기', '도서 및 읽을거리', '어린이용 책과 장난감', '바비큐 도구', '야외 식사 공간']
            }    
            await page.goto(urlString);
            // 페이지 로딩이 되기까지 잠시 기다린다. 테스트 중인 기기의 사양이나 인터넷 속도, 웹서버의 속도 따라 경험적으로 테스트해야함.
            await page.waitForTimeout(10000); 
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)') // 숙소 내부 페이지 최하단으로 이동
            await page.waitForTimeout(2000);
            

            // 숙소 이름
            let home_name = await page.$eval(
            // let home_name = page.$eval(
                "#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > section > div._b8stb0 > span > h1", element => {
                    return element.textContent;
                }); // 원하는 html 태그를 copy selector 로 가져온 후, textContent만 추출한다.w
            console.log(home_name);

            // 숙소 호스팅 유저 이름
            let raw_host_name = await page.$eval(
            // let raw_host_name = page.$eval(
                "#site-content > div > div:nth-child(1) > div:nth-child(6) > div > div > div > div:nth-child(2) > section > div.c6y5den.dir.dir-ltr > div.tehcqxo.dir.dir-ltr > h2", element => {
                    return element.textContent;
                });
            let host_name = raw_host_name.split("호스트: ")[1].split("님")[0]
            console.log(host_name)

            // 평점 rateAvg
            // let raw_rateAvg = page.$eval(
            let raw_rateAvg = await page.$eval(
                "#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > section > div._1qdp1ym > div._544wcx > span:nth-child(1) > span._17p6nbba"
                , element => {
                    return element.textContent;
                });
            let rateAvg = raw_rateAvg.split(" ·")[0];
            console.log(rateAvg)

            // 후기 개수 comment_count
            // let comment_count = page.$eval(
            let raw_comment_count = await page.$eval(
                "#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > section > div._1qdp1ym > div._544wcx > span:nth-child(1) > span._s65ijh7 > button"
                , element => {
                    return element.textContent;
                });
            let comment_count = raw_comment_count.split('후기 ')[1].split("개")[0]


            // 지역 address. "슈퍼호스트" 인 경우에만 정상적으로 긁어옴. 아닌 경우 span:nth-child(5) 가 아닌 (3) 임. 아이고
            // let address = page.$eval(
            let address = await page.$eval(
                "#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > section > div._1qdp1ym > div._544wcx > span:nth-child(5)"
                , element => {
                    return element.textContent;
                });
            console.log(address)
            // let image_url1 = await page.$eval(
            //     "#FMP-target".getAttribute('src')
            // )
            
            // let image_url1 = await page.evaluate(element=> {
            let image_url1 = await page.evaluate(element=> {
                let src = document.querySelector("#FMP-target").getAttribute('src')
                return src;
            });
            console.log(image_url1)

            
            let image_url2 = await page.evaluate(element=> {
                let src = document.querySelector("#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div > div > div > div._168ht2w > div > div._178t1g5 > div > div._1l7oqbd > div > div > a > div > picture > img")
                                .getAttribute('src');
                return src;
            });
            console.log(image_url2)
            
            
            let image_url3 = await page.evaluate(element=> {
                let src = document.querySelector("#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div > div > div > div._168ht2w > div > div._178t1g5 > div > div._924zz4g > div > div > a > div > picture > img")
                                .getAttribute('src');
                return src;
            });
            console.log(image_url3)

            
            let image_url4 = await page.evaluate(element=> {
                let src = document.querySelector("#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div > div > div > div._168ht2w > div > div._1827gf2 > div > div._1l7oqbd > div > div > a > div > picture > img")
                                .getAttribute('src');
                return src;
            });
            console.log(image_url4)

            
            let image_url5 = await page.evaluate(element=> {
                let src = document.querySelector("#site-content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div > div > div > div._168ht2w > div > div._1827gf2 > div > div._924zz4g > div > div > a > div > picture > img")
                                .getAttribute('src');
                return src;
            });
            console.log(image_url5)

            const image_url = [image_url1, image_url2, image_url3, image_url4, image_url5]
            
            let introduce = await page.$eval(
                "#site-content > div:nth-child(4) > div > div > div:nth-child(1)", element => {
                    return element.textContent;
                })
            console.log(introduce)
            
            
            let raw_price = await page.$eval(
                "#site-content > div > div:nth-child(1) > div:nth-child(3) > div > div._1s21a6e2 > div > div > div:nth-child(1) > div > div > div > div > div > div > div._wgmchy > div._c7v1se > div:nth-child(1) > div > div > div > span._tyxjp1", element => {
                    return element.textContent;
                })
            
            // let price = raw_price.split("₩")[1].split(",")[0] + raw_price.split("₩")[1].split(",")[1]
            let price = raw_price.split("₩")[1]
            parseInt(price);
            console.log(price)
            
            let distance = getRandomInt(1,10000); // 거리는 1~9999 사이의 임의의 정수
            
            let raw_check_in_date = urlObject.query.check_in.split('-');
            let raw_check_out_date = urlObject.query.check_out.split('-')
            let check_in_date = raw_check_in_date[1] + "월 " + raw_check_in_date[2] + "일 ~ "
            let check_out_date = raw_check_out_date[2] + "일"
            let availableDate = check_in_date + check_out_date;
            console.log(availableDate)

            await page.waitForTimeout(3000);
            const homeInfo = {
                "home_name": home_name,
                "host_name": host_name,
                "category": category,
                "rateAvg": rateAvg,
                "comment_count":parseInt(comment_count),
                "address": address,
                "image_url": image_url,
                "introduce": introduce,
                "price": price,
                "convenience": convenience,
                "distance": distance,
                "availableDate": availableDate
            }
            const newHome = new Homes(homeInfo)
            await newHome.save()
            // await Homes.create(homeInfo);
            // console.log(homeInfo);
            await page.waitForTimeout(3000);
        }
        await browser.close();
        mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

// const urllist = [
//     'https://www.airbnb.co.kr/rooms/48143423?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-04-04&check_out=2022-04-11&federated_search_id=6078d6b1-48bb-48c4-83d8-f565172c46bd&source_impression_id=p3_1645419286_hj0Kyvvv14sSWkiw',
//     'https://www.airbnb.co.kr/rooms/14623508?category_tag=Tag%3A5348&adults=1&children=0&infants=0&check_in=2022-03-11&check_out=2022-03-18&federated_search_id=39cec061-61f5-4634-99fb-ff717acd1001&source_impression_id=p3_1645419296_UXGouoyvSY%2Bj5Q97'
// ]
// urllist.forEach(url => crawler(url)); // 실행 문제있음
crawler();

