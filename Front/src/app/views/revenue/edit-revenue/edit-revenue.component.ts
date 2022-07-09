import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Revenue } from 'src/app/models/Revenue';
import { RevenueService } from 'src/app/service/revenue.service';

@Component({
  selector: 'app-edit-revenue',
  templateUrl: './edit-revenue.component.html',
  styleUrls: ['./edit-revenue.component.scss']
})
export class EditRevenueComponent implements OnInit {
  public revenueForm: FormGroup;

  context_competence: string;
  context_value: string;

  revenue: Revenue;
  idParams: number;
  idClient: Subscription;

  constructor(
    private fb: FormBuilder,
    private revenueService: RevenueService,
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
    this.revenueService.show(this.idParams).subscribe((data) => {
      this.revenue = data;
      this.updateForm(data);
    })
  }

  updateForm(data){
    this.revenueForm.patchValue({
      competence: data.competence,
      value: data.value
    })
  }

  initForm(){
    this.revenueForm = this.fb.group({
      competence: new FormControl(null, Validators.compose([Validators.required])),
      value: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  register(){
    this.revenueForm.value.user_id = Number(localStorage.getItem('user_id'));

    if(this.revenueForm.valid){
      this.revenueService.update(this.revenueForm.value, this.idParams).subscribe(
        (dados) => {
          this.toastr.success(`${dados.message}`);
          this.router.navigate(['revenue']);
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
