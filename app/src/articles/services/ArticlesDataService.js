/**
 * Articles DataService
 * Articles embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function ArticlesDataService($q, $http) {
  var articles = [
    {
      article_id: 1,
      title: 'Lia Lugo',
      avatar: 'svg-1',
      content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
    },
    {
      article_id: 2,
      title: 'George Duke',
      avatar: 'svg-2',
      content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
    },
    {
      article_id: 3,
      title: 'Gener Delosreyes',
      avatar: 'svg-3',
      content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
    },
    {
      article_id: 4,
      title: 'Lawrence Ray',
      avatar: 'svg-4',
      content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
    },
    {
      article_id: 5,
      title: 'Ernesto Urbina',
      avatar: 'svg-2',
      content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
    },
    {
      article_id: 6,
      title: 'Gani Ferrer',
      avatar: 'svg-4',
      content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
    }
  ];

  // Promise-based API
  return {
    loadAllArticles: function() {
      // Simulate async nature of real remote calls
      return $q.when(articles);
    },
    adduser: function(fields, callback){
      $http.post("/api/adduser", fields, {}).success(function(data, status) {
          
        return callback(false, data);
      }).error(function(data, status) {
        return callback(true, status, data);
      });
    },
    getuser: function(fields, callback){
      $http.post("/api/getuser", fields, {}).success(function(data, status) {
          console.log(data, status);
        return callback(false, data);
      }).error(function(data, status) {
          console.log("err", data, status);
        return callback(true, status, data);
      });
    },
    updatepassword: function(fields, verifyfield, callback){
      $http.post("/api/updateuser/password/"+verifyfield, fields, {}).success(function(data, status) {
          
        return callback(false, data);
      }).error(function(data, status) {
        return callback(true, status, data);
      });
    },
    forgotpassword: function(fields, verifyfield, callback){
      $http.post("/api/updateuser/password_code/"+verifyfield, fields, {}).success(function(data, status) {
          
        return callback(false, data);
      }).error(function(data, status) {
        return callback(true, status, data);
      });
    },
    savearticle: function(fields, callback){
      var url = "/api/addarticle";
      if(fields.saved_by)
        fields.owner = null;
      else
        fields.saved_by = null;
      $http.post(url, fields, {}).success(function(data, status) {
          
        return callback(false, data);
      }).error(function(data, status) {
        return callback(true, status, data);
      });
    },
    getarticlelist: function(fields, callback){
      $http.get("/api/getarticlelist", {}).success(function(data, status) {
          
        return callback(false, data);
      }).error(function(data, status) {
        return callback(true, status, data);
      });
    },
    getrevisionlist: function(fields, callback){
      $http.get("/api/getrevisionlist/"+fields.article_id, {}).success(function(data, status) {
          
        return callback(false, data);
      }).error(function(data, status) {
        return callback(true, status, data);
      });
    }
  };
}

export default ['$q', '$http', ArticlesDataService];

