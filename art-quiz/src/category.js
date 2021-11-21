import {
  Tag,
  nullCounts,

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
    let key = `li${myStorage.key(i)}`;

    let item = document.querySelector(key)
    if (item) {
      for (let elem of item.childNodes) {
        if (elem.classList.contains("numTotal")) {
          elem.remove()
        }
      }
      let numTotal = new Tag("span", `${localStorage.getItem(key)} / 10`, "", "numTotal")
      item.append(numTotal)

      numTotal.addEventListener("click", function () {
        backCat.removeAttribute("disabled")
        let ul = new Tag("ul", "", "", "detailedResult")
        ul.innerHTML = myStorage.getItem(`${myStorage.key(i)}`);
        for (let item of mainBlock.childNodes) {
          if (item.tagName) {
            item.classList.add("displayNone")

          }
        }
        mainBlock.append(ul)

        for (let item of document.querySelectorAll(".imgInRes")) {
          item.addEventListener("click", function () {
            item.nextSibling.style.opacity = "0";
            item.nextSibling.style.transition = "0.3s"
            item.nextSibling.classList.toggle("displayNone")
            if (!item.nextSibling.classList.contains("displayNone")) {
              setTimeout(() => {
                item.nextSibling.style.opacity = "1";
                item.nextSibling.style.transform = "translate(-20px, -30px)";
              }, 200);
              setTimeout(() => {


                item.nextSibling.style.transform = "translate(0px, 0px)";
              }, 600);
            }


          })

        }
        for (let item of document.querySelectorAll(".detailedResult a")) {
          item.addEventListener("click", function () {
            let endI = (item.parentNode.childNodes[0].src.lastIndexOf("."))
            let startI = (item.parentNode.childNodes[0].src.lastIndexOf("/"))
            let num = item.parentNode.childNodes[0].src.slice(startI + 1, endI)
            item.href = `https://raw.githubusercontent.com/irinainina/image-data/dadea6e2555841b3f136d8ab07ce6474391f1a3f/full/${num}full.jpg`
          })
        }
        document.querySelector(".itemCloseButtomImg").addEventListener("click", function () {
          ul.remove()
          document.querySelector(".activeCat").classList.remove("displayNone")
        })

      })
    }

  }
}


document.addEventListener("click", function (event) {


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
    nullCounts(aA)
    if (document.querySelector(".detailedResult")) {
      document.querySelector(".detailedResult").remove()
    }



  } else if (event.target.closest(".back-cat")) {
    backCat.setAttribute("disabled", "true")
    makeAllQInvis()
    document.querySelector(".activeCat").classList.remove("displayNone")
    nullCounts(aA)
    if (document.querySelector(".detailedResult")) {
      document.querySelector(".detailedResult").remove()
    }
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

    li.addEventListener("click", function (event) {
      if (!event.target.closest(".numTotal")) {
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




      }

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