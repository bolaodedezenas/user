import { supabase } from "@/libs/supabase/client";

export const customerRepository = {
  async getCustomers(revendedorId, page = 1, limit = 10, searchTerm = "") {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("customers")
      .select("*", { count: "exact" })
      .eq("revendedor_id", revendedorId)
      .order("name", { ascending: true })
      .range(from, to);

    if (searchTerm) {
      query = query.ilike("name", `%${searchTerm}%`);
    }

    const { data, count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }
    return { data, count };
  },

  /**
   * Insere um novo cliente no banco de dados.
   */
  async createCustomer(customerData) {
    const { data, error } = await supabase
      .from("customers")
      .insert([customerData])
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  },

  async uploadImage(file, path) {
    if (!file) return null;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(path, file);

    if (error) {
      console.error("Erro no upload:", error.message);
      throw new Error(error.message);
    }

    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    return publicUrl.publicUrl;
  },

  // Atualiza apenas o status de um cliente.
  async updateStatus(customerId, status) {
    const { error } = await supabase
      .from("customers")
      .update({ status })
      .eq("id", customerId);

    if (error) throw error;
    return true;
  },

  /**
   * Deleta um cliente do banco de dados.
   */
  async deleteCustomer(customerId) {
    
    const { data, error } = await supabase
      .from("customers")
      .delete()
      .eq("id", customerId)
      .select();

    console.log("DELETE DATA:", data);
    console.log("DELETE ERROR:", error);

    if (error) throw error;
  },
};
