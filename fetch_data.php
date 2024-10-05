<?php
$apiUrl = 'https://f695-203-29-27-201.ngrok-free.app/latihan/adek_aplication/Api/api.php'; // URL Ngrok

// Inisialisasi cURL
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $apiUrl);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);

// Mengonversi respons JSON menjadi array
$data = json_decode($response, true);

// Mengembalikan data sebagai JSON
header('Content-Type: application/json');
echo json_encode($data);
