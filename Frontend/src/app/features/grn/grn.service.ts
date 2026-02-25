import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { GoodsReceiptNote, PaginatedResult, QueryParams } from '@core/models';

@Injectable({ providedIn: 'root' })
export class GrnService {
  private api = inject(ApiService);

  getGrns(params?: QueryParams): Observable<PaginatedResult<GoodsReceiptNote>> {
    return this.api.getPaginated<GoodsReceiptNote>('grn', params);
  }

  getGrnById(id: string): Observable<GoodsReceiptNote> {
    return this.api.get<GoodsReceiptNote>(`grn/${id}`);
  }

  createGrn(grn: Partial<GoodsReceiptNote>): Observable<GoodsReceiptNote> {
    return this.api.post<GoodsReceiptNote>('grn', grn);
  }

  approveGrn(id: string, remarks?: string): Observable<void> {
    return this.api.patch<void>(`grn/${id}/approve`, { remarks });
  }

  rejectGrn(id: string, reason: string): Observable<void> {
    return this.api.patch<void>(`grn/${id}/reject`, { reason });
  }

  /**
   * Upload invoice image/PDF for OCR processing via Google Document AI.
   * Returns extracted GRN data with confidence scores.
   */
  uploadInvoiceForOcr(file: File, purchaseOrderId?: string): Observable<GoodsReceiptNote> {
    const formData = new FormData();
    formData.append('invoice', file);
    if (purchaseOrderId) formData.append('purchaseOrderId', purchaseOrderId);

    return this.api.post<GoodsReceiptNote>('grn/ocr-upload', formData);
  }

  matchWithPurchaseOrder(grnId: string, poId: string): Observable<GoodsReceiptNote> {
    return this.api.patch<GoodsReceiptNote>(`grn/${grnId}/match-po`, { poId });
  }
}