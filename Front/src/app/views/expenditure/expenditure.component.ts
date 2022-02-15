import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expenditure } from 'src/app/models/Expenditure';
import { ExpenditureService } from 'src/app/service/expenditure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss']
})
export class ExpenditureComponent implements OnInit {
  expenditures: Expenditure[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private expenditureService: ExpenditureService
  ) { }

  ngOnInit(): void {
    this.getAllExpenditure();
  }

  getAllExpenditure(){
    this.expenditureService.index().subscribe((data) => {
      this.expenditures = data;
    })
  }

  onEdit(id){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: number){
    console.log(id)
    Swal.fire({
      title: 'Deseja excluir esse registro?',
      text: "Essa operação é irreversível!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Deletar'
    }).then(result => {
      if(result.isConfirmed){
        this.expenditureService.destroy(id).subscribe((data => {
          Swal.fire({
            title:data.message,
            icon:'success',
            confirmButtonColor: '#3085d6',
          }).then(result => {
            if(result.isConfirmed){
              window.location.reload()
            }
          })
        }))
      }
    })
  }

  filterExpenditure(event: any){
    let {value} = event.target;
    let rows = document.querySelectorAll('#expenditureTable tbody tr');

    rows.forEach(row => {
      const find = row.textContent.toLocaleLowerCase().includes(value);
      find ? row.classList.remove('hidden') : row.classList.add('hidden');
    });
  }

}
