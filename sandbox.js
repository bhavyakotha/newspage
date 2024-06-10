const API_URL = 'https://newsapi.org/v2/top-headlines?country=us';
const API_KEY = '4209e50419f04d0da3a97425f2cb13f8';

document.addEventListener('DOMContentLoaded', fetchNews);

let processedArticles = new Set(); 

function fetchNews() {
    fetch(`${API_URL}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); 
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                console.error('No articles found in API response.');
            }
        })
        .catch(error => console.error('Error fetching news:', error));
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = ''; 

    articles.forEach((article, index) => {
        if (processedArticles.has(index)) return; 
        
        const articleElement = createArticleElement(article);
        newsContainer.appendChild(articleElement);

        articleElement.querySelector('img').onerror = () => {
            newsContainer.removeChild(articleElement);
            processedArticles.add(index); 
            displayNextArticle(articles, newsContainer); 
        };

        
        setTimeout(() => {
            articleElement.style.opacity = '1';
        }, 100);

        
        processedArticles.add(index);
    });
}

function displayNextArticle(articles, newsContainer) {
    for (let i = 0; i < articles.length; i++) {
        if (processedArticles.has(i)) continue;

        const articleElement = createArticleElement(articles[i]);
        newsContainer.appendChild(articleElement);

        articleElement.querySelector('img').onerror = () => {
            newsContainer.removeChild(articleElement);
            processedArticles.add(i); 
            displayNextArticle(articles, newsContainer); 
        };

        
        setTimeout(() => {
            articleElement.style.opacity = '1';
        }, 100);

       
        processedArticles.add(i);
        break; 
    }
}

function createArticleElement(article) {
    const articleElement = document.createElement('div');
    articleElement.className = 'article';
    
    const titleElement = document.createElement('h2');
    titleElement.innerText = article.title;

    const imageElement = document.createElement('img');
    imageElement.src = article.urlToImage;
    imageElement.alt = article.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = article.description;

    const linkElement = document.createElement('a');
    linkElement.href = article.url;
    linkElement.target = '_blank';
    linkElement.innerText = 'Read more';

    articleElement.appendChild(titleElement);
    articleElement.appendChild(imageElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(linkElement);

    return articleElement;
}




