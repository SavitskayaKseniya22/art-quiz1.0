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

function getAllImages(arrPic, arrDesc) {
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












class QuestionPaintings {
  constructor(obj, block, arr) {
    this.pic = obj.pic;
    this.block = block;
    this.arr = arr;

    let mainLi = document.createElement("li");

    let liArr = [];
    let img = document.createElement("img");
    img.src = this.pic;

    liArr.push(img);

    for (let i = 0; i < 3; i++) {
      let img = document.createElement("img");
      img.src = this.arr[random(240)];
      liArr.push(img);
    }
    shuffle(liArr);

    for (let i = 0; i < liArr.length; i++) {
      mainLi.appendChild(liArr[i]);
    }
    this.block.appendChild(mainLi);
  }
}

function makePaintingsQuestion(arrPic, arrDesc, block, i) {
  let arrImgs = getAllImages(arrPic, arrDesc);
  return new QuestionPaintings(arrImgs[i], block, arrPic);
}


export function fillPaintingsCat(arrPic, arrDesc, block) {
  let k = 120;
  for (let j = 1; j <= 12; j++) {
    let ul = document.createElement("ul");
    ul.classList.add(`catContent${j}`);
    ul.classList.add("cat");
    ul.classList.add("cat2");
    ul.classList.add("displayNone");
    for (let i = 0; i < 10; i++) {
      makePaintingsQuestion(arrPic, arrDesc, ul, k);
      k++;
    }

    block.appendChild(ul);
  }
}














class QuestionArtist {
  constructor(obj, block, arr) {
    this.pic = obj.pic;
    this.desc = obj.desc;
    this.block = block;
    this.arr = arr;
    this._rightAnswer = this.desc.author;

    let mainLi = document.createElement("li");
    let img = document.createElement("img");
    img.src = this.pic;
    mainLi.appendChild(img);
    let ul = document.createElement("ul");
    ul.classList.add("possibleAnswer");
    mainLi.appendChild(ul);
    this._liArr = [];
    let li = document.createElement("li");
    li.textContent = this.desc.author;
    this._liArr.push(li);

    for (let i = 0; i < 3; i++) {
      let li = document.createElement("li");
      li.textContent = this.arr[random(240)];
      this._liArr.push(li);
    }
    shuffle(this._liArr);
    for (let elem of this._liArr) {
      elem.classList.add("possibleAnswerElem");
      ul.appendChild(elem);
    }
    if (this.block.childNodes.length != 0) {
      mainLi.classList.add("displayNone")
    }


    this.block.appendChild(mainLi);

  }
  get rightAnswer() {
    return this._rightAnswer
  }
  get liArr() {
    return this._liArr
  }

}

function makeArtistsQuestion(arrPic, arrDesc, block, i) {
  let arrImgs = getAllImages(arrPic, arrDesc);
  let arrAuthors = getAllAuthors(arrDesc);
  return new QuestionArtist(arrImgs[i], block, arrAuthors);
}

export function fillArtistsCat(arrPic, arrDesc, block) {
  let k = 0;
  for (let j = 1; j <= 12; j++) {
    let ul = document.createElement("ul");
    ul.classList.add(`catContent${j}`);
    ul.classList.add("cat1");
    ul.classList.add("cat");
    ul.classList.add("displayNone");

    for (let i = 0; i < 10; i++) {
      let obj = makeArtistsQuestion(arrPic, arrDesc, ul, k);
      for (let elem of obj.liArr) {
        elem.addEventListener("click", function () {
          if (elem.textContent == obj.rightAnswer) {
            alert(1)
          } else {
            alert(0)
          }
        })
      }
      k++;
    }

    block.appendChild(ul);
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