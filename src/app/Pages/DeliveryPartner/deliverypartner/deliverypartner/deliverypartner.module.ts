import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliverypartnerRoutingModule } from './deliverypartner-routing.module';
import { DeliverypartnerComponent } from './deliverypartner.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Pages/SharedModule/shared/shared.module';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChangeDeliveryPwdComponent } from '../../change-delivery-pwd/change-delivery-pwd.component';
import { CompletedOrdersComponent } from '../../completed-orders/completed-orders.component';
import { DeliverPartnerProfileComponent } from '../../deliver-partner-profile/deliver-partner-profile.component';
import { DeliveryPartnerAppointmentsComponent } from '../../delivery-partner-appointments/delivery-partner-appointments.component';
import { DeliveryPatnerReportsComponent } from '../../delivery-patner-reports/delivery-patner-reports.component';
import { DeliveryRevenueComponent } from '../../delivery-revenue/delivery-revenue.component';
import { PartnerRegistrationComponent } from '../../partner-registration/partner-registration.component';
import { PartnersDashboardComponent } from '../../partners-dashboard/partners-dashboard.component';
import { PharmacyOrdersComponent } from '../../pharmacy-orders/pharmacy-orders.component';
import { PharmacyReturnordersComponent } from '../../pharmacy-returnorders/pharmacy-returnorders.component';
import { ReturnOrdersComponent } from '../../return-orders/return-orders.component';
import { ReturnOrdersReportComponent } from '../../return-orders-report/return-orders-report.component';


@NgModule({
  declarations: [
    DeliverypartnerComponent,
    ChangeDeliveryPwdComponent,
    CompletedOrdersComponent,
    DeliverPartnerProfileComponent,
    DeliveryPartnerAppointmentsComponent,
    DeliveryPatnerReportsComponent,
    DeliveryRevenueComponent,
    PartnerRegistrationComponent,
    PartnersDashboardComponent,
    PharmacyOrdersComponent,
    PharmacyReturnordersComponent,
    ReturnOrdersComponent,
    ReturnOrdersReportComponent
  ],
  imports: [
    CommonModule,
    DeliverypartnerRoutingModule,
    FormsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class DeliverypartnerModule {
    constructor(private bsLocaleService: BsLocaleService) {

      if (sessionStorage.getItem('LanguageID') == '1') {
      }
      else {
        this.bsLocaleService.use('fr');//fecha en español, datepicker
      }
    }
}
