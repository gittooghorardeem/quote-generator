let apiQuotes = [];

// Show new Quote
function newQuote() {
    // Pick a random quote from API apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // const test = Math.random();
    // console.log(test);
    console.log(quote);
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

// On Load
getQuotes();