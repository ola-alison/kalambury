document.getElementById("button").onclick = function addPhrase() {

  let phrase = document.getElementById("phrase-item").value;
  let phraseP = document.createElement("p");

  document.getElementById("phrase-list").appendChild(phraseP).innerHTML = phrase;

}
