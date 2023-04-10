// The root URL for the RESTful services
var rootURL = "http://localhost/Website1020/api/requestedJobs";
var userURL = "http://localhost/Website1020/api/users";
var customerURL = "http://localhost/Website1020/api/customers";
var acceptedJobURL = "http://localhost/Website1020/api/acceptedJobs";
var signatureURL = "http://localhost/Website1020/api/signatures";
var batchURL = "http://localhost/Website1020/api/batches";
var collectedHardDriveURL = "http://localhost/Website1020/api/collectedHardDrives";
var videoFileURL = "http://localhost/Website1020/api/videoFiles";
var completedJobURL = "http://localhost/Website1020/api/completedJobs";


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
	$(document).on("click", '#table_body_signature td', function () { findSignatureById(this.id); });
	$(document).on("click", '#table_body_batch td', function () { findBatchById(this.id); });
	$(document).on("click", '#table_body_collected td', function () { findCollectedHardDriveById(this.id); });
	$(document).on("click", '#table_body_video td', function () { findVideoFileById(this.id); });
	$(document).on("click", '#table_body_completed td', function () { findCompletedJobById(this.id); });
	// Modals event handler
	$(document).on("click", '#addToken', function () { modalTable(); });
	$(document).on("click", '#addCModal', function () { customerModalTable(); });
	$(document).on("click", '#addAModal', function () { acceptedJobModalTable(); });
	$(document).on("click", '#addSModal', function () { signatureModalTable(); });
	$(document).on("click", '#addBModal', function () { batchModalTable(); });
	$(document).on("click", '#addCHDModal', function () { collectedHardDriveModalTable(); });
	$(document).on("click", '#addVFModal', function () { videoFileModalTable(); });
	$(document).on("click", '#addCJModal', function () { completedJobsModalTable(); });
	// Add Buttons event handler
	$(document).on("click", '#addBatch', function () { addBatch(); });
	$(document).on("click", '#addAcceptedJob', function () { addAcceptedJob(); });
	$(document).on("click", '#addSignature', function () { addSignature(); });
	$(document).on("click", '#addHardDrive', function () { addCollectedHardDrive(); });
	$(document).on("click", '#addVideoFile', function () { addVideoFile(); });
	$(document).on("click", '#addCustomer', function () { addCustomer(); });
	$(document).on("click", '#addCompletedJob', function () { addCompletedJob(); });
	$(document).on("click", '#addJob', function () { addJob(); });
	//Delete Buttons event handler
	$(document).on("click", '#delRequestJob', function () { deleteRequestedJob(); });
	$(document).on("click", '#delCustomer', function () { deleteCustomer(); });
	$(document).on("click", '#delAcceptedJob', function () { deleteAcceptedJob(); });
	$(document).on("click", '#delSignature', function () { deleteSignature(); });
	$(document).on("click", '#delBatch', function () { deleteBatch(); });
	$(document).on("click", '#delCollectedHardDrive', function () { deleteCollectedHardDrive(); });
	$(document).on("click", '#delVideoFile', function () { deleteVideoFile(); });
	$(document).on("click", '#delCompletedJob', function () { deleteCompletedJob(); });
	//Update the edtButton event handler
	$(document).on("click", '#edtRequestedForm', function () { updateRequestedJobModalTable(); });
	$(document).on("click", '#edtCustomerForm', function () { updateCustomerModalTable(); });
	//Save Button
	$(document).on("click", '#saveRequestedJob', function () { updateRequestedJob(); });
	$(document).on("click", '#saveCustomer', function () { updateCustomer(); });
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
		success: function (requestJobData) {
			console.log('findById success: ' + requestJobData.request_id);
			renderDetails(requestJobData);
		}
	});
};

//	Populates the fields with the associated elements for Request Job
var renderDetails = function (requestJob) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Request ID:</strong></div><div class="col-md-6" id="request_id">' +
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
		'id="delRequestJob">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtRequestedForm">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};


//	Display the database elements in the modal Request Job
var renderList = function (requestJobData) {
	console.log(requestJobData);
	list = requestJobData.requestJobs;
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

//	Remove a resource from the list
var deleteRequestedJob = function () {
	console.log("deleteRequestedJob");
	console.log($('#request_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: rootURL + '/' + $('#request_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Request Job Removed Succesfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Request Job error: ' + textStatus);
		}
	})
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
			alert('Requested Job created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addRequest error: ' + textStatus);
		}
	});
};

