console.log("the magic eight ball"); // Konsolenausgabe nach Start (Mindestanforderung 1)
restlicheAufgabenpunkte();

// mehrere Funktionen folgend (Mindestanforderung 2)
window.onload = function(){ // Aufruf nicht leerer Funktion nach Laden des Fensters (Mindestanforderung 3)
    document.getElementById("bilderbutton").addEventListener("click", onClick); // Event-Listener, Button ändert auf Klick seinen Inhalt (Mindestanforderung 4)
}

function onClick(){
    let el =<HTMLInputElement>document.getElementById("question");
    let question : string = el.value;
    let quest : boolean = false; // Optional 3
    if (question == ""){
        document.getElementById("bilderbutton").innerHTML = "No question entered, try again!";
    }
    else {
        document.getElementById("bilderbutton").innerHTML = "Ask the 8 ball another question!";
        quest = true; // neuer Wert für bereits deklarierte Variable (Mindestanforderung 7)
    }
    if (quest == true){
        let answer : string = pickAnswer();
        document.getElementById("answer").innerHTML = answer;
        newHistoryElem(question, answer);
    }
}

function pickAnswer(){
    let answers : string[] = ["I don't think so!", 
                            "Can't see this happening...", 
                            "Oof.", 
                            "It's a no from me!", 
                            "Possibly.", 
                            "I guess.", 
                            "Maybe, yes!", 
                            "You should ask me something else!", 
                            "I don't understand the question.", 
                            "Sure!", 
                            "You know the answer to this!"];

    let range : number = answers.length;
    let randomNumber : number = Math.ceil(Math.random() * 1000) % range;

    let el =<HTMLInputElement>document.getElementById("question");
    if (el.value != ""){
        return answers[randomNumber]; // Optional 2
    }
    else {return "";}
}

// Erstellen neuer HTML-Elemente (Mindestanforderung 9)
function newHistoryElem(question : string, answer : string){
    if (question != ""){
        let element = document.getElementById("answerHistory");
        let historyCount : number = element.childElementCount;
        let para = document.createElement("p");
        let node = document.createTextNode(historyCount + ". " + question + " - " + answer);
        para.appendChild(node);
        element.insertBefore(para, element.childNodes[1] || null);
    }
}

function restlicheAufgabenpunkte() {
    // Klasse verändern (Mindestanforderung 5) FUKNTIONIERT NOCH NICHT
    // document.getElementById("ananas").className = "world";

    // "string" und "number" in Funktion benutzen (Mindestanforderung 6)
    let num1 : number = 42;
    let num2 : number = 84;
    let  str1 : string = "Hello";
    let str2 : string = " World!";

    // Rechnungen und Konsolenausgabe (Mindestanforderung 8)
    let numTotal : number = num2 / num1;
    let strTotal : string = str1 + str2;
    let numstr = num1 + str2;

    console.log(numTotal);
    console.log(strTotal);
    console.log(numstr);
}