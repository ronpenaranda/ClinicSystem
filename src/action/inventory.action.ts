import InventoryClass from "@/model/inventory.model";
import { Inventory } from "@/model/inventory.model";

export const get_inventory = async () => {
    const products = await InventoryClass.getAllProducts();
    return products
}

export const get_item_by_name = async (id: string) => {
    const products = await InventoryClass.getProductsByName(id);
    return products
}

export const add_item = async (form: Inventory) => {
    const products = await InventoryClass.addProducts(form);
    return products
}