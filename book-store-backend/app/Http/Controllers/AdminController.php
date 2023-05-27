<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;

class AdminController extends Controller
{
    public function booksWithAuthors()
    {
        $book_list = Book::join('authors', 'books.author_id', 'authors.id')
                ->where('authors.is_active', 1)
                ->select('books.title', 'books.cover_image', 'authors.username')
                ->get();

        return response()->json(['msg'=>'Book list rendered succesfully', 'data'=>$book_list], 200);
    }

    public function authors()
    {
        $author_list = Author::all();

        return response()->json(['msg'=>'Author list rendered succesfully', 'data'=>$author_list], 200);
    }

    public function activate(Request $request)
    {
        $authorId = $request->route('id');
        Author::find($authorId)->update(['is_active' => 1]);

        return response()->json(['msg'=>'Author status updated succesfully'], 200);
    }

    public function deactivate(Request $request)
    {
        $authorId = $request->route('id');
        Author::find($authorId)->update(['is_active' => 0]);

        return response()->json(['msg'=>'Author status updated succesfully'], 200);
    }

    public function searchBooks(Request $request)
    {
        $searchKey = $request->key;
        $book_list = Book::join('authors', 'books.author_id', 'authors.id')
                ->where('authors.is_active', 1)
                ->where(function ($query) use ($searchKey) {
                    $query->where('books.title', 'like', '%' . $searchKey . '%')
                          ->orWhere('authors.username', 'like', '%' . $searchKey . '%');
                })
                ->select('books.title', 'books.cover_image', 'authors.username')
                ->get();

        return response()->json(['data'=>$book_list], 200);
    }
}
