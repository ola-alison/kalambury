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
      },
      error: function(resp) {
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
  let oldPhrase = phraseCollection.find( phrase => phrase.id === parseInt(toBeRemoved, 10) );

  $.ajax( {
    url: API + toBeRemoved,
    method: "DELETE",
    success: function(resp) {
      phraseCollection.splice(phraseCollection.indexOf(oldPhrase), 1);
    },
    error: function(resp) {
    }
  })

}

let changeStatus = function(status) {

  let toBeChanged = this.parentNode.getAttribute("data-id");
  let oldPhrase = phraseCollection.find( phrase => phrase.id === parseInt(toBeChanged, 10) );

  $.ajax( {
    url: API + toBeChanged,
    method: "PATCH",
    data: {status: status},
    success: (resp) => {
      this.parentNode.classList.remove("active", "inactive");
      this.parentNode.classList.add(status);
      oldPhrase.status = resp.status;
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

    let oldPhrase = phraseCollection.find( phrase => phrase.id === phraseRandom.id );

    $.ajax( {
      url: API + phraseRandom.id,
      method: "PATCH",
      data: {status: 'inactive'},
      success: function(resp) {
        oldPhrase.status = resp.status;
        $("[data-id=" + phraseRandom.id + "]").addClass("inactive").removeClass("active");
      },
      error: function(resp) {
      }
    })

    document.getElementById("phrase-random").innerHTML = `Your phrase is: <strong>${phraseRandom.item}</strong>`;
    let toBeDeactivated = phraseRandom.id;
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
        phraseCollectionP.classList.add("list-item");

        allPhrasesList.appendChild(phraseCollectionP).innerHTML = '<span>' + phraseCollection[i].item + '</span>';

        allPhrasesList.appendChild(phraseCollectionP).appendChild(phraseCollectionRemove).innerHTML = "remove";
        phraseCollectionRemove.classList.add("btn-remove", "button");

        allPhrasesList.appendChild(phraseCollectionP).appendChild(phraseCollectionDeactivate).innerHTML = 'deactivate';
        phraseCollectionDeactivate.classList.add("btn-deactivate", "button");

        allPhrasesList.appendChild(phraseCollectionP).appendChild(phraseCollectionActivate).innerHTML = 'activate';
        phraseCollectionActivate.classList.add("btn-activate", "button");

        phraseCollectionRemove.onclick = removePhrase.bind(phraseCollectionRemove);
        phraseCollectionDeactivate.onclick = changeStatus.bind(phraseCollectionDeactivate, "inactive");
        phraseCollectionActivate.onclick = changeStatus.bind(phraseCollectionActivate, "active");
      };
    },

    error: function(resp) {
    },
  })
}

showPhrases();


$('.kalambury-manage-phrases-btn').on('click',function(e){
  $(this).parent().toggleClass('open');
});
