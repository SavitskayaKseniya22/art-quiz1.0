import {

    myStorage
} from "./questions.js";
export class Settings {

    constructor() {
        this.name = "settings"
        this._soundEffects;
        this._music;

        this._timer;

        this._timerValue;
        this._timerStep;

        this._language = "en";


        //кнопка отключить\включить звук
        let music = document.querySelector("input[id='toggle-button-music']")
        let audioMusic = document.querySelector("audio.music");
        let volumeMusic = document.querySelector(".volumeMusic")
        audioMusic.volume = 0.2;
        volumeMusic.value = audioMusic.volume;
        let tempVol;

        //кнопка сделать активным инпут рендж

        volumeMusic.addEventListener("input", function () {
            audioMusic.volume = volumeMusic.value
            tempVol = audioMusic.volume;
            if (audioMusic.volume == 0) {
                audioMusic.muted = true;
                musicMuteBut.style.backgroundImage = 'url("./images/volumeOfActive.svg")';
                musicLoudBut.style.backgroundImage = "url('./images/volumeOn.svg')";

            } else if (audioMusic.volume == 1) {

                musicLoudBut.style.backgroundImage = 'url("./images/volumeOnActive.svg")';
                musicMuteBut.style.backgroundImage = "url('./images/volumeOf.svg')";

            } else {
                audioMusic.muted = false;
                musicMuteBut.style.backgroundImage = "url('./images/volumeOf.svg')";
                musicLoudBut.style.backgroundImage = "url('./images/volumeOn.svg')";
            }
        })
        //кнопка сделать громкость минимальной
        let musicMuteBut = document.querySelector(".musicSet .but-volume-off ")
        musicMuteBut.addEventListener("click", function () {
            if (audioMusic.muted && audioMusic.volume > 0) {
                musicMuteBut.style.backgroundImage = 'url("./images/volumeOf.svg")'
                audioMusic.muted = false;
                volumeMusic.value = audioMusic.volume;
            } else {

                musicMuteBut.style.backgroundImage = 'url("./images/volumeOfActive.svg")';
                musicLoudBut.style.backgroundImage = 'url("./images/volumeOn.svg")';
                audioMusic.muted = true;
                volumeMusic.value = 0;
            }
        })


        //кнопка сделать громкость максимальной
        let musicLoudBut = document.querySelector(".musicSet .but-volume-on")
        musicLoudBut.addEventListener("click", function () {
            volumeMusic.classList.toggle("loud")
            if (volumeMusic.classList.contains("loud")) {
                musicLoudBut.style.backgroundImage = 'url("./images/volumeOnActive.svg")';
                if (audioMusic.muted) {
                    audioMusic.muted = false;
                    musicMuteBut.style.backgroundImage = 'url("./images/volumeOf.svg")';
                }
                tempVol = audioMusic.volume;
                audioMusic.volume = 1;
                volumeMusic.value = audioMusic.volume;
            } else {
                audioMusic.volume = tempVol;
                musicLoudBut.style.backgroundImage = 'url("./images/volumeOn.svg")';

            }
            volumeMusic.value = audioMusic.volume;
        })





        //отключить музыку\включить музыку
        let musicSet = document.querySelector(".musicSet")

        if (myStorage.getItem("music")) {
            /*
                        let res;
                        if (myStorage.getItem("music") == "true") {
                            res = true;
                        } else {
                            res = false
                        }
                        this.music = res;
                        */
            this.music = JSON.parse(myStorage.getItem("music"));
            music.checked = this.music
            if (this.music == false) {
                audioMusic.pause()
                volumeMusic.setAttribute("disabled", "true");
                musicSet.style.opacity = "0.5"
            } else {
                audioMusic.play()
                volumeMusic.removeAttribute("disabled");
                musicSet.style.opacity = "1"
            }
        } else {
            this.music = false;
            music.checked = this.music;
            audioMusic.pause()
            volumeMusic.setAttribute("disabled", "true");
            musicSet.style.opacity = "0.5"
        }

        music.onchange = function () {
            this.music = music.checked;
            myStorage.setItem("music", JSON.stringify(this.music))
            if (this.music == false) {
                audioMusic.pause()
                volumeMusic.setAttribute("disabled", "true");
                musicSet.style.opacity = "0.5"
            } else {
                audioMusic.play()
                volumeMusic.removeAttribute("disabled");
                musicSet.style.opacity = "1"
            }
        }














        let soundEffects = document.querySelector("input[id='toggle-button-soundEffects']")
        soundEffects.onchange = function () {
            this.soundEffects = soundEffects.checked;
            alert(this.soundEffects)

        }














        let timerSet = document.querySelector(".timerSet")
        let timer = document.querySelector("input[id='toggle-button-timer']")
        let timeToAnswer = document.querySelector(".timeToAnswer")



        if (myStorage.getItem("timer")) {

            this.timer = JSON.parse(myStorage.getItem("timer"));
            timer.checked = this.timer
            if (this.timer == false) {
                timeToAnswer.setAttribute("disabled", "true");
                timerSet.style.opacity = "0.5"
            } else {
                timeToAnswer.removeAttribute("disabled");
                timerSet.style.opacity = "1"
            }
        } else {
            this.timer = false;
            timer.checked = this.timer;
            timeToAnswer.setAttribute("disabled", "true");
            timerSet.style.opacity = "0.5"
        }


        timer.onchange = function () {
            this.timer = timer.checked;
            myStorage.setItem("timer", JSON.stringify(this.timer))
            if (this.timer == false) {

                timeToAnswer.setAttribute("disabled", "true");
                timerSet.style.opacity = "0.5"
            } else {

                timeToAnswer.removeAttribute("disabled");
                timerSet.style.opacity = "1"
            }
        }

        let timerSetDown = document.querySelector(".timerSet .but-time-down")
        let timerSetUp = document.querySelector(".timerSet .but-time-up")

        if (myStorage.getItem("timeToAnswer")) {
            this.timerValue = JSON.parse(myStorage.getItem("timeToAnswer"))
            timeToAnswer.value = this.timerValue
        }


        timerSetDown.onclick = function () {
            if (!timeToAnswer.hasAttribute("disabled")) {
                this.timerStep = 5
                this.timerValue = Number(timeToAnswer.value)
                if (this.timerValue >= 10 && this.timerValue <= 35)
                    this.timerValue -= this.timerStep;
                timeToAnswer.value = this.timerValue
                myStorage.setItem("timeToAnswer", JSON.stringify(this.timerValue))
            }
        }
        timerSetUp.onclick = function () {
            if (!timeToAnswer.hasAttribute("disabled")) {
                this.timerStep = 5
                this.timerValue = Number(timeToAnswer.value)
                if (this.timerValue >= 0 && this.timerValue <= 25)
                    this.timerValue += this.timerStep;
                timeToAnswer.value = this.timerValue
                myStorage.setItem("timeToAnswer", JSON.stringify(this.timerValue))
            }

        }




















        let languages = document.querySelectorAll("input[name='radioButtonLang']")

        if (myStorage.getItem("language")) {
            this.language = JSON.parse(myStorage.getItem("language"))
            for (let item of languages) {

                item.removeAttribute("checked")
                if (item.value == this.language) {
                    item.setAttribute("checked", "checked")
                }
            }
        }

        for (let item of languages) {
            item.onchange = function () {

                this.language = item.value;
                myStorage.setItem("language", JSON.stringify(this.language))

            }
        }





    }
    set music(value) {
        this._music = value;
    }
    get music() {
        return this._music
    }




    set soundEffects(value) {
        this._soundEffects = value;
    }
    get soundEffects() {
        return this._soundEffects
    }

    set timer(value) {
        this._timer = value;
    }
    get timer() {
        return this._timer
    }

    set language(value) {
        this._language = value;
    }
    get language() {
        return this._language
    }

    set timerValue(value) {
        this._timerValue = value;
    }
    get timerValue() {
        return this._timerValue
    }

    set timerStep(value) {
        this._timerStep = value;
    }
    get timerStep() {
        return this._timerStep
    }


    saveInStorage() {
        myStorage.setItem(this.name, JSON.stringify(this))
        return 1
    }
    readFromStorage() {
        return JSON.parse(myStorage.getItem(this.name))
    }

}