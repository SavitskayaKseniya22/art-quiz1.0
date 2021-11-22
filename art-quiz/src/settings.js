import {

    myStorage
} from "./questions.js";

export let soundEffects = {
    correctAnswer: './sounds/correctA.mp3',
    wrongAnswer: './sounds/wrongA.mp3',
    endOfRound: './sounds/endOfRound.mp3'
}
export class Settings {

    constructor() {
        this.name = "settings"
        this._soundEffects;
        this._volumeSoundEffects;
        this._music;

        this._timer;

        this._timerValue;
        this._timerStep;

        this._language = "en";


        //кнопка отключить\включить звук
        let music = document.querySelector("input[id='toggle-button-music']")
        let audioMusic = document.querySelector("audio.music");
        let volumeMusic = document.querySelector(".volumeMusic")

        let tempVol;

        if (myStorage.getItem("volumeMusic")) {
            audioMusic.volume = JSON.parse(myStorage.getItem("volumeMusic"))
            volumeMusic.value = audioMusic.volume;

        } else {
            audioMusic.volume = "0.5";
            volumeMusic.value = audioMusic.volume;


        }
        //кнопка сделать активным инпут рендж

        volumeMusic.addEventListener("input", function () {
            audioMusic.volume = volumeMusic.value;
            myStorage.setItem("volumeMusic", JSON.stringify(audioMusic.volume))
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

            this.music = JSON.parse(myStorage.getItem("music"));
            music.checked = this.music
            if (this.music == false) {
                audioMusic.pause()
                volumeMusic.setAttribute("disabled", "true");
                musicSet.style.opacity = "0.5"
            } else {
                let event = new Event("click");
                musicSet.dispatchEvent(event)
                audioMusic.play()
                volumeMusic.removeAttribute("disabled");
                musicSet.style.opacity = "1"
            }
        } else {
            this.music = false;
            myStorage.setItem("music", JSON.stringify(this.music))
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
        let soundSet = document.querySelector(".soundSet")
        let volumeSoundEffects = document.querySelector(".volumeSoundEffects")


        if (myStorage.getItem("soundEffects")) {

            this.soundEffects = JSON.parse(myStorage.getItem("soundEffects"));
            soundEffects.checked = this.soundEffects
            if (this.soundEffects == false) {
                volumeSoundEffects.setAttribute("disabled", "true");
                soundSet.style.opacity = "0.5"
            } else {
                volumeSoundEffects.removeAttribute("disabled");
                soundSet.style.opacity = "1"
            }
        } else {
            this.soundEffects = false;
            myStorage.setItem("soundEffects", JSON.stringify(this.soundEffects))
            soundEffects.checked = this.soundEffects;
            volumeSoundEffects.setAttribute("disabled", "true");
            soundSet.style.opacity = "0.5"


        }

        soundEffects.onchange = function () {
            this.soundEffects = soundEffects.checked;
            myStorage.setItem("soundEffects", JSON.stringify(this.soundEffects))
            if (this.soundEffects == false) {
                volumeSoundEffects.setAttribute("disabled", "true");
                soundSet.style.opacity = "0.5"
            } else {

                volumeSoundEffects.removeAttribute("disabled");
                soundSet.style.opacity = "1"
            }
        }

        if (myStorage.getItem("volumeSoundEffects")) {
            this.volumeSoundEffects = JSON.parse(myStorage.getItem("volumeSoundEffects"))
            this.volumeSoundEffects = volumeSoundEffects.value;

        } else {
            this.volumeSoundEffects = "0.5";
            volumeSoundEffects.value = this.volumeSoundEffects


        }

        volumeSoundEffects.addEventListener("input", function () {
            this.volumeSoundEffects = volumeSoundEffects.value;
            myStorage.setItem("volumeSoundEffects", JSON.stringify(this.volumeSoundEffects))
        })














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
            myStorage.setItem("timer", JSON.stringify(this.timer))
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
        } else {
            this.timerValue = timeToAnswer.value
            myStorage.setItem("timeToAnswer", JSON.stringify(this.timerValue))
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


    set volumeSoundEffects(value) {
        this._volumeSoundEffects = value;
    }
    get volumeSoundEffects() {
        return this._volumeSoundEffects
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