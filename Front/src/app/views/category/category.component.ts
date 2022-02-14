import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorys: Category[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(){
    this.categoryService.index().subscribe((data) => {
      this.categorys = data;
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
        this.categoryService.destroy(id).subscribe((data => {
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

  filterCategory(event: any){
    let {value} = event.target;
    let rows = document.querySelectorAll('#categoryTable tbody tr');

    rows.forEach(row => {
      const find = row.textContent.toLocaleLowerCase().includes(value);
      find ? row.classList.remove('hidden') : row.classList.add('hidden');
    });
  }

}
