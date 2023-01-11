import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  alert(value: any) {

  }

  filterBy() {
    let element: HTMLElement | null = document.getElementById("select")
    alert('change')
    // @ts-ignore
    element.addEventListener('input', (event: Event) => {
      console.log((event.target as HTMLInputElement).value);  // This will not cause an error
      location.href = this.router.url.split('?')[0]  + "?order=" + (event.target as HTMLInputElement).value;
      //this.router.navigate(['/market'], { queryParams: { order: (event.target as HTMLInputElement).value } });
    });
  }
}
