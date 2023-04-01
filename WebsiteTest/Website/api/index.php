<?php
require 'Slim/Slim.php';
require 'wallet_db.php';
require 'database.php';
use Slim\Slim;
\Slim\Slim::registerAutoloader();

//$app = new Slim();
//  Wallet Methods
//$app->get('/wallets', 'getWallets');
//$app->get('/wallets/:id',  'getWallet');
//$app->get('/wallets/search/:query', 'findByToken');
//$app->post('/wallets', 'addWallet');
//$app->delete('/wallets/:id',	'deleteToken');
//$app->put('/wallets/:id', 'updateWallet');

//  User Methods
$app->get('/users', 'getUsers');
$app->get('/users/:id',  'getUser');
$app->get('/users/search/:query', 'findByUser');
$app->post('/users', 'addUser');
$app->delete('/users/:id',	'deleteUser');
$app->put('/users/:id', 'updateUser');
$app->run();
?>



