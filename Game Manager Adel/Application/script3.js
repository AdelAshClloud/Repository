window.onload= init;
const iconURL = 'https://i.imgur.com/yHyDPio.png';



// The game manager as a global variable
let cm;  


function init() { 
	// create an instance of the game manager
	cm = new GameManager();
  	cm.addTestData();
  	cm.printGamesToConsole();

	  // Display games in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displayGamesAsATable("games");
	}


function formSubmitted() {
    let editeur = document.querySelector("#éditeur");
  	let email = document.querySelector("#email");
    let caté = document.querySelector("#catégorie");
	let image = document.querySelector("#image");

	
	let newGame = new Game(name.value, email.value, editeur.value, caté.value, image.value);
	cm.add(newGame);
	
	name.value = "";
	email.value = "";
    editeur.value = "";
    caté.value = "";
	image.value = "";
	
	
	// refresh the html table
	cm.displayGamesAsATable("games");
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayGamesAsATable("games");
}

function loadList() {
	cm.load();
  	cm.displayGamesAsATable("games");
}


class Game {
	constructor(name, email, editeur, caté, image) {
		this.name = name;
		this.email = email
        this.editeur = editeur;
        this.caté = caté;
		this.image = image;
	}
}

class GameManager {
	constructor() {
		// when we build the game manager, it
		// has an empty list of games
		this.listOfGames = [];
	}
	
	addTestData() {
		var c1 = new Game("The Witcher","PC, PS3, PS4", "CD Projekt Red", "RPG", "https://image.jeuxvideo.com/medias/142247/1422469608-7141-jaquette-avant.jpg");
  		var c2 = new Game("God of war Ragnarok","PS4,PS5", "Santa Monica Studio", "RPG", "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png");
  		var c3 = new Game("ELDEN RING","PS5, PC", "FromSoftware", "RPG", "https://image.api.playstation.com/vulcan/ap/rnd/202107/1612/Y5RHNmzAtc6sRYwZlYiKHAxN.png");
  		var c4 = new Game("The Last of us","PS4,PS5", "Naughty Dog", "Action-Aventure","https://image.api.playstation.com/vulcan/img/rnd/202011/1020/FKgazVvG7BcWouCr39mIiXkW.png");
		var c5 = new Game("Kingdom Hearts 3","PS5", "Square Enix", "J-RPG","https://image.jeuxvideo.com/medias/161722/1617220611-4137-jaquette-avant.jpg");
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		this.add(c5);
		// Let's sort the list of games by Name
		this.sort();
	}
	
	// Will erase all games
	empty() {
		this.listOfGames = [];
	}
	
	add(game) {
		this.listOfGames.push(game);
	}
	
	
	remove(game) {
		for(let i = 0; i < this.listOfGames.length; i++) { 
			var c = this.listOfGames[i];

			if(c.email === game.email) {
				// remove the game at index i
				this.listOfGames.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}
	 
	
	sort() {
		this.listOfGames.sort(GameManager.compareByName);
	}
	
	
	static compareByName(c1, c2) {
		
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}
	
	printGamesToConsole() {
		this.listOfGames.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.games !== undefined) {
			// the array of games is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfGames = JSON.parse(localStorage.games);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of games to JSON
		localStorage.games = JSON.stringify(this.listOfGames);
	} 
	
  	displayGamesAsATable(idOfContainer, gamesArr = null) {
		  
		if (gamesArr === null)
		gamesArr = this.listOfGames;
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(gamesArr.length === 0) {
			container.innerHTML = "<p>No games to display!</p>";
			// stop the execution of this method
			return;
		}  

    	var table = document.createElement("table");


		let header1 = document.createElement("th")
		let header2 = document.createElement("th")
		let header3 = document.createElement("th")
		let header4 = document.createElement("th")
		let header5 = document.createElement("th")
		let header6 = document.createElement("th")

		header1.innerHTML = 'TITRE DU JEU <div id=select name="sortBy"id="sortBy">▲</div><div id=select2 name="sortBy"id="sortBy">▼</div>';
		header2.innerHTML = "DISPONIBLE SUR ";
		header3.innerHTML = "EDITEUR";
		header4.innerHTML = "TYPE";
		header5.innerHTML = "JAQUETTE";
		header6.innerHTML = "";

    	
    
     	container.append(table);
		 (table).append(header1)
		 table.appendChild(header2)
		 table.appendChild(header3)
		 table.appendChild(header4)
		 table.appendChild(header5)
		 table.appendChild(header6)
		 
		
		 

		
    	gamesArr.forEach((currentGame, index) => {
        
        	var row = table.insertRow();

			row.innerHTML = "<td>" + currentGame.name + "</td>"
							+ "<td>" + currentGame.email + "</td>"
                            + "<td>" + currentGame.editeur + "</td>"
                            + "<td>" + currentGame.caté + "</td>" 
							
							+ "<td><img class='img2' src='" + currentGame.image + "'</img></td>"
							
							
							
							
							
		let iconCell = document.createElement('td');
		let trashBin = document.createElement('img');
		trashBin.src = iconURL;
		trashBin.dataset.gameId = index;
		iconCell.append(trashBin);
							
						
		row.append(iconCell);
     	});
  

		 document.querySelector('#gameSearch').addEventListener('input', (event) => {
			findGame(event.target.value);
		})
		 function findGame(name) {
			const games = cm.listOfGames;
			const regex = new RegExp(`${name}`, 'i')
			const resultat = games.filter(game => game.name.match(regex));
			console.log(resultat);
		
			cm.displayGamesAsATable('games', resultat)
		}
document.querySelectorAll('img').forEach((element) => {
	element.addEventListener('click', () => {
		this.remove(gamesArr[element.dataset.gameId]);
		this.displayGamesAsATable('games');
	})
})
}
}
