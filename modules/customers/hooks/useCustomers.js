import { useState, useEffect, useCallback } from "react";
import { customerService } from "../services/customerService";
import { useCustomersStore } from "../stores/useCustomersStore";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import toast from "react-hot-toast";
import { supabase } from "@/libs/supabase/client";


//
export function useCustomers(page, limit, searchTerm) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { setCustomers, setTotalCount, customers, totalCount } =
    useCustomersStore();

  const fetchCustomers = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const { data, count } = await customerService.getCustomers(
        user.id,
        page,
        limit,
        searchTerm,
      );
      setCustomers(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, page, limit, searchTerm, setCustomers, setTotalCount]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  /**
   * Função para cadastrar um novo cliente.
   * Associa automaticamente o revendedor_id ao usuário logado.
   */
  // const createCustomer = async (formData) => {
  //   if (!user?.id) {
  //     toast.error("Sessão expirada. Faça login novamente.");
  //     return null;
  //   }

  //   setIsSaving(true);
  //   try {
  //     const customerData = {
  //       revendedor_id: user.id, // ID do usuário logado
  //       name: formData.name,
  //       phone: formData.phone,
  //       cep: formData.cep,
  //       city: formData.city,
  //       state: formData.state,
  //       status: formData.status ?? true,
  //       // IMPORTANTE: Para a imagem aparecer no banco, você deve primeiro fazer o upload
  //       // do formData.avatar_file para um storage e usar a URL de retorno aqui.
  //       // Por enquanto, limpamos a URL se for um 'blob:' local para não salvar lixo.
  //       avatar_url: formData.avatar_url?.startsWith("blob:")
  //         ? null
  //         : formData.avatar_url,
  //     };

  //     // Enviamos o arquivo para o service. Se o seu backend for REST,
  //     // talvez precise converter customerData para FormData aqui.
  //     const newCustomer = await customerService.createCustomer(customerData);


  //     // Atualização otimista no store do Zustand
  //     if (newCustomer) {
  //       setCustomers([newCustomer, ...customers]);
  //       setTotalCount(totalCount + 1);
  //     }

  //     toast.success("Cliente cadastrado com sucesso!");
  //     return newCustomer;
  //   } catch (error) {
  //     console.error("Erro ao cadastrar cliente:", error);
  //     toast.error("Falha ao cadastrar cliente.");
  //     return null;
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };


  const createCustomer = async (formData) => {
    console.log("FORM DATA:", formData);
    console.log("AVATAR:", formData.avatar);
    console.log("FILE:", formData.avatar?.file);

    if (!user?.id) {
      toast.error("Sessão expirada. Faça login novamente.");
      return null;
    }

    setIsSaving(true);

    try {
      let avatar_url = null;

      // Upload da imagem
      if (formData.avatar_file) {
        const file = formData.avatar_file;

        const fileName = `${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`customers/${fileName}`, file);

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
          .from("avatars")
          .getPublicUrl(data.path);

        console.log("URL pública da imagem:", publicUrl.publicUrl);

        avatar_url = publicUrl.publicUrl;
      }


      // 🔥 2. Monta objeto FINAL (SEM file)
      const customerData = {
        revendedor_id: user.id,
        name: formData.name,
        phone: formData.phone,
        cep: formData.cep,
        city: formData.city,
        state: formData.state,
        status: formData.status ?? true,
        avatar_url, // 👈 aqui vai a URL da imagem
      };

      // 🔥 3. Envia pro service (limpo)
      const newCustomer = await customerService.createCustomer(customerData);

      // 🔥 4. Atualização otimista
      if (newCustomer) {
        setCustomers([newCustomer, ...customers]);
        setTotalCount(totalCount + 1);
      }

      toast.success("Cliente cadastrado com sucesso!");
      return newCustomer;
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      toast.error("Falha ao cadastrar cliente.");
      return null;
    } finally {
      setIsSaving(false);
    }
  };


  //Função para atualizar o status no banco e refletir no estado local imediatamente.
  const updateCustomerStatus = async (customerId, currentStatus) => {
    try {
      const newStatus = await customerService.toggleCustomerStatus(
        customerId,
        currentStatus,
      );

      // Atualização otimista no store do Zustand
      const updatedCustomers = customers.map((c) =>
        c.id === customerId ? { ...c, status: newStatus } : c,
      );
      setCustomers(updatedCustomers);

      toast.success(
        `Cliente ${newStatus ? "Ativo" : "Bloqueado"} com sucesso!`,
      );
      return true;
    } catch (error) {
      toast.error("Falha ao atualizar o status do cliente.");
      return false;
    }
  };

  /**
   * Função para deletar um cliente no banco e refletir no estado local.
   */
  const deleteCustomer = async (customerId, customerName) => {
    try {
      await customerService.deleteCustomer(customerId);

      // Atualização otimista no store do Zustand
      const updatedCustomers = customers.filter((c) => c.id !== customerId);
      setCustomers(updatedCustomers);
      setTotalCount((prev) => prev - 1); // Decrementa o total

      toast.success(`Cliente "${customerName}" excluído com sucesso!`);
      return true;
    } catch (error) {
      toast.error("Falha ao excluir o cliente.");
      return false;
    }
  };

  return {
    customers,
    totalCount,
    isLoading,
    isSaving,
    createCustomer,
    updateCustomerStatus,
    deleteCustomer,
  };
}
