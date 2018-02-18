var request = require("request");
var cheerio = require("cheerio");
var fs = require ('fs');
const readLine = require('readline');

var jsonPathMichelin = "../michelin/package.json";
var jsonPathLaFourchette = 'package.json';

//AllRestaurants(jsonPathMichelin, jsonPathLaFourchette);
AllPromotions(jsonPathLaFourchette);

function AllRestaurants(jsonPathMichelin, jsonPathLaFourchette)
{
  var contenu = fs.readFileSync(jsonPathMichelin, "UTF-8");
  var json = JSON.parse(contenu);

  var textJson = '{ "LaFourchetteRestaurants" : [';
  fs.writeFileSync(jsonPathLaFourchette, textJson);

  var michelinList = json.MichelinRestaurants;
  const nbrResto = michelinList.length;

  for(var i = 0; i< nbrResto; i++)
  {
      var restaurant = michelinList[i];
      try{
        FindRestaurant(restaurant, jsonPathLaFourchette)
      }
      catch(e){
        console.log(e);
      }
  }
}

function FindRestaurant(restaurant, jsonPathLaFourchette)
{
  var name = restaurant.name;
  var newName = name.replace(/ /g, "%20");
  var codePostal = restaurant.adresse.codePostal;
  var url = "https://www.lafourchette.com/search-refine/"+newName;

  try{
    request({
      uri: url,
    }, function(error, response, body) {
        var $ = cheerio.load(body);

        //nombre de résultats pour le restaurant cherché
        var result = $(".resultItem");
        var nbrResultat = result.length;

        var listNom = [];
        var listAdresse = [];
        var listRef = [];

        if (nbrResultat > 0)
        {

          //ajout dans une liste les adresses des différents résultats
          $(".resultItem").find(".resultItem-address").each(function (index, element) {
            var place = $(element).text().replace("\n", "")
            listAdresse.push(place.substring(28, place.length-53 ));
          });

          //ajout dans deux listes les noms et références des différents résultats
          $(".resultItem").find(".resultItem-name a").each(function (index, element) {
            listRef.push($(element).attr('href'));
            listNom.push($(element).text());
          });
        }

        // si le nom du restaurant est EXACTEMENT le meme sur la fourchette
        if (listNom.length > 0 )
        {
          for (var j=0; j<nbrResultat; j++)
          {
            if (listNom[j].includes(name))
            {
              //et si l'adresse de lafourchette contient le meme code codePostal
              // en supposant que par ville aucun restaurants ne s'appellent pareil
                if (listAdresse[j].includes(codePostal))
                {
                  //je le mets dans mon fichier json lafourchette
                  var newResto = '\n{ "originName": "' + name + '", "name": "'+ listNom[j] +'", "adresse": "' + listAdresse[j] + '", "url": "' + listRef[j] + '"}, ';
                  console.log(newResto);
                  fs.appendFileSync(jsonPathLaFourchette, newResto);
                }
            }
          }
        }
      });
  }
  catch(e){
    console.log(e);
  }
}

function FindPromotion(restaurant)
{
  var url = "https://www.lafourchette.com" + restaurant.url;

  try {
    request({
      uri: url,
    }, function(error, response, body) {
        var $ = cheerio.load(body);

        $(".saleType").each(function (index, element) {
          var promo = $(element).text()
          console.log(promo);
        });
  })}
  catch(e)
  {
    console.log(e);
  }
}

function AllPromotions(jsonPathLaFourchette)
{
  var contenu = fs.readFileSync(jsonPathLaFourchette, "UTF-8");
  var json = JSON.parse(contenu);
  var laFourchetteList = json.LaFourchetteRestaurants;
  const nbrResto = laFourchetteList.length;
  for (var i=0; i< nbrResto; i++)
  {
    var restaurant = laFourchetteList[i];
    try{
      FindPromotion(restaurant);
    }
    catch(e){
      console.log(e);
    }
  }
}
