const Commande = require('./commande');
module.exports = class Meteo extends Commande {

	
	static match(message){
		if (message.content.startsWith("!meteo"))
			return true;

	}


	static action(message){
		let recherche = message.content.split(' ');
		
		if(recherche[1] != null){
			console.log(recherche[1]);
			recherche.shift();
			message.reply("La météo pour la ville de " + recherche +" est : " +"\n" 
				+ "https://www.google.fr/#q=meteo%20" + recherche.join('%20'));
		}
		else{
			message.reply("Il vous faut préciser la ville dont vous voulez connaître la météo.\n Exemple : !meteo Paris");
		}
	}

}