const Commande = require('./commande');
module.exports = class Google extends Commande {

	
	static match(message){
		if (message.content.startsWith("!google"))
			return true;

	}


	static action(message){
		let recherche = message.content.split(' ');
		if(recherche[1] != null){
			recherche.shift();
			message.reply("Voci des informations concernant votre recherche pour " + recherche +": " +"\n" 
				+ "https://www.google.fr/#q=" + recherche.join('%20'));
		}
		else{
			message.reply("Il vous faut préciser ce que vous voulez rechercher sur Google.\n Exemple : !google Paris, pour une recherche sur Paris")
		}
	}

}