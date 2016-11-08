var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
    	if(file.split('.').pop() != 'js') return;
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        console.log("name", name);
        require('./' + name)(app);
    });
}