'use server'
import supabase from "@/db/supabase";

export interface Inventory {
  id: number;
  name: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  created_by: string;
  created_at: string;
}

class InventoryClass {
  static async getAllProducts(): Promise<Inventory[]> {
    const { data: inventory, error } = await supabase
      .from("inventory")
      .select("*");

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return inventory || [];
  }

  static async getProductsByName(id: string): Promise<Inventory[]> {
    const { data: inventory, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error("Error fetching project by id:", error);
      throw error;
    }

    return inventory || [];
  }

  static async addProducts(data: Inventory) {
    const { data: inventory, error } = await supabase
    .from('inventory')
    .insert([
      data
    ])
    .select()
              
    if (error) {
      console.error("Error inserting products:", error);
      throw error;
    }

    return inventory || [];
  }

}

export default InventoryClass;