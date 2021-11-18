import {

  mainBlock

} from "./category.js";



export let rA = 0;
export let aA = 0;

export let myStorage = window.localStorage;

class Picture {
  constructor(pic, desc) {
    this.pic = pic;
    this.desc = desc;
  }
  get author() {
    return this.desc.author;
  }
  get name() {
    return this.desc.name;
  }
  get year() {
    return this.desc.year;
  }
}

export async function getAllImages(arrPic, arrDesc) {
  let allImages = [];
  for (let i = 0; i < arrPic.length; i++) {
    allImages.push(new Picture(arrPic[i], arrDesc[i]));
  }
  return allImages;
}





export class Tag {
  constructor(tagName, content, src, ...args) {
    this._tag = document.createElement(tagName);
    if (content) {
      this._tag.textContent = content;
    }
    if (src) {
      this._tag.src = src;
    }
    if (args) {
      for (let elem of args) {
        this._tag.classList.add(elem)
      }
    }
    return this._tag
  }
}





class QuestionPaintings {
  constructor(obj, block, k) {

    this.obj = obj[k]
    this.pic = this.obj.pic;
    this.desc = this.obj.desc;
    this.author = this.obj.desc.author;
    this.liArr = [];

    let mainLi = new Tag("li", "", "", "questionCard", "qCImgCont")
    if (block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")
    }

    let h2 = new Tag("h2", `Which of these paintings did ${this.author} paint?`, "")
    mainLi.append(h2);




    let filteredObj = obj.slice().filter(elem => this.author != elem.desc.author);
    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        this.liArr.push(new Tag("img", "", this.pic))
      } else {
        let randomNum = random(filteredObj.length)
        this.liArr.push(new Tag("img", "", filteredObj[randomNum].pic))
        filteredObj = filteredObj.slice().filter(elem => filteredObj[randomNum].desc.author != elem.desc.author);
      }
    }

    shuffle(this.liArr);

    for (let elem of this.liArr) {
      mainLi.append(elem);
    }
    block.append(mainLi);
  }
}





export function fillPaintingsCat(block, arrImgs) {
  let k = 120;

  for (let j = 0; j < 12; j++) {

    let ul = new Tag("ul", "", "", "cat2", "cat", `subCat${j}`, "displayNone")
    fillAllCatPaint(arrImgs, k, ul)

    k += 10
    block.append(ul);
  }
}

function fillAllCatPaint(arrImgs, k, block) {
  rA = 0;
  aA = 0;
  let objCat = [];
  for (let i = 0; i < 10; i++) {
    let obj = new QuestionPaintings(arrImgs, block, k)
    k++;
    for (let elem of obj.liArr) {
      elem.addEventListener("click", function () {
        if (elem.src == obj.pic) {
          printCard(elem, obj, "true", getNext, aA).then((res) => {
            rA++;
            aA++;
            obj.result = "true";
            objCat.push(obj)
            res.querySelector(".but-total").addEventListener("click", function () {
              getNext()
              printTotalCard(rA, elem.parentNode.parentNode)
              saveDetailedResult(objCat, block)
            })

          })

        } else {
          printCard(elem, obj, "false", getNext, aA).then((res) => {
            aA++;
            obj.result = "false";
            objCat.push(obj)
            res.querySelector(".but-total").addEventListener("click", function () {
              getNext()
              printTotalCard(rA, elem.parentNode.parentNode)
              saveDetailedResult(objCat, block)
            })

          })
        }
        document.addEventListener("click", function (event) {
          if (event.target.closest(".but-repeate")) {
            refillCat(block, k)
            fillAllCatPaint(arrImgs, k - 10, block)
            block.childNodes[0].classList.remove("displayNone")
          } else if (event.target.closest(".back-home-button") || event.target.closest(".back-cat")) {
            refillCat(block, k)
            fillAllCatPaint(arrImgs, k - 10, block)
          }
        })
      })
    }
  }
}














class QuestionArtist {
  constructor(obj, block, k) {
    this.obj = obj[k]
    this.pic = this.obj.pic;
    this.desc = this.obj.desc;
    this.author = this.obj.desc.author;
    this.liArr = [];

    let mainLi = new Tag("li", "", "", "questionCard")
    if (block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")

    }
    let h2 = new Tag("h2", "Who is the author of the painting?", "")
    let img = new Tag("img", "", this.pic)
    let ul = new Tag("ul", "", "", "possibleAnswers")
    mainLi.append(h2, img, ul);


    let filteredObj = obj.slice().filter(elem => this.author != elem.desc.author);
    //console.log(obj, filteredObj)
    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        this.liArr.push(new Tag("li", this.author, ""));
      } else {
        let randomNum = random(filteredObj.length)

        this.liArr.push(new Tag("li", filteredObj[randomNum].desc.author, ""))

        filteredObj = filteredObj.slice().filter(item => filteredObj[randomNum].desc.author != item.desc.author);

      }

    }

    shuffle(this.liArr);
    for (let elem of this.liArr) {
      elem.classList.add("possibleAnswerElem");
      ul.append(elem);
    }
    block.append(mainLi);
  }
}



