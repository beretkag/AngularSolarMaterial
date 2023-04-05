import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog, private api: ApiService) {}

  title = 'AngularSolarMaterial';
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['ID',	'datum', 'termeles', 'HMKE', 'muveletek' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  openDialog(dialogData?:any) {
    this.dialog.open(DialogComponent, {
      data: dialogData,
    }).afterClosed().subscribe(value => {
      if (value === 'save' || value === 'update'){
        this.getAllRecords();
      }
    })
  }

  ngOnInit(){
    this.getAllRecords();
  }
 	
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id:string){
    if (confirm('Biztosan törölni szeretnéd a rekordot?')){
      this.api.delete('termeles', 'ID', id).subscribe({
        next: (res)=>{
          alert('A törlés sikeresen megtörtént!');
          this.getAllRecords();
        },
        error: ()=>{
          alert('Hiba a törlés közben!');
        }
      });
    }
  }

  getAllRecords(){
    this.api.selectAll('termeles_nezet').subscribe({
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {console.log(error)}
    });
  }
}