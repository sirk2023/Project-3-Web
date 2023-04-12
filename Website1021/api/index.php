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
$app->delete('/requestedJobs/:id',	'deleteRequestedJob');
$app->put('/requestedJobs/:id', 'updateRequestedJob');

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
$app->get('/customers/search/:query', 'findByCustomerName');
$app->post('/customers', 'addCustomer');
$app->delete('/customers/:id',	'deleteCustomer');
$app->put('/customers/:id', 'updateCustomer');

//  Accepted Job Table Methods
$app->get('/acceptedJobs', 'getAcceptedJobs');
$app->get('/acceptedJobs/:id',  'getAcceptedJob');
$app->post('/acceptedJobs', 'addAcceptedJob');
$app->delete('/acceptedJobs/:id',	'deleteAcceptedJob');
$app->put('/acceptedJobs/:id', 'updateAcceptedJob');

// Job Table
$app->get('/alljobs', 'getJobsA');
$app->get('/alljobs/:id',  'getJobA');

//  Signature Table Methods
$app->get('/signatures', 'getSignatures');
$app->get('/signatures/:id',  'getSignature');
$app->post('/signatures', 'addSignature');
$app->delete('/signatures/:id',	'deleteSignature');
$app->put('/signatures/:id', 'updateSignature');

// Batch Table
$app->get('/batches', 'getBatches');
$app->get('/batches/:id',  'getBatch');
$app->post('/batches', 'addBatch');
$app->delete('/batches/:id',	'deleteBatch');
$app->put('/batches/:id', 'updateBatch');

//  Collected Hard Drives Table Methods
$app->get('/collectedHardDrives', 'getCollectedHardDrives');
$app->get('/collectedHardDrives/:id',  'getCollectedHardDrive');
$app->post('/collectedHardDrives', 'addCollectedHardDrive');
$app->delete('/collectedHardDrives/:id','deleteCollectedHardDrive');
$app->put('/collectedHardDrives/:id', 'updateCollectedHardDrive');

//  Video File Table Methods
$app->get('/videoFiles', 'getVideoFiles');
$app->get('/videoFiles/:id',  'getVideoFile');
$app->post('/videoFiles', 'addVideoFile');
$app->delete('/videoFiles/:id',	'deleteVideoFile');
$app->put('/videoFiles/:id', 'updateVideoFile');

//  Completed Jobs Table Methods
$app->get('/completedJobs', 'getCompletedJobs');
$app->get('/completedJobs/:id',  'getCompletedJob');
$app->get('/completedJobs/search/:query', 'findByCompletedJobName');
$app->post('/completedJobs', 'addCompletedJob');
$app->delete('/completedJobs/:id',	'deleteCompletedJob');
$app->put('/completedJobs/:id', 'updateCompletedJob');
$app->run();
?>



