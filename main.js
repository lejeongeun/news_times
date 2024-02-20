const API_KEY = `941d455169354b78989df64c805f044a`
let news = [] // 전역변수로 지정
const getLatestNews = async () =>{
    // url을 사용할 경우 이미 js에서 만들어둔 URL인스턴스 사용
    const url = new URL(
        `https://bright-boba-89b610.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
        );
        //fetch(): url 호출 , async await를 통해 기다려줘야 함..
    const response = await fetch(url);
    const data = await response.json(); // json 형식으로 받기 
    news = data.articles;
    console.log("ddd", news);
};
getLatestNews();

// https://bright-boba-89b610.netlify.app/