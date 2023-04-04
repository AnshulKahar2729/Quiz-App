const saveScoreBtn = document.getElementById("saveScoreBtn");
const username = document.getElementById("username");
const finalScore = document.getElementById('finalScore');

// get the score using localStorage. LocalStorage store the data in key value pair where value is string.
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

// if highScores is null in localStorage it will return an empty array that is for the first time we are taking empty array.
// json.parse() since localStorage returns the value in string form.
const highScores = JSON.parse((localStorage.getItem("highScores"))) || [];

saveHighScore = (e) => {
  e.preventDefault(); // to stop from reloading the page.

  const scoreObj = {
    score: mostRecentScore,
    name : username.value
  };
  highScores.push(scoreObj)
  console.log(highScores);
};

username.addEventListener("keyup", () => {
    // if username is (empty string i.e falsy value) then that means (!username.value = true) and  saveScoreBtn.disabled = true which means btn is disabled.
  
    // and by default button is disabled that means false means true.
    saveScoreBtn.disabled = (!username.value);
  });

saveScoreBtn.addEventListener("click", saveHighScore);

