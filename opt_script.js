const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Show Loading animation 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading Aniumation
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get quote From API also includes CORS Policy fix

async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // console.log(data);

        // If Author information returns blank
        // if (data.quoteAuthor === '')
        if (!data.quoteAuthor) {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // Check the Quote length to determine the font styling
        if (data.quoteText.length > 100) {
            quoteText.classList.add('long-quote') // Adds CSS styling
        } else {
            quoteText.classList.remove('long-quote') // Removes CSS styling
        }

        quoteText.innerText = data.quoteText;
        complete();

    } catch (error) {
        getQuote();
        console.log('Whooops!! no Quote this time...', error);
    }

}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
// Share quote on facebook
function facebookQuote() {
    const facebookUrl = `https://www.facebook.com`;
    window.open(facebookUrl,'_blank');
}

// Eventlisteners
twitterBtn.addEventListener('click',tweetQuote);
facebookBtn.addEventListener('click',facebookQuote);
newQuoteBtn.addEventListener('click',getQuote)

// On Load

getQuote();