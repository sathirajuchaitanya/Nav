import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationpromptComponent} from '../../shared/components/confirmationprompt/confirmationprompt.component';
import { initialOrder} from '../../../assets/data/initiateForm';
import { Iorder } from '../../shared/interface/IOrders';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  searchTerm: string;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  currentRate = 8;
  title = 'table-search';
  allData;
  orderDetails= [];
  confirmationPromptMessage;
  modalRef;
  @ViewChild('addOrder') myModal: any;
  variableArray;
  inputForm;
  validateForm;
  addedOderded: Iorder;
  editPopUp;
  selectedIndex;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

 async openDeleteConfirmation (index){
    this.confirmationPromptMessage = {
      headerHeading: 'Delete Order',
      bodyMessage: 'Are you sure you want to delete the bulding',
      confirmationButtonName: 'Confirm'
    };
    this.modalRef = this.modalService.open(ConfirmationpromptComponent, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static',
  keyboard: false});
    this.modalRef.componentInstance.message = this.confirmationPromptMessage;
    const result = await this.modalRef.result;
    if (result.toLowerCase() === 'confirm'){
      let removedOrderIndex;
      this.orderDetails.splice(index, 1);
    }else{
      return false;
    }

  }

  // tslint:disable-next-line: typedef
  async AddNewOrder(){
    this.editPopUp = false;
    this.modalRef = this.modalService.open(this.myModal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static',
    keyboard: false,
  size:'lg'});
    this.variableArray = initialOrder;
    await this.generateForm();
  }

// tslint:disable-next-line: typedef
generateForm(edit?) {
    const group = {};
    if (edit){
      this.variableArray.map(inputField => {
        group[inputField.id] = new FormControl(inputField.value, Validators.required);
      });
    } else{
      this.variableArray.map(inputField => {
        group[inputField.id] = new FormControl('', Validators.required);
      });
    }
    this.inputForm = new FormGroup(group);

}
closeModal(){
  this.validateForm = false;
  this.modalService.dismissAll();
}
submitOrder(){
  this.validateForm = true;
  if (this.inputForm.valid){
     this.filterFormData();
     this.validateForm = false;
     this.closeModal();
     this.addedOderded = null;
     this.variableArray = [];
  }
}
filterFormData(){
  this.variableArray.map(variable => {
    variable.value = this.inputForm.value[variable.id];
  });
  this.addedOderded = {
    name: this.inputForm.value.name,
    orderDueDate: this.inputForm.value.orderDueDate,
    address: this.inputForm.value.address,
    phoneNumber: this.inputForm.value.phoneNumber,
    totalOrder: this.inputForm.value.totalOrder,
    orderNumber : this.inputForm.value.orderNumber
  };
  if (!this.editPopUp){
    this.orderDetails.push({id: this.orderDetails.length + 1,
      variableArray: this.variableArray,
      order: this.addedOderded
    });

  } else{
    this.orderDetails[this.selectedIndex].variableArray = this.variableArray;
    this.orderDetails[this.selectedIndex].order = this.addedOderded;
  }
}
async editOrder(data){
  this.modalRef = this.modalService.open(this.myModal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static',
  keyboard: false, size: 'lg'});
  this.selectedIndex = data.id - 1;
  this.editPopUp = true;
  this.variableArray = data.variableArray;
  await this.generateForm(true);
}
}