//Calls the PUT method of your rest API. 
var updateRequestedJob = function () {
	console.log('updateRequestedJob');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#request_id').val(),
		dataType: "json",
		data: formToJSON(),
		success: function (requestJobData, textStatus, jqXHR) {
			alert('Requested Job updated successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('update Requested Job error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string
var formToJSON = function () {
	var string = JSON.stringify({
		"customer_id": $('#customer_id').val(),
		"user_id": $('#user_id').val(),
		"company_name": $('#company_name').val(),
		"user_phone": $('#user_phone').val(),
		"user_address": $('#user_address').val(),
		"additional_information": $('#additional_information').val()
	});
	console.log($('#customer_id').val())
	console.log($('#user_id').val())
	console.log($('#company_name').val())
	console.log($('#user_phone').val())
	console.log($('#user_address').val())
	console.log($('#additional_information').val())
	console.log(string);
	return string;
};

// Create a new resource -- Generation of the Modal For Request Job Form
var modalTable = function () {
	// Get the customer and user IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');
	//var userId = sessionStorage.getItem('user_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Request Destruction</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="customer_id">Customer ID:</label>' +
		'<input type="text" class="form-control" id="customer_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="user_id">User ID:</label>' +
		'<input type="text" class="form-control" id="user_id">' +
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

var updateRequestedJobModalTable = function () {
	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Edit Request Destruction</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="customer_id">Customer ID:</label>' +
		'<input type="text" class="form-control" id="customer_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="user_id">User ID:</label>' +
		'<input type="text" class="form-control" id="user_id">' +
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
		'<button type="button" class="btn btn-primary" id="saveRequestedJob">Edit Destruction</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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
	$('#user_table_id').DataTable();
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
	$('#customer_table_id').DataTable();
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
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Customer ID:</strong></div><div class="col-md-6" id="customer_id">' +
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
		'id="delCustomer">Delete Customer</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtCustomerForm">Edit Customer</button>';
	$("#modalFooter").html(htmlButtons);
};

//	Remove a resource from the list
var deleteCustomer = function () {
	console.log("deleteCustomer");
	console.log($('#customer_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: customerURL + '/' + $('#customer_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Customer Removed Successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Customer error: ' + textStatus);
		}
	})
};

//Calls the POST method of your rest API. Uses the formToJSON to format it for insert / Creates a new resource Customer
var addCustomer = function () {
	console.log('AddCustomer');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: customerURL,
		dataType: "json",
		data: customersToJSON(),
		success: function (customerData, textStatus, jqXHR) {
			console.log('addCustomer Success:', customerData)
			alert('Customer created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addCustomer error: ' + textStatus);
		}
	});
};

//Calls the PUT method of your rest API. 
var updateCustomer = function () {
	console.log('updateCustomer');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: customerURL + '/' + $('#customer_id').val(),
		dataType: "json",
		data: customersToJSON(),
		success: function (customerData, textStatus, jqXHR) {
			alert('Customer updated successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('update Customer error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string Customer
var customersToJSON = function () {
	var string = JSON.stringify({
		"customer_name": $('#customer_name').val(),
		"customer_email": $('#customer_email').val(),
		"customer_number": $('#customer_number').val(),
		"accounts_link": $('#accounts_link').val(),
		"crm_link": $('#crm_link').val(),
		"user_id": $('#user_id').val()
	});
	console.log($('#customer_name').val())
	console.log($('#customer_email').val())
	console.log($('#customer_number').val())
	console.log($('#accounts_link').val())
	console.log($('#crm_link').val())
	console.log($('#user_id').val())
	console.log(string);
	return string;
};

var customerModalTable = function () {
	// Get the customer IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Manage Customer</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="customer_name">Customer Name:</label>' +
		'<input type="text" class="form-control" id="customer_name">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="customer_email">Customer Email:</label>' +
		'<input type="text" class="form-control" id="customer_email">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="customer_number">Contact Number:</label>' +
		'<input type="text" class="form-control" id="customer_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="accounts_link">Accounts Link:</label>' +
		'<input type="text" class="form-control" id="accounts_link">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="crm_link">CRM Link:</label>' +
		'<input type="text" class="form-control" id="crm_link">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="user_id">User ID:</label>' +
		'<input type="text" class="form-control" id="user_id">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addCustomer">Add Customer</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
};

var updateCustomerModalTable = function () {
	// Get the customer IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Edit Customer</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="customer_name">Customer Name:</label>' +
		'<input type="text" class="form-control" id="customer_name">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="customer_email">Customer Email:</label>' +
		'<input type="text" class="form-control" id="customer_email">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="customer_number">Contact Number:</label>' +
		'<input type="text" class="form-control" id="customer_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="accounts_link">Accounts Link:</label>' +
		'<input type="text" class="form-control" id="accounts_link">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="crm_link">CRM Link:</label>' +
		'<input type="text" class="form-control" id="crm_link">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="user_id">User ID:</label>' +
		'<input type="text" class="form-control" id="user_id">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="saveCustomer">Add Customer</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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
	$('#accepted_table_id').DataTable();
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
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Job ID:</strong></div><div class="col-md-6" id="job_id">' +
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
		'id="delAcceptedJob">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};

//	Remove a resource from the list
var deleteAcceptedJob = function () {
	console.log("deleteAcceptedJob");
	console.log($('#job_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: acceptedJobURL + '/' + $('#job_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Accepted Job Removed Successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Request Job error: ' + textStatus);
		}
	})
};

//Calls the POST method of your rest API. Uses the formToJSON to format it for insert / Creates a new resource Accepted Job
var addAcceptedJob = function () {
	console.log('AddAcceptedJob');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: acceptedJobURL,
		dataType: "json",
		data: acceptedJobToJSON(),
		success: function (acceptedJobData, textStatus, jqXHR) {
			console.log('addAcceptedJob Success:', acceptedJobData)
			alert('Accepted Job created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addAcceptedJob error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string
var acceptedJobToJSON = function () {
	var string = JSON.stringify({
		"customer_id": $('#customer_id').val(),
		"job_number": $('#job_number').val(),
		"job_status": $('#job_status').val(),
		"job_creation_date": $('#job_creation_date').val()
	});
	console.log($('#customer_id').val())
	console.log($('#job_number').val())
	console.log($('#job_status').val())
	console.log($('#job_creation_date').val())
	console.log(string);
	return string;
};

var acceptedJobModalTable = function () {
	// Get the customer IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Manage Accepted Jobs</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="customer_id">Customer ID:</label>' +
		'<input type="text" class="form-control" id="customer_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="job_number">Job Number:</label>' +
		'<input type="text" class="form-control" id="job_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="job_status">Job Status:</label>' +
		'<input type="text" class="form-control" id="job_status">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="job_creation_date">Job Creation Date:</label>' +
		'<input type="text" class="form-control" id="job_creation_date">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addAcceptedJob">Add Accepted Job</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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
	$('#signature_table_id').DataTable();
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

//	Remove a resource from the list
var deleteSignature = function () {
	console.log("deleteSignature");
	console.log($('#signature_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: signatureURL + '/' + $('#signature_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Signature Removed Successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Signature error: ' + textStatus);
		}
	})
};

//	Populates the fields with the associated elements signature_table
var renderSignaturesDetails = function (signature) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Signature ID:</strong></div><div class="col-md-6" id="signature_id">' +
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
		'id="delSignature">Delete Signature</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Signature</button>';
	$("#modalFooter").html(htmlButtons);
};

//Calls the POST method of your rest API. Uses the signatureToJSON to format it for insert / Creates a new resource Signature
var addSignature = function () {
	console.log('AddSignature');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: signatureURL,
		dataType: "json",
		data: signatureToJSON(),
		success: function (signatureData, textStatus, jqXHR) {
			console.log('addSignature Success:', signatureData)
			alert('Signature created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addSignature error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string
var signatureToJSON = function () {
	var string = JSON.stringify({
		"job_id": $('#job_id').val(),
		"customer_id": $('#customer_id').val(),
		"signature_date": $('#signature_date').val()
	});
	console.log($('#job_id').val())
	console.log($('#customer_id').val())
	console.log($('#signature_date').val())
	console.log(string);
	return string;
};

var signatureModalTable = function () {
	// Get the customer IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Manage Signatures</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="job_id">Job ID:</label>' +
		'<input type="text" class="form-control" id="job_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="customer_id">Customer ID:</label>' +
		'<input type="text" class="form-control" id="customer_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="signature_date">Signature Date:</label>' +
		'<input type="text" class="form-control" id="signature_date">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addSignature">Add Signature</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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
	$('#batch_table_id').DataTable();
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
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Batch ID:</strong></div><div class="col-md-6" id="batch_id">' +
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
		'id="delBatch">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};

//	Remove a resource from the list
var deleteBatch = function () {
	console.log("deleteBatch");
	console.log($('#batch_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: batchURL + '/' + $('#batch_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Batch Removed Successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Batch error: ' + textStatus);
		}
	})
};

//Calls the POST method of your rest API. Uses the batchToJSON to format it for insert / Creates a new resource Batch
var addBatch = function () {
	console.log('AddBatch');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: batchURL,
		dataType: "json",
		data: batchToJSON(),
		success: function (batchData, textStatus, jqXHR) {
			console.log('addBatch Success:', batchData)
			alert('Batch created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addBatch error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string
var batchToJSON = function () {
	var string = JSON.stringify({
		"job_id": $('#job_id').val(),
		"batch_number": $('#batch_number').val(),
		"seal_barcode_number": $('#seal_barcode_number').val(),
		"batch_creation_date": $('#batch_creation_date').val()
	});
	console.log($('#job_id').val())
	console.log($('#batch_number').val())
	console.log($('#seal_barcode_number').val())
	console.log($('#batch_creation_date').val())
	console.log(string);
	return string;
};

var batchModalTable = function () {
	// Get the customer IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Manage Batches</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="job_id">Job ID:</label>' +
		'<input type="text" class="form-control" id="job_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="batch_number">Batch Number:</label>' +
		'<input type="text" class="form-control" id="batch_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="seal_barcode_number">Seal Barcode Number:</label>' +
		'<input type="text" class="form-control" id="seal_barcode_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="batch_creation_date">Batch Creation Date:</label>' +
		'<input type="text" class="form-control" id="batch_creation_date">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addBatch">Add Batch</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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
	$('#collection_table_id').DataTable();
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
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Collected Hard Drive ID:</strong></div><div class="col-md-6" id="collected_harddrives_id">' +
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
		'id="delCollectedHardDrive">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};

//	Remove a resource from the list
var deleteCollectedHardDrive = function () {
	console.log("deleteCollectedHardDrive");
	console.log($('#collected_harddrives_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: collectedHardDriveURL + '/' + $('#collected_harddrives_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Batch Removed Successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Batch error: ' + textStatus);
		}
	})
};

//Calls the POST method of your rest API. Uses the collectedHardDrivesToJSON to format it for insert / Creates a new resource Collected Hard Drive
var addCollectedHardDrive = function () {
	console.log('addCollectedHardDrive');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: collectedHardDriveURL,
		dataType: "json",
		data: collectedHardDriveToJSON(),
		success: function (collectedHardDriveData, textStatus, jqXHR) {
			console.log('addCollectedHardDrive Success:', collectedHardDriveData)
			alert('Collected Hard Drive created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addCollectedHardDrive error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string
var collectedHardDriveToJSON = function () {
	var string = JSON.stringify({
		"hdd_serial_number": $('#hdd_serial_number').val(),
		"batch_id": $('#batch_id').val(),
		"signed_by_customer": $('#signed_by_customer').val(),
		"signed_date": $('#signed_date').val()
	});
	console.log($('#hdd_serial_number').val())
	console.log($('#batch_id').val())
	console.log($('#signed_by_customer').val())
	console.log($('#signed_date').val())
	console.log(string);
	return string;
};

var collectedHardDriveModalTable = function () {
	// Get the customer IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Manage Collected Hard Drives</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="hdd_serial_number">HDD Serial Number:</label>' +
		'<input type="text" class="form-control" id="hdd_serial_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="batch_id">Batch ID:</label>' +
		'<input type="text" class="form-control" id="batch_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="signed_by_customer">Signed By Customer:</label>' +
		'<input type="text" class="form-control" id="signed_by_customer">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="signed_date">Signed Date:</label>' +
		'<input type="text" class="form-control" id="signed_date">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addHardDrive">Add Hard Drive</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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
	$('#video_table_id').DataTable();
};

// Find Video File By ID
var findVideoFileById = function (id) {
	console.log('findVideoFileById: ' + id);
	//alert("findVideoFileById");
	$.ajax({
		type: 'GET',
		url: videoFileURL + '/' + id,
		dataType: "json",
		success: function (videoFilesData) {
			console.log('findVideoFileById success: ' + videoFilesData.video_id);
			console.log(videoFilesData);
			renderVideoFilesDetails(videoFilesData);
		}
	});
};

//	Populates the fields with the associated elements
var renderVideoFilesDetails = function (videoFile) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Video File ID:</strong></div><div class="col-md-6" id="video_id">' +
		videoFile.video_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Batch ID:</strong></div><div class="col-md-6">' +
		videoFile.batch_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>HDD Serial Number:</strong></div><div class="col-md-6">' +
		videoFile.hdd_serial_number + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Capture Date:</strong></div><div class="col-md-6">' +
		videoFile.capture_date + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>File Link:</strong></div><div class="col-md-6">' +
		videoFile.file_link + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delVideoFile">Delete Request</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};

//	Remove a resource from the list
var deleteVideoFile = function () {
	console.log("deleteVideoFile");
	console.log($('#video_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: videoFileURL + '/' + $('#video_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Video File Removed Successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Video File error: ' + textStatus);
		}
	})
};

//Calls the POST method of your rest API. Uses the videoFilesToJSON to format it for insert / Creates a new resource Video File
var addVideoFile = function () {
	console.log('addVideoFile');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: videoFileURL,
		dataType: "json",
		data: videoFileToJSON(),
		success: function (videoFilesData, textStatus, jqXHR) {
			console.log('addVideoFile Success:', videoFilesData)
			alert('Add Video created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addVideoFile error: ' + textStatus);
		}
	});
};

var videoFileModalTable = function () {
	// Get the customer IDs from the session
	//var customerId = sessionStorage.getItem('customer_id');

	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Manage Video Files</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="job_id">Job ID:</label>' +
		'<input type="text" class="form-control" id="job_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="batch_">Batch ID:</label>' +
		'<input type="text" class="form-control" id="batch_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="hdd_serial_number">HDD Serial Number:</label>' +
		'<input type="text" class="form-control" id="hdd_serial_number">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="capture_date">Capture Date:</label>' +
		'<input type="text" class="form-control" id="capture_date">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="file_link">File Link:</label>' +
		'<input type="text" class="form-control" id="file_link">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addVideoFile">Add Video</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
};

// Helper function to serialize all the form fields into a JSON string
var videoFileToJSON = function () {
	var string = JSON.stringify({
		"job_id": $('#job_id').val(),
		"batch_id": $('#batch_id').val(),
		"hdd_serial_number": $('#hdd_serial_number').val(),
		"capture_date": $('#capture_date').val(),
		"file_link": $('#file_link').val()
	});
	console.log($('#job_id').val())
	console.log($('#batch_id').val())
	console.log($('#hdd_serial_number').val())
	console.log($('#capture_date').val())
	console.log($('#file_link').val())
	console.log(string);
	return string;
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

//	Display the database elements in the modal completed_jobs
var renderCompletedJobList = function (completedJobData) {
	console.log(completedJobData);
	completedJobList = completedJobData.completed_jobs;
	console.log("responseCompletedJobData");
	console.log(completedJobData);
	$('#table_body_completed tr').remove();
	$.each(completedJobList, function (index, completedJob) {
		$('#table_body_completed').append('<tr><td>' +
			completedJob.customer_name + '</td><td>' +
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

// Find Video File By ID
var findCompletedJobById = function (id) {
	console.log('findCompletedJobById: ' + id);
	//alert("findCompletedJobById");
	$.ajax({
		type: 'GET',
		url: completedJobURL + '/' + id,
		dataType: "json",
		success: function (completedJobData) {
			console.log('findCompletedJobById success: ' + completedJobData.job_id);
			console.log(completedJobData);
			renderCompletedJobDetails(completedJobData);
		}
	});
};

//	Populates the fields with the associated elements
var renderCompletedJobDetails = function (completedJob) {
	var htmlStr = '<div class="row"><div class="col-md-6"><strong>Job ID:</strong></div><div class="col-md-6" id="job_id">' +
		completedJob.job_id + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Client Name:</strong></div><div class="col-md-6">' +
		completedJob.customer_name + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Date Of Request:</strong></div><div class="col-md-6">' +
		completedJob.date_of_request + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Date Of Collection:</strong></div><div class="col-md-6">' +
		completedJob.date_of_collection + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Date Of Destruction:</strong></div><div class="col-md-6">' +
		completedJob.date_of_destruction + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong> Certificate Of Destruction:</strong></div><div class="col-md-6">' +
		completedJob.certificate_of_destruction + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Status:</strong></div><div class="col-md-6">' +
		completedJob.status + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>Video Link:</strong></div><div class="col-md-6">' +
		completedJob.video_link + '</div></div>' +
		'<div class="row"><div class="col-md-6"><strong>CRM Link:</strong></div><div class="col-md-6">' +
		completedJob.crm_link + '</div></div><hr>';
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
	var htmlButtons = '<button type="button" class="btn btn-default" data-dismiss="modal"' +
		'id="delCompletedJob">Delete Job</button>' + '<button type="button" class="btn btn-default"' +
		'id="edtToken">Edit Request</button>';
	$("#modalFooter").html(htmlButtons);
};

//	Remove a resource from the list
var deleteCompletedJob = function () {
	console.log("deleteCompletedJob");
	console.log($('#job_id').text())
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: completedJobURL + '/' + $('#job_id').text(),
		success: function (data, textStatus, jqXHR) {
			alert('Completed Job Removed Successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('remove Completed Job error: ' + textStatus);
		}
	})
};

//Calls the POST method of your rest API. Uses the completedJobsToJSON to format it for insert / Creates a new resource Completed Job
var addCompletedJob = function () {
	console.log('addCompletedJob');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: completedJobURL,
		dataType: "json",
		data: completedJobToJSON(),
		success: function (completedJobData, textStatus, jqXHR) {
			console.log('addCompletedJob Success:', completedJobData)
			alert('Completed Job created successfully');
			findAll();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('addCompletedJob error: ' + textStatus);
		}
	});
};

// Helper function to serialize all the form fields into a JSON string
var completedJobToJSON = function () {
	var string = JSON.stringify({
		"customer_name": $('#customer_name').val(),
		"date_of_request": $('#date_of_request').val(),
		"date_of_collection": $('#date_of_collection').val(),
		"date_of_destruction": $('#date_of_destruction').val(),
		"certificate_of_destruction": $('#certificate_of_destruction').val(),
		"status": $('#status').val(),
		"video_link": $('#video_link').val(),
		"customer_id": $('#customer_id').val(),
		"crm_link": $('#crm_link').val()

	});
	console.log($('#customer_name').val())
	console.log($('#date_of_request').val())
	console.log($('#date_of_collection').val())
	console.log($('#date_of_destruction').val())
	console.log($('#certificate_of_destruction').val())
	console.log($('#status').val())
	console.log($('#video_link').val())
	console.log($('#customer_id').val())
	console.log($('#crm_link').val())
	console.log(string);
	return string;
};

var completedJobsModalTable = function () {
	var htmlStr = '<div class="modal-header">' +
		'<h2 class="modal-title">Manage Completed Jobs</h2>' +
		'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form>' +
		'<div class="form-group">' +
		'<label for="customer_name">Customer Name:</label>' +
		'<input type="text" class="form-control" id="customer_name">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="date_of_request">Date Of Request:</label>' +
		'<input type="text" class="form-control" id="date_of_request">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="date_of_collection">Date Of Collection:</label>' +
		'<input type="text" class="form-control" id="date_of_collection">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="date_of_destruction">Date Of Destruction:</label>' +
		'<input type="text" class="form-control" id="date_of_destruction">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="certificate_of_destruction">Certificate Of Destruction:</label>' +
		'<input type="text" class="form-control" id="certificate_of_destruction">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="status">Status:</label>' +
		'<input type="text" class="form-control" id="status">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="video_link">Video Link:</label>' +
		'<input type="text" class="form-control" id="video_link">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="customer_id">Customer ID:</label>' +
		'<input type="text" class="form-control" id="customer_id">' +
		'</div>' +
		'<div class="form-group">' +
		'<label for="crm_link">CRM Link:</label>' +
		'<input type="text" class="form-control" id="crm_link">' +
		'</div>' +
		'</form>' +
		'</div>';

	var htmlButtons = '<div class="modal-footer">' +
		'<button type="button" class="btn btn-primary" id="addCompletedJob">Add Completed Job</button>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
		'</div>';

	$("#myModal .modal-content").html(htmlStr + htmlButtons);
	$('#myModal').modal('show');
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





