import { auth, googleProvider, db, storage } from './FirebaseConfig';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const id = result.user.uid;

    const data = {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      phone: '',
      cep: '',
      state: '',
      city: '',
      terms: true,
      roles: [], // Ex: 'admin', 'user'
      permissions: [], // Ex: { route: '/admin', actions: { canView: true, canEdit: false, canDelete: false} }
      status: 'bloqueado', // ativo,  bloqueado
      isAdmin: false,
    };

    const exists = await userExists(id);
    if (!exists) {
      const saved = await saveUser(id, data);
      return { user: saved.user };
    }
    // usuário já existe → pega os dados do db
    const snap = await getDoc(doc(db, 'users', id));
    return { user: { id, ...snap.data() } };
  } catch (error) {
    return { error };
  }
};

// Verifica se o usuário existe
export async function userExists(id) {
  try {
    const userRef = doc(db, 'users', id);
    const snapshot = await getDoc(userRef);
    return snapshot.exists();
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    return false;
  }
}

// Login com email e senha
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    if (!user.emailVerified) {
      await signOut(auth);
      return {
        error: new Error("Seu e-mail ainda não foi verificado. Verifique sua caixa de entrada."),
      };
    }

    return { user };
  } catch (error) {
    return { error };
  }
};


// desloga o usuário
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const registerWithEmail = async (email, password, formData) => {
  try {
    // remove password
    const { password: _, ...Data } = formData;
    
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await signOut(auth);

    const user = result.user;
    if (!user?.uid) {
      return { error: new Error('Não foi possível criar o usuário.') };
    }

    // Envia e-mail de verificação
    await sendEmailVerification(user);

    // salva os dados no banco
    const saved = await saveUser(user.uid, Data);
    return { user: saved.user };
  } catch (error) {
    return { error };
  }
};

// salva o usuário no banco
export async function saveUser(id, data) {
  try {
    const userRef = doc(db, 'users', id);
    const userData = {
      ...data,
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, userData, { merge: true });

    return {
      success: true,
      user: { id, ...userData },
    };
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return { success: false, error };
  }
}


// Gera um código aleatório
function generateFourDigits() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}


// Envia e-mail de redefinição de senha
export async function sendPasswordReset(email) {
  try {
    const code = generateFourDigits();
    console.log(code);
    // Defina actionCodeSettings com a URL da sua página
    const actionCodeSettings = {
      url: 'https://www.bolaodedezenas.com.br/recovery?${code}',
      handleCodeInApp: true,
    };
    // `http://localhost:3000/recovery?${code}`
    // 'https://www.bolaodedezenas.com.br/recovery?${code}'';

    http: await sendPasswordResetEmail(auth, email, actionCodeSettings);

    return { ok: true, message: 'E-mail enviado com sucesso!' };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export  async function  handleResetPassword(oobCode, password) {
  try {
    // Aqui fazemos o reset da senha usando o oobCode
    await confirmPasswordReset(auth, oobCode, password);
    return {status: true, message: 'Senha redefinida com sucesso!'};
  } catch (error) {
    return  {status: false, message: error.message};
  }
};

// verificaçao de email type da ation code {mode=verifyEmail}
// https://www.bolaodedezenas.com.br/resetPassword?mode=verifyEmail&oobCode=f86EpqWxQu42bpkUMfCokm0xAfPXuS4NPTK6xGBk1RcAAAGafgKlSA&apiKey=AIzaSyCdUlILR--KjaR3npFKTJSQzRfiS36Ty2A&lang=pt-BR

// verificaçao de email type da ation code {mode=resetPassword}
//  https://www.bolaodedezenas.com.br/resetPassword?apiKey=AIzaSyCdUlILR--KjaR3npFKTJSQzRfiS36Ty2A&mode=resetPassword&oobCode=Ct6-5-HfYf70ash19Dhg1cT7md3czrpk-7LaCxIEBUcAAAGafgHcjQ&continueUrl=https://www.bolaodedezenas.com.br/resetPassword&lang=pt-BR



// export async function updateUserData(userId, data, imageFile, setUser) {
//   try {
//     const userRef = doc(db, "users", userId);

//     // Se tiver imagem, faz upload
//     if (imageFile) {
//       const imageRef = ref(storage, `users/${userId}/profile_${Date.now()}`);
//       await uploadBytes(imageRef, imageFile);
//       const imageUrl = await getDownloadURL(imageRef);

//       data.photoURL = imageUrl; // adiciona a URL ao objeto que vai para Firestore
//     }

//     // Atualiza documento
//     await updateDoc(userRef, data);

//     // Atualiza UI
//     if (setUser) {
//       setUser((prev) => ({
//         ...prev,
//         ...data,
//       }));
//     }

//     return { success: true };
//   } catch (error) {
//     return { success: false, error };
//   }
// }





export async function updateUserData(userId, data, imageFile, setUser) {
  try {
    const userRef = doc(db, "users", userId);

    // Se o usuário enviou imagem, envia para Cloudinary
    if (imageFile) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      const imageUrl = await uploadProfileImage(
        imageFile,
        cloudName,
        uploadPreset,
        userId // ← importante para definir public_id
      );

      data.photoURL = imageUrl; // salva a URL recebida do Cloudinary
    }

    // Atualiza o documento no Firestore
    await updateDoc(userRef, data);

    // Atualiza o estado no front
    if (setUser) {
      setUser((prev) => ({ ...prev, ...data }));
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { success: false, error };
  }
}



export async function uploadProfileImage(
  file,
  cloudName,
  uploadPreset,
  userId
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // Define o public_id usando o ID do usuário
  formData.append("public_id", `bolaodedezenas/dados/${userId}/avatar`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("Erro ao enviar imagem para Cloudinary");
  }

  return data.secure_url;
}
