// create const for all ID
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false; //we're hiding our html div so ui will only show the loading
  quoteContainer.hidden = true; //quote container will be hidden
}
//Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//show new quote
function newQuote() {
  loading(); //we allow it to load again for2nd/3rd...time
  //pick a random quote from apiquote(1643) array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; //we r able to pull a single random quote from quore array
  authorText.textContent = quote.author;

  //check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote,hide the loader
  quoteText.textContent = quote.text;
  complete();
}
//Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    //try catch allows us to attempt a fetch request if it doesnt work we can catch the error info & do something with it
    const response = await fetch(apiUrl); //this const response will populate only whensome data fetched from our API
    apiQuotes = await response.json(); //we r getting the Json from our API as aresponse & we r turning tht response into a JSON obj & we passed tht golbal variable apiquotes[array]
    newQuote();
  } catch (error) {
    //pass in the error tht would get recieved
    //catch error here alert("error")
  }
}

//Tweet Quote
function tweetQuote() {
  //template string allows us to pass in a variable & it'll be converted into string
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  // window.open allow us to open a new window using twitterurl &_blankallow to open twitter window in a new tab
  window.open(twitterUrl);
}
//Event Listeners(Twitter button & new quote button to work)
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load (we want to run out getQuotes func as soon as the page loads)
getQuotes();
