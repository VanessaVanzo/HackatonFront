import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  formulario!: FormGroup;
  opened: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      valorDesejado: [
        null,
        Validators.pattern("'^(d{1,3}(.d{3})*|d+)(,d{2})?$'"),
      ],
      prazo: [null, Validators.pattern("'^(d{1,3}(.d{3})*|d+)(,d{2})?$'")],
    });
  }

  onSubmit() {
    console.log(this.formulario);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    this.http
      .post(
        'https://apphackaixades.azurewebsites.net/api/Simulacao',
        JSON.stringify(this.formulario.value),
        { headers: headers }
      )
      .pipe(map((res: any) => res))
      .subscribe((dados: any) => {
        console.log(dados);
        this.formulario.reset();
      });
  }
}
