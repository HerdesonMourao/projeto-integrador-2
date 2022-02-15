import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/service/category.service';
import { ExpenditureService } from 'src/app/service/expenditure.service';

@Component({
  selector: 'app-new-expenditure',
  templateUrl: './new-expenditure.component.html',
  styleUrls: ['./new-expenditure.component.scss']
})
export class NewExpenditureComponent implements OnInit {
  public expenditureForm: FormGroup;

  context_description: string;
  context_value: string;

  categorys: Category[];

  constructor(
    private fb: FormBuilder,
    private expenditureService: ExpenditureService,
    private categoryService: CategoryService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllCategory();

    this.expenditureForm = this.fb.group({
      description: new FormControl(null, Validators.compose([Validators.required])),
      value: new FormControl(null, Validators.compose([Validators.required])),
      expense_date: new FormControl(null),
      Category: new FormControl(""),
      payment_method: new FormControl(""),
      number_installments: new FormControl(null),
      isPaid: new FormControl(""),
    });
  }

  getAllCategory(){
    this.categoryService.index().subscribe((data) => {
      this.categorys = data;
    })
  }

  register(){
    this.expenditureForm.addControl('user_id', new FormControl(Number(localStorage.getItem('user_id'))));

    if(this.expenditureForm.valid){
      this.expenditureService.store(this.expenditureForm.value).subscribe(
        (res) => {
          this.toastr.success(
            'Despesa cadastrado com sucesso!'
          );
          this.route.navigate(['expenditure']);
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
    if(context == 'description'){
      if(this.expenditureForm.value.description == null){
        this.context_description = context;
      }
    } else if(context == 'value'){
      if(this.expenditureForm.value.value == null){
        this.context_value = context;
      }
    }
  }

  get description(){
    return this.expenditureForm.get('description');
  }

  get value(){
    return this.expenditureForm.get('value');
  }
}
