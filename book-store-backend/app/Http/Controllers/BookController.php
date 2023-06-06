<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use App\Models\Book;
use Exception;

class BookController extends Controller
{
    public function bookList(Request $request)
    {
        $book_list = Author::with('book_list')->find($request->route('id'));

        return response()->json(['msg'=>'Book list rendered succesfully', 'data'=>$book_list->book_list], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'coverImage' => 'required|file|mimes:jpg,jpeg,png',
        ]);

        if($request->hasFile('coverImage')){
            $filename = pathinfo($request->coverImage->getClientOriginalName(), PATHINFO_FILENAME);

            $filename = $filename.'_'.time().'.'.request()->coverImage->getClientOriginalExtension();
            $path = $request->coverImage->storeAs('image', $filename, 'public');

            $validatedData['cover_image'] = $path;
            $authorId = $request->route('id');
            $validatedData['author_id'] = $authorId;

            $book = Book::create($validatedData);

            return response()->json(['msg'=>'Book profile created succesfully', 'data'=>$book], 200);
        }
    }

    public function booksWithAuthors()
    {
        try
        {
            $book_list = Book::with(['author' => function ($query) {
                $query->select('id', 'username');
            }])
            ->whereHas('author', function ($query) {
                $query->where('is_active', 1);
            })
            ->select('id', 'title', 'cover_image', 'description', 'author_id')
            ->get();

            return response()->json(['msg'=>'Book list rendered succesfully', 'data'=>$book_list], 200);
        }
        catch(Exception $e)
        {
            return response()->json(['msg'=>'error', 'error'=> $e->getMessage()]);
        }

    }

}
