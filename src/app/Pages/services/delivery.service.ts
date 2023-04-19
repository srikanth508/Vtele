import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private host = environment.API_URL;
  private url: string = '';
  constructor(private http: HttpClient) {

  }
  public GetPatient_TextMedicineDetailsForDeliverCompany(sdate: any, edate: any, lid: any, pincodes: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_TextMedicineDetailsForDeliverCompany?SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid + '&Pincode=' + pincodes);
  }
  public GetDeliveryPartnersByID(id: any) {
    return this.http.get<any[]>(this.host + '/Admin/GetDeliveryPartnersByID?DeliveryCompanyID=' + id);
  }
  public InsertDeliveryPartnerAssignedOrders(data: any) {
    this.url = this.host + '/Admin/InsertDeliveryPartnerAssignedOrders';
    return this.http.post(this.url, data)
  }

  public UpdateCollectBit(OrderID: any) {
    return this.http.get<any[]>(this.host + '/Doctor/UpdateCollectBit?MedicineOrderID=' + OrderID);
  }

  public UpdatePatientWalletDetails(data: any) {
    this.url = this.host + '/Doctor/UpdatePatientWalletDetails';
    return this.http.post(this.url, data)
  }

  public GetOrdersForDeliveryCompany(sdate: any, edate: any) {
    return this.http.get<any[]>(this.host + '/Admin/GetOrdersForDeliveryCompany?SDate=' + sdate + '&EDate=' + edate);
  }

  public AccpetMedicineDeliveryByDeliveryCompany(dcid: any, ar: any, id: any) {
    return this.http.get<any[]>(this.host + '/Admin/AccpetMedicineDeliveryByDeliveryCompany?DeliveryCompanyID=' + dcid + '&Acceptreject=' + ar + '&ID=' + id);
  }
  public AccpetShoppingDeliveryByDeliveryCompany(ar: any, id: any) {
    return this.http.get<any[]>(this.host + '/Doctor/AccpetShoppingDeliveryByDeliveryCompany?Acceptreject=' + ar + '&ID=' + id);
  }
  public InsertDeliveryPartnerAssignedShoppingOrders(data: any) {
    this.url = this.host + '/Doctor/InsertDeliveryPartnerAssignedShoppingOrders';
    return this.http.post(this.url, data)
  }
  public UpdateDeliveryPartnerrReturnAssignOrdersAssignedOrders(data: any) {
    this.url = this.host + '/Doctor/UpdateDeliveryPartnerrReturnAssignOrdersAssignedOrders';
    return this.http.post(this.url, data)
  }
  public GetPrescriptionReturnedPhotos(OrderID: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPrescriptionReturnedPhotos?OrderID=' + OrderID);
  }
  public PostGCMNotifications(data:any) {
    this.url = this.host + '/Doctor/PostGCMNotifications';
    return this.http.post(this.url, data)
  }
  public UpdateRefundAmount(data:any) {
    this.url = this.host + '/Doctor/UpdateRefundAmount';
    return this.http.post(this.url, data)
  }
}
