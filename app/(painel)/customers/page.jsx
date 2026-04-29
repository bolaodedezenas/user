"use client";

import { useEffect, useState } from "react";

// components
import PageLoading from "@/components/PageLoading";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import CardList from "@/modules/bets/components/CardList";
import ViewToggle from "@/components/ViewToggle";
import Pagination from "@/components/Pagination";
import { useDebounce } from "@/hooks/useDebounce";
import SignInButton from "@/components/Btns/SignInButton";
 // hooks
import { useCustomers } from "@/modules/customers/hooks/useCustomers";
// schemas
import {getTableSchema} from "@/modules/customers/schemas/tableSchema";
import { getCardSchema}   from "@/modules/customers/schemas/cardSchema";
 
// icons
import {
  FaFilter,
  FaTimes,
  FaUsers,
  FaUserTag,
} from "react-icons/fa";

// toast
import toast from "react-hot-toast";
import CustomersForm from "@/modules/customers/components/CustomersForm"; // Keep this import
import ConfirmDeleteModal from "@/modules/customers/components/ConfirmDeleteModal";


export default function Customers() {
  // =========================================================
  // 🔹 STATES - UI / CONTROLE
  // =========================================================
  const [activeRemoteSearchTerm, setActiveRemoteSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [remoteEmpty, setRemoteEmpty] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [viewLoading, setViewloading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const [open, setOpen] = useState(false);

  const itemsPerPage = 10;

  // =========================================================
  // 🔹 FUNCTIONS / HANDLERS
  // =========================================================
  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const handleStatusToggle = async (row) => {
    await updateCustomerStatus(row.id, row.status);
  };

  async function handleSave(formData) {
    console.log("Saving customer:", formData);
    setOpen(false);
  }

  const handleConfirmDelete = async () => {
    if (customerToDelete) {
      setIsDeleting(true);

      const success = await deleteCustomer(
        customerToDelete.id,
        customerToDelete.name,
      );

      setIsDeleting(false);

      if (success) {
        setIsDeleteModalOpen(false);
        setCustomerToDelete(null);
      }
    }
  };

  // =========================================================
  // 🔹 SCHEMAS
  // =========================================================
  const columns = getTableSchema(handleStatusToggle, handleDeleteClick);
  const schemaCard = getCardSchema(handleStatusToggle, handleDeleteClick);

  // =========================================================
  // 🔹 HOOKS EXTERNOS
  // =========================================================
  const {
    customers,
    totalCount,
    isLoading: isLoadingCustomers,
    deleteCustomer,
    updateCustomerStatus,
  } = useCustomers(currentPage, itemsPerPage, activeRemoteSearchTerm);

  // =========================================================
  // 🔹 DERIVED STATE (FILTER LOCAL)
  // =========================================================
  const localFilteredCustomers = customers.filter((c) => {
    if (!searchTerm) return true;
    return c.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // =========================================================
  // 🔹 EFFECTS - BUSCA HÍBRIDA
  // =========================================================
  useEffect(() => {
    if (searchTerm !== activeRemoteSearchTerm) {
      setRemoteEmpty(false);
      toast.dismiss("search-not-found");
    }

    if (!searchTerm) {
      setActiveRemoteSearchTerm("");
      setRemoteEmpty(false);
      return;
    }

    if (localFilteredCustomers.length > 0) {
      if (activeRemoteSearchTerm !== "") {
        setActiveRemoteSearchTerm("");
      }
      setRemoteEmpty(false);
      return;
    }

    if (debouncedSearchTerm && debouncedSearchTerm !== activeRemoteSearchTerm) {
      setRemoteEmpty(false);
      setActiveRemoteSearchTerm(debouncedSearchTerm);
    }
  }, [
    debouncedSearchTerm,
    searchTerm,
    localFilteredCustomers.length,
    activeRemoteSearchTerm,
  ]);

  useEffect(() => {
    if (!isLoadingCustomers && activeRemoteSearchTerm) {
      setRemoteEmpty(totalCount === 0);
    }
  }, [isLoadingCustomers, totalCount, activeRemoteSearchTerm]);

  useEffect(() => {
    if (searchTerm !== activeRemoteSearchTerm) return;
    if (localFilteredCustomers.length > 0) return;

    if (remoteEmpty && activeRemoteSearchTerm && !isLoadingCustomers) {
      toast.error(`Cliente "${activeRemoteSearchTerm}" não encontrado.`, {
        duration: 6000,
        id: "search-not-found",
        icon: "🔍",
      });
    }
  }, [
    remoteEmpty,
    activeRemoteSearchTerm,
    searchTerm,
    localFilteredCustomers.length,
    isLoadingCustomers,
  ]);

  // =========================================================
  // 🔹 EFFECTS - UI
  // =========================================================
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => setViewloading(false), 500);
  }, [view]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFilterOpen(true);
      } else {
        setIsFilterOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  if (loading) return <PageLoading />;

  return (
    <section className="flex-1 min-h-full flex flex-col bg-[rgb(var(--blue-50))] overflow-hidden">
      <section className="w-full flex flex-wrap  items-center justify-between bg-white shadow-md rounded-lg  px-4 py-2 gap-2 transition-all duration-300">
        <div className=" flex flex-wrap items-center justify-between gap-2    ">
          <div className=" flex flex-col ml-8 xss:ml-0 ">
            <div className="flex gap-2 items-center  ">
              <FaUsers className="text-[1.5rem] text-[rgb(var(--btn))]" />
              <Title
                text="Gestão de Clientes"
                className="text-zinc-700 font-semibold text-[0.9rem]"
              />
            </div>
            <Paragraph
              text="Visualize aqui todos os clientes cadastrados."
              className="text-zinc-500 text-[0.8rem] "
            />
          </div>
        </div>

        <div className="  max-sm:flex-1 max-xs:w-full  flex items-center justify-center gap-2  ">
          <ViewToggle
            value={view}
            onChange={() => {
              setView(!view);
              setViewloading(true);
            }}
          />

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="hidden  max-md:flex  p-3 bg-zinc-100 rounded-lg text-[rgb(var(--btn))] border border-zinc-100 active:scale-95 transition-transform"
            title="Filtros"
          >
            {isFilterOpen ? <FaTimes size={20} /> : <FaFilter size={20} />}
          </button>
        </div>

        {/* Container de Filtros: Toggleable no mobile, flex-row no desktop */}
        <div
          className={`${isFilterOpen ? "flex" : "hidden"} flex-wrap justify-center items-center gap-4   max-md:w-full pb-4`}
        >
          <div className="flex flex-wrap-reverse  items-center gap-4 w-full md:w-auto justify-center">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder=" Nome do Cliente "
              className=" w-38"
            />
            <SignInButton className=" !w-50" text="Novo Cliente" onClick={() => setOpen(true)} />
          </div>
        </div>
      </section>
      <div className="flex-1 flex flex-col bg-white shadow-lg rounded-lg mt-4 overflow-hidden">
        {isLoadingCustomers || viewLoading ? (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <PageLoading />
          </div>
        ) : localFilteredCustomers.length > 0 ? (
          <>
            {view ? (
              <section
                className=" flex-1 flex flex-col overflow-hidden min-h-0 
              "
              >
                <Table columns={columns} data={localFilteredCustomers} />
              </section>
            ) : (
              <section className=" flex-1 flex justify-center flex-wrap p-5 gap-5 overflow-y-auto min-h-0  sm:max-h-[780px] max-sm:max-h-[625px]">
                <CardList
                  schemaCard={schemaCard}
                  data={localFilteredCustomers}
                />
              </section>
            )}
          </>
        ) : (
          <div className="flex flex-1 flex-col justify-center items-center h-full gap-3 text-zinc-400">
            <FaUserTag className="text-5xl text-zinc-200" />
            <Paragraph
              text="Nenhum cliente encontrado."
              className="text-zinc-500 font-medium text-center px-4"
            />
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        itemName={customerToDelete?.name}
        message={`Tem certeza que deseja excluir o cliente "${customerToDelete?.name}"? Essa ação não poderá ser desfeita.`}
      />

      <CustomersForm isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
}
