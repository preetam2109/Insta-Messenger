import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  response} from 'src/app/model/response';
import { tbl_top_4_offers } from 'src/app/model/tbl-top4-offers';
import { tbl_top_8_items } from 'src/app/model/tbl-top-8-items';
import { tbl_top_12_restaurants_list } from 'src/app/model/tbl-top-12-restaurants-list';
import {  tbl_category,tbl_geolocation,tbl_item,tbl_restaurant, tbl_restaurant_get_filter_sort } from 'src/app/model/tbl-model';
import { RestaurantGetTop8ItemsService } from 'src/app/helper/restaurant-get-top-8-items.service';
import { Base } from 'src/app/helper/base';
import { ActivatedRoute, Router } from '@angular/router';
import { Slick } from 'ngx-slickjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    map:any;


  navElement: HTMLElement | undefined;
  isDrawerOpen!: boolean;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  // tbl_top_4_offers: tbl_top_4_offers[] |undefined =[]
  // tbl_top_8_items_list: tbl_top_8_items[] |undefined =[]
  // tbl_top_12_restaurants_list: tbl_top_12_restaurants_list[] |undefined =[]
  // item_list: tbl_get_welcome_page_data[] |undefined =[]
  // restaurant_list: tbl_get_welcome_page_data[] |undefined =[]
  top_category:tbl_category[] | undefined=[];
  top_offers:any[] =[];
  top_food_category_1!:tbl_item[];
  top_food_category_2!:tbl_item[] ;
  top_event_category_1!:tbl_item[];
  top_event_category_2!:tbl_item[];
  top_brand_restaurant!:tbl_restaurant[];
  top_featured_restaurant:any=[];
  top_popular_restaurant!:tbl_restaurant[];
  top_sales_restaurant!:tbl_restaurant[];
  // sort_near_me!:tbl_sort_near_me[];
  // sort_near_me= new tbl_sort_near_me();
  top_food_items_for_ribben:any;
  tbl_restaurant_filter_sort= new tbl_restaurant_get_filter_sort();
   geo : any;
  tbl_geolocation = new tbl_geolocation();
  base:any;
  UserDetail:any;
  pageSize: number=10;
   pageNumber: number=1;
   Rating_value = [
    {filter_rating: 1, name: '1 Star'},
    {filter_rating: 2, name: '2 Star'},
    {filter_rating: 3, name: '3 Star'},
    {filter_rating: 4, name: '4 Star'},
    {filter_rating: 5, name: '5 Star'},
];
form_group:FormGroup;
  constructor(private restaurantGetTop8ItemsService: RestaurantGetTop8ItemsService, private activatedRoute: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) {
      this.form_group = this.formBuilder.group({
        // latitute: [this.lng,[Validators.required]],
        sort_near_me: [false, [Validators.required]],
        sort_rating: [false, [Validators.required]],
        filter_pure_veg: [false, [Validators.required]],
        filter_pure_none_veg: [false, [Validators.required]],
        filter_rating: [false, [Validators.required]],
        filter_alcohol_served: [false, [Validators.required]],
        // district_id: ['', [Validators.required]],  
      });
     }
  
  

    arrayLength = 10;

    config: Slick.Config = {
        infinite: true,
        slidesToShow: 5,
        // slidesToShow: 8,
        slidesToScroll: 2,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000 
      }
    config_rest: Slick.Config = {
        infinite: true,
        slidesToShow: 3,
        // slidesToShow: 5,
        slidesToScroll: 2,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000 
      }
  
    getArray(count: number) {
      return new Array(count)
    }


  ngOnInit(): void {
    this.isDrawerOpen = false;
    this.GetCurrentLocation();
    this.getRestraurant();
   this.base = Base;
   this.UserDetail=JSON.parse(localStorage.getItem('UserDetail') || '{}')
  }
  search_value_getdata!: any;
  searchTbl(values: any) {
    // //debugger

    this.search_value_getdata = (<HTMLInputElement>document.getElementById("food_search")).value;
    if(this.search_value_getdata.length >= 3){
      this.filter_sort_value(); 
    }
    if(this.search_value_getdata.length == ''){
      this.filter_sort_value(); 
    }
    
    return;
  }
  clear_filter_sort_value(){
  
    localStorage.removeItem('filter_shot_value');
    this.getRestraurant();
}
  preefil_filter_sort_value(){
    var value_fill  = JSON.parse(localStorage.getItem("filter_shot_value") || '{}');
  if(value_fill !== null){
    this.form_group = this.formBuilder.group({
      sort_near_me: [value_fill.sort_near_me == null ? false : true,[Validators.required]],
      sort_rating: [value_fill.sort_rating, [Validators.required]],
      filter_pure_veg: [value_fill.filter_pure_veg, [Validators.required]],
      filter_pure_none_veg: [value_fill.filter_pure_none_veg, [Validators.required]],
      filter_rating: [value_fill.filter_rating, [Validators.required]],
      filter_alcohol_served: [value_fill.filter_alcohol_served, [Validators.required]],
      // district_id: ['', [Validators.required]],  
    });
  }else{
    this.form_group = this.formBuilder.group({
      sort_near_me: ['', [Validators.required]],
      sort_rating: ['', [Validators.required]],
      filter_pure_veg: ['', [Validators.required]],
      filter_pure_none_veg: ['', [Validators.required]],
      filter_rating: ['', [Validators.required]],
      filter_alcohol_served: ['', [Validators.required]],
      // district_id: ['', [Validators.required]],  
    });
  }

}
 
  // search_value:any;
  filter_sort_value(){
    this.search_value_getdata = (<HTMLInputElement>document.getElementById("food_search")).value;
    var  filter_value=this.form_group.value;
    this.tbl_restaurant_filter_sort.sort_rating = filter_value.sort_rating == true ? 1 : 0;
    this.tbl_restaurant_filter_sort.filter_pure_veg = filter_value.filter_pure_veg == true ? 1 : 0;
    this.tbl_restaurant_filter_sort.filter_pure_none_veg = filter_value.filter_pure_none_veg == true ? 1 : 0;
    this.tbl_restaurant_filter_sort.filter_alcohol_served = filter_value.filter_alcohol_served == true ? 1 : 0;
    this.tbl_restaurant_filter_sort.filter_rating=filter_value.filter_rating == true ? 1 : 0;
    if(filter_value.sort_near_me == true) this.tbl_restaurant_filter_sort.sort_near_me =  this.tbl_geolocation
    
    else     this.tbl_restaurant_filter_sort.sort_near_me = null;
      //  this.tbl_restaurant_filter_sort.sort_near_me.latitute=0;
      //  this.tbl_restaurant_filter_sort.sort_near_me.longitute=0;
    localStorage.setItem('filter_shot_value',JSON.stringify(this.tbl_restaurant_filter_sort));
    this.tbl_restaurant_filter_sort.search_value= this.search_value_getdata  !== null? this.search_value_getdata:'';
    // alert(JSON.stringify(this.tbl_restaurant_filter_sort));
   
    // return;
try{
this.restaurantGetTop8ItemsService.restaurant_get_filter_sort(this.pageSize,this.pageNumber,this.tbl_restaurant_filter_sort).subscribe((res:any)=>{
 if (res.status == "success") {  
  this.router.navigateByUrl('restaurants');
  // this.top_offers = res.data.top_offers;
  // this.top_category = res.data.top_category;
  // localStorage.setItem('filter_shot',JSON.stringify(res.data.top_category));

  // this.top_food_category_1 = res.data.top_food_category_1;
  // this.top_food_category_2 = res.data.top_food_category_2;
  // this.top_brand_restaurant = res.data.top_brand_restaurant;
  // this.top_featured_restaurant = res.data.top_featured_restaurant;
  // this.top_popular_restaurant = res.data.top_popular_restaurant;
  // this.top_sales_restaurant = res.data.top_sales_restaurant;
  // this.top_event_category_1 = res.data.top_event_category_1;
  // this.top_event_category_2 = res.data.top_event_category_2;
  // alert(JSON.stringify(res.data))
 }
},(error) => { alert(JSON.stringify(error)) }
);
}catch(ex:any){
  alert(ex.message);
}
  }

  public GetCurrentLocation():tbl_geolocation{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)  =>  {       
        this.tbl_geolocation.latitute = position.coords.latitude;
       this.tbl_geolocation.longitute = position.coords.longitude;    
        // alert(JSON.stringify(this.tbl_geolocation));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    return this.geo;

  }

  // private ShowLocation(position: any, map: any): tbl_geolocation {
  //   // this.lng = +position.coords.longitude;
  //   // this.lat = +
    
  //   // this.sort_near_me.latitute=this.lng;
  //   // this.sort_near_me.longitute=this.lat;
  //   // var lat_lng=this.form_group.value;
  //   // lat_lng.latitude=this.lat;
  //   // lat_lng.longitute= this.lng ;
  //   // this.tbl_restaurant_filter_sort.latitute=this.lat;
  //   // this.tbl_restaurant_filter_sort.longitute=this.lng;
  //   // alert(JSON.stringify(this.sort_near_me));
  //   // console.log(position.coords.latitude);
  //   // this.filter_sort_value(this.sort_near_me);
  // }



  getRestraurant() {
    this.restaurantGetTop8ItemsService.getRestraurant_home_page_list().subscribe((res: response) => {
      // this.tbl_top_4_offers = res.data.top_4_offers;
      // this.tbl_top_8_items_list = res.data.top_8_items;
      // this.tbl_top_12_restaurants_list = res.data.top_12_restaurants;
      // console.log("data is: " + JSON.stringify(this.tbl_top_8_items_list));
      this.top_offers = res.data.top_offers;
      this.top_category = res.data.top_category;
      this.top_food_category_1 = res.data.top_food_category_1;
      this.top_food_category_2 = res.data.top_food_category_2;
      this.top_brand_restaurant = res.data.top_brand_restaurant;
      this.top_featured_restaurant = res.data.top_featured_restaurant;
      this.top_popular_restaurant = res.data.top_popular_restaurant;
      this.top_sales_restaurant = res.data.top_sales_restaurant;
      this.top_event_category_1 = res.data.top_event_category_1;
      this.top_event_category_2 = res.data.top_event_category_2;
      this.top_food_items_for_ribben=res.data.top_food_items_for_ribben;
    });
  }
  
  sendId(restaurant_id: any, data:any) {
    try{
    localStorage.setItem("restaurant", JSON.stringify(data));
    }catch(ex :any){
      alert(ex.message);
    }

   
  }

  set_restaurant_id(restaurant_id:any){
    try{
    // const index:number=data.findIndex((a: { restaurant_id: any; })=> a.restaurant_id === restaurant_id)
    // if(index != null)
    // localStorage.setItem("restaurant", JSON.stringify(data[index]));
    // else
    localStorage.setItem("restaurant",restaurant_id);
    }catch(ex :any){
      alert(ex.message);
    }

  }
  SpecialOfferBook(offersList : any ){

    localStorage.setItem('special_offer', JSON.stringify(offersList))
    
    this.router.navigateByUrl('special-offer-details')

  }
  ngAfterViewInit() {
    this.navElement = <HTMLElement>document.getElementById('navbar');
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
 
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
 
}
