
const express = require("express");
const { User } = require("../models");
// const { productNew } = require("../models/productnew")
const router = express.Router();
const jwt = require('jsonwebtoken')
const authMiddleware = require("../middleswares/auth-middleware")

router.get("/", (req, res) => {
    console.log("미들웨어가 작동합니다.")
    res.send('list page')
});


//회원가입
router.post("/signUp", async (req, res) => {
    const { userId, password, passwordCheck, userName, address } = req.body;//body에 작성한 값을 가져와
    if (password !== passwordCheck) {//패스워드와 패스워드 확인란과 같지 않을 때 에러메세지를 띄워라
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.'
        });
        return; //값이 같다면 리턴
    }

    const existUsers = await User.findAll({
        where: { userId }
    });
    if (existUsers.length) {
        res.status(400).send({//에러 메세지를 띄워준다.
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'
        });
        return;
    }
    await User.create({ userId, password, userName, address });

    res.status(201).send({})
})


//로그인
router.post("/login", async (req, res) => {
    const { userId, password } = req.body; 
    console.log(userId,password)
    const user = await User.findOne({ where: { userId, password }});

    if(!user) {
        res.status(400).send({
            errorMessage: '닉네임 또는 패스워드를 확인해주세요.'
        })
        return;
    }
    const token = jwt.sign({ userId: user.uniqueUserid }, "m-s-k-j-w");
    res.send({
        token,
    })
});


router.get("/users/me", async (req, res) => {
    // console.log(res.locals)
    const { user } = res.locals;//변수user에 res.locals를 할당해준다
    // console.log(locals)
    res.send({//응답값 user
      user,
    });
  })




