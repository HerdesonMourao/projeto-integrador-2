import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RevenueService } from 'src/app/service/revenue.service';

@Component({
  selector: 'app-new-revenue',
  templateUrl: './new-revenue.component.html',
  styleUrls: ['./new-revenue.component.scss']
})
export class NewRevenueComponent implements OnInit {
  public revenueForm: FormGroup;

  context_competence: string;
  context_value: string;

  constructor(
    private fb: FormBuilder,
    private revenueService: RevenueService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.revenueForm = this.fb.group({
      competence: new FormControl(null, Validators.compose([Validators.required])),
      value: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  register(){
    this.revenueForm.addControl('user_id', new FormControl(Number(localStorage.getItem('user_id'))));

    this.revenueForm.patchValue({
      competence: this.revenueForm.value.competence.replace(/(\d{2})(\d{4})/,'$1/$2')
    });

    if(this.revenueForm.valid){
      this.revenueService.store(this.revenueForm.value).subscribe(
        (res) => {
          this.toastr.success(
            'Receita cadastrada com sucesso!'
          );
          this.route.navigate(['revenue']);
        },
        (message) => {
          this.toastr.error(
            `${message.error.error}`
          )
        }
      )
    }else{
      this.toastr.error('Preencha todos os campos obrigatórios')
    }
  }

  blurValidationRequired(context){
    if(context == 'competence'){
      if(this.revenueForm.value.competence == null){
        this.context_competence = context;
      }
    } else if(context == 'value'){
      if(this.revenueForm.value.value == null){
        this.context_value = context;
      }
    }
  }

  get competence(){
    return this.revenueForm.get('competence');
  }

  get value(){
    return this.revenueForm.get('value');
  }
}
