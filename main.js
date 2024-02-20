// const API_KEY = `941d455169354b78989df64c805f044a`
// https://bright-boba-89b610.netlify.app/ : my netlify 주소
let news = [] // 전역변수로 지정
const getLatestNews = async () =>{
    //URL인스턴스 사용
    const url = new URL(
        `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr`
        );
        
    const response = await fetch(url);
    const data = await response.json(); // json 형식으로 받기 
    news = data.articles;
    console.log("ddd", news);
};
getLatestNews();

