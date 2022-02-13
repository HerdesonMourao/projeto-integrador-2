import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Revenue } from 'src/app/models/Revenue';
import { RevenueService } from 'src/app/service/revenue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  revenues: Revenue[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private revenueService: RevenueService
  ) { }

  ngOnInit(): void {
    this.getAllRevenues();
  }

  getAllRevenues(){
    this.revenueService.index().subscribe((data) => {
      this.revenues = data;
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
        this.revenueService.destroy(id).subscribe((data => {
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

  filterRevenue(event: any){
    let {value} = event.target;
    let rows = document.querySelectorAll('#revenueTable tbody tr');

    rows.forEach(row => {
      const find = row.textContent.toLocaleLowerCase().includes(value);
      find ? row.classList.remove('hidden') : row.classList.add('hidden');
    });
  }
}