export function fillArtistsCat(block, arrImgs) {
  let k = 0;


  for (let j = 0; j < 12; j++) {
    let ul = new Tag("ul", "", "", "cat1", "cat", `subCat${j}`, "displayNone");
    fillAllCat(arrImgs, k, ul)
    k += 10
    block.append(ul);
  }

}


function saveDetailedResult(arr, block) {

  let ul = new Tag("div", "", "", "detailedResult", "displayNone")
  for (let item of arr) {
    let itemResult = new Tag("li", "", "", "itemResult")
    let imgInRes = new Tag("img", "", item.pic, "imgInRes")
    let itemTitle = new Tag("h3", `"${item.desc.name}"`, "", "itemTitle")
    let itemAuthor = new Tag("p", item.author, "", "itemAuthor")
    let itemYear = new Tag("span", item.desc.year, "", "itemYear")



    itemResult.append(itemTitle, imgInRes, itemAuthor, itemYear)
    ul.append(itemResult)

    if (item.result == "false") {
      itemResult.style.opacity = "0.5"
    }
  }
  let itemCloseButtom = new Tag("button", "", "", "itemCloseButtom")
  let itemCloseButtomImg = new Tag("img", "", "./images/crossWhite.png", "itemCloseButtomImg")
  itemCloseButtom.append(itemCloseButtomImg)
  ul.append(itemCloseButtom)
  myStorage.setItem(`.${block.classList[0]}.${block.classList[1]}.${block.classList[2]}`, ul.innerHTML);
}

function fillAllCat(arrImgs, k, block) {
  rA = 0;
  aA = 0;
  let objCat = [];
  for (let i = 0; i < 10; i++) {

    let obj = new QuestionArtist(arrImgs, block, k);
    k++;
    for (let elem of obj.liArr) {
      elem.addEventListener("click", function () {
        console.log(rA, aA)
        if (elem.textContent == obj.author) {

          printCard(elem.parentNode, obj, "true", getNext, aA).then((res) => {
            rA++;
            aA++;
            obj.result = "true";
            objCat.push(obj)
            res.querySelector(".but-total").addEventListener("click", function () {
              getNext()
              printTotalCard(rA, block)
              saveDetailedResult(objCat, block)
            })


          })
        } else {
          printCard(elem.parentNode, obj, "false", getNext, aA).then((res) => {
            aA++;
            obj.result = "false";
            objCat.push(obj)
            res.querySelector(".but-total").addEventListener("click", function () {
              getNext()
              printTotalCard(rA, block)
              saveDetailedResult(objCat, block)
            })



          })
        }
        document.addEventListener("click", function (event) {

          if (event.target.closest(".but-repeate")) {
            refillCat(block)
            fillAllCat(arrImgs, k - 10, block)
            block.childNodes[0].classList.remove("displayNone")
          } else if (event.target.closest(".back-home-button") || event.target.closest(".back-cat")) {
            refillCat(block)
            fillAllCat(arrImgs, k - 10, block)
          }
        })
      })
    }
  }

}

function refillCat(elem) {

  elem.innerHTML = "";

}

export function nullCounts() {
  for (let item of arguments) {
    item = 0;

  }

}



