import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Expenditure } from 'src/app/models/Expenditure';
import { CategoryService } from 'src/app/service/category.service';
import { ExpenditureService } from 'src/app/service/expenditure.service';

@Component({
  selector: 'app-edit-expenditure',
  templateUrl: './edit-expenditure.component.html',
  styleUrls: ['./edit-expenditure.component.scss']
})
export class EditExpenditureComponent implements OnInit {
  public expenditureForm: FormGroup;

  context_description: string;
  context_value: string;

  categorys: Category[];
  expenditure: Expenditure;
  idParams: number;
  idClient: Subscription;

  constructor(
    private fb: FormBuilder,
    private expenditureService: ExpenditureService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.idClient = this.route.params.subscribe((params: any) => {
      this.idParams = Number(params['id']);
    })

    this.getAllCategory();

    this.populateForm();
    this.initForm();
  }

  getAllCategory(){
    this.categoryService.index().subscribe((data) => {
      this.categorys = data;
    })
  }

  populateForm(){
    this.expenditureService.show(this.idParams).subscribe((data) => {
      this.expenditure = data;
      this.updateForm(data);
    })
  }

  updateForm(data){
    this.expenditureForm.patchValue({
      description: data.description,
      value: data.value,
      expense_date: data.expense_date,
      Category: data.categoryId,
      payment_method: data.payment_method,
      number_installments: data.number_installments,
      isPaid: data.isPaid
    })
  }

  initForm(){
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

  register(){
    this.expenditureForm.value.user_id = Number(localStorage.getItem('user_id'));

    if(this.expenditureForm.valid){
      this.expenditureService.update(this.expenditureForm.value, this.idParams).subscribe(
        (dados) => {
          this.toastr.success(`${dados.message}`);
          this.router.navigate(['expenditure']);
        },
        (error) => {
          this.toastr.error(
            `${error.message}`
          )
        }
      )
    }else{
      this.toastr.error('Dados do formulário inválido');
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
