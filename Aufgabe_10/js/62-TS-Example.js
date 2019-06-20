// BEISPIEL UND AUFGABE:
// Dieses Skript soll als Beispiel dazu dienen, wie Interfaces und Arrays genutzt werden können.
// Hier wird ein ungefährer Aufbau eines simplen Klick-Spiels gezeigt. Der Nutzer kann dabei durch Button ein neues Monster erstellen.
// Zu beginn werden hier zuerst Interfaces, danach Variablen deklariert.
// Weiter unten kommen dann die Funktionen.
// ------- Variablen -------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Variablen: I (1 / einer)
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let playerName = "Spielername"; // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP = 0; // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel = 500; // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerLevel = 1;
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix = ["Wald-", "Seuchen-", "Uralte(s) ", "Gift-", "Brennende(s) ", "Kniescheibenzertrümmernde(s) ", "Feuerspeiende(s) ", "Teufels-", "Wüsten-", "Zyklopen-", "Gemeingefährliche(s) "]; // length = 11, da 11 Einträge. Von 0-10.
let monsterName = ["Ratte", "Nagetier", "Ungeziefer", "Glücksbärchi", "Schlange", "Mephistopheles", "Hexenmonster", "Hyäne"]; // length = 8, da 8 Einträge. Von 0-7.
let suffix = [" des Verderbens", " aus der Hölle", " der Lethalität", " mit Rheuma", " der Redundanz", " der Zerberstung", " der Dunkelheit", " des Grauens", " des Untergangs", " aus der Unterwelt", " der Tiefsee"]; // length = 11, da hier 11 Einträge sind. Von 0-10.
let monsterSrc = imagePush();
let monsterModifers = ["Ist nervig", "Linkshänder", "Bier-Connoisseur", "Verfehlt häufig", "Prokrastiniert", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.
let monsterWeapons = ["Hammer", "Schwert", "Schleimbombe", "Blatt-Schleuder"];
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.
// ----------- Funktionen ----------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Funktionen: IIIII (3 / fünf)
// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel(0); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    console.log("" + document.getElementById("monsterSpawner").innerHTML);
    document.getElementById("fightAll").addEventListener('click', fightAllMonsters, false);
    document.getElementById("fightWeak").addEventListener('click', fightAllWeakMonsters, false);
    document.getElementById("fightWeakest").addEventListener('click', fightWeakestMonster, false);
};
// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster() {
    let monsterNumber = getRNGNumber(3) + 1; // Wieviele neue Monster erzeugt werden (Zufallszahl von 1-3)
    for (let i = 0; i < monsterNumber; i++) {
        let newMonsterName = generateMonsterName(); // Eigens-gebaute Funktion, welche einen string zurück gibt.
        let newMonsterImage = generateMonsterImage();
        let newMonsterHP = generateMonsterHealthPoints(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
        let newMonsterWeapon = generateMonsterWeapon();
        let newMonsterLevel = getRNGNumber(11);
        let newMonster = {
            monsterName: newMonsterName,
            monsterImage: newMonsterImage,
            monsterHealthPoints: newMonsterHP,
            monsterExperience: newMonsterXP,
            monsterModifier: newMonsterModifier,
            monsterWeapon: newMonsterWeapon,
            monsterLevel: newMonsterLevel
        };
        monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
        console.log(monsterArray[0].monsterExperience);
    }
    updateHTML(); // Triggere die Generierung von HTML
}
function updateHTML() {
    clearMonsterCell();
    monsterGenerateHTMLAll();
    getMonsterCount();
}
function clearMonsterCell() {
    console.log(monsterArray);
    for (let i = 0; i <= monsterArray.length; i++) {
        if (document.getElementById("monster" + (i + 1)) != null) {
            var element = document.getElementById("monster" + (i + 1));
            element.parentNode.removeChild(element);
        }
    }
    console.log(monsterArray);
}
function monsterGenerateHTMLAll() {
    for (let i = 0; i < monsterArray.length; i++) {
        monsterGenerateHTML(i);
    }
}
function getMonsterCount() {
    let monsterCount = monsterArray.length;
    return monsterCount;
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(monsterArrayPosition) {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + (monsterArrayPosition + 1)); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterArrayPosition].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[monsterArrayPosition].monsterModifier[0] + ", " + monsterArray[monsterArrayPosition].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", "imgs/" + monsterArray[monsterArrayPosition].monsterImage); // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monsterLev = document.createElement("p");
    monsterLev.innerHTML = "Level: " + monsterArray[monsterArrayPosition].monsterLevel;
    holdingDiv.appendChild(monsterLev);
    let monsterHealth = document.createElement("p");
    monsterHealth.innerHTML = "Health Points: " + monsterArray[monsterArrayPosition].monsterHealthPoints;
    holdingDiv.appendChild(monsterHealth);
    let monsterXP = document.createElement("p");
    monsterXP.innerHTML = "XP: " + monsterArray[monsterArrayPosition].monsterExperience;
    holdingDiv.appendChild(monsterXP);
    let monsterWeap = document.createElement("p");
    monsterWeap.innerHTML = "Waffe: " + monsterArray[monsterArrayPosition].monsterWeapon;
    holdingDiv.appendChild(monsterWeap);
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    console.log("Aktuelle Anzahl an Monstern: ", monsterArrayPosition + 1);
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(monsterArrayPosition); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
}
// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber);
}
// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für das Monster
    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber = getRNGNumber(prefix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
function generateMonsterImage() {
    let rngNumber = getRNGNumber(monsterSrc.length);
    let generatedMonsterImage = monsterSrc[rngNumber];
    return generatedMonsterImage;
}
// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHealthPoints() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP = 1 + getRNGNumber(10);
    return tempMonsterHP;
}
// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 450) + 100 zurück.
    let tempMonsterXP = 100 + getRNGNumber(450);
    return tempMonsterXP;
}
// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
function generateMonsterWeapon() {
    let weapon = monsterWeapons[getRNGNumber(monsterWeapons.length)];
    return weapon;
}
function fightAllMonsters() {
    for (let i = 0; i < monsterArray.length; i++) {
        let prevPlayerXP = 0;
        fightMonster(i);
        if (playerXP > prevPlayerXP) { // wenn die playerXP sich vergrößert haben, hat Spieler gegen ein Monster gewonnen, dieses wurde entfernt und somit muss das nächste Monster wieder am selben Index überprüft werden 
            i = i - 1;
        }
    }
}
function fightAllWeakMonsters() {
    let thisLevel = playerLevel;
    for (let i = 0; i < monsterArray.length; i++) {
        let prevPlayerXP = 0;
        if (thisLevel > monsterArray[i].monsterLevel) {
            fightMonster(i);
            i = i - 1;
        }
        if (i >= monsterArray.length) {
            break;
        }
    }
}
function fightWeakestMonster() {
    let indexWeakest = 0;
    for (let i = 1; i < monsterArray.length; i++) {
        if (monsterArray[i].monsterLevel < monsterArray[indexWeakest].monsterLevel) {
            indexWeakest = i;
        }
    }
    console.log("Weakest monster: " + indexWeakest);
    fightMonster(indexWeakest);
}
// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster. Er erhält dann Erfahrungspunkte.
function fightMonster(_index) {
    console.log(monsterArray);
    if (playerLevel > monsterArray[_index].monsterLevel) {
        console.log("Spieler kämpft gegen Monster und gewinnt!");
        updatePlayerLevel(monsterArray[_index].monsterExperience);
        monsterArray.splice(_index, 1);
        updateHTML();
    }
    else if (playerLevel < monsterArray[_index].monsterLevel) {
        console.log("Das Monster weigert sich zu verschwinden.");
        updatePlayerLevel(-monsterArray[_index].monsterExperience);
    }
}
// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayerLevel(XPchange) {
    playerXP += XPchange;
    if ((Math.floor(playerXP / playerXPperLevel) + 1) >= 1) {
        playerLevel = Math.floor(playerXP / playerXPperLevel) + 1;
    }
    let extendedXP = playerXPperLevel * playerLevel;
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLevel + " (XP: " + playerXP + " / " + extendedXP + ")"; // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + playerLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.
    if (playerLevel == 20) {
        alert("Level 20! Du hast gewonnen! Jetzt kannst du sinnlos weiterspielen...");
    }
}
function imagePush() {
    let src = [];
    console.log(src);
    for (let i = 1; i <= 50; i++) {
        let path = "monster" + i + ".png";
        src.push(path);
        console.log(src);
    }
    return src;
}
//# sourceMappingURL=62-TS-Example.js.map