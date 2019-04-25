import { Component, OnInit, ViewChild } from '@angular/core';
import { DanceClassPublicService } from '../services/dance-class.service';
import { DanceClass } from '../model/danceclass';
import { Place } from '../model/place';
import { DanceStyle } from '../model/dancestyle';
import { DanceStylePublicService } from '../services/dance-style.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  events: DanceClass[] = [];
  styles: DanceStyle[] = [];
  countries: string[] = ["All"];
  cities: string[] = ["All"];
  eventList: DanceClass[] = [];
  styleSelected: DanceStyle;
  countrySelected: string;
  citySelected: string;
  eventSelected: DanceClass;
  queryParams: Params = {};
  constructor(private route: ActivatedRoute,private router: Router,private danceClassService: DanceClassPublicService,private danceStyleService: DanceStylePublicService) {

  }
  
  ngOnInit() {
    this.danceStyleService.getDanceStyles().subscribe(resDanceStyle=>{
      this.styles.push({_id:null,name:"All"});
      this.styles = this.styles.concat(resDanceStyle);
      this.danceClassService.getDanceClasses().pipe(map(x=>{
        x.forEach(element=>{
          element.toDateFormated = moment(element.toDate).format("Do MMM YYYY")
          element.fromDateFormated = moment(element.fromDate).format("Do MMM YYYY")
          element.toTimeFormated = moment(element.toDate).format("HH:mm")
          element.fromTimeFormated = moment(element.fromDate).format("HH:mm")
        })
        return x;
      })).subscribe(resDanceClass=>{
        this.events = resDanceClass;
        if(this.route.snapshot.queryParams.stylename){
          this.queryParams.stylename = this.route.snapshot.queryParams.stylename;
          this.styleSelected = this.styles.find(x=>x.name.toLowerCase() == this.route.snapshot.queryParams.stylename.toLowerCase());
          if(this.styleSelected){
            this.getCountries();
            if(this.route.snapshot.queryParams.country){
              this.queryParams.country = this.route.snapshot.queryParams.country;
              this.countrySelected = this.countries.find(x=>x.toLowerCase() == this.route.snapshot.queryParams.country.toLowerCase());
              if(this.countrySelected){
                this.getCities();
                if(this.route.snapshot.queryParams.city){
                  this.queryParams.city = this.route.snapshot.queryParams.city;
                  this.citySelected = this.cities.find(x=>x.toLowerCase() == this.route.snapshot.queryParams.city.toLowerCase());
                  if(this.citySelected){
                    this.getEvents();
                  }
                }
              }
            }
          }
        }
      },errDanceClass=>{
        console.error("Error:",errDanceClass);
      })
    },errDanceStyle=>{
      console.error("Error:",errDanceStyle);
    })
  }
  setStyleSelected(style:DanceStyle){
    this.styleSelected = style;
    this.getCountries();
    this.queryParams = {stylename:style.name};
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: this.queryParams, 
        queryParamsHandling: "", // remove to replace all query params by provided
      });
  }
  setCountrySelected(country:string){
    this.countrySelected = country;
    this.getCities();
    this.queryParams = {stylename:this.styleSelected.name,country:this.countrySelected};
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: this.queryParams, 
        queryParamsHandling: "", // remove to replace all query params by provided
      });
  }
  setCitySelected(city:string){
    this.citySelected = city;
    this.getEvents();
    this.queryParams = {stylename:this.styleSelected.name,country:this.countrySelected,city:this.citySelected};
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: this.queryParams, 
        queryParamsHandling: "", // remove to replace all query params by provided
      });
  }
  // TODO: Make it better
  getCountries(){
    let eventsFiltered = this.events.filter(x=>x.danceStyle._id == this.styleSelected._id || !this.styleSelected._id);
    eventsFiltered.forEach(element => {
      if(!this.countries.find(x=>x.toLowerCase() == element.place.country.toLowerCase()))
        this.countries.push(element.place.country);
    });
  }
  // TODO: Make it better
  getCities(){
    let eventsFiltered = this.events.filter(x=>
      (x.place.country.toLowerCase() == this.countrySelected.toLowerCase() || this.countrySelected === "All") 
      && (x.danceStyle._id == this.styleSelected._id || !this.styleSelected._id)
    );
    eventsFiltered.forEach(element => {
      if(!this.cities.find(x=>x.toLowerCase() == element.place.city.toLowerCase()))
        this.cities.push(element.place.city);
    });
  }
  // TODO: Make it better
  getEvents(){
    this.eventList = this.events.filter(x=>
      (x.place.city.toLowerCase() == this.citySelected.toLowerCase()  || this.citySelected === "All")
      && (x.place.country.toLowerCase() == this.countrySelected.toLowerCase() || this.countrySelected === "All") 
      && (x.danceStyle._id == this.styleSelected._id || !this.styleSelected._id));
  }
  showBookingModel(id:string){
    this.router.navigate(["./home/danceclass/"+id+"/booking"])
  }
  reset(){
    this.styleSelected = null;
    this.countrySelected = null;
    this.citySelected = null;
    this.eventSelected = null;
    this.countries= ["All"];
    this.cities = ["All"];
    this.eventList = [];
  }
}
