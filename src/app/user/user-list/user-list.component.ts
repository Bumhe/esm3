import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { MemberForCreation } from '../../_interface/memberForCreation.model';
	 	
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,AfterViewInit {
 
  public displayedColumns = ['firstName','lastName', 'zone', 'address',
   'phone', 'email', 'details'
];

  public dataSource = new MatTableDataSource<MemberForCreation>();
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;

	
constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }
 
  ngOnInit() {
    this.getAllOwners();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getAllOwners = () => {
    this.repoService.getData('api/users')
    .subscribe(res => {
      this.dataSource.data = res["users"] as MemberForCreation[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }
  
 
  public redirectToDetails = (id: string) => {
    let url: string = `/member/details/${id}`;
    this.router.navigate([url]);
  }
 
  public redirectToUpdate = (id: string) => {
    
  }
 
  public redirectToDelete = (id: string) => {
    
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
