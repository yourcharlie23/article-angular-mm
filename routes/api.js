var sconfig = require('../sconfig');
var mysql      = require('mysql');
var connection = mysql.createConnection(sconfig.mysql);
module.exports = function(app){
	connection.connect();
	// var create_user = "CREATE TABLE IF NOT EXISTS USER_PROFILE (USER_ID INTEGER(10) NOT NULL AUTO_INCREMENT, EMAIL VARCHAR(100), PASSWORD VARCHAR(100), PASSWORD_CODE VARCHAR(50), NAME VARCHAR(100), LAST_ARTICLE_ID INTEGER(10), CONSTRAINT USER_ID_PK PRIMARY KEY (USER_ID), CONSTRAINT EMAIL_UQ UNIQUE (EMAIL), TIMESTAMP DATETIME)";
	// var create_aticle = "CREATE TABLE IF NOT EXISTS ARTICLE (ID INTEGER(10) NOT NULL AUTO_INCREMENT, ARTICLE_ID INTEGER(10), TITLE VARCHAR(1000), BODY VARCHAR(10000), TIMESTAMP DATETIME, VERSION INTEGER(10), OWNER INTEGER(10), SAVED_BY INTEGER(10), CONSTRAINT ID_PK PRIMARY KEY (ID), CONSTRAINT FK_OWNER FOREIGN KEY (OWNER) REFERENCES USER_PROFILE (USER_ID), CONSTRAINT FK_SAVEDBY FOREIGN KEY (SAVED_BY) REFERENCES USER_PROFILE (USER_ID))";
	var create_user = "CREATE TABLE IF NOT EXISTS user_profile (user_id INTEGER(10) NOT NULL AUTO_INCREMENT, email VARCHAR(100), password VARCHAR(100), password_code VARCHAR(50), name VARCHAR(100), last_article_id INTEGER(10), CONSTRAINT user_id_pk PRIMARY KEY (user_id), CONSTRAINT email_uq UNIQUE (email), timestamp DATETIME)";
	var create_aticle = "CREATE TABLE IF NOT EXISTS article (article_id INTEGER(10) NOT NULL AUTO_INCREMENT, main_article_id INTEGER(10), title VARCHAR(1000), content VARCHAR(10000), timestamp DATETIME, version INTEGER(10), owner INTEGER(10), saved_by INTEGER(10), CONSTRAINT id_pk PRIMARY KEY (article_id), CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES user_profile (user_id), CONSTRAINT fk_savedby FOREIGN KEY (saved_by) REFERENCES user_profile (user_id))";
	
	// connection.query('drop table user_profile', function(err, rows, fields) {
	//   if (err) throw err;

	//   console.log('create_user table: ', rows);
	// });
	// connection.query('drop table article', function(err, rows, fields) {
	//   if (err) throw err;

	//   console.log('create_aticle table: ', rows);
	// });
	// connection.query('show tables', function(err, rows, fields) {
	//   if (err) throw err;

	//   console.log('show table: ', rows);
	// });
	// connection.query('select * from article', function(err, rows, fields) {
	//   if (err) throw err;

	//   console.log('show articles: ', rows);
	// });
	connection.query(create_user, function(err, rows, fields) {
	  if (err) throw err;

	  console.log('create_user table:', rows);
	});
	connection.query(create_aticle, function(err, rows, fields) {
	  if (err) throw err;

	  console.log('create_aticle table: ', rows);
	});

	// connection.end();


  app.post('/api/adduser', function (req, res) {
   	console.log("adduser", req.body);
   	var add_user = "INSERT INTO user_profile (email, password, name, timestamp) VALUES ('"+req.body.email+"', '"+req.body.password+"', '"+req.body.name+"', NOW());";
		console.log(add_user);
		connection.query(add_user, function(err, rows, fields) {
			console.log('add_user: ', err, rows);
			if (err) return res.sendStatus(500);
			
      res.send(rows);
		});
	});

	app.post('/api/getuser', function (req, res) {
   	console.log("getuser", req.body);
   	var getuser = "SELECT email, name, user_id, timestamp, last_article_id FROM user_profile WHERE email = '"+req.body.email+"' AND password = '"+req.body.password+"';";
		console.log(getuser);
		connection.query(getuser, function(err, rows, fields) {
			console.log('getuser: ', err);
			if (err) return res.sendStatus(500);
			console.log('getuser: ', rows);
      res.send(rows);
		});
	});

	app.post('/api/updateuser/:field/:verifyfield', function (req, res) {
   	console.log("updateuser", req.body, req.params.field);
   	var field_value = req.body[req.params.field];
   	var other_set = "";
   	if(req.params.field == 'password'){
   		other_set = " , password_code = '' ";
   	}
   	if(req.params.field == 'password_code'){
   		field_value = (new Date()).getTime();
   		console.log("link to reset the password:   /resetpassword?code="+field_value);
   	}
   	var updateuser = "UPDATE user_profile SET "+ req.params.field +" = '"+field_value+"' "+other_set+" WHERE "+req.params.verifyfield+" = '"+req.body[req.params.verifyfield]+"';";
		console.log(updateuser);
		connection.query(updateuser, function(err, rows, fields) {
			console.log('updateuser: ', err, rows);
			if (err) return res.sendStatus(500);
			
      res.send(rows);
		});
	});

	app.post('/api/addarticle', function (req, res) {
   	console.log("addarticle", req.body);
   	if(!req.body.title) req.body.title = '';
   	if(!req.body.main_article_id) req.body.main_article_id = null;
   	var addarticle = "INSERT INTO article (title, content, main_article_id, owner, saved_by, timestamp) VALUES ('"+req.body.title+"', '"+req.body.content+"', "+req.body.main_article_id+", "+req.body.owner+", "+req.body.saved_by+", NOW());";
		console.log(addarticle);
		connection.query(addarticle, function(err, rows, fields) {
			console.log('addarticle: ', err);
			if (err) return res.sendStatus(500);
			
      res.send(rows);
		});
	});

	app.get('/api/getarticle/:articleid', function (req, res) {
   	console.log("getarticle", req.body);
   	if(!req.params.articleid) return res.sendStatus(500);
   	var getarticle = "SELECT * FROM article WHERE article_id = " + req.params.articleid +";";
		console.log(getarticle);
		connection.query(getarticle, function(err, rows, fields) {
			console.log('getarticle: ', err);
			if (err) return res.sendStatus(500);
			
      res.send(rows);
		});
	});

	app.get('/api/getarticlelist', function (req, res) {
   	console.log("getarticlelist", req.body);
   	var getarticlelist = "SELECT a.* FROM article a INNER JOIN (SELECT IFNULL(main_article_id, article_id) AS main_id, MAX(timestamp) AS maxdate FROM article GROUP BY main_id) b ON (a.article_id = b.main_id OR a.main_article_id = b.main_id) AND a.timestamp = b.maxdate ORDER BY a.timestamp DESC;";
		console.log(getarticlelist);
		connection.query(getarticlelist, function(err, rows, fields) {
			console.log('getarticlelist: ', err, rows);
			if (err) return res.sendStatus(500);
			
      res.send(rows);
		});
	});

	app.get('/api/getrevisionlist/:articleid', function (req, res) {
   	console.log("getrevisionlist", req.body);
   	if(!req.params.articleid) return res.sendStatus(500);
   	var getrevisionlist = "SELECT * FROM article WHERE main_article_id = " + req.params.articleid +" OR article_id = "+req.params.articleid+" ORDER BY timestamp DESC;";
		console.log(getrevisionlist);
		connection.query(getrevisionlist, function(err, rows, fields) {
			console.log('getrevisionlist: ', err);
			if (err) return res.sendStatus(500);
			
      res.send(rows);
		});
	});


    //other routes..
}