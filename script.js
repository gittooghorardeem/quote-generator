const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');



let apiQuotes = [];

// Show new Quote
function newQuote() {
    // Pick a random quote from API apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // const test = Math.random();
    // console.log(test);
    // console.log(quote);

    // To check if the Author field is 'null' and replace it with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check the Quote length to determine the font styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote'); // Adds CSS styling class
    } else {
        quoteText.classList.remove('long-quote'); // Add CSS styling class
    }
    quoteText.textContent = quote.text;
}

// Get quotes from API
async function getQuotes() {
    const apiurl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiurl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[10]);
        newQuote();
    } catch (error) {
        // catch error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();