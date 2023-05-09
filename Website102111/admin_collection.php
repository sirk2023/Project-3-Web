<?php
    include_once 'header.php';
    include 'fetch.php';
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
                                <h4 class="modal-title">Collection Details</h4>
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
                    <table id="collection_table_id" class="display">
                        <thead>
                            <tr>
                                <th>HDD Serial Number</th>
                                <th>Batch Id</th>
                                <th>Signed By Customer</th>
                                <th>Signed Date</th>
                                <th></th>
                            </tr>
                    <tbody id="table_body_collected">
                </tbody>
            </table>
        </div>
                <button class="btn btn-primary" id="addCHDModal">Add Hard Drive</button>
                <form id="upload_csv" method="post" enctype="multipart/form-data">
                    <div class="col-md-3">
                        <br/>
                        <label>Select CSV File</label>
                    </div>
                    <div class="col-md-4">
                        <input type="file" name="csv_file" id="csv_file" accept=".csv" style="margin-top:15px;"/>
                    </div>
                    <div class="col-md-5">
                        <input type="submit" name="upload" id="upload" value="Upload" style="margin:top:10px;" class="btn btn-info" />
                    </div>
                    <div style="clear:both"></div>
                </form>
                <br/>
                <br/>
                <div id="csv_file_data"></div>

        </section>

<?php
    include_once 'footer.php';
?>