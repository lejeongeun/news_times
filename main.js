// const API_KEY = `941d455169354b78989df64c805f044a`
// https://bright-boba-89b610.netlify.app/ : my netlify 주소
let newsList = [] // 전역변수로 지정
const getLatestNews = async () =>{
    //URL인스턴스 사용
    const url = new URL(
        `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr`
        );
        
    const response = await fetch(url);
    const data = await response.json(); // json 형식으로 받기 
    newsList = data.articles;
    render(); // newsList가 확정되는 부분에 적용
    console.log("ddd", newsList);
    

};
const render = () =>{
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" 
            src=${news.urlToImage} />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div> 
    </div>
</div>`
).join(""); // join(): arr->string type으로 변경하여 , 지우기
    document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();