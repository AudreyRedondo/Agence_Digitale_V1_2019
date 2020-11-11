import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterContentInit {

    public sign: string = 'up';
    public toggleSign1: string = 'plus';
    public toggleSign2: string = 'plus';

    constructor(private router: Router) { }

    ngOnInit(){}

    ngAfterContentInit() {

        $('#footerContent').on('shown.bs.collapse', function (e) {
            $('html,body').animate({
                scrollTop: $('#footerContent').offset().top - 80
            }, 100);
        }); 
    }

    changeIcon() {
        if (this.sign === 'up') {
            this.sign = 'down';
        }
        else {
            this.sign = 'up';
        }
    }

    changeToggleIcon(id: number) {
        if (id === 1) {
            if (this.toggleSign1 === 'plus') {
                this.toggleSign1 = 'minus';
            }
            else {
                this.toggleSign1 = 'plus';
            }
        }
        else if (id === 2) {
            if (this.toggleSign2 === 'plus') {
                this.toggleSign2 = 'minus';
            }
            else {
                this.toggleSign2 = 'plus';
            }
        }
    }

    public gotoService(url, id) {
        this.router.navigate([url, id]);
    }
}
