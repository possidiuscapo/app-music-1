import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  albumForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.albumForm = this.fb.group({
      id: '',
      name: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      title: ['', [
        Validators.required,
      ]],
      ref: ['', [ // 20FTX
        Validators.required,
        Validators.pattern('\\w{5}') // doit avoir 5 caractères
        // Validators.pattern('[A-Z0-9]{5}')
      ]],
      duration: ['', [
        Validators.required,
        Validators.pattern('[0-9]*'), // doit avoir une suite de chiffres
        Validators.max(900)
      ]],
      description: ['', [
        Validators.required,
      ]],
      status: 'off',
    });
  }
  /** Getters qui seront utilisés pour la validation */
  get name() { return this.albumForm.get('name') }
  get ref() { return this.albumForm.get('ref') }
  get title() { return this.albumForm.get('title') }
  get duration() { return this.albumForm.get('duration') }
  get description() { return this.albumForm.get('description') }

  onSubmit() {
    console.log(this.albumForm.value);
  }
}
