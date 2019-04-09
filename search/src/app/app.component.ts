
import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {ServiceService} from "./service.service";
import {startWith} from "rxjs/internal/operators/startWith";
import {debounceTime, filter, map} from "rxjs/operators";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {switchMap} from "rxjs/internal/operators/switchMap";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(private service: ServiceService) {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        filter(text => text.length > 2),
        debounceTime(3000),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val || '')
        })
      );
  }

  filter(val: string): Observable<any[]> {
    return this.service.getUsers()
      .pipe(
        map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }
  ngOnInit() {
  }
}

