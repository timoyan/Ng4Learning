import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CartModalComponent } from '../../component/cart-modal/cart-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  show = true;
  currentUrl: string;

  @ViewChild('ddlNavigateMenu', { read: ElementRef }) public ddlNavigateMenu: ElementRef;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url.substring(1, event.url.length);
        console.log('Header url subscribe : ' + this.currentUrl);
      }
    });

    this.authService.isLoggedIn.subscribe(val => {
      this.show = val;
    });
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let dropdownElement: HTMLSelectElement = this.ddlNavigateMenu.nativeElement;
        let targetOptionElement: HTMLOptionElement = dropdownElement.querySelector('option[value="' + this.currentUrl + '"]') as HTMLOptionElement;
        if (!!targetOptionElement) {
          targetOptionElement.selected = true;
        }
      }
    });

  }

  onLogOut(e: MouseEvent) {
    this.authService.logout();
    this.router.navigate(['/login']);
    e.stopPropagation();
    return false;
  }

  navigate_onChange(e) {
    const navigateLink = e.target.value;
    this.router.navigate([navigateLink]);
  }

  ShowCart(e: Event) {
    const modalRef = this.modalService.open(CartModalComponent, { backdrop: "static" } as NgbModalOptions);
    modalRef.componentInstance._cart = this.cartService._cart;
    e.stopPropagation();
    return false;
  }
}
