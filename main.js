// const API_KEY = `941d455169354b78989df64c805f044a`
// https://bright-boba-89b610.netlify.app/ : my netlify 주소
let newsList = [] // 전역변수로 지정

// openSearchBox : search버튼을 누르면 input박스 띄우기
const openSearchBox = () => {
    let inputArea = document.getElementById("input-area"); 
    if (inputArea.style.display === "inline") { 
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };
const searchNews = async() =>{
    // keyword변수에 search-input(검색창)에 입력한 값 받기
    const keyword = document.getElementById("search-input").value; 
    console.log("keyword", keyword);
    url = new URL(
        //`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
        `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr&q=${keyword}`
    );
    getNews();
    console.log("keyword",newsList);
};
// 메뉴 sidebar!
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
// 버튼 들고오기 
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event)=>getNewsByCategory(event)));


let url = new URL( // url을 Let 으로정의, 각 함수에서는 url을 재정의하여  getNes에서의 url로 이동
    //`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr`
);
const getNews = async() =>{ // 중복 코드 리팩토링
    try{
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200){
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            } 
            newsList= data.articles;
            render();
        }
        else{
            throw new Error(data.message);
        }
    }
    catch(error){
        errorRender(error.message);

    };
};
const getLatestNews = async () =>{
    //URL인스턴스 사용
    url = new URL(
        //`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
        `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr`
        );
    getNews();
};
// 카테고리에 click 이벤트 부여 
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase(); // event로 category받아오기
    console.log("category", category);
    url = new URL(
        //`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
        `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr&category=${category}`
        );
    getNews();
};
/**
에러 핸들링
1. 받은 api데이터가 0개라면 화면에 no matches for your search
2. 받은 응답 코드가 200이 아니라면 (400, 401, 402등) 받은 에러 메세지를 화면에 보여주기
 */
const render = () => {
    const newsHTML = newsList.map((news) => {
        let truncatedDescription = news.description ? 
            (news.description.length > 200 ? `${news.description.slice(0, 200)}... <span class="read-more">더보기</span>` : news.description) :
            "내용 없음";
        let imageUrl = news.urlToImage ? news.urlToImage : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

        return `<div class="row news">
            <div class="col-lg-4">
            <img class="news-img-size" src="${imageUrl}" alt="News Image"/>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>${truncatedDescription}</p>
                <div>
                ${news.source.name} * ${news.publishedAt}</div>
            </div>
        </div>`;
    }).join("");

    document.getElementById("news-board").innerHTML = newsHTML;
};
const errorRender = (errorMessage) =>{
    // 부트스트랩 사용
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;
  document.getElementById("news-board").innerHTML=errorHTML
}

getLatestNews();

/**
1. 버튼에 클릭 이벤트주기
2. 카테고리별 News 가져오기
3. 그 뉴스 보여주기
 */