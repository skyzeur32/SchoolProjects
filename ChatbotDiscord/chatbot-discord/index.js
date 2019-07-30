const Discord = require('discord.js');
var fs = require('fs');
const myBot = new Discord.Client();
const Google = require('./commandes/google');
const Ping = require('./commandes/ping');
const Apprendre = require('./commandes/apprendre');
const Meteo = require('./commandes/meteo');
myBot.login("TOKEN");

myBot.on('ready', function() {
	//myBot.user.setAvatar('./avatar.png').catch(console.error)

});

myBot.on('guildMemberAdd', function(member) {
	member.createDM().then(function(channel){
		return channel.send('Bienvenue sur le channel ' + member.displayName)
	}).catch(console.error)
});

myBot.on('message', function(data) {
if(data.author == myBot.user){
	return;
}

var message = data.content;
message = message.toLowerCase();
 function removeAccents(str){
      var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
      var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz ";
      str = str.split('');
      var strLen = str.length;
      var i, x;
      for (i = 0; i < strLen; i++) {
        if ((x = accents.indexOf(str[i])) != -1) {
          str[i] = accentsOut[x];
        }
      }
      return str.join('');
 }

message = removeAccents(message);


    if (data.content.startsWith("!")) {
        processCommand(data);
        return;
    }
	else{
		//data.channel.send("Le bot fonctionne uniquement à l'aide de commande commançant par '!', tapez la commande `!help` pour plus d'informations");
	}
    var chaine = "";
	var position = -1;
	var reponse = false;
	 trouve = false;
 // fonction lancé uniquement si le texte commence par "!"
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (primaryCommand == "help") {
        helpCommand(receivedMessage);
    } 

    else if (primaryCommand == "apprendre") {
        learnCommand(receivedMessage);       
    } 
    else if(primaryCommand == "lire"){
    	ReadCommand(receivedMessage);    	
    }

    else if (primaryCommand == "google") {
        Google.parse(data);       
    } 

    else if (primaryCommand == "ping") {
        Ping.parse(data);       
    }
    else if (primaryCommand == "meteo"){
    	Meteo.parse(data);
    } 
	else if (primaryCommand == "multiplier") {
        multiplyCommand(arguments, receivedMessage)
	}
	else if (primaryCommand == "diviser") {
        divideCommand(arguments, receivedMessage)
		
    } else if (primaryCommand == "additionner") {
        addCommand(arguments, receivedMessage)
		
    } else if (primaryCommand == "soustraire") {
        substractCommand(arguments, receivedMessage)
		
    }
	else if (primaryCommand == "histoire") {
        storyCommand(arguments, receivedMessage)
		
    }
	else if (primaryCommand == "question") {
        searchInDataBase(arguments,receivedMessage);
		
    }
    else if (primaryCommand == "new") {
        AddDataBase(arguments,receivedMessage);
        
    }
    else {
        receivedMessage.channel.send("Je ne comprends pas la commande. essayez `!help`")       
    }
}
function learnCommand(receivedMessage){
	Apprendre.parse(receivedMessage);

}
function helpCommand(receivedMessage) {
   receivedMessage.channel.send("Bienvenue sur le CHAT-BOT APSIO");
   receivedMessage.channel.send("Vous pouvez interragir avec moi à l'aide de ces commandes : `!ping`, `!google`, `!question`, `!lire`, `!apprendre`, `!additionner`,!`!soustraire`, `!multiplier`, `!diviser`,`!meteo` ");
}
function ReadCommand(){
	var readMe = fs.readFileSync('msg.txt','utf8');
	data.channel.send(readMe);
}

//fonction qui va multiplier plusieurs nombres entre eux
function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Il faut 2 chiffres minimum pour faire une multiplication. Essai `!multiplier 2 4 10` ou `!multiplier 5.2 7`")
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("Le produit de " + arguments + " est: " + product.toString())
}
//fonction qui va faire une division entre 2 nombres
function divideCommand(arguments, receivedMessage) {
    if (arguments.length != 2) {
        receivedMessage.channel.send("Il faut exactement 2 chiffres pour faire une division. Essai `!diviser 4 2` ou `!diviser 5.2 7`")
        return
    }
    if (arguments[1] == 0){
        receivedMessage.channel.send("Division par 0 impossible. Essai `!diviser 4 2` ou `!diviser 5.2 7`")
        return
    }
    let product = 0
    product = parseFloat(arguments[0]) / parseFloat(arguments[1])
    receivedMessage.channel.send("Le quotient de " + arguments[0] + " et de " + arguments[1] + " est: " + product.toString())
}

