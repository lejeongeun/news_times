// const API_KEY = `941d455169354b78989df64c805f044a`
// https://bright-boba-89b610.netlify.app/ : my netlify 주소
let newsList = [] // 전역변수로 지정
let totalResults = 0;
// 임의로 정해주는 값
let page = 1; // 변동 가능
const pageSize = 10; // const인 이유: 10개의 page bar는 바뀔수 없음, 고정된 값 
const groupSize = 5; // 바뀔 수 없음, 고정된 값


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
        //url을 받음과 동시에 page정보 붙여주기 
        // searchParams.set(): 페이지라는 파라미터 세팅
        url.searchParams.set("page", page);
        url.searchParams.set("pageSize", pageSize);

        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200){
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            } 
            newsList= data.articles;
            // 데이터가 있고 length가 0보다 크다면? 
            totalResults = data.totalResults;
            render();
            paginationRender();// news가 나온 후 pagination 구성
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
const paginationRender = () =>{
    // totalResult: data의 totalResult값이 있음
    //page
    //pageSize
    // goupSize --> 위에 변수로 초기화 
    // pagGroup
    const pageGroup = Math.ceil(page /groupSize);
    // totalPages
    const totalPages = Math.ceil(totalResults/pageSize);
    // lastPage
    let lastPage = pageGroup * groupSize;
    // 마지막 페이지 그룹이 그룹 사이즈보다 작을경우 lastPage = totalPages 설정
    if(lastPage > totalPages){
        lastPage = totalPages;
    }
    //firstpage
    const firstPage = lastPage - (groupSize -1) <= 0? 1: lastPage - (groupSize -1); 
    // firstPage<groupSize일 경우() 1로 설정 lastPage - (groupSize -1) <= 0? 1 :
    // pagination
    // getNews 함수 안에 new가 나오는 render() 아래 paginationHTML호출

    let paginationHTML = ``
    if (page > 1) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page - 1}"><a class="page-link">&lt;</a></li>`;
    }
    for(let i = firstPage; i<=lastPage; i++){
        paginationHTML += ` <li class="page-item ${
            i === page ? "active" : ""
        }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    if (page < totalPages) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})"><a class="page-link">&gt;</a></li>`;
    }
    document.querySelector(".pagination").innerHTML = paginationHTML;
};
    // pagination
/* <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> */

const moveToPage=(pageNum)=>{ 
    // 클릭한 page번호를 알기 위해 onclick에 ${i} 지정 -> 이를 매개변수 pageNum으로 받기 
    // url을 호출해줘야 하므로 getNews 호출, 
    // pageNum이 변하므로 getNews에 페이지 번호 지정
    console.log("movetoPage", pageNum);
    page = pageNum; // 페이지가 1로 지정되어있는 값을 pageNum에 따라 바뀌도록 지정
    getNews();
}

getLatestNews();

/**
1. 버튼에 클릭 이벤트주기
2. 카테고리별 News 가져오기
3. 그 뉴스 보여주기

 */