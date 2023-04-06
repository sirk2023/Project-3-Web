// The root URL for the RESTful services
var rootURL = "http://localhost/Website/api/jobs";
var allJobsURL = "http://localhost/Website/api/alljobs";
var batchURL = "http://localhost/Website/api/batch";

// Map the on click events when dom loads along side of the Dom elements
$(document).ready(function () {
	findAll();
	findAllA();
	findAllBatch();
	$(document).on("click", '#table_body td', function () { findById(this.id); });
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
var renderDetails = function (job) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Job ID:</strong></div><div class="col-md-6">' +
		job.job_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Name:</strong></div><div class="col-md-6">' +
		job.client_name + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Email:</strong></div><div class="col-md-6">' +
		job.client_email + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Number:</strong></div><div class="col-md-6">' +
		job.client_number + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Company Name:</strong></div><div class="col-md-6">' +
		job.company_name + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Address:</strong></div><div class="col-md-6">' +
		job.client_address + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Additional Information:</strong></div><div class="col-md-6">' +
		job.additional_Information + '</div></div><hr>';
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
		"client_name": $('#client_name').val(),
		"client_email": $('#client_email').val(),
		"client_number": $('#client_number').val(),
		"company_name": $('#company_name').val(),
		"client_address": $('#client_address').val(),
		"additional_Information": $('#additional_Information').val()

	});
	//    Display the values within the Console Log
	console.log($('#client_name').val())
	console.log($('#client_email').val())
	console.log($('#client_number').val())
	console.log($('#company_name').val())
	console.log($('#client_address').val())
	console.log($('#additional_Information').val())
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
	console.log(jobA);
	var htmlStr = '<h2 id="currentId">' +
		jobA.job_id + '</h2><h2>' +
		jobA.client_name + '</h2><h2>' +
		jobA.date_of_request + '</h2><h2>' +
		jobA.date_of_collection + '</h2><h2>' +
		jobA.date_of_destruction + '</h2><h2>' +
		jobA.certificate_of_destruction + '</h2><h2>' +
		jobA.status + '</h2><h2>' +
		jobA.video_link + '</h2><h2>' +
		jobA.crm_link + '<BR><HR>';
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