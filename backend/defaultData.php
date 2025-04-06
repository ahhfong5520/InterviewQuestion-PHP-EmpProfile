<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

define('NATIONALITIES_JSON_FILE', __DIR__ . '/data/nationalities.json');

header('Content-Type: application/json');

function getNationalities() {
    try {
        $jsonContent = file_get_contents(NATIONALITIES_JSON_FILE);
        
        if ($jsonContent === false) {
            throw new Exception("Unable to read the nationalities JSON file.");
        }

        $nationalities = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Error decoding JSON data.");
        }
        usort($nationalities, function($a, $b) {
            return strcmp($a['nationality_name'], $b['nationality_name']);
        });

        echo json_encode($nationalities);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to fetch nationalities', 'error' => $e->getMessage()]);
    }
}

$requestUri = $_SERVER['REQUEST_URI'];

if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($requestUri, '/data/nationalities') !== false) {
    getNationalities();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found']);
}
?>
