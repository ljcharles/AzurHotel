<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost", "root", "", "azurhotel");

mysqli_set_charset($conn,"utf8");

if(isset($_GET["id"])){
  $id = $_GET["id"];
}

$result = $conn->query("SELECT * FROM hotel WHERE id = $id");

$i = 0;

$outp = '{"records"'.":[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  $i++;
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"nom":"'   . $rs["nom"]        . '",';
    $outp .= '"tel":"'   . $rs["tel"]        . '",';
    $outp .= '"description":"'   . $rs["description"]        . '",';
    $outp .= '"prix":"'   . $rs["prix"]        . '",';
    $outp .= '"image":"'   . $rs["image"]        . '",';
    if ($i == mysqli_num_rows($result)) {
      $outp .= '"adresse":"'. $rs["adresse"]     . '"}';
    } else {
      $outp .= '"adresse":"'. $rs["adresse"]     . '"},';
    }
}
$outp .="]}";

$conn->close();

echo($outp);
?>
