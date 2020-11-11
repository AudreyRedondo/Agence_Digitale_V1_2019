import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Rubrique } from '../../../../models/rubrique.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rubrique-detail-header',
  templateUrl: './rubrique-detail-header.component.html',
  styleUrls: ['./rubrique-detail-header.component.css']
})
export class RubriqueDetailHeaderComponent implements OnInit, OnDestroy {

    @Input() rubrique: Rubrique;
    public serviceID: number;
    private sub: any;

  constructor(private route: ActivatedRoute) { }

  public profil: string;
  public temoignages: string;

    ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.serviceID = +params['id'];
    });
    this.profil = this.serviceID !== 2 ? "Bienvenue !" : "Qui suis-je ?";
    this.temoignages = "Bulles de pensées..."
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
