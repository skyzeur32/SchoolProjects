const Commande = require("./commande");
const fs = require('fs');
module.exports = class Apprendre extends Commande{


	static match(message){
		if (message.content.startsWith("!apprendre"))
			return true;

	}


	static action(message){
		message.reply("Pour faire apprendre une nouvelle question au Bot.")
		message.reply("Ecrivez !new suivie de la question suivie de la réponse que le bot doit donner en séparant la question et la réponse avec " +
			"=>");
		message.reply("Exemple : !new Quelle est la hauteur du mont Everest ? => 8 848 mètres");
		message.reply("C'est à vous !");
		
	}
	

}