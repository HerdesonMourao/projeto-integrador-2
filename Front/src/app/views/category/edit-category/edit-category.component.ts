import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  public categoryForm: FormGroup;

  context_name: string;

  category: Category;
  idParams: number;
  idClient: Subscription;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.idClient = this.route.params.subscribe((params: any) => {
      this.idParams = Number(params['id']);
    })

    this.populateForm();
    this.initForm();
  }

  populateForm(){
    this.categoryService.show(this.idParams).subscribe((data) => {
      this.category = data;
      this.updateForm(data);
    })
  }

  updateForm(data){
    this.categoryForm.patchValue({
      name: data.name
    })
  }

  initForm(){
    this.categoryForm = this.fb.group({
      name: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  register(){
    if(this.categoryForm.valid){
      this.categoryService.update(this.categoryForm.value, this.idParams).subscribe(
        (dados) => {
          this.toastr.success(`${dados.message}`);
          this.router.navigate(['category']);
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
