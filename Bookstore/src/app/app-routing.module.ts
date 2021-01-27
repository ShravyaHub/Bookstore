import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { DisplayComponent } from './components/display/display.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { OrderConfirmedComponent } from './components/order-confirmed/order-confirmed.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';



const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: '/login'},
                        {path: 'login', component: LoginComponent},
                        {path: 'register', component: RegisterComponent},
                        {path: 'dashboard', component: DashboardComponent, 
                        children: [
                          {path: '', component: DisplayComponent },
                          {path: 'books', component: DisplayComponent},
                          {path: 'cart', component: MyCartComponent},
                          {path: 'orderConfirmation', component: OrderConfirmedComponent},
                          {path: 'wishlist', component: WishlistComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
