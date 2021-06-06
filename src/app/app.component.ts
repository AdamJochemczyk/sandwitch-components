import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl} from "@angular/forms"
import {Observable} from "rxjs"
import {map,startWith} from "rxjs/operators"
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog"
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import {MatTableDataSource} from "@angular/material/table"
import {MatSort} from "@angular/material/sort"
import {MatPaginator} from "@angular/material/paginator"

//table columns interface
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//data array
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-material';
  notifications = 0;
  showSpinner = false;
  opened = false;
  selectedValue: string = '';
  options: string[] = ['Ang', 'React', 'Vue'];
  objectOptions = [{ name: 'Angular' }, { name: 'r' }, { name: 'v' }];
  myControl = new FormControl();
  filteredOptions: Observable<string[]> = this.myControl.valueChanges.pipe(
    startWith(''),
    map((value) => this._filter(value))
  );
  minDate = new Date();
  maxDate = new Date(2021, 6, 10);

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    for (let index = 0; index < 1000; index++) {
      this.numbers.push(index);
    }
  }

  //data table viewChild
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    //table sorting
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

  log(state: any) {
    console.log(state);
  }
  logChange(state: any) {
    console.log(state);
  }

  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('Snackbar action was triggered');
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {
      data: { name: 'Adam' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //data table

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  numbers:Array<number>=[];

}
