console.log("the magic eight ball"); // Konsolenausgabe nach Start (Mindestanforderung 1)
restlicheAufgabenpunkte();
// mehrere Funktionen folgend (Mindestanforderung 2)
window.onload = function () {
    document.getElementById("bilderbutton").addEventListener("click", onClick); // Event-Listener, Button ändert auf Klick seinen Inhalt (Mindestanforderung 4)
};
function onClick() {
    let el = document.getElementById("question");
    let question = el.value;
    let quest = false; // Optional 3
    if (question == "") {
        document.getElementById("bilderbutton").innerHTML = "No question entered, try again!";
    }
    else {
        document.getElementById("bilderbutton").innerHTML = "Ask the 8 ball another question!";
        quest = true; // neuer Wert für bereits deklarierte Variable (Mindestanforderung 7)
    }
    if (quest == true) {
        let answer = pickAnswer();
        document.getElementById("answer").innerHTML = answer;
        newHistoryElem(question, answer);
    }
}
function pickAnswer() {
    let answers = ["I don't think so!",
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
    let range = answers.length;
    let randomNumber = Math.ceil(Math.random() * 1000) % range;
    let el = document.getElementById("question");
    if (el.value != "") {
        return answers[randomNumber]; // Optional 2
    }
    else {
        return "";
    }
}
// Erstellen neuer HTML-Elemente (Mindestanforderung 9)
function newHistoryElem(question, answer) {
    if (question != "") {
        let element = document.getElementById("answerHistory");
        let historyCount = element.childElementCount;
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
    let num1 = 42;
    let num2 = 84;
    let str1 = "Hello";
    let str2 = " World!";
    // Rechnungen und Konsolenausgabe (Mindestanforderung 8)
    let numTotal = num2 / num1;
    let strTotal = str1 + str2;
    let numstr = num1 + str2;
    console.log(numTotal);
    console.log(strTotal);
    console.log(numstr);
}
//# sourceMappingURL=script.js.map