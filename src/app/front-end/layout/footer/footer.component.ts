import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public output : any;
  public onError(e: any): void {
    alert(e);
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  check_login() {
    // //debugger
    if (localStorage.getItem("ltn")) {
      this.router.navigateByUrl("profile");
    } else {
      Swal.fire({
        text: 'Not logged in? Go to login page.',
        // text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
        // cancelButtonText: 'No'
      }) 
      .then((ltn) => {
          if (ltn.isConfirmed == true) {
           this.router.navigateByUrl("c");
           
          }
        });
    }
   
  }


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

}
