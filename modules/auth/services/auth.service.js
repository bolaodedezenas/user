// import * as repo from "../repository/auth.repository";
import {
  signUpRepository,
  signInRepository,
  signInWithGoogleRepository,
  checkEmailExistsRepository,
  signOutRepository,
} from "../repository/auth.repository";


export const loginService = async (email, password) => {
  const { data, error } = await signInRepository(email, password);
  if (error) throw error;
  return data.user;
};

 
export const registerService = async (formData) => {
  try {

    // verifica se email já existe
    const exists = await checkEmailExistsRepository(formData.email);
    console.log("Email exists:", exists);

    if (exists) {
      console.log("Email exists:", exists);

      return {
        error: new Error(
          "Já existe uma conta com este e-mail. Faça login ou continue com o Google.",
        ),
      };
    }

    //  cria usuário no supabase
    const { data: authData, error } = await signUpRepository(
      formData.email,
      formData.password,
      {
        name: formData.name,
        phone: formData.phone,
        cpf: formData.cpf || "",
        avatar_url: formData.avatar_url || "",
        terms: formData.terms || false,
      },
    );

    if (error) return { error };

    // ✅ Usuário criado com sucesso, trigger já cuidou do profile
    return { user: authData.user };
  } catch (err) {
    console.error(  err);
    console.error("Erro ao registrar:", err);
    return { error: err };
  }
};


export const loginWithGoogleService = async () => {
  const { data, error } = await signInWithGoogleRepository();
  if (error) throw error;
  return data;
};

export const logoutService = async () => {
  const { error } = await signOutRepository();
  if (error) throw error;
};