const market_kurlynew = [{
    index: 0,
    title: '[전통주] 예산사과와인 추사 3종',
    price: '11400',
    discount: '5',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164975893096l0.jpg',
    originals: '12000',
    desc: '와인에 여문 가을 과실의 깊은 풍미'
  },
  {
    index: 1,
    title: '[캐치티니핑] 마스크줄 만들기',
    price: '17800',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1648175852980l0.jpg',
    originals: '19800',
    desc: '내 마음대로 꾸미는 마스크줄'
  },
  {
    index: 2,
    title: '[모두의맛집] 알꼬막 짬뽕',
    price: '14400',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649919701563l0.jpg',
    originals: '16000',
    desc: '아낌없이 올린 오동통한 알꼬막'
  },
  {
    index: 3,
    title: '[미미네] 어묵많이 눈꽃치즈 국물떡볶이',
    price: '5670',
    discount: '10',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164991958397l0.jpg',
    originals: '6300',
    desc: '오동통한 어묵이 가득'
  },
  {
    index: 4,
    title: '[프레시지] 자이언트 알푸짐 알탕 (3~4인분)',
    price: '19900',
    discount: '4',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649919329531l0.jpg',
    originals: '20900',
    desc: '풍성하게 담은 대용량 알탕'
  },
  {
    index: 5,
    title: '[프레시지] 자이언트 살이꽉찬 동태탕 (3~4인분)',
    price: '14900',
    discount: '6',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649919206285l0.jpg',
    originals: '15900',
    desc: '푸짐하게 즐기는 대용량 동태탕'
  },
  {
    index: 6,
    title: '[인텔리젠시아] 디카페인 콜드브루 1L',
    price: '27800',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649904528255l0.jpg',
    originals: '',
    desc: '부담 없이 만끽하는 풍미'
  },
  {
    index: 7,
    title: '[폴 바셋] 라떼 랑드샤',
    price: '12000',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649905978935l0.jpg',
    originals: '',
    desc: '커피 향 가득 부드러운 쿠키/ 2개 구매시 콜드브루 증정!!'
  },
  {
    index: 8,
    title: '[매일] 아몬드 브리즈 초콜릿',
    price: '17000',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649915422427l0.jpg',
    originals: '',
    desc: '벨기에 생초콜릿의 진한 달콤함'
  },
  {
    index: 9,
    title: '[매일] 아몬드 브리즈 식이섬유',
    price: '17230',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649916954867l0.jpg',
    originals: '',
    desc: '고소하게 챙기는 식이섬유'
  },
  {
    index: 10,
    title: '[AHC] 퍼펙트 카밍배리어 쿠션 라이트베이지 2종',
    price: '11800',
    discount: '21',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649903349854l0.jpg',
    originals: '15000',
    desc: '피부가 편안한 밀착 메이크업'
  },
  {
    index: 11,
    title: '[놉스] 치즈듬뿍 비프 라자냐',
    price: '10900',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649912372461l0.jpg',
    originals: '',
    desc: '풍미가 업그레이드 된'
  },
  {
    index: 12,
    title: '[놉스] 로제치킨 라자냐',
    price: '10900',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649912273828l0.jpg',
    originals: '',
    desc: '라자냐의 부드러운 변신'
  },
  {
    index: 13,
    title: '[놉스] 핫 에그인헬',
    price: '8400',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649912165268l0.jpg',
    originals: '',
    desc: '강력한 비주얼의 브런치 메뉴'
  },
  {
    index: 14,
    title: '[모두의맛집] 한라 화산 닭강정 (2인분)',
    price: '17550',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649922836622l0.jpg',
    originals: '19500',
    desc: '제주에서 온 반반 치킨'
  },
  {
    index: 15,
    title: '[몰랑] 점보 룰렛',
    price: '13900',
    discount: '6',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649923470410l0.jpg',
    originals: '14900',
    desc: ' 말랑말랑하고 귀여운 해적 몰랑이 캐릭터'
  },
  {
    index: 16,
    title: '[몰랑] 나무나무 블록',
    price: '10500',
    discount: '3',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649913660667l0.jpg',
    originals: '10900',
    desc: ' 몰랑이의 얼굴이 찍힌 젠가 블럭'
  },
  {
    index: 17,
    title: '[비앤씨] 개틀링 버블건',
    price: '11900',
    discount: '7',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649913776370l0.jpg',
    originals: '12900',
    desc: ' 비눗방울이 뿜어져 나오는 기관총'
  },
  {
    index: 18,
    title: '[애들랜드] 비눗방울 버블액 1250ml 2개',
    price: '8010',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649914196497l0.jpg',
    originals: '8900',
    desc: ' 넉넉해서 더욱 안심되는 대용량 구성'
  },
  {
    index: 19,
    title: '[고기대신] 비건 도시락 4종',
    price: '4700',
    discount: '18',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649923022673l0.jpg',
    originals: '5800',
    desc: '비건을 위한 균형 잡힌 한 끼'
  },
  {
    index: 20,
    title: '[언리미트] 식물성 만두 2종',
    price: '4930',
    discount: '15',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649923189513l0.jpg',
    originals: '5800',
    desc: '식물성 재료로 속을 채워 완성'
  },
  {
    index: 21,
    title: '[한스킨] 프리미엄 수퍼 매직 비비크림 SPF30, PA++ 45g',
    price: '16800',
    discount: '40',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649661307842l0.jpg',
    originals: '28000',
    desc: '매끄러운 피부를 연출해주는 비비크림'
  },
  {
    index: 22,
    title: '[한스킨] 수퍼 라이트 터치 비비크림 SPF30, PA++ 30g',
    price: '15600',
    discount: '40',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649661412789l0.jpg',
    originals: '26000',
    desc: '내 피부처럼 가볍고 편안한 비비크림'
  },
  {
    index: 23,
    title: '[한스킨] 블랙헤드 멜팅 클렌징 젤 폼',
    price: '14400',
    discount: '20',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649937248104l0.jpg',
    originals: '18000',
    desc: '피지와 블랙헤드를 순하게 딥 클렌징'
  },
  {
    index: 24,
    title: '[한스킨] 클렌징 밤 앤 블랙헤드',
    price: '8400',
    discount: '40',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649937123851l0.jpg',
    originals: '14000',
    desc: '블랙헤드와 메이크업까지 부드럽게'
  },
  {
    index: 25,
    title: '[한스킨] 블레미쉬 커버 12g 3종',
    price: '7200',
    discount: '40',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164966118832l0.jpg',
    originals: '12000',
    desc: '피부 결점을 깨끗하게 커버'
  },
  {
    index: 26,
    title: '[한스킨] 클렌징 오일 앤 블랙헤드 3종',
    price: '16500',
    discount: '25',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649937010554l0.jpg',
    originals: '22000',
    desc: '블랙헤드까지 부드럽게 녹여주는'
  },
  {
    index: 27,
    title: '[머거본] 허니버터 아몬드 200g',
    price: '4850',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649904145748l0.jpg',
    originals: '',
    desc: '달콤하면서도 고소한 간식'
  },
  {
    index: 28,
    title: '[머거본] 허니버터 믹스넛 160g',
    price: '4850',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649904284451l0.jpg',
    originals: '',
    desc: '다양한 견과류에 달콤함을 더한'
  },
  {
    index: 29,
    title: '[머거본] 와사비향 아몬드 200g',
    price: '4850',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649915067567l0.jpg',
    originals: '',
    desc: '자꾸 손이 가는 알싸한 맛'
  },
  {
    index: 30,
    title: '[머거본] 군옥수수맛 아몬드 190g',
    price: '4850',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649904916864l0.jpg',
    originals: '',
    desc: '오독오독 즐거운 식감'
  },
  {
    index: 31,
    title: '[머거본] 마늘빵맛 아몬드 180g',
    price: '4580',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649915803992l0.jpg',
    originals: '',
    desc: '향긋한 마늘의 풍미가 살아있는'
  },
  {
    index: 32,
    title: '[머거본] 쿠앤크맛 아몬드 180g',
    price: '4850',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649916512523l0.jpg',
    originals: '',
    desc: '크리미하고 달콤한 코팅 아몬드'
  },
  {
    index: 33,
    title: '[머거본] 티라미수맛 아몬드 180g',
    price: '4850',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649917049851l0.jpg',
    originals: '',
    desc: '티라미수의 맛을 그대로 재현'
  },
  {
    index: 34,
    title: '[머거본] 꿀땅콩 300g',
    price: '3400',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649917798863l0.jpg',
    originals: '',
    desc: '땅콩의 달콤하고 바삭한 변신'
  },
  {
    index: 35,
    title: '[머거본] 커피땅콩 300g',
    price: '3400',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649919047256l0.jpg',
    originals: '',
    desc: '달콤한 커피 코팅 속 숨은 고소함'
  },
  {
    index: 36,
    title: '[머거본] 코코넛땅콩 300g',
    price: '3950',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649919193410l0.jpg',
    originals: '',
    desc: '코코넛의 향긋함이 녹아든 이색 스낵'
  },
  {
    index: 37,
    title: '[훈와리 메이진] 콩가루 모찌 6개입',
    price: '4980',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649903959112l0.jpg',
    originals: '',
    desc: '사르르 녹는고소한 스낵'
  },
  {
    index: 38,
    title: '[덴로쿠] 아지노 코다와리 120g',
    price: '4980',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164990245285l0.jpg',
    originals: '',
    desc: '고소한 감칠맛이 매력적인 과자'
  },
  {
    index: 39,
    title: '[덴로쿠] 포리피 스파이스 80g',
    price: '2980',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164990298638l0.jpg',
    originals: '',
    desc: '오독오독 씹히는 땅콩 과자'
  },
  {
    index: 40,
    title: '[부르본] 바닐라향 로안느 142g',
    price: '5980',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649902672317l0.jpg',
    originals: '',
    desc: '부드러운 크림과 함께 즐기는 전병'
  },
  {
    index: 41,
    title: '[후디스] 아이얌 그릭 요거볼 4종',
    price: '2900',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164991541277l0.jpg',
    originals: '',
    desc: '사르르 녹는 유산균 간식'
  },
  {
    index: 42,
    title: '[라우쉬] 씨위드 스칼프 팩 (두피스케일링 미역팩)',
    price: '29750',
    discount: '15',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649903469307l0.jpg',
    originals: '35000',
    desc: '개운한 두피를 위한 약산성 스칼프 팩'
  },
  {
    index: 43,
    title: '[라우쉬] 위트점 너리싱 팩 (건성헤어 영양팩)',
    price: '29750',
    discount: '15',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649940189342l0.jpg',
    originals: '35000',
    desc: '건조한 모발과 두피를 위한 약산성 팩'
  },
  {
    index: 44,
    title: '[라우쉬] 콜츠푸트 안티-댄드러프 로션 (비듬각질정화 토닉)',
    price: '35100',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649939648745l0.jpg',
    originals: '39000',
    desc: '\t\n데일리 두피 각질 및 비듬 관리 토닉'
  },
  {
    index: 45,
    title: '[라우쉬] 오리지널 헤어 팅크처 (두피 관리 토닉)',
    price: '42300',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649840123410l0.jpg',
    originals: '47000',
    desc: '힘 없는 두피와 모발에 전하는 생기'
  },
  {
    index: 46,
    title: '[라우쉬] 콜츠푸트 안티-댄드러프 린스 컨디셔너 (비듬각질정화 린스)',
    price: '21600',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649911551202l0.jpg',
    originals: '24000',
    desc: '\t\n데일리 두피 각질 및 비듬 관리 린스'
  },
  {
    index: 47,
    title: '[라우쉬] 스위스 허벌 케어 린스 컨디셔너 (수분진정 린스)',
    price: '18900',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649926210338l0.jpg',
    originals: '21000',
    desc: '\t\n수분 밸런스를 지켜주는 약산성 컨디셔너'
  },
  {
    index: 48,
    title: '[라우쉬] 하트씨드 센시티브 린스 컨디셔너 (민감두피 진정 린스)',
    price: '22950',
    discount: '15',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649927313367l0.jpg',
    originals: '27000',
    desc: '민감 두피를 위한 약산성 컨디셔너'
  },
  {
    index: 49,
    title: '[애들랜드] 스피닝 터보 피그 버블건 2종',
    price: '8910',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164991393961l0.jpg',
    originals: '9900',
    desc: ' 자동으로 퐁퐁 샘솟는 비눗방울'
  },
  {
    index: 50,
    title: '[애들랜드] 스피닝 터보 샤크 버블건 2종',
    price: '7110',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649914062566l0.jpg',
    originals: '7900',
    desc: ' 다섯개의 스핀홀로 더욱 풍성한 비눗방울'
  },
  {
    index: 51,
    title: '[하림] 순수한 맑은 닭육수',
    price: '4500',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649920818729l0.jpg',
    originals: '',
    desc: '국산 닭뼈를 진하게 우려낸 육수'
  },
  {
    index: 52,
    title: '[하림] 순수한 사골육수',
    price: '4500',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649919754448l0.jpg',
    originals: '',
    desc: '한우의 뼈와 사골을 진하게 우려낸'
  },
  {
    index: 53,
    title: '유기농 신틸라 블루베리 100g (특)',
    price: '9900',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649925199446l0.jpg',
    originals: '',
    desc: '톡톡터지는 달콤한 과즙'
  },
  {
    index: 54,
    title: '[닌텐도] SWITCH 스포츠 (4/29 순차수령)',
    price: '54800',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649940864563l0.jpg',
    originals: '',
    desc: ''
  },
  {
    index: 55,
    title: '[닌텐도] SWITCH 짱구는 못말려 나와 박사의 여름방학 (5/4 순차수령)',
    price: '59800',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649983479765l0.jpg',
    originals: '',
    desc: ''
  },
  {
    index: 56,
    title: '친환경 블루베리 3종',
    price: '5391',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1616127577267l0.jpg',
    originals: '5990',
    desc: '싱그러움이 살아있는'
  },
  {
    index: 57,
    title: '미국산 멀콧 만다린 700g (8~11입)',
    price: '9360',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1556852199316l0.jpg',
    originals: '10400',
    desc: '새콤달콤하게 즐기는 이색적인 미국산 만다린 귤'
  },
  {
    index: 58,
    title: '[선물세트] 삼다원 발효 산양삼',
    price: '175750',
    discount: '5',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649914798299l0.jpg',
    originals: '185000',
    desc: '발효 산양삼을 뿌리째 포장한'
  },
  {
    index: 59,
    title: '[보노] 유기농 시칠리아 PGI 엑스트라버진 500ml',
    price: '29000',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649839365227l0.jpg',
    originals: '',
    desc: '(오일풀링 가능) 지중해의 싱그러움을 머금은 오일'
  },
  {
    index: 60,
    title: '[보노] NEW하베스트 노벨로 논필터 엑스트라버진 500ml(2021-2022 햇올리브)',
    price: '29000',
    discount: '',
    kurlyOnly: 'Kurly Only한정수량',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649901119422l0.jpg',
    originals: '',
    desc: '(오일풀링 가능) [이탈리아 햇올리브] 시칠리아산 올리브만 착유한 오일'
  },
  {
    index: 61,
    title: '[서울마님] 미니 인절미 5종',
    price: '2300',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649898240185l0.jpg',
    originals: '',
    desc: '국산 찹쌀로 빚고 부담 없이 담은'
  },
  {
    index: 62,
    title: '[복음자리] 짜먹는 과일잼 4종',
    price: '1900',
    discount: '4',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649836732379l0.jpg',
    originals: '1980',
    desc: '언제 어디서나 간편하게 발라먹는'
  },
  {
    index: 63,
    title: '[이니스프리] 그린티 씨드 세럼 80ML',
    price: '29000',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649828522445l0.jpg',
    originals: '',
    desc: '시그니처 녹차 수분 세럼'
  },
  {
    index: 64,
    title: '[올즙] 도라지배스틱 50포',
    price: '18000',
    discount: '40',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649742646436l0.jpg',
    originals: '30000',
    desc: '간편하게 짜 먹는 도라지'
  },
  {
    index: 65,
    title: '[단순생활] 3Way 휴대용 선풍기 2종',
    price: '11900',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649569406255l0.jpg',
    originals: '',
    desc: '접이식 스탠드로 언제든 편리하게'
  },
  {
    index: 66,
    title: '[단순생활] 넥밴드 휴대용 선풍기 에어 3종',
    price: '31900',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649570882606l0.jpg',
    originals: '',
    desc: '손에 들지 않고도 누리는 시원함'
  },
  {
    index: 67,
    title: '차가버섯 70g',
    price: '3990',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649812126555l0.jpg',
    originals: '',
    desc: '차로 우리는 귀한 버섯'
  },
  {
    index: 68,
    title: '[라덴스] 베럴 혀클리너 4종',
    price: '9900',
    discount: '9',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649729225664l0.jpg',
    originals: '10900',
    desc: '널찍한 크기로 상쾌한 구강관리 혀클리너'
  },
  {
    index: 69,
    title: '[프레시지] 자이언트 햄가득 부대찌개 (3~4인분)',
    price: '13900',
    discount: '12',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649919440901l0.jpg',
    originals: '15900',
    desc: '맥앤치즈의 고소함이 녹아든'
  },
  {
    index: 70,
    title: '[이디야 커피랩] 블랙쿠키 치즈 케이크',
    price: '29260',
    discount: '5',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649138783204l0.jpg',
    originals: '30800',
    desc: '달콤하고 부드러운 풍미'
  },
  {
    index: 71,
    title: '[아티제] 애쉬레 피낭시에 세트',
    price: '20520',
    discount: '5',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649829049288l0.jpg',
    originals: '21600',
    desc: '애쉬레 버터의 향긋함이 담뿍'
  },
  {
    index: 72,
    title: '[샌드위밋] 바질토마토 햄 치아바타',
    price: '4900',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649828521542l0.jpg',
    originals: '',
    desc: '바질과 썬드라이 토마토의 향긋한 풍미'
  },
  {
    index: 73,
    title: '[샌드위밋] 할라피뇨 모짜렐라 치킨 치아바타',
    price: '5900',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649828416769l0.jpg',
    originals: '',
    desc: '알차게 채워 넣은 든든한 샌드위치'
  },
  {
    index: 74,
    title: '[샌드위밋] 미트볼 칠리치즈 샌드위치',
    price: '5900',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649828306203l0.jpg',
    originals: '',
    desc: '소스를 흠뻑 입은 미트볼이 가득'
  },
  {
    index: 75,
    title: '[샌드위밋] 불고기 버섯 크림 바게트',
    price: '5900',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649828070831l0.jpg',
    originals: '',
    desc: '녹진한 크림과 짭조름한 불고기의 조화'
  },
  {
    index: 76,
    title: '[미쟝센] 퍼펙트 세럼 오리지널 2입 기획 세트 80ml*2',
    price: '11400',
    discount: '24',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649872411627l0.jpg',
    originals: '15000',
    desc: ''
  },
  {
    index: 77,
    title: '[마르티네즈] 세라노 하몽 슬라이스 100g',
    price: '6700',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649816811242l0.jpg',
    originals: '',
    desc: '본연의 맛과 풍미를 제대로'
  },
  {
    index: 78,
    title: '[마르티네즈] 세라노 초리조 250g',
    price: '12500',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649816725307l0.jpg',
    originals: '',
    desc: '직접 자르는 매콤한 초리조'
  },
  {
    index: 79,
    title: '[마르티네즈] 세라노 살치촌 슬라이스 80g',
    price: '4880',
    discount: '11',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649816550866l0.jpg',
    originals: '5500',
    desc: '담백하고 깔끔한 맛'
  },
  {
    index: 80,
    title: '[마르티네즈] 세라노 초리조 슬라이스 80g',
    price: '5500',
    discount: '',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649816641765l0.jpg',
    originals: '',
    desc: '이국적인 풍미를 품은'
  },
  {
    index: 81,
    title: '[메이준뉴트리] 풍성한 맥주효모 서리태환 30포',
    price: '15840',
    discount: '20',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649657576738l0.jpg',
    originals: '19800',
    desc: '풍성하게 챙기는 한 포'
  },
  {
    index: 82,
    title: '[메이준뉴트리] 슈퍼 풍성한 비오틴 (60일분)',
    price: '14700',
    discount: '58',
    kurlyOnly: '건강기능',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649653192738l0.jpg',
    originals: '35000',
    desc: '간편하고 풍성하게 채우는 에너지'
  },
  {
    index: 83,
    title: '[메이준뉴트리] 슈퍼 포스트바이오틱스 선물세트 (90일분)',
    price: '29500',
    discount: '41',
    kurlyOnly: '건강기능',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649654841791l0.jpg',
    originals: '50000',
    desc: '17종 유산균과 프리바이오틱스를 동시에'
  },
  {
    index: 84,
    title: '[메이준뉴트리] 수퍼 프로바이오틱스17 선물세트 (180일분)',
    price: '34720',
    discount: '44',
    kurlyOnly: '건강기능',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649657770312l0.jpg',
    originals: '62000',
    desc: '장 건강과 뼈 건강을 동시에'
  },
  {
    index: 85,
    title: '[선물세트] 이자녹스 플래티넘 모이스처 기초 실속세트',
    price: '42000',
    discount: '30',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649871214405l0.jpg',
    originals: '60000',
    desc: '영양 보습 스킨케어 세트'
  },
  {
    index: 86,
    title: '[선물세트] 이자녹스 옴므 2종 기획',
    price: '28700',
    discount: '30',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649871065772l0.jpg',
    originals: '41000',
    desc: '부드러운 남성 피부를 위한 세트'
  },
  {
    index: 87,
    title: '[선물세트] 이자녹스 LXNEW 로얄골든 기초 2종 세트',
    price: '61600',
    discount: '30',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649870902533l0.jpg',
    originals: '88000',
    desc: '건강한 영양이 담긴 스킨케어 세트'
  },
  {
    index: 88,
    title: '[이자녹스] LXNEW 비타 맥스 앰플 30ml',
    price: '35000',
    discount: '30',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649835152296l0.jpg',
    originals: '50000',
    desc: '12가지 비타민이 선사하는 환한 생기'
  },
  {
    index: 89,
    title: '[선물세트] 보닌 더 캐릭터 2종',
    price: '21000',
    discount: '30',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649841776633l0.jpg',
    originals: '30000',
    desc: '남성 피부를 위한 진정& 보습케어'
  },
  {
    index: 90,
    title: '[이자녹스] 셀리뉴 컨실링 쿠션 2종',
    price: '8400',
    discount: '30',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/16498350095l0.jpg',
    originals: '12000',
    desc: '자연스럽고 편안한 커버 쿠션'
  },
  {
    index: 91,
    title: '[캠핑프렌즈] 한돈 숄더랙 스테이크',
    price: '20250',
    discount: '10',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649839320587l0.jpg',
    originals: '22500',
    desc: '100g당 가격: 4,090원'
  },
  {
    index: 92,
    title: '[캠핑프렌즈] 한돈 돈마호크 스테이크',
    price: '16650',
    discount: '10',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/164983926771l0.jpg',
    originals: '18500',
    desc: '100g당 가격: 3,557원'
  },
  {
    index: 93,
    title: '[캠핑프렌즈] 한돈 목살 스테이크',
    price: '12325',
    discount: '15',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649836568313l0.jpg',
    originals: '14500',
    desc: '100g당 가격: 4,531원'
  },
  {
    index: 94,
    title: '[캠핑프렌즈] 한돈 등심 스테이크',
    price: '9350',
    discount: '15',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649836442804l0.jpg',
    originals: '11000',
    desc: '100g당 가격: 3,235원'
  },
  {
    index: 95,
    title: '[고기반찬] 허브 항정살 구이 300g',
    price: '8900',
    discount: '',
    kurlyOnly: 'Kurly Only',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649816405578l0.jpg',
    originals: '',
    desc: '100g당 가격: 2,967원'
  },
  {
    index: 96,
    title: '[설성목장x꽁블] 꽁블 닭육수',
    price: '3000',
    discount: '14',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649835992828l0.jpg',
    originals: '3500',
    desc: '노하우가 깃든 진한 육수'
  },
  {
    index: 97,
    title: '[쓰임] 마일드 매트 그라탕기 3종',
    price: '9810',
    discount: '10',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649840413495l0.jpg',
    originals: '10900',
    desc: '1인 분량의 그라탕을 위한 감성 용기'
  },
  {
    index: 98,
    title: '[아이소이] 모이스춰 닥터 크림 (장수진크림) 70ml',
    price: '29600',
    discount: '20',
    kurlyOnly: '',
    imgurl: 'https://img-cf.kurly.com/shop/data/goods/1649893369453l0.jpg',
    originals: '37000',
    desc: '장벽, 수분, 진정 케어를 동시에'
  }]

