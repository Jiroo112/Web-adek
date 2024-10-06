<?php
$apiUrl = 'https://1fae-140-213-118-69.ngrok-free.app/latihan/adek_aplication/Api/api.php';

$allowed_origins = [
    'http://localhost:8080',
    'https://b56a-2001-448a-5122-5aab-a17a-4316-aedf-aa30.ngrok-free.app' // Removed trailing space
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

// Initialize cURL
$curl = curl_init();

// Set cURL options
curl_setopt_array($curl, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "Accept: application/json"
    ],
]);

// Execute cURL
$response = curl_exec($curl);
$err = curl_error($curl);

// Close cURL connection
curl_close($curl);

// Set response header
header('Content-Type: application/json');

// Check for cURL error
if ($err) {
    echo json_encode(["error" => "cURL Error: " . $err]);
} else {
    // Try to decode JSON
    $data = json_decode($response, true);
    
    // Check if JSON is valid
    if (json_last_error() === JSON_ERROR_NONE) {
        echo $response; // Return original response if valid
    } else {
        echo json_encode(["error" => "Invalid JSON response"]);
    }
}
