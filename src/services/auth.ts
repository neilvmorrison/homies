import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "@/config/auth";

export interface IAuthenticateUserResponse {
  token: string | undefined;
  user: User;
}

export async function authenticateUser(): Promise<IAuthenticateUserResponse> {
  const provider = new GoogleAuthProvider();
  try {
    const signInResult = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(signInResult);
    const token = credential?.accessToken;
    const user = signInResult.user;
    return {
      token,
      user,
    };
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    const email = err.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(err);
    throw new Error(err.message);
  }
}

export async function logoutUser(): Promise<void> {
  await auth.signOut();
}

export async function signupUser(username: string): Promise<void> {}
