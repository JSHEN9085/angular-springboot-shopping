import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string){
    console.log("input" + value);
    this.router.navigateByUrl(`/search/${value}`)
    //navigateByUrl is from { Router } from '@angular/router', and navigate our url to the perpor backend url to retrieve data
  }
}
