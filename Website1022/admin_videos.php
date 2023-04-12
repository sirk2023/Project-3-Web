<?php
    include_once 'header.php';
?>

        
        <section class="index-catagories">
            <div class="profile-right-panel">
                <div class="index-intro">
                    <h1 class="margin-control">Welcome Admin <?php
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
                <div class="" id="products">
                    <table id="video_table_id" class="display">
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Batch ID</th>
                                <th>HDD Serial Number</th>
                                <th>Capture Date</th>
                                <th>File Link</th>
                                <th></th>
                            </tr>
                    <tbody id="table_body_video">
                </tbody>
            </table>
        </div>
                <button class="btn btn-primary" id="addVFModal">Add Video</button>
                <p>This is Video Page</p>
            </div>
        </section>

<?php
    include_once 'footer.php';
?>