"use client";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    const res = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/login`,
      payload,
    });
    if (!res?.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Email or Password",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
      });
    } else {
      Cookies.set("user_token", res?.data?.token, {
        expires: new Date(res?.data?.expires_at),
        path: "/",
      });
      router.push("/");
    }
  };

  return (
    <>
      <div className="grid w-full h-screen">
        <div className="grid justify-items-center content-center">
          <div className="grid border-2 border-purple-200 rounded-md p-8 w-96 shadow-md shadow-sky-400">
            <form className="flex max-w-md flex-col gap-4">
              <h2 className="text-center font-semibold text-4xl text-sky-500">
                login
              </h2>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@mail.com"
                  required
                  value={payload?.email}
                  onChange={(event) =>
                    setPayload({ ...payload, email: event.target.value })
                  }
                  type="email"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="password" />
                </div>
                <TextInput
                  id="password"
                  required
                  value={payload?.password}
                  onChange={(event) =>
                    setPayload({ ...payload, password: event.target.value })
                  }
                  type="password"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => HandleSubmit()}
                  className="w-16"
                  gradientDuoTone="purpleToBlue"
                >
                  login
                </Button>
              </div>
              <div className="text-center font-light">
                <p>
                  don't have an account? <span> </span>
                  <span className="text-sky-600">
                    <Link href="/register">register now</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
