import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDeliveryPwdComponent } from '../../change-delivery-pwd/change-delivery-pwd.component';
import { CompletedOrdersComponent } from '../../completed-orders/completed-orders.component';
import { DeliverPartnerProfileComponent } from '../../deliver-partner-profile/deliver-partner-profile.component';
import { DeliveryPartnerAppointmentsComponent } from '../../delivery-partner-appointments/delivery-partner-appointments.component';
import { PartnersDashboardComponent } from '../../partners-dashboard/partners-dashboard.component';
import { PharmacyOrdersComponent } from '../../pharmacy-orders/pharmacy-orders.component';
import { PharmacyReturnordersComponent } from '../../pharmacy-returnorders/pharmacy-returnorders.component';
import { ReturnOrdersReportComponent } from '../../return-orders-report/return-orders-report.component';
import { ReturnOrdersComponent } from '../../return-orders/return-orders.component';
import { DeliverypartnerComponent } from './deliverypartner.component';

const routes: Routes = [{ path: '', component: DeliverypartnerComponent },
{ path: 'PharmacyOrders', component: PharmacyOrdersComponent },
{ path: 'PharmacyReturnorders', component: PharmacyReturnordersComponent}, 
{ path: 'DeliveryPartnerAppointments', component: DeliveryPartnerAppointmentsComponent },
{ path: 'ReturnOrders', component: ReturnOrdersComponent },
{ path: 'CompletedOrders', component: CompletedOrdersComponent },
{ path: 'ReturnOrdersReport', component: ReturnOrdersReportComponent },
{ path: 'PartnersDashboard', component: PartnersDashboardComponent },
{ path: 'ChangeDeliveryPwd', component: ChangeDeliveryPwdComponent },
{ path: 'DeliverPartnerProfile', component: DeliverPartnerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliverypartnerRoutingModule { }
