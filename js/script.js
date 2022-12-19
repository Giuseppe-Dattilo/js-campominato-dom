// console.log('JS OK');

/*
Griglia Campo Minato
#Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: :avviso:non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
#BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/


// Funzione per creare una cella 
const createCell = (number) => {
    const cell = document.createElement('div');
    cell.append(number)
    cell.classList.add('cell');
    return cell; 
}


// Funzione per creare un numero random
const getRandomNumber = (min, max, numbers) => {
    let bombCluster = [];

    while (bombCluster.length < numbers){
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if(!bombCluster.includes(randomNumber)) {
            bombCluster.push(randomNumber);
        }
    }

    return bombCluster;
}

// Prendo gli elementi dal DOM
const grid = document.getElementById('grid');
const levelElement = document.getElementById('level');
const buttonElement = document.getElementById('play');
const beginElement = document.getElementById('begin');

// Aggancio l'evento al click del bottone
buttonElement.addEventListener('click', () => {

    // Svuoto la griglia e cambio l'innerText del bottone
    grid.innerHTML = "";
    buttonElement.innerText = 'Nuova partita'
        
    beginElement.classList.add('d-none');

    // Calcolo righe e colonne
    let rows = levelElement.value;
    let cols = levelElement.value;
    console.log(rows, cols);

    // Setto il valore della custom property
    const root = document.querySelector (':root');
    root.style.setProperty('--cells-per-rows', cols);

    // Calcolo il numero di celle totali 
    const totalCells = rows * cols;
    console.log(totalCells);

    // Genero i numeri random delle bombe
    const bombs = getRandomNumber (1, totalCells, 16);
    console.log(bombs);

    for(let i = 1; i <= totalCells; i++){
    
        // Creo una cella
        const cell = createCell(i);
        console.log(i);
    
        // aggiungo l'event listener alla cella
        cell.addEventListener('click', () => {
            cell.classList.toggle('clicked');
            });
        
        // appendo in pagina
        grid.appendChild(cell);
    
    };
    
});