//fonction qui ajoutes plusieurs nombres entre eux
function addCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Il faut 2 chiffres minimum pour faire une addition. Essai `!additionner 4 2 8` ou `!additionner 5.2 7`")
        return
    }
    let product = 0
    arguments.forEach((value) => {
        product = product + parseFloat(value)
    })
    receivedMessage.channel.send("Le résultat de cette addition est: " + product.toString())
}

//fonction qui fait la soustraction entre 2 nombres
function substractCommand(arguments, receivedMessage) {
    if (arguments.length != 2) {
        receivedMessage.channel.send("Il faut exactement 2 chiffres pour faire une soustraction. Essai `!diviser 2 4` ou `!diviser 5.2 7`")
        return
    }
    let product = 0
    product = parseFloat(arguments[0]) - parseFloat(arguments[1])
    receivedMessage.channel.send("Le resultat de cette soustraction est : " + product.toString())
}
//fonction qui fait jouer des histoires
async function storyCommand(arguments, receivedMessage) {
	trouve = true;
  //on verifie que l'utilisateur entre bien 1 seul theme à la fois
    if (arguments.length == 1) {
      //ici si la categorie est spatial pn demarre cette histoire
        if (arguments[0] == "spatial") {
          //on dit au bot d'envoyer le message dans le salon discord (celui ou on écrit la commande pour démarrer l'histoire)
            receivedMessage.channel.send("C'est parti pour une histoire spatial c'est bien ça ?")
            //question préliminaire
            //boolean qui sert a arreter la boucle infini quand l'utilisateur rentre un message
            let stop = false;
            while (!stop) {
                try {
                  //ici on attend une réponse de l'utilisateur qui sera soit oui soit non
                    let collected = await receivedMessage.channel.awaitMessages(reponse => reponse.content == "oui" || reponse.content == "non", {
                        max: 1, //on limite à 1 seul mot (si plus donné pas pris en compte)
                        time: 5000, //le temps d'attente avant de passer dans le catch (ligne 269)
                        errors: ['time'],
                    });
                    stop = true;
                    //si l'utilisateur répond oui on commence reelement l'histoire
                    if (collected.first().content == 'oui' ){
                        receivedMessage.channel.send('Très bien je commence mon histoire. Sachez d\'abord que vous devrez répondre en écrivant "1" ou "2". Imaginer vous astronaute ! :rocket: La fusée est sur le point de décoller plus que 3 heures avant le départ ! :fingers_crossed: . \nVous êtes le pilote et vous devez remplir la fusée de carburant mais vous avez un doute sur le carburant qu\'il faut mettre. \n2 choix s\'offrent à vous : \n\n`-1 Vous remplissez la fusée avec un mélange d\'hydrogène et d\'oxygène.` \n`-2 Vous remplissez la fusée avec de l\'éssance et de l\'oxygène.`');
						trouve = true;
                        //question 1 même processus le bot pose une question, il attend la réponse de l'utilisateur et continue ou s'arrête en fonction de la réponse (gagné ou perdu)
                        stop = false;
                        while (!stop) {
                            try {
                              //attente de la première réponse au choix dans l'histoire
                                let collected = await receivedMessage.channel.awaitMessages(reponse => reponse.content == "1" || reponse.content == "2", {
                                    max: 1,
                                    time: 20000,
                                    errors: ['time'],
                                });
                                stop = true;
                                //si choix 1
                                if (collected.first().content == '1' ){
                                    receivedMessage.channel.send('Bravo en mélangant ces deux éléments, l\'oxygène va être éliminé grace à l\'hydrogène, c\'est ce que la fusée Ariane à utilisé pour décoller. Vous aller peut-être voir Mars après tout :smile: https://tenor.com/view/icbm-rocket-missle-gif-7962839');
                                    setTimeout(function(){
                                        receivedMessage.channel.send('Poursuivons, nous entrons dans la stratosphère, il est temps de séparer la fusée pour l\'alleger et nous permettre de voyager vers notre déstination. A votre avis, dans quel module se trouvons nous ? \n`-1 Nous sommes dans le module arrière.` \n`-2 Nous sommes dans le module avant.`')
                                    }, 8000);

                                    //question 2
                                    stop = false;
                                    while (!stop) {
                                        try {
                                            let collected = await receivedMessage.channel.awaitMessages(reponse => reponse.content == "1" || reponse.content == "2", {
                                                max: 1,
                                                time: 20000,
                                                errors: ['time'],
                                            });
                                            stop = true;
                                            if (collected.first().content == '1' ){
                                                receivedMessage.channel.send('Dommage, en effet si nous avions été dans le module arrière nous serions mort cramé par les moteurs ou noyé par le carburant car c\'est là qu\'il est stocké https://tenor.com/view/deadpool-rocket-imfree-gif-11908728 \nRecommencer avec `!histoire spatial` !');
                                            } else {
                                                receivedMessage.channel.send('Bien joué, nous sommes en effet dans le module avant, c\'est la que ce trouve le module de commande appelé "cockpit" ou poste de pilotage bon voyage ! https://tenor.com/view/nasa-nasa-gifs-launch-module-module-space-gif-9398123');
                                                setTimeout(function(){
                                                    receivedMessage.channel.send("Deux choix de voyages s'offrent à vous, vous pouvez aller vers la constellation d'andromède, ou la constellation de cassiopeia, quel sera votre choix ? https://tenor.com/view/stars-constellation-gif-9122786 \n`-1 Andromède` \n`-2 Cassiopeia`")
                                                }, 8000);

                                                //question 3
                                                stop = false;
                                                while (!stop) {
                                                    try {
                                                        let collected = await receivedMessage.channel.awaitMessages(reponse => reponse.content == "1" || reponse.content == "2", {
                                                            max: 1,
                                                            time: 20000,
                                                            errors: ['time'],
                                                        });
                                                        stop = true;
                                                        if (collected.first().content == '1' ){
                                                            receivedMessage.channel.send("Andromède est en effet la constellation la plus proche et donc par conséquent la constellation la plus sucéptible d'abriter des traces de vie");
                                                            setTimeout(function(){
                                                                receivedMessage.channel.send("Capitaine ! un trou noir ! Que devons nous faire ? https://tenor.com/view/gargantua-interstellar-blackhole-space-singularity-gif-11343705 \n`-1 rentrer dedans` \n`-2 Le contourner et perdre 20 ans de carburant, vivre et d'oxygène`")
                                                            }, 4000);

                                                            //question 4
                                                            stop = false;
                                                            while (!stop) {
                                                                try {
                                                                    let collected = await receivedMessage.channel.awaitMessages(reponse => reponse.content == "1" || reponse.content == "2", {
                                                                        max: 1,
                                                                        time: 20000,
                                                                        errors: ['time'],
                                                                    });
                                                                    stop = true;
                                                                    if (collected.first().content == '1' ){
                                                                        receivedMessage.channel.send("Bravo capitaine, on est mort .. recommencer avec `!histoire spatial`");
                                                                    } else {
                                                                        receivedMessage.channel.send("Perdre 20 était peut-être pas si mal ... continuons notre voyage");
                                                                        setTimeout(function(){
                                                                            receivedMessage.channel.send("Nos radars indique qu'une forme de vie est en approche, nos scans détectent un armement lourd et leurs boucliers sont activés, leurs armes sont prêtes à tirer ! On fait quoi ? https://tenor.com/view/star-trek-discovery-enterprise-gif-10716068 \n`-1 Passer en alerte noir et se teleporter grâce au moteur sporique.` \n`-2 Passer en alerte rouge et armer les torpilles à photons.`")
                                                                        }, 4000);

                                                                        //question 5
                                                                        stop = false;
                                                                        while (!stop) {
                                                                            try {
                                                                                let collected = await receivedMessage.channel.awaitMessages(reponse => reponse.content == "1" || reponse.content == "2", {
                                                                                    max: 1,
                                                                                    time: 20000,
                                                                                    errors: ['time'],
                                                                                });
                                                                                stop = true;
                                                                                if (collected.first().content == '1' ){
                                                                                    receivedMessage.channel.send("Alerte noir ! https://tenor.com/view/uss-discovery-sporejump-spore-sporedrive-gif-10284882 ");
                                                                                    receivedMessage.channel.send("La suite dans le prochain épisode ! recommencer avec `!histoire spatial` si vous voulez essayer d'autres fin");
                                                                                } else {
                                                                                    receivedMessage.channel.send("Alerte rouge ! https://tenor.com/view/star-trek-gif-5702396");
                                                                                    receivedMessage.channel.send("La suite dans le prochain épisode ! recommencer avec `!histoire spatial` si vous voulez essayer d'autres fin");
                                                                                }
                                                                            } catch(err) {
                                                                                receivedMessage.channel.send('Dites `1` ou `2`');
                                                                            }
                                                                        }
                                                                        //fin itération 5
                                                                    }
                                                                } catch(err) {
                                                                    receivedMessage.channel.send('Dites `1` ou `2`');
                                                                }
                                                            }
                                                            //fin itération 4

                                                        } else {
                                                            receivedMessage.channel.send("Malheureusement non, il ne faut pas aller par là car Cassiopeia n'est pas réputé pour y abriter de la vie, en réalité, cette constellation est tellement loin que les scientifique ne sont sur de rien, recommencer avec `!histoire spatial`");
                                                        }
                                                    } catch(err) {
                                                        receivedMessage.channel.send('Dites `1` ou `2`');
                                                    }
                                                }
                                                //fin itération 3

                                            }
                                        } catch(err) {
                                            receivedMessage.channel.send('Dites `1` ou `2`');
                                        }
                                    }
                                    //fin itération 2
                                } else {
                                  //si choix 2
                                    receivedMessage.channel.send('Le contact de l\'éssance et de l\'oxygène provoque une réaction et une explosion suite à l\'allumage des moteurs et la fusée explose ! ... Vous êtes mort https://tenor.com/view/wile-coyote-rocker-gif-10689783 \nRecommencer avec `!histoire spatial` !');
                                }
                            } catch(err) {
                                receivedMessage.channel.send('Dites `1` ou `2`');
                            }
                        }
                        //fin itération 1

                    } else {
                        receivedMessage.channel.send('Faite moi signe si vous voulez commencer cette histoire :wink: ');
                    }
                } catch(err) {
                    receivedMessage.channel.send('Dites `oui` ou `non`');
                }
            }
            //fin question préliminaire

        }
    } else {
        receivedMessage.channel.send("Je ne comprend pas l'histoire que vous souhaitez. Essai `!histoire spatial`")
    }
}
// fonction qui ajoute des questions et réponse à la BD sous forme de fichier texte
function AddDataBase(args,chaine){
        if(args.length <1){
            chaine.channel.send("Vous devez ajouter votre question et votre réponse séparé par '=>' ");
            return;
        }

        // Vérifie que la chaine contient un =>
        position = ("" + chaine + "").indexOf("=>");
        if(position == -1){
            chaine.channel.send("Mauvaise syntaxe tapez la commande !apprendre pour plus d'informations");
            return
        }
        // Vérifie que la chaine contient une réponse
        var indexDuSigne = ("" + chaine + "").indexOf("=>");
        var taille = ("" + chaine + "").length - 2;
        if(indexDuSigne == taille){
            chaine.channel.send("Il semblerait que vous ayez oublié de mettre une réponse après le `=>`");
            return;
        }
        console.log(indexDuSigne);
        console.log(taille);
		var readMe = fs.readFileSync('msg.txt','utf8');
		// Vérfier que la question n'existe pas déjà
		var tableau = readMe.split('\n');
		var i = 0;
		trouve = false;
		while(i<tableau.length){
		// On met la chaine de caractère en minuscule
		tableau[i] = removeAccents(tableau[i].toLowerCase());
		//On séparre en deux la chaine de caractères 0 pour question et 1 pour réponse
		var qr = tableau[i].split('=>');
		chaine = data.content;
		chaine = removeAccents(chaine.toLowerCase());
		// On récupère la question
		position = chaine.indexOf(qr[0]);
        /*qChaine = chaine.split("!new");
        qChaine2 = qChaine[1].split("=>"); 
        console.log(qChaine2[0]);
        console.log(qr[0]);
		if(qChaine2[0] == qr[0])
		*/
		if(position != -1){
            
			trouve = true;
			
			data.channel.send("La question existe déjà !");
			return;
		}
		else{
			trouve = false;
		}
		i=i+1;
	}
	if (!trouve){
		
        console.log(chaine.slice(4));
        chaineSansEspace = chaine.slice(4);
        tab = chaineSansEspace.split("=>");
        tab[0] = trim(tab[0]);
        tab[1] = trim(tab[1]);
        chaineSansEspace = tab[0] + "=>" + tab[1];
        console.log(chaineSansEspace);
        readMe = readMe + '\n' + chaine.slice(4);
		fs.writeFileSync('msg.txt',readMe);
		data.channel.send('Nouvelle question enregistrée');
		trouve = true;
		reponse = true;
	}
}

