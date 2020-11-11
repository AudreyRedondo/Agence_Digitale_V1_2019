import { Component, OnInit, Input, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked} from '@angular/core';
import { Rubrique } from '../../models/rubrique.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [
      RouterLink,
      RouterLinkActive
  ]
})
export class NavMenuComponent implements OnInit, AfterContentInit {
   
  @Input() isSmallNav: boolean;
  @Input() rubriquesHome: Rubrique[];
  @Input() nav: Rubrique[];
  @Input() serviceID: number;
  public selectedRubrique: Rubrique;
  public profileRubrique: Rubrique;

  constructor(private routerLink: RouterLink, private routerLinkActive: RouterLinkActive) { }

  ngOnInit(): void {}

  ngAfterContentInit(): void {}

  unSelect(event: Event) {
    $('app-nav-menu li').each(function () {
        $(this)[0].classList.remove("selected");
    });
  }

  initSelectedRubrique() {
    if (this.serviceID > 0) {
        if ($("a[name='Profil']").length) {
            if ($("a[name='Service']").length) {
                $("a[name='Service']").offsetParent()[1].classList.add("selected");
            }
        }
        else {
            $("a[name='Service']").offsetParent()[1].classList.add("selected");
        }
    }
    else if ($("a[name='Profil']").length) {
      $("a[name='Profil']").offsetParent()[1].classList.add("selected");
    }
  }

  select(rubrique: Rubrique, event): void {
      this.selectedRubrique = rubrique;
  }
}
