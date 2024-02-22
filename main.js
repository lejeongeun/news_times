//const API_KEY = `941d455169354b78989df64c805f044a`
// https://bright-boba-89b610.netlify.app/ : my netlify 주소
let newsList = [] // 전역변수로 지정

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area"); 
    if (inputArea.style.display === "inline") { 
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
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
const getLatestNews = async () =>{
    //URL인스턴스 사용
    const url = new URL(
        //`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr`
        );
        
    const response = await fetch(url);
    const data = await response.json(); // json 형식으로 받기 
    newsList = data.articles;
    render(); // newsList가 확정되는 부분에 적용
    console.log("ddd", newsList);
    

};
// 카테고리에 click 이벤트 부여 
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase(); // event로 category받아오기
    console.log("category", category);
    const url = new URL(
        `https://bright-boba-89b610.netlify.app/top-headlines?&country=kr&category=${category}`
        );
        const response = await fetch(url);
        const data = await response.json();
        console.log("ddd", data);
        newsList= data.articles;
        render();

};
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

getLatestNews();

/**
1. 버튼에 클릭 이벤트주기
2. 카테고리별 News 가져오기
3. 그 뉴스 보여주기
 */