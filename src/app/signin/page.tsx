"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    const token = await result?.user.getIdToken();
    localStorage.setItem("token", token!);
    return router.push("/");
  };

  const signupInstead = () => {};
  return (
    <div className="container mx-auto flex flex-col justify-center items-center mt-10 ">
      <div className="flex flex-col items-end justify-center px-2 w-full">
        <button
          className="bg-black text-white p-1 w-36"
          onClick={signupInstead}
        >
          <Link href="/signup">signup instead</Link>
        </button>
      </div>
      <h1 className="color-black font-bold text-3xl">Sign in</h1>
      <form onSubmit={handleForm}>
        <div className=" flex flex-col justify-center items-start">
          <p className="mt-3">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-solid border-2 border-black p-2"
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
          />
          <p className="mt-3">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-solid border-2 border-black p-2"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button type="submit" className="bg-black text-white p-3 w-24 mt-3">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
