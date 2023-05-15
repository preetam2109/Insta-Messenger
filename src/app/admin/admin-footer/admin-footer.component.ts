import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {
  public output : any;
  public onError(e: any): void {
    alert(e);
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  // check_login() {
  //   if (localStorage.getItem("ltn")) {
  //     this.router.navigateByUrl("/profile");
  //   } else {
  //     Swal.fire({
  //       text: 'Not logged in? Go to login page.',
  //       icon: 'warning',
  //       showCancelButton: false,
  //       confirmButtonText: 'OK',
  //     }) 
  //     .then((ltn) => {
  //         if (ltn.isConfirmed == true) {
  //          this.router.navigateByUrl("c");
           
  //         }
  //       });
  //   }
   
  // }


  addToCart() {
      this.router.navigateByUrl("order");

    // if (localStorage.getItem("ltn")) {
    //   this.router.navigateByUrl("order");
    // } else if (localStorage.getItem("tbl_order_items")?.length != 0 || localStorage.getItem("tbl_order_items")?.length != null) {
    //   this.router.navigateByUrl("order");
    // } else {
    //   this.router.navigateByUrl("login");
    // }
  }
  

  userRoute() {
    alert("calling")
      this.router.navigate(['/user']);

    // if (localStorage.getItem("ltn")) {
    //   this.router.navigateByUrl("order");
    // } else if (localStorage.getItem("tbl_order_items")?.length != 0 || localStorage.getItem("tbl_order_items")?.length != null) {
    //   this.router.navigateByUrl("order");
    // } else {
    //   this.router.navigateByUrl("login");
    // }
  }


}