// router.post("/product/new", async (req, res) => {
//     const { userId } = req.body;
//     const kurlyNew = await productNew.create({userId})
//     res.json({kurlyNew})
// })


// //list목록 조회
// router.get("/post", async (req, res) => {
//     const post = await Post.find();//Post안에 모든 값을 찾아와 변수 post에 넣어준다
//     res.json({ post });//json 형태로 post의 값을 받아온다
// });


// //write.html 게시글 작성
// router.post("/post/write", async (req, res) => {
//     const today = new Date(); // new Date 현재 시간
//     const date = today.toLocaleString();//현재 시간을 문자열로 바꿔  변수date에 넣어준다 //toLocaleString
//     const { title, writer, description, pw } = req.body; //작성된 바디의 값들을
//     // console.log(req.body)

//     const createdPosts = await Post.create({ writer,  title, description, pw, date, });//Post라는 컬렉션에 create만들어준다.
//     res.json({ post: createdPosts });//json이라는 형태로 변수createdPosts를 post에 넣어서 받아온다
// });


// // Id값 가져와서 상세조회하기
// router.get("/post/:postid", async (req, res) => {
//     const { postid } = req.params;//user주소 뒤에 파라미터값을 변수 postid에 넣어준다
//     const [ view ] = await Post.find({ _id: postid }).exec();//Post컬렉션 안에 _id 값을 찾아와 view배열 안에 넣어준다
//     console.log(view)
//     const comment  = await Comment.find({})//Comment컬렉션의 모든 값을 찾아와 변수 comment에 넣어주고
//     res.json({//json형태로 찾아와 프론트에서 사용할 수 있게 보내준다.
//         view,
//         comment,
//     });
// });


