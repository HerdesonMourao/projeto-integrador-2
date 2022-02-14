import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  public categoryForm: FormGroup;

  context_name: string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl(null, Validators.compose([Validators.required])),
    })
  }

  register(){
    this.categoryForm.addControl('user_id', new FormControl(Number(localStorage.getItem('user_id'))));

    if(this.categoryForm.valid){
      this.categoryService.store(this.categoryForm.value).subscribe(
        (res) => {
          this.toastr.success(
            'Categoria cadastrada com sucesso!'
          );
          this.route.navigate(['category']);
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
    if(context == 'name'){
      if(this.categoryForm.value.name == null){
        this.context_name = context;
      }
    }
  }

  get name(){
    return this.categoryForm.get('name');
  }
}
