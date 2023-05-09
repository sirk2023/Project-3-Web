<?php
    include_once 'header.php';
?>

        
        <section class="index-catagories">
        <div class="profile-left-panel">
                <!--Side Panel navbar-->
                <div class="sidenav">
                    <a href="admin_all_users.php">View Users</a>
                    <a href="admin_signup.php">Create Admin</a>
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
                                <h4 class="modal-title">User Details</h4>
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
                <p>Here is a list of Users!</p>
                <div class="" id="products">
                    <table id="user_table_id" class="display">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Contact Number</th>
                                <th>Username</th>
                                <th>User Role</th>
                                <th></th>
                            </tr>
                    <tbody id="table_body_users">
                </tbody>
            </table>
        </div>
                <button class="btn btn-primary" id="addToken">Add User</button>
            </div>
        </section>

<?php
    include_once 'footer.php';
?>