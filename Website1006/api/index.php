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

//  User Table Methods
$app->get('/users', 'getUsers');
$app->get('/users/:id',  'getUser');
//$app->get('/users/search/:query', 'findByUser');
//$app->post('/users', 'addUser');
//$app->delete('/users/:id',	'deleteUser');
//$app->put('/users/:id', 'updateUser');

//  Customers Table Methods
$app->get('/customers', 'getCustomers');
$app->get('/customers/:id',  'getCustomer');
//$app->get('/Customers/search/:query', 'findByCustomer');
//$app->post('/Customers', 'addCustomer');
//$app->delete('/Customers/:id',	'deleteCustomer');
//$app->put('/Customers/:id', 'updateCustomer');

//  Accepted Job Table Methods
$app->get('/acceptedJobs', 'getAcceptedJobs');
$app->get('/acceptedJobs/:id',  'getAcceptedJob');
//$app->get('/acceptedJobs/search/:query', 'findByAcceptedJob');
//$app->post('/acceptedJobs', 'addAcceptedJob');
//$app->delete('/acceptedJobs/:id',	'deleteAcceptedJob');
//$app->put('/acceptedJobs/:id', 'updateAcceptedJob');

// Job Table
$app->get('/alljobs', 'getJobsA');
$app->get('/alljobs/:id',  'getJobA');

//  Signature Table Methods
$app->get('/signatures', 'getSignatures');
$app->get('/signatures/:id',  'getSignature');
//$app->get('/signatures/search/:query', 'findBySignature');
//$app->post('/signatures', 'addSignature');
//$app->delete('/signatures/:id',	'deleteSignature');
//$app->put('/signatures/:id', 'updateSignature');

// Batch Table
$app->get('/batches', 'getBatches');
$app->get('/batches/:id',  'getBatch');
//$app->get('/batches/search/:query', 'findBySignature');
//$app->post('/batches', 'addSignature');
//$app->delete('/batches/:id',	'deleteSignature');
//$app->put('/batches/:id', 'updateSignature');

//  Collected Hard Drives Table Methods
$app->get('/collectedHardDrives', 'getCollectedHardDrives');
$app->get('/collectedHardDrives/:id',  'getCollectedHardDrive');
//$app->get('/collectedHardDrives/search/:query', 'findByCollectedHardDrive');
//$app->post('/collectedHardDrives', 'addCollectedHardDrive');
//$app->delete('/collectedHardDrives/:id',	'deleteCollectedHardDrive');
//$app->put('/collectedHardDrives/:id', 'updateCollectedHardDrive');

//  Video File Table Methods
$app->get('/videoFiles', 'getVideoFiles');
$app->get('/videoFiles/:id',  'getVideoFile');
//$app->get('/videoFiles/search/:query', 'findByVideoFile');
//$app->post('/videoFiles', 'addVideoFile');
//$app->delete('/videoFiles/:id',	'deleteVideoFile');
//$app->put('/videoFiles/:id', 'updateVideoFile');

//  Completed Jobs Table Methods
$app->get('/completedJobs', 'getCompletedJobs');
$app->get('/completedJobs/:id',  'getCompletedJob');
//$app->get('/completedJobs/search/:query', 'findByCompletedJob');
//$app->post('/completedJobs', 'addCompletedJob');
//$app->delete('/completedJobs/:id',	'deleteCompletedJob');
//$app->put('/completedJobs/:id', 'updateCompletedJob');
$app->run();
?>



