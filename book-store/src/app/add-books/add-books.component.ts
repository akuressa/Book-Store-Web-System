import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

function validateCoverImage(control: AbstractControl): { [key: string]: any } | null {
  const file = control.value;

  if (file) {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileName = file.split('\\').pop();
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      return { invalidExtension: true };
    }
  }
  return null;
}

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})

export class AddBooksComponent implements OnInit {
  bookForm!: FormGroup;
  selectedFile: File | null = null;
  submitted = false;
  isButtonDisabled = false;

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(150)]),
      coverImage: new FormControl('', [Validators.required, validateCoverImage])
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    this.isButtonDisabled = true;
    const formData = new FormData();
    formData.append('title', this.bookForm.value.title);
    formData.append('description', this.bookForm.value.description);
    if (this.selectedFile) {
      formData.append('coverImage', this.selectedFile, this.selectedFile.name);
    }

    this.authorService.addBook(formData)
      .subscribe(
        (response) => {
          this.submitted = false;
          this.isButtonDisabled = false;
          this.bookForm.reset();
          this.selectedFile = null;
          this.router.navigate(['/book-list'])
        },
        (error) => {
          console.error('Failed to add book', error);
        }
      );
  }
}
