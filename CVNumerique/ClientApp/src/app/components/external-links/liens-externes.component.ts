import { Component, OnInit } from '@angular/core';
import { LienExterneService } from '../../services/lien-externe.service';
import { LienExterne } from '../../models/lien-externe.model';

@Component({
  selector: 'app-liens-externes',
  templateUrl: './liens-externes.component.html',
  styleUrls: ['./liens-externes.component.css'],
  providers: [LienExterneService]
})

export class LiensExternesComponent implements OnInit {

  public link: LienExterne;
  public links: LienExterne[];
  public resmessage: string;
  public selectedRubrique: LienExterne;

  constructor(private linkService: LienExterneService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.linkService.getall().subscribe(
      response => {
        this.links = response;
      }, error => {
        console.log(error);
      }
    );
  }
}
