import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'challenge-exercises';
  public valueJson = './../assets/values.json'
  public localitiesJson = './../assets/localities.json'
  localitie1: Array<any> = new Array<any>();
  localitie2: Array<any> = new Array<any>();
  localitie3: Array<any> = new Array<any>();
  localitie4: Array<any> = new Array<any>();
  values: Array<any> = new Array<any>();
  maxValue: number = 0;
  localitieMaxLimit: any;
  localitieToAdd: any;
  result: Array<any> = new Array<any>();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getJsonValues();
    this.getJsonLocalities();
  }

  public getValues(): Observable<any> {
    return this.http.get(this.valueJson)
  }

  public getLocalities(): Observable<any> {
    return this.http.get(this.localitiesJson)
  }

  public getJsonValues(): void {
    this.getValues().subscribe(data => {
      this.values = data;
    })
  }

  public getJsonLocalities(): void {
    this.getLocalities().subscribe(data => {
      this.localitie1 = data.BUIN;
      this.localitie2 = data.LAJA;
      this.localitie3 = data.LEBU;
      this.localitie4 = data.LOTA;
      this.maxLimitedLocalitie(this.localitie1, 'BUIN');
      this.maxLimitedLocalitie(this.localitie2, 'LAJA');
      this.maxLimitedLocalitie(this.localitie3, 'LEBU');
      this.maxLimitedLocalitie(this.localitie4, 'LOTA');
    })
  }

  maxLimitedLocalitie(localitie: Array<any>, nameLocalitie: any) {
    this.maxValue = 0;
    localitie.forEach(element => {
      if (element.limit > this.maxValue) {
        this.maxValue = element.limit;
        this.localitieToAdd = element;
      }
    })
    this.addLocalitieToResult(this.maxValue, this.localitieToAdd, nameLocalitie);
  }

  addLocalitieToResult(limitMax: any, localitie: any, nameLocalitie: any) {
    const under_over = this.values[localitie.over_carrier_service_id];
    let localiteToAdd = { localite: nameLocalitie, limit: limitMax, over: under_over, under: under_over };
    this.result.push(localiteToAdd);
  }

}
