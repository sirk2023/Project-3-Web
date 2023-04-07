// The root URL for the RESTful services
var rootURL = "http://localhost/Website1000/api/requestedJobs";
var allJobsURL = "http://localhost/Website1000/api/alljobs";
var batchURL = "http://localhost/Website1000/api/batch";

// Map the on click events when dom loads along side of the Dom elements
$(document).ready(function () {
	findAll();
	//findAllA();
	//findAllBatch();
	$(document).on("click", '#table_body td', function () { findById(this.id); });
	//$(document).on("click", '#table_bodyB td', function () { findByIdA(this.id); });
	$(document).on("click", '#addToken', function () { modalTable(); });
	$(document).on("click", '#addJob', function () { addJob(); });
	$(document).on("click", '#delToken', function () { deleteToken(); });
	//Update the edtToken event handler
	$(document).on("click", '#edtToken', function () { updateModalTable(); });
	$(document).on("click", '#savetkn', function () { updateWallet(); });
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
var renderDetails = function (requestJob) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Request ID:</strong></div><div class="col-md-6">' +
		requestJob.request_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Customer ID:</strong></div><div class="col-md-6">' +
		requestJob.customer_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Company Name:</strong></div><div class="col-md-6">' +
		requestJob.company_name + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Number:</strong></div><div class="col-md-6">' +
		requestJob.user_phone + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Address:</strong></div><div class="col-md-6">' +
		requestJob.user_address + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Additional Information:</strong></div><div class="col-md-6">' +
		requestJob.additional_information + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};


//	Display the database elements in the modal
var renderList = function (data) {
	console.log(data);
	list = data.requestJobs;
	console.log("response");
	console.log(list);
	$('#table_body tr').remove();
	$.each(list, function (index, requestJob) {
		$('#table_body').append('<tr><td>' +

			requestJob.customer_id + '</td><td>' +
			requestJob.user_id + '</td><td>' +
			requestJob.company_name + '</td><td>' +
			requestJob.user_phone + '</td><td>' +
			requestJob.user_address + '</td><td>' +
			requestJob.additional_information + '</td><td  id="' +
			requestJob.request_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Create a new resouce -- Generation of the Modal For Destruction Form
var modalTable = function () {
	// Get the customer and user IDs from the session
	var customerId = sessionStorage.getItem('customer_id');
	var userId = sessionStorage.getItem('user_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Request Destruction</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="customer_id">Customer ID:</label>' +
		'<input type="text" class="form-control" id="customer_id" value="' + customerId + '" disabled>' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="user_id">User ID:</label>' +
		'<input type="text" class="form-control" id="user_id" value="' + userId + '" disabled>' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="company_name">Company Name:</label>' +
		'<input type="text" class="form-control" id="company_name">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="user_phone">Phone Number:</label>' +
		'<input type="text" class="form-control" id="user_phone">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="user_address">Client Address:</label>' +
		'<input type="text" class="form-control" id="user_address">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="additional_Information">Additional Info:</label>' +
		'<textarea class="form-control" id="additional_information" rows="5"></textarea>' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addJob">Request Destruction</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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
		success: function (data, textStatus, jqXHR) {
			console.log('addJob Success:', data)
			alert('Token created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addToken error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string
var formToJSON = function () {
	var string = JSON.stringify({
		"customer_id": $('#customer_id').val(),
		"user_id": '',
		"company_name": $('#company_name').val(),
		"user_phone": $('#user_phone').val(),
		"user_address": $('#user_address').val(),
		"additional_information": $('#additional_information').val()
	});
	console.log($('#customer_id').val())
	console.log($('#company_name').val())
	console.log($('#user_phone').val())
	console.log($('#user_address').val())
	console.log($('#additional_information').val())
	console.log(string);
	return string;
};
//	Find all Jobs TABLE
var findAllA = function () {
	console.log('findAllA');
	$.ajax({
		type: 'GET',
		url: allJobsURL,
		dataType: "json", // data type of response
		success: renderListA,
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("AJAX error: " + textStatus + " - " + errorThrown);
		}
	});
};
// Find Token By ID
var findByIdA = function (id) {
	console.log('findById: ' + id);
	//alert("findbyid");
	$.ajax({
		type: 'GET',
		url: allJobsURL + '/' + id,
		dataType: "json",
		success: function (data) {
			console.log('findById success: ' + data.name);
			renderDetailsA(data);
		}
	});
};

//	Populates the fields with the associated elements
var renderDetailsA = function (jobA) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Job ID:</strong></div><div class="col-md-6">' +
		jobA.job_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Name:</strong></div><div class="col-md-6">' +
		jobA.client_name + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Date Of Request:</strong></div><div class="col-md-6">' +
		jobA.date_of_request + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Date Of Collection:</strong></div><div class="col-md-6">' +
		jobA.date_of_collection + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Date Of Destruction:</strong></div><div class="col-md-6">' +
		jobA.date_of_destruction + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong> Certificate Of Destruction:</strong></div><div class="col-md-6">' +
		jobA.certificate_of_destruction + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Status:</strong></div><div class="col-md-6">' +
		jobA.status + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Video Link:</strong></div><div class="col-md-6">' +
		jobA.video_link + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>CRM Link:</strong></div><div class="col-md-6">' +
		jobA.crm_link + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};


//	Display the database elements in the modal
var renderListA = function (dataA) {
	listA = dataA.jobs;
	console.log("response");
	console.log(listA);
	$('#table_bodyB tr').remove();
	$.each(listA, function (index, jobA) {
		$('#table_bodyB').append('<tr><td>' +
			jobA.client_name + '</td><td>' +
			jobA.date_of_request + '</td><td>' +
			jobA.date_of_collection + '</td><td>' +
			jobA.date_of_destruction + '</td><td>' +
			jobA.certificate_of_destruction + '</td><td>' +
			jobA.status + '</td><td>' +
			jobA.video_link + '</td><td>' +
			jobA.client_id + '</td><td>' +
			jobA.crm_link + '</td><td  id="' +
			jobA.job_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

var modalTableA = function () {
	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Request Destruction</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="client_name">Name:</label>' +
		'<input type="text" class="form-control" id="client_name">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="client_email">Email:</label>' +
		'<input type="text" class="form-control" id="client_email">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="client_number">Phone Number:</label>' +
		'<input type="text" class="form-control" id="client_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="company_name">Company Name:</label>' +
		'<input type="text" class="form-control" id="company_name">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="client_address">Address:</label>' +
		'<input type="text" class="form-control" id="client_address">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="terms_and_conditions">Terms &amp; Conditions:</label>' +
		'<input type="text" class="form-control" id="terms_and_conditions">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="additional_Information">Additional Info:</label>' +
		'<textarea class="form-control" id="additional_Information" rows="5"></textarea>' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addJob">Request Destruction</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
};

//	Find All Batch Table
var findAllBatch = function () {
	console.log('findAllBatch');
	$.ajax({
		type: 'GET',
		url: batchURL,
		dataType: "json", // data type of response
		success: renderListBatch,
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("AJAX error: " + textStatus + " - " + errorThrown);
		}
	});
};
// Find Token By ID
var findByIdBatch = function (id) {
	console.log('findByIdBatch: ' + id);
	//alert("findbyidBatch");
	$.ajax({
		type: 'GET',
		url: batchURL + '/' + id,
		dataType: "json",
		success: function (data) {
			console.log('findByIdBatch success: ' + data.name);
			renderDetailsBatch(data);
		}
	});
};

//	Populates the fields with the associated elements
var renderDetailsBatch = function (batch) {
	console.log(batch);
	var htmlStr = '<h2 id="currentId">' +
		batch.batch_id + '</h2><h2>' +
		batch.job_id + '</h2><h2>' +
		batch.seal_barcode + '</h2><h2>' +
		batch.date_of_collection + '</h2><h2>' +
		batch.date_of_destruction + '</h2><h2>' +
		batch.status + '<BR><HR>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};


//	Display the database elements in the modal
var renderListBatch = function (dataB) {
	listB = dataB.batchs;
	console.log("response");
	console.log(listB);
	$('#table_bodyB tr').remove();
	$.each(listB, function (index, batch) {
		$('#table_bodyC').append('<tr><td>' +
			batch.job_id + '</td><td>' +
			batch.seal_barcode + '</td><td>' +
			batch.date_of_collection + '</td><td>' +
			batch.date_of_destruction + '</td><td>' +
			batch.status + '</td><td  id="' +
			batch.job_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};