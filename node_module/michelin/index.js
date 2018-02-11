var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");


var lien = "https://restaurant.michelin.fr";
var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin";

var pathJsonFile = "package.json";
var textJson = '{ "MichelinRestaurants" : [';

fs.writeFileSync(pathJsonFile, textJson);


request(
  {
  uri: url,
  },function(error, response, body) {
    var $ = cheerio.load(body);

    var nbPage = $(".mr-pager-item")[12].children[0].attribs["attr-page-number"];

    for (var i=1; i<=nbPage; i++)
    {
      request(
      {
        uri : url + "/page-" + i,
      },function(error, response, body){
        var $ = cheerio.load(body);

        $(".poi-card-link").each(function()
        {
          var link = $(this);
          var href = link.attr("href");
          var adresse = lien+href;

          request(
          {
            uri: adresse,
          },function(error, response, body){

            var name;
            var lieu;
            var codeP;
            var ville;
            var tel;

            try{

              var $2 = cheerio.load(body);

              name = $2(".poi_intro-display-title").text().replace("\n", "").replace("      ", "").replace("    ", "");

              try{
                lieu = $2(".thoroughfare")[0].children[0].data;
              }
              catch(e){
                console.log(e);
              }

              try{
                codeP = $2(".postal-code")[0].children[0].data;
              }
              catch(e){
                console.log(e);
              }

              ville = $2(".locality")[0].children[0].data;

              tel = $2(".tel").text();

              var restaurantLineJson ='\n{ "name": "'+name +'", "adresse" : { "quartier" : "' + lieu + '", "codePostal" : "' + codeP + '", "ville" : "' + ville +'" }, "telephone" : "' + tel + '" },';
              console.log(restaurantLineJson);
              fs.appendFileSync(pathJsonFile, restaurantLineJson);

            }
            catch(e){
              console.log(e);
            }
          });
        });
      });
    }
  });
