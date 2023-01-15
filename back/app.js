const express = require('express');
const db = require('./models');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user');

db.sequelize.sync()
.then(()=>{
    console.log("db접속 성공");
})
.catch(console.error);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRouter);

// app.all('/*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // cros 에러 주범 Access-Control-Allow-Origin 헤더에 프론트 주소를 적어주어야 에러가 나지 않음 일단 모르니 전체허용
//     res.header("Access-Control-Allow-Credentials", "true"); //자격증명 서비스 배포전에 해놔야할듯
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // 허용된 메소드 정보
//     //허용된 헤더목록
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
//   });

app.listen(3065, () => {
    console.log("서버 실행완료");
})