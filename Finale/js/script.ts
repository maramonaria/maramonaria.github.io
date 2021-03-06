// Erstmal das Interface für die Spielkarten:
interface Card {
    cardColor: string;      // Farbe der Karte
    cardValency: number;    // Wertigkeit der Karte
}

// Deklarierung von Variablen und Arrays 
let cardStack : Card[] = []; // ungemischter Ablagestapel
generateCardStack();
console.log(cardStack);

let playerCards : Card[] = []; // Array der Spielerkarten
let computerCards : Card[] = []; // Array der Gegnerkarten
let activeCards: Card[] = []; // Array für Spielstapel (mit der aktiven Karte oben)

let currentCard: Card;

let currentPlayer: boolean;
let alreadyTookCard: boolean = false;


window.onload = function() {
    document.getElementById("gamestart").addEventListener("click", shuffleAndPlay, false);
}

// mischt alle Karten und bereitet das Feld vor
function shuffleAndPlay() {
    // Alles zurücksetzen
    clearAll();
    generateCardStack();

    // Mischen
    cardStack = shuffle(cardStack);

    // Abwechselnd Karten an Spieler und Computer (Gegner) verteilen, bis jeder 6 Karten hat
    let i = 6;
    while (i){
        playerCards.push(cardStack[0]);
        cardStack.splice(0,1);
        computerCards.push(cardStack[0]);
        cardStack.splice(0,1);
        i-=1;
    }
    console.log(cardStack);
    console.log(playerCards);
    console.log(computerCards);

    //Spieler-Karten im HTML erzeugen
    updateHtml(playerCards);

    // Computer-Karten im HTML erzeugen
    updateHtml(computerCards);

    // Aktive Karte vom Aufnahmestapel nehmen und in Html erzeugen
    activeCards.push(cardStack[cardStack.length-1]);
    currentCard = {
        cardColor : activeCards[0].cardColor,
        cardValency : activeCards[0].cardValency
    }
    cardStack.splice(cardStack.length-1,1);
    updateHtml(activeCards);

    // Aufnahmestapel in Html erzeugen
    updateHtml(cardStack);


    document.getElementById("stack").addEventListener("click", takeCard, false);

    // In currentMove Html Section beschreiben, wer als Nächstes an der Reihe ist/Was zu tun ist
    document.getElementById("currentMove").innerHTML = "Du darfst anfangen!";
    currentPlayer = true;

}


function playThisCard(cardToPlay : Card, index : number) {
    if (currentPlayer) {
        if (cardToPlay.cardColor == currentCard.cardColor || cardToPlay.cardValency == currentCard.cardValency){
            currentPlayer = false;
            alreadyTookCard = false;
            activeCards.push(cardToPlay);
            currentCard = cardToPlay;
            playerCards.splice(index,1);
            updateHtml(playerCards);
            updateHtml(activeCards);

            // Überprüfe ob Spieler noch Karten hat
            if (playerCards.length == 0){
                document.getElementById("currentMove").innerHTML = "Du hast gewonnen!";
                clearAll();
            }
            else{
                document.getElementById("currentMove").innerHTML = "Dein Gegner ist an der Reihe!";
                alreadyTookCard = false;
                opponent();
            }
        }
        else{
            window.alert("Die Karte passt nicht! Spiel eine andere oder nimm eine neue Karte auf.");
        }
    }
}

function takeCard() {
    if (currentPlayer){
        if (alreadyTookCard == false && playableCardsCount() == 0){
            // Bei leerem Aufnahmestapel neu mischen
            if(cardStack.length==0){
                reshuffleStack();
            }
            playerCards.push(cardStack[cardStack.length-1]);
            cardStack.splice(cardStack.length-1,1);
            updateHtml(playerCards);
            updateHtml(cardStack);
            alreadyTookCard = true;
            console.log(cardStack);
            
    
            if(playerCards[playerCards.length-1].cardColor != currentCard.cardColor && playerCards[playerCards.length-1].cardValency != currentCard.cardValency){
                currentPlayer = false;
                document.getElementById("currentMove").innerHTML = "Dein Gegner ist an der Reihe!";
                alreadyTookCard = false;
                opponent();
            }
        }
        else if(playableCardsCount() > 0){
            document.getElementById("currentMove").innerHTML = "Du musst keine Karte aufnehmen!";
        }
        else if (alreadyTookCard){
            document.getElementById("currentMove").innerHTML = "Du hast schon eine Karte aufgenommen!";
        }
    }
}

