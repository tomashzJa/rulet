
/* zmienne do obslugi ptogramiku */
let calkowitePiniadze = 100, stawkaPojedyncza = 1, stawkaAktualna = 1;
let aktualnyBet = [0, 0, 0, 0, 0, 0];
let ostatniBet = [0, 0, 0, 0, 0, 0];
let wyboryLastBet = new Array;
    wyboryLastBet.push(document.getElementById("lastczew"));
    wyboryLastBet.push(document.getElementById("lastczarn"));
    wyboryLastBet.push(document.getElementById("lastparzy"));
    wyboryLastBet.push(document.getElementById("lastniepa"));
    wyboryLastBet.push(document.getElementById("lastwyso"));
    wyboryLastBet.push(document.getElementById("lastnisk"));
let wyboryStawka = new Array;
    wyboryStawka.push(document.querySelector(".czerwone div"));
    wyboryStawka.push(document.querySelector(".czarne div"));
    wyboryStawka.push(document.querySelector(".parzyste div"));
    wyboryStawka.push(document.querySelector(".nieparzyste div"));
    wyboryStawka.push(document.querySelector(".wysokie div"));
    wyboryStawka.push(document.querySelector(".niskie div"));

let wob='wygrana ostatni bet';
    let wyboryPojemnik = new Array;
    wyboryPojemnik.push(document.querySelector(".czerwone"));
    wyboryPojemnik.push(document.querySelector(".czarne"));
    wyboryPojemnik.push(document.querySelector(".parzyste"));
    wyboryPojemnik.push(document.querySelector(".nieparzyste"));
    wyboryPojemnik.push(document.querySelector(".wysokie"));
    wyboryPojemnik.push(document.querySelector(".niskie"));


/* obsluga miejsca do obstawiani */

function mnozniki(params) {

    stawkaAktualna = stawkaPojedyncza * params;


}
function wybor(params) {



    let a = params % 4;
    let b = Math.floor((params - 1) / 4);

    switch (a) {
        case 1: aktualnyBet[b] += stawkaAktualna; wyboryStawka[b].innerHTML = aktualnyBet[b];
            break;
        case 2: aktualnyBet[b] >= stawkaAktualna ? aktualnyBet[b] -= stawkaAktualna : aktualnyBet[b] = 0; wyboryStawka[b].innerHTML = aktualnyBet[b];
            break;
        case 3: aktualnyBet[b] *= 2; wyboryStawka[b].innerHTML = aktualnyBet[b];
            break;
        case 0: aktualnyBet[b] = 0; wyboryStawka[b].innerHTML = aktualnyBet[b];
            break;
    }







}



/* obsługa suwaków */
function suwakZmiana(ktory) {

    let valueOf = parseInt(document.getElementById(ktory).value);
    if (ktory === "zaile") {
        let numOfBetx = [1, 2, 3, 5];
        for (let i = 0; i < 4; i++) {
            let idOfBetx = "x" + numOfBetx[i];
            document.getElementById(idOfBetx).innerHTML = valueOf * numOfBetx[i];
            document.getElementById(idOfBetx).value = numOfBetx[i];

        }
        stawkaPojedyncza = valueOf;
        stawkaAktualna = valueOf;
        document.getElementById("minimalnybet").innerHTML = stawkaPojedyncza;
    }
    else if (ktory === "ile") {
        calkowitePiniadze = valueOf;
        document.getElementById("tylemasz").innerHTML = calkowitePiniadze;



    }
}

/*losuje i wyświela numer w odpowiednim kolorze, liczy */
function wylosujNr() {
    let numer = Math.floor(Math.random() * 37);
    let nowySpan = document.createElement("span");
    let check = new isRedBlackSmallBigEvenOdd(numer);

    const klasyDoWyboru = ["red", "black", "green"];
    const aktualnaKlasa = check.isZero ? klasyDoWyboru[2] : check.isRed ? klasyDoWyboru[0] : klasyDoWyboru[1];
    nowySpan.classList.add(aktualnaKlasa);
    let wynik = document.getElementById("wynik");
    nowySpan.innerHTML = numer;

    if (wynik.getElementsByTagName("span").length > 17) wynik.removeChild(wynik.childNodes[17]);

    wynik.prepend(nowySpan);
    
    let trueOr =new Array;
    trueOr.push(check.isRed);
    trueOr.push(check.isBlack);
    trueOr.push(check.isEven);
    trueOr.push(check.isOdd);
    trueOr.push(check.isBig);
    trueOr.push(check.isSmall);

    for (licznik=0;licznik<6;licznik++) {
        if(trueOr[licznik]) {calkowitePiniadze += aktualnyBet[licznik];wyboryPojemnik[licznik].title = wob;}
        else {calkowitePiniadze -= aktualnyBet[licznik];wyboryPojemnik[licznik].title = '';}
    }
    
    

    document.getElementById("tylemasz").innerHTML = calkowitePiniadze;

}



/* sprawdza czy numer jest czerwony czarny.. .*/
class isRedBlackSmallBigEvenOdd {
    constructor(cyfra) {

        this.isZero = cyfra == 0 ? true : false;
        if (this.isZero){
            this.isRed = false;
            this.isBlack = false;
            this.isSmall = false;
            this.isBig = false;
            this.isEven = false;
            this.isOdd = false;
        }
        else{
            this.isRed = this.isCzerwony(cyfra);
            this.isBlack = !this.isCzerwony(cyfra);
            this.isSmall = cyfra < 19 ? true : false;
            this.isBig = cyfra > 18 ? true : false;
            this.isEven = cyfra % 2 == 0 ? true : false;
            this.isOdd = cyfra % 2 == 0 ? false : true;
        }
        

    }
    isCzerwony(jakasLiczba) {

        {
            switch (jakasLiczba) {

                case 1: case 3: case 5: case 7: case 9: case 12: case 14: case 16:
                case 18: case 19: case 21: case 23: case 25: case 27: case 30:
                case 32: case 34: case 36: return true;
                default: return false;


            }

        }
    }
}
function spacja(klawisz) {
    let k = klawisz.keyCode;
    console.log(k);
    if (k == 71) wylosujNr();
    else if (k == 80) play();

}
let itr = 0, zed;
function druk() {
    console.log(itr++);
}
function timesrak() {
    zed = setTimeout(druk, 1000);
}

function play() {
    let startowe = parseInt(prompt("ile na poczatek"));
    let iledougr = parseInt(prompt('ile chcesz ugrac'));

    if (!isNaN(startowe) && !isNaN(iledougr)) {
        calkowitePiniadze = startowe;
        let wynik = startowe + iledougr;
        aktualnyBet[0] = 1;
        let czas;

        czas = setInterval(() => {


            wylosujNr();

            startowe > calkowitePiniadze ? aktualnyBet[0] *= 2 : aktualnyBet[0] = 1;
            document.querySelector(".czerwone div").innerHTML = aktualnyBet[0];
            startowe = calkowitePiniadze;
            if (calkowitePiniadze >= wynik) { console.log("Sukcess!"); clearInterval(czas); }
            else if (startowe <= 0) { console.log("Fail:("); clearInterval(czas); }

        }, 500);

    }






}