import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmationprompt',
  templateUrl: './confirmationprompt.component.html',
  styleUrls: ['./confirmationprompt.component.css']
})
export class ConfirmationpromptComponent implements OnInit {
  @Input() message;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
