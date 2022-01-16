import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products:Product[]|null=null;
  products$:Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }


  onGetAllProducts() {
    /* Sol 1
    this.productsService.getAllProducts().subscribe((data:Product[])=>{
      this.products=data;
    }, err=>{
      console.log(err);
    });*/
    //sol 2
    this.products$=
      this.productsService.getAllProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );

  }

  onGetSelectedProducts() {
    this.products$=
      this.productsService.getSelectedProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onGetAvailableProducts() {
    this.products$=
      this.productsService.getAvailableProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onSearch(dataForm:any) {
    this.products$=
      this.productsService.searchProducts(dataForm.keyword).pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );

  }

  onSelect(p:any) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.select=data.selected;
      })
  }

  onDelete(p:any) {
    let v=confirm("Etes vous sure?");
    if(v==true){
      this.productsService.delete(p)
        .subscribe(data=>{
          this.onGetAllProducts();
        })
    }


  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p:any) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: any) {
    switch ($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionsTypes.NEW_PRODUCTS:this.onNewProduct();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT:this.onEdit($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;


    }
  }
}