function printTotalCard(rightAnsw, block) {
  let div = new Tag("div", "", "", "totalCard");
  let h3 = new Tag("h3", "Round completed!", "");
  let buttonHome = new Tag("button", "", "", "back-home-button")
  let imgHome = new Tag("img", "", "./images/home-house-building-estate-property-real-furniture-svgrepo-com.svg")
  imgHome.alt = "home"
  buttonHome.append(imgHome)
  let imgCat = new Tag("img", "", "./images/menu-navigation-direction-arrow-location-map-svgrepo-com.svg")
  imgCat.alt = "category"
  let buttonCat = new Tag("button", "", "", "back-cat")
  buttonCat.append(imgCat)
  let buttonRepeate = new Tag("button", "", "", "but-repeate")
  let imgRepeate = new Tag("img", "", "./images/arrow_repeat.svg")
  buttonRepeate.append(imgRepeate)
  let p;
  if (rightAnsw <= 3) {
    p = new Tag("p", "Please try again. You can do better!", "")
  } else if (rightAnsw > 3 && rightAnsw <= 7) {
    p = new Tag("p", "Nice try. Can we repeat it?", "")
  } else if (rightAnsw > 7 && rightAnsw < 10) {
    p = new Tag("p", "Almost done! One more time?", "")
  } else if (rightAnsw == 10) {
    p = new Tag("p", "Well done! You are now an art professor!", "")
  }
  let span = new Tag("span", `${rightAnsw} correct answers out of 10`, "")
  div.append(h3, p, span, buttonHome, buttonRepeate, buttonCat)
  block.append(div)



  function makePropStorage(block) {
    let node = document.querySelector(`li.${block.classList[0]}.${block.classList[1]}.${block.classList[2]}`)
    myStorage.setItem(`li.${block.classList[0]}.${block.classList[1]}.${block.classList[2]}`, rightAnsw);
    for (let item of node.childNodes) {
      if (item.classList.contains("numTotal")) {
        item.remove()
      }
    }

    let numTotal = new Tag("span", `${rightAnsw} / 10`, "", "numTotal")
    node.append(numTotal)

    numTotal.addEventListener("click", function (event) {
      let temp = myStorage.getItem(`.${node.classList[0]}.${node.classList[1]}.${node.classList[2]}`);
      let ul = new Tag("ul", "", "", "detailedResult")
      ul.innerHTML = temp;
      for (let item of mainBlock.childNodes) {
        if (item.tagName) {
          item.classList.add("displayNone")
        }
      }
      mainBlock.append(ul)
      let itemCloseButtomImg = document.querySelector(".itemCloseButtomImg");
      itemCloseButtomImg.addEventListener("click", function () {
        //ul.remove()
        document.querySelector(".detailedResult").remove()
        document.querySelector(".activeCat").classList.remove("displayNone")

      })
    })
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest(".back-home-button") || event.target.closest(".back-cat") || event.target.closest(".back-repeate")) {
      makePropStorage(block)
      div.remove()
      document.querySelector(".detailedResult").remove()
      document.querySelector(".activeCat").classList.remove("displayNone")
    }
  })
  return div
}











async function printCard(elem, obj, result, func, aA) {
  for (let item of elem.parentNode.childNodes) {
    item.classList.add("displayNone")
  }
  return new Card(obj, elem.parentNode, result, func, aA)
}









function getNext() {
  let tempDiv = document.querySelector(".tempDiv")

  tempDiv.parentNode.classList.add("displayNone")
  tempDiv.parentNode.classList.add("complete")
  if (tempDiv.parentNode.nextSibling) {
    tempDiv.parentNode.nextSibling.classList.remove("displayNone")
  }
  tempDiv.remove()

}





















function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}









function random(max) {
  let arr = [];
  let i = 0;
  while (i < max) {
    arr.push(i);
    i++;
  }
  shuffle(arr);
  return arr[0];
}













class Card {
  constructor(obj, block, result, func, aA) {
    this.pic = obj.pic;
    this.author = obj.desc.author;
    this.name = obj.desc.name;
    this.year = obj.desc.year;

    this.func = func;
    this.imageNum = obj.desc.imageNum;


    let div = new Tag("div", "", "", "tempDiv")
    let a = document.createElement("a");
    let img = new Tag("img", "", this.pic)
    a.append(img)
    a.target = "_blank"
    img.addEventListener("click", function () {
      a.href = `https://raw.githubusercontent.com/irinainina/image-data/dadea6e2555841b3f136d8ab07ce6474391f1a3f/full/${obj.desc.imageNum}full.jpg`
    })

    let divCont = new Tag("div", "", "", "tempDivCont")
    let h2 = new Tag("h2", `"${this.name}"`, "")
    let h3 = new Tag("h3", this.author, "")
    let span = new Tag("span", this.year, "")
    let imgResult = new Tag("img", "", "", "imgResult")

    if (result == "true") {
      setTimeout(() => {
        imgResult.style.backgroundColor = "GREEN";
        imgResult.style.transform = "scale(2)"
      }, 100);
      imgResult.src = "./images/correct-right-arrow-direction-left-down-up-svgrepo-com.svg"
    } else {
      setTimeout(() => {
        imgResult.style.backgroundColor = "RED";
        imgResult.style.transform = "scale(2)"
      }, 100);
      imgResult.src = "./images/wrong-delete-remove-trash-minus-cancel-close-svgrepo-com.svg"
    }
    if (aA != 9) {
      let nextQButton = new Tag("button", "", "", "nextQButton")
      nextQButton.addEventListener("click", this.func)
      let nextQImage = new Tag("img", "", "./images/next-arrow-direction-down-left-up-right-svgrepo-com.svg")
      nextQButton.append(nextQImage)
      divCont.append(nextQButton)
      slowSlide(nextQButton)
    } else {
      let buttonTotal = new Tag("button", "", "", "but-total")
      let imgTotal = new Tag("img", "", "./images/clipboard-check-line-svgrepo-com.svg")
      buttonTotal.append(imgTotal)
      divCont.append(buttonTotal)
      slowSlide(buttonTotal)
    }
    divCont.append(h2, h3, span, imgResult)
    div.append(a, divCont)
    block.append(div)

    return div
  }

}




function slowSlide(item) {
  setTimeout(() => {
    item.style.transform = "translateX(20px)"
    setTimeout(() => {
      item.style.transform = "scale(2)"
    }, 200);
  }, 400);
}