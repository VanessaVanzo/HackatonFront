import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Emprestimo, Parcelas } from './emprestimoInterface';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  formulario!: FormGroup;
  opened: boolean = false;
  panelOpenState = false;
  emprestimoSac: Parcelas[] = [];
  emprestimoPrice: Parcelas[] = [];
  resultadoSimulacao!: Emprestimo | null;
  taxaJuros!: number;
  erro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      valorDesejado: [null],
      prazo: [null],
    });

    this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport width is 1024px or greater!');
        } else {
          this.opened = true;
        }
      });
  }

  onSubmit() {
    this.erro = '';
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
      .subscribe(
        (dados: any) => {
          this.taxaJuros = dados.taxaJuros;
          this.resultadoSimulacao = dados.resultadoSimulacao;
          this.emprestimoPrice = this.resultadoSimulacao![0].parcelas;
          this.emprestimoSac = this.resultadoSimulacao![1].parcelas;
        },
        (erro) => {
          this.erro =
            'Não foi possível efetuar a simulação com os valores informados.';
          this.resultadoSimulacao = [];
          this.resultadoSimulacao = null;
        }
      );
  }
}
