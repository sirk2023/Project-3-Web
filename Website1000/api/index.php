<?php
require 'Slim/Slim.php';
require 'functions.inc.php';
require 'database.php';
use Slim\Slim;
\Slim\Slim::registerAutoloader();

$app = new Slim();
//  request_job Methods
$app->get('/requestedJobs', 'getRequestedJobs');
$app->get('/requestedJobs/:id',  'getRequestedJob');
$app->get('/requestedJobs/search/:query', 'findByCompanyName');
$app->post('/requestedJobs', 'requestAddJob');
//$app->delete('/jobs/:id',	'deleteJob');
//$app->put('/jobs/:id', 'updateJob');

// Job Table
$app->get('/alljobs', 'getJobsA');
$app->get('/alljobs/:id',  'getJobA');

// Batch Table
$app->get('/batchs', 'getbatchs');
$app->get('/batchs/:id',  'getbatch');

//  User Methods
//$app->get('/users', 'getUsers');
//$app->get('/users/:id',  'getUser');
//$app->get('/users/search/:query', 'findByUser');
//$app->post('/users', 'addUser');
//$app->delete('/users/:id',	'deleteUser');
//$app->put('/users/:id', 'updateUser');
$app->run();
?>



