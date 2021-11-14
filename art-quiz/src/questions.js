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

function getAllAuthors(arrDesc) {
  let authors = [];
  for (let i = 0; i < arrDesc.length; i++) {
    authors.push(arrDesc[i].author);
  }
  return authors;
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
  constructor(obj, block, arr) {
    this._pic = obj.pic;
    this.desc = obj.desc;
    this.block = block;
    this.arr = arr;
    this.author = obj.desc.author;

    let mainLi = new Tag("li", "", "", "questionCard")
    if (this.block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")
    }
    let h2 = new Tag("h2", `Which of these paintings did ${this.author} paint?`, "")
    mainLi.append(h2);

    this._liArr = [];

    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        this._liArr.push(new Tag("img", "", this._pic))
      } else {
        this._liArr.push(new Tag("img", "", this.arr[random(240)]));
      }
    }

    shuffle(this._liArr);

    for (let elem of this._liArr) {
      mainLi.append(elem);
    }
    this.block.append(mainLi);
  }


  get pic() {
    return this._pic
  }
  get liArr() {
    return this._liArr
  }
}





export function fillPaintingsCat(arrPic, block, arrImgs) {
  let k = 120;
  for (let j = 1; j <= 12; j++) {
    let ul = new Tag("ul", "", "", `catContent${j}`, "cat", "cat2", "displayNone")

    for (let i = 0; i < 10; i++) {
      let obj = new QuestionPaintings(arrImgs[k], ul, arrPic)
      for (let elem of obj.liArr) {
        elem.addEventListener("click", function () {

          if (elem.src == obj.pic) {
            printCard(elem, obj, "true", getNext)
          } else {

            printCard(elem, obj, "false", getNext)
          }
        })
      }
      k++;
    }

    block.append(ul);
  }
}














class QuestionArtist {
  constructor(obj, block, arr) {
    this.pic = obj.pic;
    this.desc = obj.desc;
    this.block = block;
    this.arr = arr;
    this._rightAnswer = this.desc.author;

    let mainLi = new Tag("li", "", "", "questionCard")
    if (this.block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")

    }
    let h2 = new Tag("h2", "Who is the author of the painting?", "")
    let img = new Tag("img", "", this.pic)
    let ul = new Tag("ul", "", "", "possibleAnswers")


    mainLi.append(h2, img, ul);

    this._liArr = [];



    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        this._liArr.push(new Tag("li", this.desc.author, ""));
      } else {
        this._liArr.push(new Tag("li", this.arr[random(240)], ""));
      }
    }

    shuffle(this._liArr);

    for (let elem of this._liArr) {
      elem.classList.add("possibleAnswerElem");
      ul.append(elem);
    }
    this.block.append(mainLi);

  }

  get rightAnswer() {
    return this._rightAnswer
  }
  get liArr() {
    return this._liArr
  }

}



export function fillArtistsCat(arrDesc, block, arrImgs) {
  let k = 0;
  let arrAuthors = getAllAuthors(arrDesc);
  for (let j = 1; j <= 12; j++) {
    let ul = new Tag("ul", "", "", `catContent${j}`, "cat1", "cat", "displayNone")


    for (let i = 0; i < 10; i++) {
      let obj = new QuestionArtist(arrImgs[k], ul, arrAuthors);

      for (let elem of obj.liArr) {
        elem.addEventListener("click", function () {

          if (elem.textContent == obj.rightAnswer) {

            printCard(elem.parentNode, obj, "true", getNext)

          } else {
            printCard(elem.parentNode, obj, "false", getNext)
          }
        })
      }
      k++;
    }

    block.append(ul);
  }
}

function printCard(elem, obj, result, func) {
  for (let item of elem.parentNode.childNodes) {
    item.classList.add("displayNone")
  }
  new Card(obj, elem.parentNode, result, func)
}

function getNext() {
  let tempDiv = document.querySelector(".tempDiv")
  tempDiv.classList.remove("tempDiv")
  tempDiv.parentNode.classList.add("displayNone")
  tempDiv.parentNode.classList.add("complete")
  if (tempDiv.parentNode.nextSibling) {
    tempDiv.parentNode.nextSibling.classList.remove("displayNone")
  }

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
  constructor(obj, block, result, func) {


    this.pic = obj.pic;
    this.author = obj.desc.author;
    this.name = obj.desc.name;
    this.year = obj.desc.year;
    //this.result = result
    this.func = func;
    this.imageNum = obj.desc.imageNum;
    //alert(this.imageNum)

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

    let nextQButton = new Tag("button", "", "", "nextQButton")
    nextQButton.addEventListener("click", this.func)

    setTimeout(() => {
      nextQButton.style.transform = "translateX(20px)"
      setTimeout(() => {
        nextQButton.style.transform = "scale(2)"
      }, 200);
    }, 400);

    divCont.append(h2, h3, span, nextQButton, imgResult)
    div.append(a, divCont)
    block.append(div)
  }

}