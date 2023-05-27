<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Registration
Route::post('/register', [RegisteredUserController::class, 'store']);

// Login
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::get('/searchBooksWithAuthors', [AdminController::class, 'searchBooks']);
Route::get('/getBooksWithAuthors', [BookController::class, 'booksWithAuthors']);

Route::group(['middleware' => 'auth:adminApi'], function () {
    Route::post('/admin/logout', [AuthenticatedSessionController::class, 'adminLogOut']);
    Route::get('/booksWithAuthors', [AdminController::class, 'booksWithAuthors']);
    Route::get('/authors', [AdminController::class, 'authors']);
    Route::get('/searchBooks', [AdminController::class, 'searchBooks']);
    Route::put('/author/{id}/activate', [AdminController::class, 'activate']);
    Route::put('/author/{id}/deactivate', [AdminController::class, 'deactivate']);
});

Route::group(['middleware' => 'auth:authorApi'], function () {
    Route::post('/author/logout', [AuthenticatedSessionController::class, 'authorLogOut']);
    Route::get('/author/{id}/books', [BookController::class, 'bookList']);
    Route::post('/author/{id}/add_book', [BookController::class, 'store']);
});


Route::group(['middleware' => 'auth:visitorApi'], function () {
    Route::post('/visitor/logout', [AuthenticatedSessionController::class, 'visitorLogOut']);
});
