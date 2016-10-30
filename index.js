#!/usr/bin/env/node

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const shelljs = require('shelljs/global');
const execSync = require('child_process').execSync;

if(process.argv[2] === undefined) {
	console.log(chalk.red('provide a package name'));
	return;
}

const spinner = ora(`creating package ${process.argv[2]}`).start();

mkdir('-p', process.argv[2]);
//copy files with names
cp(path.join(__dirname, 'templates/*'), process.argv[2]);
//copy dot-files
cp('-R', path.join(__dirname, 'templates/.*'), process.argv[2]);

if(process.argv[3] === '-m') {
	spinner.text = 'creating mocha tests';
	cp('-R', path.join(__dirname, 'templates/mocha/test'), process.argv[2]);
}
else if(process.argv[3] === '-a') {
	spinner.text = 'creating ava tests';
	cp('-R', path.join(__dirname, 'templates/ava/test'), process.argv[2]);
}
else {
	spinner.text = 'please provide correct options';
	spinner.fail();
	console.log(`
	Usage:
	$ nps -m - package with mocha tests
	$ nps -a - package with ava tests
	`);
	return;
}

cd(process.argv[2]);
execSync('npm init', {stdio: 'inherit'});

spinner.text = 'package structure created !';
spinner.succeed();

console.log(`
	$ cd ${process.argv[2]}
	$ npm install
`);

console.log(`Happy hacking`);