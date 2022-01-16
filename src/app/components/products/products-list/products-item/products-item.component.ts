import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {ActionEvent, ProductActionsTypes} from "../../../../state/product.state";
import {EventDrivenService} from "../../../../services/event.driven.service";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product?:Product;
  //@Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor(private eventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    //this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product) {
    //this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCT,payload:product});
  }

  onEdit(product: Product) {
    //this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT,payload:product});
  }
}
