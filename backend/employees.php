<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


function validateData($data) {
    $requiredFields = ['employeeName', 'email', 'gender', 'maritalStatus', 'phoneNo', 'address', 'dob', 'nationality', 'hireDate', 'department'];
    $valid = true;
    $errors = [];

    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            $valid = false;
            $errors[] = "The {$field} field is required.";
        }
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $valid = false;
        $errors[] = "The email address is not valid.";
    }

    return ['valid' => $valid, 'errors' => $errors];
}


function updateEmployeeInfo(&$data, &$employees) {
    if (!is_dir('exports')) {
        mkdir('exports', 0777, true);
    }

    $employeesFile = 'exports/employees.json';

    if (file_exists($employeesFile)) {
        $employeesContent = file_get_contents($employeesFile);
        $employees = json_decode($employeesContent, true);
    }

    if (empty($data['id'])) {
        $employeeId = uniqid('emp_', true);
        $data['id'] = $employeeId;
        $employees[] = $data; 
    } else {
        $employeeId = $data['id'];
    }

    $employeeFound = false;
    foreach ($employees as &$employee) {
        if ($employee['id'] === $employeeId) {
            $employee = array_merge($employee, $data);
            $employeeFound = true;
            break;
        }
    }

    if (!$employeeFound) {
        $employees[] = $data;
    }

    file_put_contents($employeesFile, json_encode($employees, JSON_PRETTY_PRINT));
}


$filePath = 'exports/employees.json'; 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $requestUri = $_SERVER['REQUEST_URI'];

    if (strpos($requestUri, "/data/files") !== false) {
        if (file_exists($filePath)) {
            header('Content-Type: application/json');
            echo file_get_contents($filePath);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'File not found']);
        }
        exit();
    } elseif (preg_match('/\/data\/employees\.json$/', $requestUri)) {
        if (file_exists($filePath)) {
            header('Content-Type: application/json');
            echo file_get_contents($filePath);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'File not found']);
        }
        exit();
    }
}



if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/data/updateEmployee') !== false) {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $validationResult = validateData($data);
        if (!$validationResult['valid']) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $validationResult['errors']
            ]);
            exit;
        }

        $employees = [];
        updateEmployeeInfo($data, $employees);

        echo json_encode([
            'status' => 'success',
            'message' => 'Employee data received and updated successfully.',
            'employee' => $data,
            'file' => 'employees.json'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No data received.'
        ]);
        exit;
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method or path.'
    ]);
    exit;
}



//Export multiple file for employees info
//Previous Design was each employees save into one file.
// $folderPath = __DIR__ . '/exports';

// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     $requestUri = $_SERVER['REQUEST_URI'];

//     if (strpos($requestUri, "/data/files") !== false) {
//         $files = scandir($folderPath);
        
//         $jsonFiles = array_filter($files, function ($file) {
//             return pathinfo($file, PATHINFO_EXTENSION) === 'json';
//         });
        
//         // Prevent additional output
//         header('Content-Type: application/json');
//         echo json_encode(array_values($jsonFiles));
//         exit();
//     } elseif (preg_match('/\/data\/(.*\.json)$/', $requestUri, $matches)) {
//         $file = $matches[1];
//         $filePath = $folderPath . '/' . $file;

//         if (file_exists($filePath)) {
//             echo file_get_contents($filePath);
//         } else {
//             http_response_code(404);
//             echo json_encode(['error' => 'File not found']);
//         }
//         exit();
//     }
// }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $data = json_decode(file_get_contents('php://input'), true);

//     if ($data) {
//         if (!is_dir('exports')) {
//             mkdir('exports', 0777, true);
//         }

//         $filename = 'employee_' . time();

//         $exportFormat = 'json'; 
//         if ($exportFormat === 'json') {
//             file_put_contents("exports/{$filename}.json", json_encode($data, JSON_PRETTY_PRINT));
//         } elseif ($exportFormat === 'csv') {
//             $csvFile = fopen("exports/{$filename}.csv", 'w');
//             fputcsv($csvFile, array_keys($data));
//             fputcsv($csvFile, array_values($data));
//             fclose($csvFile);
//         }

//         echo json_encode([
//             'status' => 'success',
//             'message' => 'Data received and exported successfully.',
//             'data' => $data,
//             'file' => "{$filename}.{$exportFormat}"
//         ]);
//     } else {
//         echo json_encode([
//             'status' => 'error',
//             'message' => 'No data received.'
//         ]);
//     }
// } else {
//     echo json_encode([
//         'status' => 'error',
//         'message' => 'Invalid request method.'
//     ]);
// }

?>
