import $ from 'jquery';

const API = "http://todo.fatco.de/todo/";

let phraseCollection = [];

let input = document.getElementById("phrase-item");
let btnAdd = document.getElementById("button-add");
let btnDraw = document.getElementById("button-draw");
let phrase = {};

// --------------------- ADD NEW PHRASE -----------------------
let addPhrase = () => {

  if (input.value !== "") {
    phrase = {
      item: input.value,
      status: "active"
    };

    document.getElementById("new-phrase").innerHTML = phrase.item;
    document.getElementById("phrase-added").classList.add("visible");
    document.getElementById("phrase-added").classList.remove("hidden");
    phraseCollection.push(phrase);

    $.ajax( {
      url: API,
      method: "POST",
      data: phrase,
      success: function(resp) {
        console.log(phrase, resp);
      },
      error: function(resp) {
        console.log(resp);
      }
    })

    input.value = "";
    showPhrases();
  }
  else {
    alert("Insert phrase first.");
  }

}

btnAdd.onclick = addPhrase.bind();


// --------------------------------------------

let clearList = () => {
  document.getElementById("all-phrases-list").innerHTML = "";
}


let removePhrase = function() {

  this.parentNode.remove();

  let toBeRemoved = this.parentNode.getAttribute("data-id");
  console.log(API.length);

  $.ajax( {
    url: API + toBeRemoved,
    method: "DELETE",
    success: function(resp) {
    },
    error: function(resp) {
    }
  })

}


let deactivatePhrase = function() {

  let toBeDeactivated = this.parentNode.getAttribute("data-id");

  this.parentNode.classList.add("inactive");
  this.parentNode.classList.remove("active");


  $.ajax( {
    url: API + toBeDeactivated,
    method: "PATCH",
    data: {status: 'inactive'},
    success: function(resp) {
      showPhrases();
    },
    error: function(resp) {
    }
  })
}


let activatePhrase = function() {

  let toBeActivated = this.parentNode.getAttribute("data-id");

  this.parentNode.classList.add("active");
  this.parentNode.classList.remove("inactive");

  $.ajax( {
    url: API + toBeActivated,
    method: "PATCH",
    data: {status: 'active'},
    success: function(resp) {
      showPhrases();
    },
    error: function(resp) {
    }
  })
}


// --------------------- DRAW PHRASE -----------------------

btnDraw.onclick = function drawPhrase() {

  let phraseRandom;

  let activePhrases = phraseCollection.filter(function(phrase) {
    return phrase.status === "active";
  });


  if (activePhrases.length > 0) {
    phraseRandom = activePhrases[Math.floor(Math.random()*activePhrases.length)];

    $.ajax( {
      url: API + phraseRandom.id,
      method: "PATCH",
      data: {status: 'inactive'},
      success: function(resp) {
        showPhrases();
      },
      error: function(resp) {
      }
    })

    document.getElementById("phrase-random").innerHTML = `Your phrase is: <strong>${phraseRandom.item}</strong>`;
  }

  else {
    alert("There are no active phrases to draw from.");
  }

}


// --------------------- PRINT PHRASES -----------------------
let showPhrases = () => {

  clearList();

  $.ajax( {
    url: API,
    method: "GET",
    success: function(resp) {
      phraseCollection.length = 0;
      for (let i = 0; i < resp.length; i++) {

        let phrase = resp[i];

        phraseCollection.push(phrase);

        let allPhrasesList = document.getElementById("all-phrases-list");
        let phraseCollectionP = document.createElement("p");

        let phraseCollectionDeactivate = document.createElement("button");
        let phraseCollectionActivate = document.createElement("button");
        let phraseCollectionRemove = document.createElement("button");

        phraseCollectionP.setAttribute('data-id', phraseCollection[i].id);
        phraseCollectionP.className = phraseCollection[i].status;

        console.log(phraseCollection[i]);

        allPhrasesList.appendChild(phraseCollectionP).innerHTML = '<span class="all-phrases-list-item">' + phraseCollection[i].item + '</span>';

        allPhrasesList.appendChild(phraseCollectionP).appendChild(phraseCollectionDeactivate).innerHTML = 'deactivate';
        phraseCollectionDeactivate.classList.add("btn-deactivate", "button");

        allPhrasesList.appendChild(phraseCollectionP).appendChild(phraseCollectionActivate).innerHTML = 'activate';
        phraseCollectionActivate.classList.add("btn-activate", "button");

        allPhrasesList.appendChild(phraseCollectionP).appendChild(phraseCollectionRemove).innerHTML = "remove";
        phraseCollectionRemove.classList.add("btn-remove", "button");

        phraseCollectionRemove.onclick = removePhrase.bind(phraseCollectionRemove);
        phraseCollectionDeactivate.onclick = deactivatePhrase.bind(phraseCollectionDeactivate);
        phraseCollectionActivate.onclick = activatePhrase.bind(phraseCollectionActivate);
      };

      console.log("get ", phraseCollection);
    },

    error: function(resp) {
      console.log("Error", resp);
    },
  })
}

showPhrases();


$('.kalambury-manage-phrases-btn').on('click',function(e){
  $(this).parent().toggleClass('open');
});
