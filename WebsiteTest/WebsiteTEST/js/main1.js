// The root URL for the RESTful services
var rootURL = "http://localhost/myWalletApp/api/wallets";

var currentToken

// Map the on click events when dom loads along side of the Dom elements
$(document).ready(function () {
	findAll();
	$(document).on("click", '#table_body td', function () { findById(this.id); });
	$(document).on("click", '#addToken', function(){modalTable();});
	$(document).on("click", '#addWallet', function(){addWallet();});
	$(document).on("click", '#delToken', function(){deleteToken();});
	//Update the edtToken event handler
	$(document).on("click", '#edtToken', function() {updateModalTable();});
	$(document).on("click", '#savetkn', function() {updateWallet();});
});
//	Find all Wallets 
var findAll = function () {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: renderList
	});
};
// Find Token By ID
var findById = function (id) {
	console.log('findById: ' + id);
	//alert("findbyid");
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function (data) {
			console.log('findById success: ' + data.name);
			renderDetails(data);
		}
	});
};

//	Populates the fields with the associated elements
var renderDetails = function (wallet) {
	var htmlStr = '<h2 id="currentId">' +
		wallet.id + '</h2><h2>' +
		wallet.name + '</h2><h2>' +
		wallet.token + '</h2><h2>' +
		wallet.network + '</h2><h2>' +
		wallet.utility + '</h2><h2>' +
		wallet.quantity + '</h2><h2>' +
		wallet.totalSupply + '</h2><P>' +
		wallet.description + '<BR><HR>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Token</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Token</button>';
		$("#modalFooter").html(htmlButtons);
};

//Calls the POST method of your rest API. Uses the formToJSON to format it for insert / Creates a new resource
var addWallet = function () {
	console.log('AddWallet');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Token created successfully');
            findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addToken error: ' + textStatus);
		}
	});
};

//Calls the PUT method of your rest API. 
var updateWallet = function () {
	console.log('updateWallet');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#currentId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Token updated successfully');
                        findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateToken error: ' + textStatus);
		}
	});
};

//	Display the database elements in the modal
var renderList = function (data) {
	list = data.wallet;
	console.log("response");
	console.log(list);
	$('#table_body tr').remove();
	$.each(list, function (index, wallet) {
		$('#table_body').append('<tr><td>' +
			wallet.name + '</td><td>' +
			wallet.token + '</td><td>' +
			wallet.network + '</td><td>' +
			wallet.utility + '</td><td>' +
			wallet.quantity + '</td><td>' +
			wallet.totalSupply + '</td><td  id="' +
			wallet.id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};
// Create a new resouce
var modalTable = function () {
	var htmlStr = '<h2>Add a new Token</h2>' +
	'<table id="addNewToken">' +
	'<tr>' +
		'<td>'+
			'<label>Name: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="name">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Token: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="token">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Network: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="network">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Utility: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="utility">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Quantity: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="quantity">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Total Supply: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="totalSupply">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Picture: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="picture">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Description: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="description">' +
		'</td>'+
	'</tr>';
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="addWallet">Add Token</button>' +
		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
	$("#contents").html(htmlStr);
	$("#modalFooter").html(htmlButtons);
	$('#myModal').modal('show');
};

var updateModalTable = function () {
	var htmlStr = '<h2>Edit a new Token</h2>' +
	'<table id="editToken">' +
	'<tr>' +
		'<td>'+
			'<label>Name: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="name">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Token: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="token">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Network: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="network">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Utility: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="utility">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Quantity: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="quantity">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Total Supply: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="totalSupply">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Picture: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="picture">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Description: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="description">' +
		'</td>'+
	'</tr>';
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="savetkn">Edit Token</button>"' +
		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
	$("#contents").html(htmlStr);
	$("#modalFooter").html(htmlButtons);
	$('#myModal').modal('show');
};

// Users Not needed

// Helper function to serialize all the form fields into a JSON string
var formToJSON=function () {
	var string = JSON.stringify({
		"name": $('#name').val(), 
		"token": $('#token').val(),
		"network": $('#network').val(),
		"utility": $('#utility').val(),
		"quantity": $('#quantity').val(),
		"totalSupply": $('#totalSupply').val(),
		"picture": $('#picture').val(),
		"description": $('#description').val()
		});
		//	Display the values within the Console Log
		console.log($('#name').val())
		console.log($('#token').val())
		console.log($('#network').val())
		console.log($('#utility').val())
		console.log($('#quantity').val())
		console.log($('#totalSupply').val())
		console.log($('#picture').val())
		console.log($('#description').val())
	console.log(string);
	return string;
};
//	Remove a resource from the list
var deleteToken = function (){
	console.log("deleteToken");
	console.log($('currentId').text())
	console.log('You sold');
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: rootURL + '/' + $('currentId').text(),
		success: function(data, textStatus, jqXHR){
			alert('Token Removed Succesfully');
			findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('remove Token error: ' + textStatus);
		}
	})
};
