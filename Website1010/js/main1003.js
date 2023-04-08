// The root URL for the RESTful services
var rootURL = "http://localhost/Website1005/api/requestedJobs";
var userURL = "http://localhost/Website1005/api/users";
var customerURL = "http://localhost/Website1005/api/customers";
var acceptedJobURL = "http://localhost/Website1005/api/acceptedJobs";
var signatureURL = "http://localhost/Website1005/api/signatures";
var batchURL = "http://localhost/Website1005/api/batches";
var collectedHardDriveURL = "http://localhost/Website1005/api/collectedHardDrives";
var videoFileURL = "http://localhost/Website1005/api/videoFiles";
var completedJobURL = "http://localhost/Website1005/api/completedJobs";


// Map the on click events when dom loads along side of the Dom elements
$(document).ready(function () {
	findAll();
	findAllUsers();
	findAllCustomers();
	findAllAcceptedJobs();
	findAllSignatures();
	findAllBatches();
	findAllCollectedHardDrives();
	findAllVideoFiles();
	findAllCompletedJobs();

	$(document).on("click", '#table_body td', function () { findById(this.id); });
	$(document).on("click", '#table_body_users td', function () { findUserById(this.id); });
	$(document).on("click", '#table_body_customers td', function () { findCustomerById(this.id); });
	$(document).on("click", '#table_body_accepted td', function () { findAcceptedJobById(this.id); });
	$(document).on("click", '#table_body_signature td', function () { findSignatureById(this.id); });		//RETURNS UNDEFINED
	$(document).on("click", '#table_body_batch td', function () { findBatchById(this.id); });
	$(document).on("click", '#table_body_collected td', function () { findCollectedHardDriveById(this.id); });
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

// ---------------- User Table ----------------

//	Find all Users 
var findAllUsers = function () {
	console.log('findAllUsers');
	$.ajax({
		type: 'GET',
		url: userURL,
		dataType: "json", // data type of response
		success: renderUserList
	});
};

//	Display the database elements inside user_table 
var renderUserList = function (userData) {
	console.log(userData);
	userList = userData.user_table;
	console.log("responseUser");
	console.log(userData);
	$('#table_body_users tr').remove();
	$.each(userList, function (index, user) {
		$('#table_body_users').append('<tr><td>' +

			user.user_name + '</td><td>' +
			user.user_email + '</td><td>' +
			user.user_phone + '</td><td>' +
			user.user_uid + '</td><td>' +
			user.user_role + '</td><td  id="' +
			user.user_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Find User By ID
var findUserById = function (id) {
	console.log('findUserById: ' + id);
	//alert("findUserById");
	$.ajax({
		type: 'GET',
		url: userURL + '/' + id,
		dataType: "json",
		success: function (userData) {
			console.log('findById success: ' + userData.user_id);
			renderUserDetails(userData);
		}
	});
};

//	Populates the fields with the associated elements user
var renderUserDetails = function (user) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>User ID:</strong></div><div class="col-md-6">' +
		user.user_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>User Name:</strong></div><div class="col-md-6">' +
		user.user_name + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>User Email:</strong></div><div class="col-md-6">' +
		user.user_email + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Contact Number:</strong></div><div class="col-md-6">' +
		user.user_phone + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Username:</strong></div><div class="col-md-6">' +
		user.user_uid + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>User Role:</strong></div><div class="col-md-6">' +
		user.user_role + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};



// ---------------- Customer Table ----------------

//	Find all Customers 
var findAllCustomers = function () {
	console.log('findAllCustomers');
	$.ajax({
		type: 'GET',
		url: customerURL,
		dataType: "json", // data type of response
		success: renderCustomerList
	});
};

//	Display the database elements inside customer_table 
var renderCustomerList = function (customerData) {
	console.log(customerData);
	customerList = customerData.customer_table;
	console.log("responseCustomer");
	console.log(customerData);
	$('#table_body_customers tr').remove();
	$.each(customerList, function (index, customer) {
		$('#table_body_customers').append('<tr><td>' +
			customer.customer_name + '</td><td>' +
			customer.customer_email + '</td><td>' +
			customer.customer_number + '</td><td>' +
			customer.accounts_link + '</td><td>' +
			customer.crm_link + '</td><td>' +
			customer.user_id + '</td><td  id="' +
			customer.customer_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Find Customers By ID
var findCustomerById = function (id) {
	console.log('findCustomerById: ' + id);
	//alert("findCustomerById");
	$.ajax({
		type: 'GET',
		url: customerURL + '/' + id,
		dataType: "json",
		success: function (customerData) {
			console.log('findCustomerById success: ' + customerData.customer_id);
			renderCustomerDetails(customerData);
		}
	});
};

//	Populates the fields with the associated elements
var renderCustomerDetails = function (customer) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Customer ID:</strong></div><div class="col-md-6">' +
		customer.customer_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Customer Name:</strong></div><div class="col-md-6">' +
		customer.customer_name + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Customer Email:</strong></div><div class="col-md-6">' +
		customer.customer_email + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Contact Number:</strong></div><div class="col-md-6">' +
		customer.customer_number + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Accounts Link:</strong></div><div class="col-md-6">' +
		customer.accounts_link + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>CRM Link:</strong></div><div class="col-md-6">' +
		customer.crm_link + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>User ID:</strong></div><div class="col-md-6">' +
		customer.user_id + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};


// ---------------- Accepted Jobs Table ----------------

//	Find all Accepted Jobs 
var findAllAcceptedJobs = function () {
	console.log('findAllAcceptedJobs ');
	$.ajax({
		type: 'GET',
		url: acceptedJobURL,
		dataType: "json", // data type of response
		success: renderAcceptedJobList
	});
};

//	Display the database elements inside accepted_jobs 
var renderAcceptedJobList = function (acceptedJobData) {
	console.log(acceptedJobData);
	acceptedJobList = acceptedJobData.accepted_jobs;
	console.log("responseAcceptedJob");
	console.log(acceptedJobData);
	$('#table_body_accepted tr').remove();
	$.each(acceptedJobList, function (index, acceptedJob) {
		$('#table_body_accepted').append('<tr><td>' +
			acceptedJob.customer_id + '</td><td>' +
			acceptedJob.job_number + '</td><td>' +
			acceptedJob.job_status + '</td><td>' +
			acceptedJob.job_creation_date + '</td><td  id="' +
			acceptedJob.job_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Find Accepted Job By ID
var findAcceptedJobById = function (id) {
	console.log('findAcceptedJobById: ' + id);
	//alert("findAcceptedJobById");
	$.ajax({
		type: 'GET',
		url: acceptedJobURL + '/' + id,
		dataType: "json",
		success: function (acceptedJobData) {
			console.log('findAcceptedJobById success: ' + acceptedJobData.job_id);
			renderAcceptedJobDetails(acceptedJobData);
		}
	});
};

//	Populates the fields with the associated elements
var renderAcceptedJobDetails = function (acceptedJob) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Job ID:</strong></div><div class="col-md-6">' +
		acceptedJob.job_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Customer ID:</strong></div><div class="col-md-6">' +
		acceptedJob.customer_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Job Number:</strong></div><div class="col-md-6">' +
		acceptedJob.job_number + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Job Status:</strong></div><div class="col-md-6">' +
		acceptedJob.job_status + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Job Creation Date:</strong></div><div class="col-md-6">' +
		acceptedJob.job_creation_date + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};


// ---------------- Signature Table ----------------

// Find All Signatures
var findAllSignatures = function () {
	console.log('findAllSignatures');
	$.ajax({
		type: 'GET',
		url: signatureURL,
		dataType: "json", // data type of response
		success: renderSignatureList
	});
};

//	Display the database elements inside signature_table 
var renderSignatureList = function (signatureData) {
	console.log(signatureData);
	signatureList = signatureData.signature_table;
	console.log("responseSignature");
	console.log(signatureData);
	$('#table_body_signature tr').remove();
	$.each(signatureList, function (index, signature) {
		$('#table_body_signature').append('<tr><td>' +
			signature.job_id + '</td><td>' +
			signature.customer_id + '</td><td>' +
			signature.signature_date + '</td><td  id="' +
			signature.signature_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Find signature By ID
var findSignatureById = function (id) {
	console.log('findSignatureById: ' + id);
	//alert("findSignatureById");
	$.ajax({
		type: 'GET',
		url: signatureURL + '/' + id,
		dataType: "json",
		success: function (signatureData) {
			console.log('findSignatureById success: ' + signatureData.signature_id);
			renderSignaturesDetails(signatureData);
		}
	});
};

//	Populates the fields with the associated elements
var renderSignaturesDetails = function (signature) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Signature ID:</strong></div><div class="col-md-6">' +
		signature.signature_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Job ID:</strong></div><div class="col-md-6">' +
		signature.job_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Customer ID:</strong></div><div class="col-md-6">' +
		signature.customer_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Signature Date:</strong></div><div class="col-md-6">' +
		signature.signature_date + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Signature</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Signature</button>';
	$("#modalFooter").html(htmlButtons);
};

// ---------------- Batch Table ----------------

//	Find all Batches
var findAllBatches = function () {
	console.log('findAllBatches');
	$.ajax({
		type: 'GET',
		url: batchURL,
		dataType: "json", // data type of response
		success: renderBatchList
	});
};

//	Display the database elements in the modal batch_table
var renderBatchList = function (batchData) {
	console.log(batchData);
	batchList = batchData.batch_table;
	console.log("responseBatch");
	console.log(batchData);
	$('#table_body_batch tr').remove();
	$.each(batchList, function (index, batch) {
		$('#table_body_batch').append('<tr><td>' +
			batch.job_id + '</td><td>' +
			batch.batch_number + '</td><td>' +
			batch.seal_barcode_number + '</td><td>' +
			batch.batch_creation_date + '</td><td  id="' +
			batch.batch_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Find Batch By ID
var findBatchById = function (id) {
	console.log('findBatchById: ' + id);
	//alert("findBatchById");
	$.ajax({
		type: 'GET',
		url: batchURL + '/' + id,
		dataType: "json",
		success: function (batchData) {
			console.log('findBatchById success: ' + batchData.batch_id);
			console.log(batchData);
			renderBatchDetails(batchData);
		}
	});
};

//	Populates the fields with the associated elements
var renderBatchDetails = function (batch) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Batch ID:</strong></div><div class="col-md-6">' +
		batch.batch_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Job ID:</strong></div><div class="col-md-6">' +
		batch.job_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Batch Number:</strong></div><div class="col-md-6">' +
		batch.batch_number + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Seal Barcode Number:</strong></div><div class="col-md-6">' +
		batch.seal_barcode_number + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Batch Creation Date:</strong></div><div class="col-md-6">' +
		batch.batch_creation_date + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};

// ---------------- Collected Hard Drives Table ----------------

//	Find all Collected Hard Drives
var findAllCollectedHardDrives = function () {
	console.log('findAllCollectedHardDrives');
	$.ajax({
		type: 'GET',
		url: collectedHardDriveURL,
		dataType: "json", // data type of response
		success: renderCollectedHardDrivesList
	});
};

//	Display the database elements in the modal collected_harddrives
var renderCollectedHardDrivesList = function (collectedHardDriveData) {
	console.log(collectedHardDriveData);
	collectedHardDriveList = collectedHardDriveData.collected_harddrives;
	console.log("responseCollectedHardDrive");
	console.log(collectedHardDriveData);
	$('#table_body_collected tr').remove();
	$.each(collectedHardDriveList, function (index, collectedHardDrive) {
		$('#table_body_collected').append('<tr><td>' +
			collectedHardDrive.hdd_serial_number + '</td><td>' +
			collectedHardDrive.batch_id + '</td><td>' +
			collectedHardDrive.signed_by_customer + '</td><td>' +
			collectedHardDrive.signed_date + '</td><td  id="' +
			collectedHardDrive.collected_harddrives_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// Find Collected Hard Drive By ID
var findCollectedHardDriveById = function (id) {
	console.log('findCollectedHardDriveById: ' + id);
	//alert("findCollectedHardDriveById");
	$.ajax({
		type: 'GET',
		url: collectedHardDriveURL + '/' + id,
		dataType: "json",
		success: function (collectedHardDriveData) {
			console.log('findCollectedHardDriveById success: ' + collectedHardDriveData.collected_harddrives_id);
			console.log(collectedHardDriveData);
			renderCollectedHardDrivesDetails(collectedHardDriveData);
		}
	});
};

//	Populates the fields with the associated elements
var renderCollectedHardDrivesDetails = function (collectedHardDrive) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Collected Hard Drive ID:</strong></div><div class="col-md-6">' +
		collectedHardDrive.collected_harddrives_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>HHD Serial Number:</strong></div><div class="col-md-6">' +
		collectedHardDrive.hdd_serial_number + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Batch ID:</strong></div><div class="col-md-6">' +
		collectedHardDrive.batch_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Signed By Customer:</strong></div><div class="col-md-6">' +
		collectedHardDrive.signed_by_customer + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Collection Sign Date:</strong></div><div class="col-md-6">' +
		collectedHardDrive.signed_date + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delToken">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};



// ---------------- Video Files Table ----------------

//	Find all Video Files
var findAllVideoFiles = function () {
	console.log('findAllVideoFiles');
	$.ajax({
		type: 'GET',
		url: videoFileURL,
		dataType: "json", // data type of response
		success: renderVideoFilesList
	});
};
// Find Video File By ID
var findVideoFileById = function (idD) {
	console.log('findVideoFileById: ' + idD);
	//alert("findVideoFileById");
	$.ajax({
		type: 'GET',
		url: videoFileURL + '/' + idD,
		dataType: "json",
		success: function (videoFilesData) {
			console.log('findVideoFileById success: ' + videoFilesData.video_id);
			console.log(videoFilesData);
			renderDetails(videoFilesData);
		}
	});
};

//	Display the database elements in the modal video_file_table
var renderVideoFilesList = function (videoFilesData) {
	console.log(videoFilesData);
	videoFilesList = videoFilesData.video_file_table;
	console.log("responseVideoFilesData");
	console.log(videoFilesData);
	$('#table_body_video tr').remove();
	$.each(videoFilesList, function (index, videoFile) {
		$('#table_body_video').append('<tr><td>' +
			videoFile.job_id + '</td><td>' +
			videoFile.batch_id + '</td><td>' +
			videoFile.hdd_serial_number + '</td><td>' +
			videoFile.capture_date + '</td><td>' +
			videoFile.file_link + '</td><td  id="' +
			videoFile.video_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
};

// ---------------- Completed Jobs Table ----------------

//	Find all Video Files
var findAllCompletedJobs = function () {
	console.log('findAllCompletedJobs');
	$.ajax({
		type: 'GET',
		url: completedJobURL,
		dataType: "json", // data type of response
		success: renderCompletedJobList
	});
};
// Find Video File By ID
var findCompletedJobById = function (idF) {
	console.log('findCompletedJobById: ' + idF);
	//alert("findCompletedJobById");
	$.ajax({
		type: 'GET',
		url: completedJobURL + '/' + idF,
		dataType: "json",
		success: function (completedJobData) {
			console.log('findCompletedJobById success: ' + completedJobData.job_id);
			console.log(completedJobData);
			renderDetails(completedJobData);
		}
	});
};

//	Display the database elements in the modal video_file_table
var renderCompletedJobList = function (completedJobData) {
	console.log(completedJobData);
	completedJobList = completedJobData.completed_jobs;
	console.log("responseCompletedJobData");
	console.log(completedJobData);
	$('#table_body_completed tr').remove();
	$.each(completedJobList, function (index, completedJob) {
		$('#table_body_completed').append('<tr><td>' +
			completedJob.client_name + '</td><td>' +
			completedJob.date_of_request + '</td><td>' +
			completedJob.date_of_collection + '</td><td>' +
			completedJob.date_of_destruction + '</td><td>' +
			completedJob.certificate_of_destruction + '</td><td>' +
			completedJob.status + '</td><td>' +
			completedJob.video_link + '</td><td>' +
			completedJob.customer_id + '</td><td>' +
			completedJob.crm_link + '</td><td  id="' +
			completedJob.job_id + '"><a href="#">More Info</a></td></tr>');
	});
	$('#table_id').DataTable();
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