function opponent() {
    let couldLay : boolean = false;
    for(let i = 0; i < computerCards.length; i++){
        // Fall 1: Gegner kann eine Karte legen
        if(computerCards[i].cardColor == currentCard.cardColor || computerCards[i].cardValency == currentCard.cardValency){
            currentCard = computerCards[i];
            activeCards.push(currentCard);
            computerCards.splice(i,1);
            document.getElementById("currentMove").innerHTML = "Der Gegner legt eine Karte ab!";
            setTimeout(function () {updateHtml(activeCards); updateHtml(computerCards);},1500);
            // Dann ist der Spieler wieder an der Reihe
            setTimeout(function(){document.getElementById("currentMove").innerHTML = "Du bist dran!"; currentPlayer = true;}, 1600);
            //setze Signalwort auf true, sodass klar ist, dass eine Karte gelegt werden konnte
            couldLay = true;

            // Überprüfe ob Gegner keine Karten mehr hat, also gewonnen hat
            if (computerCards.length == 0){
                setTimeout(function() {document.getElementById("currentMove").innerHTML = "Du hast verloren!"; clearAll()},1600);
            }
            break;
        }
    }
    // Fall 2: Gegner kann nicht legen, nimmt eine Karte auf und versucht diese abzulegen (Signalwort ist noch auf false)
    if (couldLay == false){

        if(cardStack.length==0){
            reshuffleStack();
        }

        computerCards.push(cardStack[cardStack.length-1]);
        cardStack.splice(cardStack.length-1,1);
        document.getElementById("currentMove").innerHTML = "Gegner nimmt eine Karte auf!";
        setTimeout(function(){updateHtml(cardStack); updateHtml(computerCards);},1600);
        if (computerCards[computerCards.length-1].cardColor == currentCard.cardColor || computerCards[computerCards.length-1].cardValency == currentCard.cardValency){
            currentCard = computerCards[computerCards.length-1];
            activeCards.push(currentCard);
            
            setTimeout(function() {computerCards.splice(computerCards.length-1,1); document.getElementById("currentMove").innerHTML = "Der Gegner legt eine Karte ab!";},2000);
            setTimeout(function () {updateHtml(computerCards);updateHtml(activeCards);},2000);
        }
        // Dann ist der Spieler wieder an der Reihe
        setTimeout(function(){document.getElementById("currentMove").innerHTML = "Du bist dran!";currentPlayer = true;}, 2000);

    }
}

function playableCardsCount() : number {
    let count : number = 0;

    for(let i = 0; i < playerCards.length; i++){
        if(playerCards[i].cardColor == currentCard.cardColor || playerCards[i].cardValency == currentCard.cardValency){
            count += 1;
        }
    }
    return count;
}

function reshuffleStack() {
    document.getElementById("currentMove").innerHTML = "Der Ablagestapel ist leer und wird aus den gespielten Karten neu zusammengemischt!";
    activeCards.splice(activeCards.length-1,1);
    console.log("ACTIVE", activeCards);
    console.log("cardStack", cardStack);
    cardStack = shuffle(activeCards);
    console.log("cardstack2",cardStack);
    activeCards = [currentCard];
    updateHtml(cardStack);
    updateHtml(activeCards);
}

function updateHtml(array : Card[]) {
    let classStr : string = "";
    if (array == playerCards) {
        classStr = "player";
    }
    else if (array == computerCards){
        classStr = "computer";
    }
    else if (array == cardStack){
        classStr = "stack";
    }
    else if (array == activeCards){
        classStr = "active";
    }
    clearHtml(classStr);
    if (classStr == "player" || classStr == "active"){

        for(let i = 0; i<array.length; i++){
            createOpenCardHtml(array, i, classStr);
        }
    }
    else {
        for(let i = 0; i<array.length; i++){
            createHiddenCardHtml(array, i, classStr);
        }
    }
    
}

function createOpenCardHtml(array:Card[], arrayIndex:number, classString:string) {


    let holdingDiv : HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", classString + " " + "card" + " " + array[arrayIndex].cardColor);
    document.getElementById(classString).appendChild(holdingDiv);

    let i = 5;
    while (i) {
        let numberP : HTMLElement = document.createElement("p");
        numberP.innerHTML = "" + array[arrayIndex].cardValency;

        if (i==5){
            numberP.setAttribute("class", "topleft");}
        else if (i==4){
            numberP.setAttribute("class","topright");}
        else if (i==3){
            numberP.setAttribute("class", "middle");}
        else if (i==2){
            numberP.setAttribute("class", "bottomleft");}
        else if (i==1){
            numberP.setAttribute("class", "bottomright");}

        holdingDiv.appendChild(numberP);

        i -= 1;
    }   
    if (classString == "player"){
        holdingDiv.addEventListener('click', function() {playThisCard(array[arrayIndex], arrayIndex)}, false);   
    }
    
}

// Verdeckte Karte in HTML erstellen
function createHiddenCardHtml(array:Card[], arrayIndex:number, classString:string) {
    let holdingDiv : HTMLElement = document.createElement("div");
    holdingDiv.setAttribute("class", classString + " " + "card" + " " + "backside");
    document.getElementById(classString).appendChild(holdingDiv);

    let image : HTMLElement = document.createElement("img");
    image.setAttribute("src", "imgs/parquet.png");
    holdingDiv.appendChild(image);
}


 // Alle Karten neu generieren
function generateCardStack(){
    for (let i=0; i<4; i++){
        let color : string;
        if(i==0) {color = "purple"}
        else if(i==1) {color = "blue"}
        else if (i==2) {color = "red"}
        else if (i==3) {color = "orange"}
        for (let j=0; j<=9; j++){
            let newCard : Card = {
                cardColor : color,
                cardValency : j
            }
            cardStack.push(newCard);
        }
    }
}

function clearAll(){
    clearHtml("player");
    clearHtml("computer");
    clearHtml("active");
    clearHtml("stack");
    playerCards = [];
    computerCards = [];
    cardStack = [];
    activeCards = [];
    let currentCard: Card;
    let currentPlayer: boolean = true;
    let alreadyTookCard: boolean = false;
}

function clearHtml(classString: string) {
    let myNode : HTMLElement = document.getElementById(classString);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

// Fisher-Yates shuffle Algorithmus
function shuffle(array : Card[]) {
    let m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }