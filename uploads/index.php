<?php
    require 'config.php';
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Import Excel</title>
    </head>
    <body>
        <form class=""action="" enctype="multipart/form-data" method="post">
            <input type="file" name="excel" required value="">
            <button type="submit" name="import">Submit</button>
        </form>
        <table>
            <tr>
                <td>#</td>
                <td>Barcode</td>
                <td>Batch</td>
            </tr>
            <?php
            $i = 1;
            $rows = $conn->query("SELECT * FROM dummy");
            foreach($rows as $row):
            ?>
            <tr>
            <td><?php echo $i++; ?></td>
            <td><?php echo $row["barcode"]; ?></td>
            <td><?php echo $row["batch"]; ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php
        try{
            if(isset($_POST["import"])){
                $fileName = $_FILES["excel"]["name"];
                $fileExtention = pathinfo($fileName, PATHINFO_EXTENSION);
    
                $newFileName = date("Y.m.d") . " - " . date("h.i.sa") . "." . $fileExtention;
    
                $targetDirectory = "uploads/" . $newFileName;
                if(move_uploaded_file($_FILES["excel"]["tmp_name"], $targetDirectory)) {
                    if (!file_exists('uploads')) {
                        mkdir('uploads', 0777, true);
                    }
                
                    require_once __DIR__ . '/excelReader/excel_reader2.php';
                    require_once __DIR__ . '/excelReader/SpreadsheetReader.php';
    
                    $reader = new SpreadsheetReader($targetDirectory);
                    foreach($reader as $key => $row){
                        $barcode = $row[0];
                        $batch = $row[1];
                        $stmt = $conn->prepare("INSERT INTO dummy (barcode, batch) VALUES (:barcode, :batch)");
                        $stmt->bindParam(':barcode', $barcode);
                        $stmt->bindParam(':batch', $batch);
                        $stmt->execute();
                    }
            
                } else {
                    echo "Failed to upload the file.";
                }
                echo
        "
        <script>
        alert('Done');
        </script>
        ";
        }
        }
        catch(Exception $e){
            $error_message = $e->getMessage();
        }
            
        
        ?>
    </body>
</html>