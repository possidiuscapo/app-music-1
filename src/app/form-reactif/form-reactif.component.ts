import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactif',
  templateUrl: './form-reactif.component.html',
  styleUrls: ['./form-reactif.component.css']
})
export class FormReactifComponent {
  constructor(private fb: FormBuilder) {}
  genres = ['Jazz', 'Hip-Hop', 'Rap', 'R&B', 'Reggae', 'Zouk'];
  musicForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]], // new FormControl('', Validators.required)
    auteur: ['', Validators.required],
    style: ['Sélectionnez le genre de musique']
  });

  get name() {return this.musicForm.get("name");}
  get auteur() {return this.musicForm.get("auteur");}
  get style() {return this.musicForm.get("style");}

  onSubmit() {
    console.warn(this.musicForm.value);
  }
}
