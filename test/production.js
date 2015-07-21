var should = require('should');
var debug = require('debug')('febu:' + __filename);
var replace = require('frep');
var fs = require('fs');
var path = require('path');
var common = require('../module/common.js');
var db = require('../module/db.js');
var P = require('../module/production.js');
var Git = require('../module/git.js');

describe(__filename, function(){
	var project = {
		repo: 'http://github.com/holyzfy/test_repo_url',
		development: {
			web: '//qa.developer.test.com/'
		},
		production: {
			web: '//img1.cache.test.com/f2e/'
		}
	};
	
	var p = new P(project);

	before(function(done){
		p.db = db;
		db.open(done);
	});

	after(function(done) {
		db.close(done);
	});

	it('exist', function(done) {
		p.exist('_a_commit_id', function(err, data) {
			data.should.be.false;
			done();
		});
	});

	it('getFilePath', function(done) {
		// TODO
		done();
	});

	it('getBasename', function() {
		var href1 = '//img1.febucache.com/f2e/style/all.1234.group.css';
		p.getBasename(href1).should.be.equal('all.1234.group');

		var href2 = '//img1.febucache.com/f2e/images/logo.png';
		p.getBasename(href2).should.be.equal('logo');

		var href3 = '//img1.febucache.com/f2e/images/logo.123.png';
		p.getBasename(href3).should.be.equal('logo.123');
	});

	it('getFilePath', function(done) {
		var resource = {
			repo: p.project.repo,
			src: ['images/p_logo.png'],
			dest: '//img1.cahce.febucdn.com/xxx/p_logo.123456.png',
			rel: ['style/p_common.css', 'detail.shtml']
		};
		var filepath = 'images/p_logo.png';

		db.resources.save(resource, function(err, newRes) {
			p.getFilePath(filepath, function(err, dest) {
				resource.dest.should.equal(dest);
				db.resources.remove(resource, done);
			});
		});
	});

	it('insertFilePath', function(done) {
		var resource = {
			repo: p.project.repo,
			src: ['images/p_logo.png'],
			dest: '//img1.cahce.febucdn.com/xxx/p_logo.456789.png',
			rel: ['style/p_common.css', 'detail.shtml']
		};
		p.insertFilePath(resource, function(err, newDoc) {
			resource.dest.should.equal(newDoc.dest);
			db.resources.remove(resource, done);
		});
	});

	it('compileStaticFiles', function(done) {
		// TODO
		done();
	});

	it('compileVmFiles', function(done) {
		// TODO
		done();
	});

});