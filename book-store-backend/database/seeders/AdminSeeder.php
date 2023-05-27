<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        Admin::create ([
            'username' => 'admin1',
            'email' => 'admin1@gmail.com',
            'password' => bcrypt('password'),
        ]);

        Admin::create ([
            'username' => 'admin2',
            'email' => 'admin2@gmail.com',
            'password' => bcrypt('password'),
        ]);

        //can use factory method also. then can insert multiple records at once
        // Admin::factory()->count(10)->create();

    }
}
