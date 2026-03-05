import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateMedicineRequest, Medicine, UpdateMedicineRequest } from "@core/models";
import { Medicine as MedicineEndpoints } from "@core/constants/api.endpoints.constant";
import { ApiService } from "../api.service";

@Injectable({ providedIn: 'root' })
export class MedicineApiService {
  private api = inject( ApiService);

  getMedicineList(): Observable<Medicine[]> {
    return this.api.get<Medicine[]>(MedicineEndpoints.getMedicineList);
  }

  getMedicineById(id: string): Observable<Medicine> {
    return this.api.get<Medicine>(`${MedicineEndpoints.getMedicineById}/${id}`);
  }

  createMedicine(medicine: CreateMedicineRequest): Observable<Medicine> {
    return this.api.post<Medicine>(MedicineEndpoints.createMedicine, medicine);
  }

  updateMedicine(id: string, medicine: UpdateMedicineRequest): Observable<Medicine> {
    return this.api.put<Medicine>(`${MedicineEndpoints.updateMedicine}/${id}`, medicine);
  }

  deleteMedicine(id: string): Observable<void> {
    return this.api.delete<void>(`${MedicineEndpoints.deleteMedicine}/${id}`);
  }
}