
![pizza mania](./img/pizzaMania.png)
# Pizza Mania ![pizza slice ](./img/pizzaSlice.png)

## Overview

This project is an Angular website released during my [APSIO professional Bachelor](https://www.iut-blagnac.fr/fr/formations/lp-apsio) for the Angular courses.

This webapp is a pizza ordering services which work with an embed local server.

You can see some shots of the website below :
### Accueil :
![Accueil](./img/accueilPizzaMania.PNG)

### Pizza à la carte : 
![Carte](./img/cartePizzaMania.PNG)

### Composez vos propres pizza :
![Composition](./img/creerPizzaMania.PNG)

## To run the webapp ![Run](./img/play.gif)

### 1)
 Clone the entire PizzaMania folder somewhere on your disk root or user root *Exemple : C:\Users\MyName*

### 2)
 Download and install Node.js by the following link : (https://nodejs.org/en/download/)


### 3)
 Install Angular in the folder *PizzaMania/pizzamania-jeremieb* by the following bash command :  
```bash
npm install –g @angular/cli
```


### 4)
 Then, in the *pizzamania-jeremieb* directory execute the command :
```bash
npm install --save-dev @angular-devkit/build-angular
```


### 5)
 Start the pizza ordering server located in the folder *PizzaMania* by executing the following command: 
```bash
java -jar server-2.jar
```


### 6)
 Finally, run the website with the command below on *pizzamania-jeremieb* : 
```bash
ng serve --open
```
**The website will be launched with the default web browser and just clicking on the "Accueil" link. Now enjoying !**




