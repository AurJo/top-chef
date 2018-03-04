# TOP CHEF

**LES CONSIGNES **

## Introduction

Each year, Michelin publish the Michelin Red Guide which awards Michelin stars to some restaurants.

The criteria for the stars are:

1. Michelin star **"A very good restaurant in its category"** (Une très bonne table dans sa catégorie)
2. Michelin stars: **"Excellent cooking, worth a detour"** (Table excellente, mérite un détour)
3. Michelin stars: **"Exceptional cuisine, worth a special journey"** (Une des meilleures tables, vaut le voyage)

Ther average price for a starred restaurant could start from 50€ up to more than 400€.

Thanks the [LaFourchette](https://www.lafourchette.com), you can book a restaurant at the best price and get exclusive offers and discount up to 50%.

![michelin](./img/michelin.png)

![lafourchette](./img/lafourchette.png)

## Objective - Workshop in 1 sentence

**Get the current deal for a French Michelin starred restaurants.**

## How to do that?

By creating a link between [restaurant.michelin.fr](https://restaurant.michelin.fr/), [lafourchette.com](https://www.lafourchette.com) and the end-user.

#### Michelin Restaurant

1. How it works https://restaurant.michelin.fr
2. What are the given properties for a starred restaurant: name, adress, town, stars, chef... ?
3. ...

Some things to do:

1. Browse the website
2. define the JSON schema for a restaurant
3. ...

#### Deals from LaFourchette

1. How it works https://www.lafourchette.com
2. What are the properties that we need to provide to lafourchette.com to get a deal ?
3. How to identify a deal on the page ?
4. ...

Some things to do:

1. Browse the website
2. Check how that you can get the deal: api etc.... (check network activity)
3. define the properties required to get a deal
4. define the JSON schema for a deal
5. ...

#### The web application

Some things to do:

1. How to create a link between the starred restaurant and lafourchette?

### Server-side with Node.js

### Client-side with React

MVP to do:

1. List French starred restaurant and their current deals

**RESULTATS**

#### Michelin Restaurant
[dossier public/michelin]
A l'aide d'une requete sur "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin",
j'ai réussi à obtenir tous les restaurants sur le site Michelin. Je les ai enregistré dans un fichier package.json. Ainsi j'ai toutes les informations les plus importantes de
ces restaurants (c'est à dire : nom, adresse, télépone).

#### Deals from LaFourchette
[dossier public/lafourchette]
Pour chaque restaurant michelin dans le fichier json, je fais une requete sur  "https://www.lafourchette.com" pour voir si le restaurant existe. Si c'est le cas, je vérifie que l'adresse soit exacte (en supposant qu'il ne peut pas y avoir 2 restaurants du même nom dans la même ville).
Une fois que c'est bon, je récupère les informations sur lafourchette et je les enregistre dans package.json.
Pour chaque restaurant dans ce fichier, je cherche s'il a une ou des promotions, et je recopie le tout dans un fichier promotion.json.
Je n'ai pas réussi cette dernière partie à cause du système antibot du site LaFourchette.

#### The web application
[dossier public]
Pour finir, j'ai tout de même crée une page html pour afficher mes 'résultats'.
Je n'ai pas réussi à utiliser REACT ou même AJAX. Du coup, j'ai copié/collé mon fichier json dans le index.js pour le parser et afficher les résultats.
(Les promotions sont des promotions fictives que j'ai ajouté moi même).

**TO DO**
1. Dans public, ouvrir le fichier index.html
2. Cliquer sur 'See results'
La liste des restaurants apparait. 