function searchInDataBase(args,chaine){
	
	if(args.length < 1){
        chaine.channel.send("Cette commande doit être suivie d'une question. Exemple : !question Quelle équipe à remporter la coupe du monde 2018");
        return
    }
	var msg = fs.readFileSync('msg.txt','utf8');
	var tableau = msg.split('\n');
	var i = 0;
	trouve = false;
	
	while(i<tableau.length){
		// On met la chaine de caractère en minuscule et on supprime les accent
		tableau[i] = removeAccents(tableau[i].toLowerCase());
		//On séparre en deux la chaine de caractères 0 pour question et 1 pour réponse
		var qr = tableau[i].split('=>');
		chaine = message;
		chaine = removeAccents(chaine.toLowerCase());
		var qBD = qr[0].split("?");
		// On récupère la question
		position = chaine.indexOf(qBD[0]);
		if(position != -1){
			trouve = true;
			// On récupère et on affiche la reponse
			
				data.channel.send(qr[1]);
				i = tableau.length;
		}
		else{
			trouve = false;
		}

		i = i + 1;
	}
	// Si le message n'a pas pu être traité
	if(trouve == false){
		data.channel.send('Je ne comprends pas votre question Voulez-vous l enregistrer ?');
		data.channel.send('Si oui tapez la commande `!apprendre`');
		return;
	}
}

