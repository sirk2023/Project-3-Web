<?php
    include_once 'header.php';
?>

        
<section class="index-intro">
            <h1>SECURE | SAFE | TRUSTED</h1>
            <p>Secure | Online booking system | All industry sectors <br> <strong>Certificate Of Destruction & Video Capture</strong></p>
        </section>
        <section class="index-catagories index-intro" >
            <div class="left-panel">
                <img class="img-poster" src="/website1020/img/poster.png" alt="qeq">
                
                <!-- content for left panel goes here -->
                <!-- <div class="img-poster">
                    <img class="img-poster" src="/website1020/img/poster.png" alt="qeq">
                </div> -->
                <!-- <img class="img-poster" src="/website1020/img/poster.png" alt="qeq"> -->
            </div>

            <div class="right-panel">
                <div class="right-panel-top">
                    <h1 class="heading-index margin-control">How Does The Process Work?</h1>
                    <p class= "p-index margin-control">Members of our Garda vetted team collect the units from your premises at a
                        pre-arranged date and time. Each unit’s serial number is captured via
                        barcode scanning before being placed in a secure container, locked with
                        tamperproof seals, and transported to our shredding facility. When received
                        at our secure shredding facility, the units are again scanned to cross
                        reference the serial numbers before shredding to 20mm particles. The
                        entire shredding process is video captured for the client to either view
                        online or download from our secure online platform. We also generate a
                        certificate of destruction for the client.
                    </p>
                    <button class="btn btn-warning" id="addToken">Request Job</button>
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
                <div class="right-panel-bot"></div>
                    
                        <button id="addToken">Request Job</button>
                        
                    
                <!-- content for right panel goes here -->
                <!-- <img src="qeq.jpg"> -->
            </div>
        </section>

<?php
    include_once 'footer.php';
?>