// The root URL for the RESTful services
var rootURL = "http://localhost/Website/api/jobs";

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
//	Find all Jobs
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
var renderDetails = function (job) {
	var htmlStr = '<h2 id="currentId">' +
		job.job_id + '</h2><h2>' +
		job.client_name + '</h2><h2>' +
		job.client_email + '</h2><h2>' +
		job.client_number + '</h2><h2>' +
		job.company_name + '</h2><h2>' +
		job.client_address + '</h2><h2>' +
		job.additional_Information + '<BR><HR>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
		$("#modalFooter").html(htmlButtons);
};


//	Display the database elements in the modal
var renderList = function (data) {
	list = data.jobs;
	console.log("response");
	console.log(list);
	$('#table_body tr').remove();
	$.each(list, function (index, job) {
		$('#table_body').append('<tr><td>' +
		job.job_id + '</td><td>' +
		job.client_name + '</td><td>' +
		job.client_email + '</td><td>' +
		job.client_number + '</td><td>' +
		job.company_name + '</td><td>' +
		job.client_address + '</td><td>' +
		job.additional_Information + '</td><td  id="' +
		job.job_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Create a new resouce -- Generation of the Modal For Destruction Form
var modalTable = function () {
	var htmlStr = '<h2>Request Destruction</h2>' +
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
			'<label>Email: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="token">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Phone Number: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="network">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Company Name: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="utility">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Address: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="quantity">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Terms & Conditions: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="totalSupply">' +
		'</td>'+
	'</tr>' +
	'<tr>' +
		'<td>'+
			'<label>Additional Info: </label>' +
		'</td>'+
		'<td>'+
			'<input type="text" id="description">' +
		'</td>'+
	'</tr>';
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="addJob">Request Destruction</button>' +
		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
	$("#contents").html(htmlStr);
	$("#modalFooter").html(htmlButtons);
	$('#myModal').modal('show');
};


// Users Not needed

// Helper function to serialize all the form fields into a JSON string
var formToJSON=function () {
	var string = JSON.stringify({
		"client_name": $('#client_name').val(), 
		"client_email": $('#client_email').val(),
		"client_number": $('#client_number').val(),
		"company_name": $('#company_name').val(),
		"client_address": $('#client_address').val(),
		"additional_Information": $('#additional_Information').val()
		
		});
		//	Display the values within the Console Log
		console.log($('#client_name').val())
		console.log($('#client_email').val())
		console.log($('#client_number').val())
		console.log($('#company_name').val())
		console.log($('#client_address').val())
		console.log($('#additional_Information').val())
	console.log(string);
	return string;
	
};

//Calls the POST method of your rest API. Uses the formToJSON to format it for insert / Creates a new resource
var addJob = function () {
	console.log('AddJob');
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
			alert('addJob error: ' + textStatus);
		}
	});
};