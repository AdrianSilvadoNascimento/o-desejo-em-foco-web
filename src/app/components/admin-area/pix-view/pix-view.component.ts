import { Component, OnInit } from '@angular/core';

import { PixService } from '../../../services/pix.service';

@Component({
  selector: 'app-pix-view',
  templateUrl: './pix-view.component.html',
  styleUrls: ['./pix-view.component.scss'],
})
export class PixViewComponent implements OnInit {
  pixDetails!: any;

  constructor(private pixService: PixService) {}

  ngOnInit(): void {
    this.getPixDetail();
  }

  getPixDetail(): void {
    this.pixService.getPixPayment().subscribe((pixDetail) => {
      console.log(pixDetail)
      this.pixDetails = pixDetail;
    });
  }
}
