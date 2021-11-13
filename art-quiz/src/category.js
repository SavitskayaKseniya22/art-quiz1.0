let quizType = document.querySelector(".quiz-type");
export let mainBlock = document.querySelector("main");
let backHomeButton = document.querySelector(".back-home-button");


document.addEventListener("click", function (event) {
  //alert(event.target.closest(".back-home-button"))
  if (event.target.closest("h2")) {
    quizType.classList.add("displayNone");
    mainBlock.classList.add("main-not-centered");
    let list = document.querySelector(`.${event.target.textContent}`);
    list.classList.remove("displayNone");
    backHomeButton.classList.remove("displayNone");
  } else if (event.target.closest(".back-home-button")) {
    quizType.classList.remove("displayNone");
    mainBlock.classList.remove("main-not-centered");
    let list = document.querySelectorAll(".cat-title");
    for (const elem of list) {
      elem.classList.add("displayNone");
    }
    backHomeButton.classList.add("displayNone");

  }
})
/*
for (const elem of choosenCats) {
  elem.addEventListener("click", function (event) {
    quizType.classList.add("displayNone");
    mainBlock.classList.add("main-not-centered");
    let list = document.querySelector(`.${event.target.textContent}`);
    list.classList.remove("displayNone");
    backHomeButton.classList.remove("displayNone");
  });
}
backHomeButton.addEventListener("click", function () {
  quizType.classList.remove("displayNone");
  mainBlock.classList.remove("main-not-centered");
  let list = document.querySelectorAll(".cat-title");
  for (const elem of list) {
    elem.classList.add("displayNone");
  }
  backHomeButton.classList.add("displayNone");
});*/

export function makeCat(arr, catName) {
  let ul = document.createElement("ul");
  ul.classList.add("cat-title");
  ul.classList.add(catName);
  ul.classList.add("displayNone");
  for (let i = 1; i <= 12; i++) {
    let li = document.createElement("li");
    li.classList.add("cat");
    li.classList.add(`cat${i}`);

    let h3 = document.createElement("h3");
    h3.textContent = `Round ${i}`;
    li.appendChild(h3);

    let img = document.createElement("img");

    if (catName == "Artists") {
      img.src = arr[i];
    } else {
      img.src = arr[i + 12];
    }

    li.appendChild(img);
    li.addEventListener("click", function () {
      let elem
      if (catName == "Artists") {
        elem = document.querySelector(`.catContent${i}.cat1`)

      } else {
        elem = document.querySelector(`.catContent${i}.cat2`)
      }
      elem.classList.remove("displayNone")
    })

    ul.appendChild(li);
  }

  mainBlock.appendChild(ul);
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