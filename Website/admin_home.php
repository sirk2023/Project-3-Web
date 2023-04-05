<?php
    include_once 'header.php';
?>

        
        <section class="index-catagories">
            <div class="profile-left-panel">
                <!--Side Panel navbar-->
                <div class="sidenav">
                    <a href="admin_home.php">Requested Destructions</a>
                    <a href="admin_view_all_jobs.php">View all Jobs</a>
                    <a href="admin_batch.php">Batch</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                </div>
            </div>
            <div class="profile-right-panel">
                <div class="index-intro">
                    <h1>Welcome Admin <?php
                        echo $_SESSION['username']; 
                    ?></h1>
                    <p>Your ID is: <?php
                        echo $_SESSION['userid']; 
                    ?><br> Your Username is: <?php
                        echo $_SESSION['useruid']; 
                    ?><br> Your Email is: <?php
                        echo $_SESSION['useremail']; 
                    ?><br> Your Role is: <?php
                    echo $_SESSION['userstatus']; 
                    ?> 
                    </p>
                </div>
            <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <!--Header Contents-->
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Request Details</h4>
                            </div>
                            <div class="modal-body" id="contents">
                                <!--Body Contents-->
                            </div>
                            <div class="modal-footer" id="modalFooter">
                                <!--Footer Contents-->
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Here is a list of Destruction Requests!</p>
                <div class="tab-pane" id="products">
                    <table id="table_id" class="display">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Conpany Name</th>
                                <th>Client Address</th>
                                <th>Additional Information</th>
                                <th></th>
                            </tr>
                    <tbody id="table_body">
                </tbody>
            </table>
        </div>
                <button class="btn btn-primary" id="addToken">Add Job</button>
                <p>This is Admin Home</p>
            </div>
        </section>

<?php
    include_once 'footer.php';
?>