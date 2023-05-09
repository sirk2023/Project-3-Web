<?php

if(!empty($_FILES['csv_file']['name'])){
    $file_data = fopen($_FILES['csv_file']['tmp_name'], 'r');
    $column = fgetcsv($file_data);
    while($row = fgetcsv($file_data)){
        $row_data = array(
            'hdd_serial_number' => $row[0],
            'batch_id' => $row[1]
        );
    }
    $output = array(
        'column' => $column,
        'row_data' => $row
    );
    echo json_encode($output);
}

?>