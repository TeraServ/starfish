import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/model/user.model';
import { UserService } from '../service/user.service';
import { ConfirmedValidator } from '../_helpers/confirmed.validator';
import { StreamService } from '../service/stream.service';
import { Stream } from 'src/model/stream.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {


  submitted:boolean=false;
  userForm!:FormGroup;
  streamName:string="";
  streamPrice:number=0;
  streamDiscount:number=0;
  courseViewHidden=true;
  totalPrice:Subject<number> = new Subject();
  userData!:user;
  isPurchased:boolean=false;
  streamList:Stream[]=[]
//   data =[{
//     streamName:"Computer Engineering",
//     price:"7000",
//     discount:"20"

//   },{ streamName:"Mechanical Engineering",
//   price:"6000",
//   discount:"10"
// },
// {
//   streamName:"Electrical Engineering",
//   price:"5000",
//   discount:"5"
// }]
  constructor(private formBuilder:FormBuilder,private userService:UserService,private streamService:StreamService,private snackBar:MatSnackBar,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required]],
      password1:['',[Validators.required]],
      password2:['',[Validators.required]],
      userType:['101',[Validators.required]],
      userStatus:['103',[Validators.required]],
      stream:['',[Validators.required]],
      phoneNumber:['',[Validators.required]]
    },{validator: ConfirmedValidator('password1','password2')})

    this.getAllStreams();
  }

  getAllStreams(){
    this.streamService.getStreamList().subscribe(data=>{
      this.streamList = data;
    })
  }
  get f() {return this.userForm.controls}

  // createUser(){
  //   this.submitted =true;
    

  //   console.log(this.userForm)
  //   if(this.userForm.get("password1")?.value == this.userForm.get("password2")?.value){
  //     if(this.userForm.invalid){
  //       return
  //     }else{
  //       console.log("Valid")
  //     }
  //   }else{
  //     this.userForm.setErrors({PNM:true})
  //   }
  // }

  streamChange(){
    console.log(this.userForm.get('stream')?.value)
    if(this.userForm.get('stream')?.value != ""){
      let element  = this.userForm.get('stream')?.value
      this.courseViewHidden = false;
      this.streamName = element.streamName;
      this.streamPrice = element.price;
      this.streamDiscount  = element.discount
    }else{
      this.courseViewHidden = true;
    }
  }
  getTotalPrice(price:any,discount:any){
    this.totalPrice.next(price - ( price /(100/discount)))
    return this.totalPrice;
  }

  amount = '100.00';
  buttonType:google.payments.api.ButtonType = 'buy';
  buttonColor?:google.payments.api.ButtonColor = 'default';
  buttonLocale = '';
  existingPaymentMethodRequired = false;

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: this.totalPrice.next.toString(),
      currencyCode: 'INR',
      countryCode: 'IN'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (
    event: Event
  ): void => {
    this.userData ={
      id: 0,
      firstName: this.userForm.get("firstName")?.value,
      lastName: this.userForm.get("lastName")?.value,
      email: this.userForm.get("email")?.value,
      userType: 101,
      userStatus: 103,
      phoneNumber: this.userForm.get("phoneNumber")?.value,
      category: "online",
      stream: this.userForm.get("stream")?.value,
      modifiedDate: '',
      password: this.userForm.get("password1")?.value,
      createdDate: ''
    }
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
    console.log(this.userData)
    this.userService.addNewUser(this.userData).subscribe(data=>{
      console.log(data)
      this.loginUser()
    })
  }

  loginUser(){
    this.authService.userLogin({"username":this.userForm.get("email")?.value,"password":this.userForm.get("password1")?.value}).subscribe(data=>{
          
     
       localStorage.setItem("currentUser",JSON.stringify(data.token));

       console.log(localStorage.getItem("currentUser"))
       //this.error = false;
      

       this.snackBar.open(data.status,'',{
        duration:5000
       })
       
       this.router.navigate(["/home/dashboard"]).catch(reason=>{
        console.log(reason)
       })
     
      



    },err=>{
      this.router.navigate(["/"]).catch(reason=>{
        console.log(reason)
       })

        this.snackBar.open("Login failed!",'',{
        duration:5000
       })
    })
   
}
  
  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
    ) => {
      console.log('payment authorized', paymentData);
      return {
        transactionState: 'SUCCESS'
      };
    }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }
}
