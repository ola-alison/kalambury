
let phraseCollection = ["pies", "kot", "chomik", "żółw", "papuga"];
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
  input.value = "";
}

btnDraw.onclick = function drawPhrase() {

  let phraseRandom1, phraseRandom2;

  phraseRandom1 = phraseCollection[Math.floor(Math.random()*phraseCollection.length)];
  phraseRandom2 = phraseCollection[Math.floor(Math.random()*phraseCollection.length)];

  while (phraseRandom2 === phraseRandom1) {
    phraseRandom2 = phraseCollection[Math.floor(Math.random()*phraseCollection.length)];
  }

  console.log(phraseRandom1, phraseRandom2);

  document.getElementById("phrase-random").innerHTML = `wybierz hasło: <strong>${phraseRandom1}</strong> lub <strong>${phraseRandom2}</strong>`;
}
