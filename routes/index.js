var fs = require("fs");
var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET requests */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', {title: 'Signup | mynode'})
})

/* POST requests */
router.post('/api/register', function(req, res, next) {
	var newUser = User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	var sampleObject = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	}
	var obj = JSON.parse(fs.readFileSync('./public/json/events.json', 'utf8'));
	obj[req.body.email] = sampleObject
	// save the user
	newUser.save(function(err) {
		if (err) console.log(err);
		else {
			fs.writeFile("./public/json/events.json", JSON.stringify(obj, null, 4), function(err) {
			    if (err) {
			        console.error(err);
			        return;
			    };
			    console.log("File has been created");
			});
			res.render('index', {title: 'Successfully created'})
			console.log('User created!');
		}
	})
})

router.post('/json/newMod', function(req, res, next){
	var filename = req.body.filename
	var foldername = req.body.foldername
	var data = {
		name: filename,
		link: req.body.link || "",
		image: req.body.image || ""
	}
	var path = './public/json/' + foldername
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path)
		console.log('folder created')
	}
	if (!fs.existsSync(path + '/' + filename + '.json')) {
		fs.writeFile('./public/json/' + foldername + '/' + filename + '.json', JSON.stringify(data, null, 4), function(err) {
			if(err) {
				console.log(err)
			} else {
				res.render('addmodule', {title: 'Add module', message: 'Added new module'})
			}
		})
	} else {
		res.render('addmodule', {title: 'Add module', message: 'Module exists'})
	}
})

router.get('/createcat', function(req, res, next) {
	res.render('createcat', {title: 'Add the fields for a module', message: ''})
})

router.get('/addmod', function(req, res, next) {
	res.render('addmodule', {title: 'Add module', message: ''})
})

router.post('/cretect', function(req, res, next) {
	var obj = JSON.parse(fs.readFileSync('./public/json/model.json', 'utf8'))
	var path = './public/' + req.body.category
	obj[req.body.category] = JSON.parse(req.body.info)
	console.log(obj)
	if (!fs.existsSync(path)) {
	    fs.writeFile('./public/json/model.json', JSON.stringify(obj, null, 4), function(err) {
		    if(err) {
			    console.log(err)
		    } else {
		        fs.mkdirSync(path)
		    	res.send("Successfully added")
		    }
	    })
	} else {
		res.send("Already exists")
	}
})

router.get('/editcat', function(req, res, next) {
	res.render('editcat', {title: 'Edit module'})
})

module.exports = router;
