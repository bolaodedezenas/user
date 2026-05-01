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

  async createCustomer(customerData) {
    return await customerRepository.createCustomer(customerData);
  },

  async updateCustomer(customerId, customerData) {
    return await customerRepository.updateCustomer(customerId, customerData);
  },

  async toggleCustomerStatus(customerId, currentStatus) {
    const newStatus = !currentStatus;
    await customerRepository.updateStatus(customerId, newStatus);
    return newStatus;
  },

  async deleteCustomer(customerId) {
    return await customerRepository.deleteCustomer(customerId);
  },
};
