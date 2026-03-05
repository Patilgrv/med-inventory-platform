import { getCurrentApiBase } from "@core/configs/org.config";

const apiBase = getCurrentApiBase();


export const Medicine = {
    getMedicineList: `${apiBase}/medicine/get-medicine-list`,
    getMedicineById: `${apiBase}/medicine/get-medicine-by-id`,
    createMedicine: `${apiBase}/medicine/create-medicine`,
    updateMedicine: `${apiBase}/medicine/update-medicine`,
    deleteMedicine: `${apiBase}/medicine/delete-medicine`,
}