// //회원 조회
// router.get("/postlogin/:postid", authMiddleware, async (req, res) => {
//     const { postid } = req.params;
//     const userId = res.locals.user._id;//locals.user안에 저장되있는_id의 값을 변수 userId에 넣어준다
//     const [ view ] = await Post.find({ _id: postid }).exec();
//     const comment  = await Comment.find({})
    
//     res.json({
//         view,
//         comment,
//         userId
//     });
// });


// //comment 작성 POST
// router.post("/posts/:postid", authMiddleware, async (req, res) => {
//     const { postid } = req.params;
//     const userId = res.locals.user._id;
//     const nickname = res.locals.user.nickname // locals.user안에 nickname을 찾아오 변수 nickname에 넣어준다
//     // console.log(nickname)
//     const { comment } = req.body;//body에 작성된 값을 변수comment에 저장해주고
//     if(!comment.length) {//만약 comment에 작성된 값이 없으면 '댓글 내용을 입력해주세요'라는 error메세지르 띄워준다
//         res.status(400).send({
//             errorMessage: '댓글 내용을 입력해주세요.'
//         })
//         return;
//     }
    
//     await Comment.create({ comment, postid , userId, nickname })//제대로 작성이 됐으면 앞에 적힌 정보를 Comment안에 컬렉션에 저장해준다
//     res.json({ msg: '등록완료' })
// })


// // comment 삭제 DELETE
// router.delete("/postss/:postid", async (req, res) => {
//     const { id } = req.body;
//     // console.log(id)
//     const comment = await Comment.findById({_id: id}).exec();
//     // console.log(comment)
//     await Comment.deleteOne({_id: id});
//     res.send({})

// }); 


// //comment 수정 patch
// router.patch("/posts/:commentid", (req, res) => {

// });






module.exports = router;


