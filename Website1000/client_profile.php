<?php
    include_once 'header.php';
?>

        
        <section class="index-catagories">
            <div class="profile-left-panel">
                <!--Side Panel navbar-->
                <div class="sidenav">
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                </div>
            </div>
            <div class="profile-right-panel">
                <div class="index-intro">
                    <h1>Welcome! <?php
                        echo $_SESSION['username']; 
                    ?></h1>
                </div>
            <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content Form Requst Destruction Table Generated In main2.JS File -->
                        <div class="modal-content">
                            <div class="modal-header">
                                <!--Header Contents-->
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Destruction Details</h4>
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
                <div class="container py-4">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://via.placeholder.com/150" alt="Profile Picture" class="img-fluid mb-3 rounded-circle">
                            <h4> <?php
                                echo $_SESSION['username']; 
                        ?></h4>
                            <p>Your Role is: <?php
                                echo $_SESSION['userstatus']; 
                        ?> </p>
                        </div>
                        <div class="col-md-8">
                            <h2>Profile Information</h2>
                            <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h5>You'r ID</h5>
                                    </div>
                                    <div class="col-sm-9">
                                        <p><?php
                                            echo $_SESSION['userid']; 
                                        ?></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h5>Username</h5>
                                    </div>
                                    <div class="col-sm-9">
                                        <p><?php
                                            echo $_SESSION['useruid']; 
                                        ?></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h5>Email</h5>
                                    </div>
                                    <div class="col-sm-9">
                                        <p><?php
                                            echo $_SESSION['useremail']; 
                                    ?></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h5>Phone</h5>
                                </div>
                                <div class="col-sm-9">
                                    <p>[Can add if needed]</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <h5>CRM</h5>
                            </div>
                            <div class="col-sm-9">
                                <p><a href="[Your Website URL]">[Your Website URL]</a></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                <button id="addToken">Request Job</button>
                <p>This is Client Profile</p>
            </div>
        </section>

<?php
    include_once 'footer.php';
?>