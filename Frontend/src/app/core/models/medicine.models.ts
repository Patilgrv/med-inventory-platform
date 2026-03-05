/** API response / entity */
export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

/** Request payload for creating a medicine */
export interface CreateMedicineRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

/** Request payload for updating a medicine */
export interface UpdateMedicineRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
}
