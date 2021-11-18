import {
  Tag,
  nullCounts,
  rA,
  aA,
  myStorage
} from "./questions.js";


let quizType = document.querySelector(".quiz-type");
export let mainBlock = document.querySelector("main");
let backHomeButton = document.querySelector(".back-home-button");

let backCat = document.querySelector(".back-cat");

window.onunload = function () {
  backHomeButton.setAttribute("disabled", "true");
  backCat.setAttribute("disabled", "true");



}
window.onload = function () {
  for (let i = 0; i < myStorage.length; i++) {
    let key = myStorage.key(i);
    //alert(`${key}: ${localStorage.getItem(key)}`);
    let item = document.querySelector(key)
    for (let elem of item.childNodes) {
      if (elem.classList.contains("numTotal")) {
        elem.remove()
      }
    }
    item.append(new Tag("span", localStorage.getItem(key), "", "numTotal"))
  }
}


document.addEventListener("click", function (event) {

  //alert(event.target.tagName)


  if (event.target.closest(".quiz-type h2")) {
    quizType.classList.add("displayNone");
    mainBlock.classList.add("main-not-centered");
    let list = document.querySelector(`.${event.target.textContent}`);
    list.classList.remove("displayNone");
    list.classList.add("activeCat");
    backHomeButton.removeAttribute("disabled")

  } else if (event.target.closest(".back-home-button")) {
    quizType.classList.remove("displayNone");
    mainBlock.classList.remove("main-not-centered");
    backHomeButton.setAttribute("disabled", "true")
    backCat.setAttribute("disabled", "true")
    makeAllCatInvis()
    makeAllQInvis()
    makeAllCatInactive()


    nullCounts(rA, aA)


  } else if (event.target.closest(".back-cat")) {
    backCat.setAttribute("disabled", "true")
    makeAllQInvis()
    let activeCat = document.querySelector(".activeCat");
    activeCat.classList.remove("displayNone");
    nullCounts(rA, aA)
  }
})


export function makeCat(arr, catName) {
  let ul = new Tag("ul", "", "", "cat-title", catName, "displayNone")
  for (let i = 0; i < 12; i++) {
    let li;
    if (catName == "Artists") {
      li = new Tag("li", "", "", "cat1", "cat", `subCat${i}`)
    } else {
      li = new Tag("li", "", "", "cat2", "cat", `subCat${i}`)
    }

    let h3 = new Tag("h3", `Round ${i+1}`, "")
    li.append(h3);

    let img = new Tag("img", "", "")

    if (catName == "Artists") {
      img.src = arr[i];
    } else {
      img.src = arr[i + 12];
    }

    li.append(img);

    li.addEventListener("click", function () {
      makeAllQInvis()
      makeAllCatInvis()
      backCat.removeAttribute("disabled")
      let elem;
      if (catName == "Artists") {
        elem = document.querySelector(`ul.cat1.subCat${i}`)
      } else {
        elem = document.querySelector(`ul.cat2.subCat${i}`)
      }
      elem.classList.remove("displayNone")
    })
    ul.append(li);
  }
  mainBlock.append(ul);
}

export async function getImgs() {
  let arrImgs = [];
  for (let i = 0; i <= 240; i++) {
    arrImgs.push(
      `https://raw.githubusercontent.com/irinainina/image-data/dadea6e2555841b3f136d8ab07ce6474391f1a3f/img/${i}.jpg`
    );
  }
  return arrImgs;
}

function makeAllQInvis() {
  let colection = document.querySelectorAll("ul.cat");
  for (let item of colection) {
    item.classList.add("displayNone")
  }
}

function makeAllCatInvis() {
  let colection = document.querySelectorAll("ul.cat-title");
  for (let item of colection) {
    item.classList.add("displayNone")
  }
}

function makeAllCatInactive() {
  let colection = document.querySelectorAll("ul.cat-title");
  for (let item of colection) {
    item.classList.remove("activeCat")
  }
}