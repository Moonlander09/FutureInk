"use server";
import { signIn, signOut } from "@/lib/auth";


export async function signInAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({
    redirectType:'redirect',
    redirect:true,
    redirectTo:'/'
  });
  
}
