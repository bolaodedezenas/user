import { customerRepository } from "../repository/customerRepository";

export const customerService = {
  async getCustomers(revendedorId, page, limit, searchTerm) {
    return await customerRepository.getCustomers(
      revendedorId,
      page,
      limit,
      searchTerm,
    );
  },

  /**
   * Cria um novo cliente utilizando o repository.
   */
  async createCustomer(customerData) {
    return await customerRepository.createCustomer(customerData);
  },

  //Alterna o status do cliente (Ativo/Inativo).
  async toggleCustomerStatus(customerId, currentStatus) {
    const newStatus = !currentStatus;
    await customerRepository.updateStatus(customerId, newStatus);
    return newStatus;
  },

  /**
   * Deleta um cliente delegando ao repository.
   */
  async deleteCustomer(customerId) {
    await customerRepository.deleteCustomer(customerId);
  },
};
