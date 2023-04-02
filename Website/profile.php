<?php
    include_once 'header.php';
?>

        <section class="index-intro">
        <h1>Welcome! <?php
                echo $_SESSION['username']; 
                ?></h1>
            <p>Your ID is: <?php
                echo $_SESSION['userid']; 
                ?><br> Your Username is: <?php
                echo $_SESSION['useruid']; 
                ?><br> Your Email is: <?php
                echo $_SESSION['useremail']; 
                ?><br> You Logged in succesfully!
            </p>
        </section>
        <section class="index-catagories">
            <div class="profile-left-panel">
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <!--Header Contents-->
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Token Details</h4>
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
               <button id="addJob">Request Job</button>
            </div>
            <div class="profile-right-panel">
                <!-- content for right panel goes here -->
            </div>
        </section>

<?php
    include_once 'footer.php';
?>