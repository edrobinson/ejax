<?php
/*
  This script accepts error messages from a web client 
  and logs them to file for the dev.
  
  The error messages 
*/  

  //Read the message
  $data = json_decode(file_get_contents("php://input"));