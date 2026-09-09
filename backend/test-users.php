<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$users = App\Models\User::all();
echo "TOTAL USERS IN MYSQL: " . $users->count() . "\n";
foreach ($users as $u) {
    echo "ID: {$u->id} | Name: {$u->name} | Email: {$u->email}\n";
    echo "Check admin123: " . (\Illuminate\Support\Facades\Hash::check('admin123', $u->password) ? "VALID" : "INVALID") . "\n";
}