function DonneLaDateDuJour(chaine){	
	var date = new Date();
	var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
	data.channel.send("Nous sommes " + tab_jour[date.getDay()]);
	trouve = true;

}
function trim(sString) {
    while (sString.substring(0,1) == ' ' || sString.substring(0,1) == '\t' || 
      sString.substring(0,1) == '\r' || sString.substring(0,1) == '\n')
    {
        sString = sString.substring(1, sString.length);
    }
    while (sString.substring(sString.length-1, sString.length) == ' ' || 
      sString.substring(sString.length-1, sString.length) == '\t' || 
      sString.substring(sString.length-1, sString.length) == '\r' || 
      sString.substring(sString.length-1, sString.length) == '\n')
    {
        sString = sString.substring(0,sString.length-1);
    }
    return sString;
}

	position = chaine.indexOf(' jour');
	if (position != -1) {
		DonneLaDateDuJour(chaine);
	}


	chaine = message;
	position = chaine.indexOf("recherche google");
	if(position != -1){
		data.channel.send('Ok, tape la commande `!google` et ecrit à la suite ce que tu veux que je recherche');
		trouve = true;
	}
		
	/*
	chaine = removeAccents(data.content.toLowerCase());
	position = chaine.indexOf('ok');
	var position2 = chaine.indexOf("dac");
	if(position != -1 || position2 !=-1){
		data.channel.send(":ok_hand:")
		trouve = true;

	}
	chaine = removeAccents(data.content.toLowerCase());
	position = chaine.indexOf('merci');
	if(position != -1){
		data.channel.send("Pas de soucis, content d'avoir pu t'aider ! ")
		trouve = true;

	}
	*/
	chaine = "";	
		

});

