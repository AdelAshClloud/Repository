- J'ai mis la caractéristique level en haut à droite en utilisant ctx.fillText("Level : " + level,910, 30)
- J'ai changé le nom du jeu en "The legend of Zelda Game" on HTML
- j'ai ajouté la valeur math.random sur " Press Space to start again " pour faire en sorte que cette phrase ait aussi une animation

- J'ai ajouté un background en ajoutant l'url du background dans le canvas en html et en css. J'ai aussi ajouté un gif pour le background de la page
- Ajout d'une chanson de zelda ocarina of time ost au jeu en utilisant <audio controls autoplay>
      									  <source src="./ressources/OST.mp3"  type="audio/mpeg" >
     									 </audio>
J'ai essayé de faire en sorte que la musique se lance automatiquement au lancement de la page,mais cela a été récemment bloqué par les navigateurs web

- ajout d'une fonction drawPlayer pour ajouter une image de link de zelda au lieu d'un rectangle

- Sur le fichier css : J'ai ajouté une police que j'ai trouvée sur un site web qui est dans le thème de Zelda et j'ai écrit mon h2 avec cette police
 J'ai ajouté un background au canvas en ajoutant l'url du background en css. J'ai aussi ajouté un gif pour le background du body en css


-Function startgame(level) : let nb = level x 2

- Dans la function createballs : if i<level
					b.color = red
tant que i est inférieur au nombre de niveau, nous allons créer des boules rouges
- J'ai donc enlever la couleur red de la fonction getarandomcolor afin de ne pas créer trop de boules rouges

- Function create balls : j'ai baissé la vitesse speed x et speed y a -2
- Function add speed ball : J'ai créé une fonction afin de déterminer des vitesses différentes pour chaque balle en fonction de leur couleur
- Function passerauniveausuivant : J'ai baissé la vitesse du global speed multiplier

- J'ai rencontré un problème : Lorsque il y avait un game over, la vitesse des balles ne se réinitialisait pas : j'ai donc ajouté une variable globalspeedmultiplier à la fin du game state game over
de la function main loop :    globalSpeedMultiplier = 0,2
 
- Ajout d'un ctx.fillText("LevelMax" + LevelMax, 10, 110) qui va afficher le niveau maximum atteint par le joueur 
pour cela j'ai ajouté a la function mainloop :  if (LevelMax < level)
       						 LevelMax = level ;
et au début du script js : j'ai ajouté let LevelMax = 1 ;
