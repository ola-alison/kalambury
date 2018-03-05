
let phraseCollection = [];
let input = document.getElementById("phrase-item");
let btnAdd = document.getElementById("button-add");
let btnDraw = document.getElementById("button-draw");

btnAdd.onclick = function addPhrase() {

  let phrase = input.value;
  let phraseP = document.createElement("p");

  if (phrase !== "") {
    phraseCollection.push(phrase);
  }
  else {
    alert("insert phrase");
  }

  console.log(phraseCollection);

  document.getElementById("phrase-list").appendChild(phraseP).innerHTML = phrase;
}

btnDraw.onclick = function drawPhrase() {

  let phraseRandom;

  if (Object.keys(phraseCollection).length > 1) {
    phraseRandom = phraseCollection[Math.floor(Math.random()*phraseCollection.length)];
  }
  else {
    phraseRandom = "*** add something first ***";
  }

  console.log(phraseRandom);

  document.getElementById("phrase-random").innerHTML = phraseRandom;
}
