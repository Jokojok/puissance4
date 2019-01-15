let grille = (function () {
    let matrice;

    function creerGrille(x, y) {
        matrice = [];
        for (let i = 0; i < x; i++) {
            matrice[i] = [];
            for (let j = 0; j < y; j++) {
                matrice[i][j] = " ";
            }
        }
    }

    function checkGood(tile, count, color) {
        if (tile !== " ") {
            if (tile === color) {
                count++;
            }
            else {
                color = tile;
                count = 1;
            }
        }
        else {
            color = null;
            count = 0;
        }
        return {
            color: color,
            count: count
        };
    }

    function isCol() {
        let count = 0;
        let color = null;
        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice[0].length; j++) {
                let tile = matrice[i][j];
                let result = checkGood(tile, count, color);
                color = result.color;
                count = result.count;
                if (count === 4) {
                    return color;
                }
            }
        }
        return null;
    }

    function isRow() {
        let count = 0;
        let color = null;
        for (let i = 0; i < matrice[0].length; i++) {
            for (let j = 0; j < matrice.length; j++) {
                let tile = matrice[j][i];
                let result = checkGood(tile, count, color);
                color = result.color;
                count = result.count;
                if (count === 4) {
                    return color;
                }
            }
        }
        return null;
    }

    function isDiag() {
        // diag en /
        let count = 0;
        let color = null;
        for (let i = 0; i < matrice.length - 3; i++) {
            for (let j = 0; j < matrice[0].length - 3; j++) {
                for (let indice = 0; indice < 4; indice++) {
                    let tile = matrice[i + indice][j + indice];
                    let result = checkGood(tile, count, color);
                    color = result.color;
                    count = result.count;
                    if (count === 4) {
                        return color;
                    }
                }
                count = 0;
                color = null;
            }
        }

        // diag en \
        count = 0;
        color = null;
        for (let i = matrice.length - 1; i > 2; i--) {
            for (let j = 0; j < matrice[0].length - 3; j++) {
                for (let indice = 0; indice < 4; indice++) {
                    let tile = matrice[i - indice][j + indice];
                    let result = checkGood(tile, count, color);
                    color = result.color;
                    count = result.count;
                    if (count === 4) {
                        return color;
                    }
                }
                count = 0;
                color = null;
            }
        }
        return null;
    }

    function afficherGrille() {
        for (let i = 0; i < matrice.length; i++) {
            let j = 0;
            $($("#grille > tr")[i]).find('td').each(function () {
                let tile = matrice[j][i];
                if (tile === " ") {
                    // vide
                }
                else {
                    $(this).css('backgroundColor', tile)
                }
                j++;
            });
        }
    }

    function jouer(x, color) {
        // partie est finie
        if (isWinner() || isFull())
            return false;
        // colonne pleine
        if (matrice[x][0] !== " ") {
            return false;
        }
        // colonne débutée
        for (let i = 0; i < matrice[x].length; i++) {
            if (matrice[x][i] !== " ") {
                matrice[x][i - 1] = color;
                return true;
            }
        }
        // colonne vide
        matrice[x][matrice.length - 1] = color;
        return true;
    }

    function isWinner() {
        let color = isCol();
        if (color !== null)
            return color;
        color = isRow();
        if (color !== null)
            return color;
        return isDiag();
    }

    function isFull() {
        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice.length; j++) {
                if (matrice[i][j] === " ")
                    return false;
            }
        }
        return true;
    }

    return {
        creerGrille,
        afficherGrille,
        jouer,
        isWinner,
        isFull
    }
})();

// pour retenir les options plus tard si on désire améliorer le jeu
let players = ["red", "blue", "green", "yellow"];   // ajouter des couleurs pour de potentiels futurs joueurs
let nbrOfPlayer = 2;    // ne pas dépasser le nombre de couleur
let size = 7;

// gestion de l'IHM
function play() {
    grille.creerGrille(size, size);
}

let player = 0;

function jouer(ligne) {
    let choice = parseInt(ligne);
    if (choice >= 0 || choice <= size) {
        if (choice > size) {
            console.log("Mauvaise case choisie.");
        }
        else {
            // play
            if (grille.jouer(choice, players[player])) {
                player++;
            }
            else {
                console.log("La colonne est pleine. Veuillez jouer une autre colonne.");
            }

            // check next player
            if (player >= nbrOfPlayer) {
                player = 0;
            }

            // check winner
            let winner = grille.isWinner();
            if (winner === null) {
                console.log("C'est au joueur " + players[player]);
                grille.afficherGrille();
            }
            else {
                console.log("Le gagnant est : " + winner);
                grille.afficherGrille();
                console.log("C'est fini !");
            }

            // check full
            if (grille.isFull()) {
                grille.afficherGrille();
                console.log("C'est fini ! La grille est pleine.");
            }
        }
    }
    else {
        console.log("Veuillez rentrer un nombre entre 1 & " + size);
    }
    grille.afficherGrille();
}

play(); // lance le jeu