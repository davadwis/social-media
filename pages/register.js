/* eslint-disable react/jsx-curly-newline */
/* eslint-disable lines-around-directive */
/* eslint-disable object-curly-newline */
"use client";

import { Button, Label, TextInput, Datepicker } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Head from "next/head";
import { useMutation } from "@/hooks/useMutation";

function Register() {
  const router = useRouter();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    hobby: "",
  });

  const HandleSubmit = async () => {
    const res = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/register",
      payload,
    });
    if (!res?.success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
      });
    } else {
      Cookies.set("user_token", res?.data?.token, {
        expires: new Date(res?.data?.expires_at),
        path: "/login",
      });
      router.push("/login");
    }
  };
  return (
    <div className="grid w-full h-screen">
      <Head>
        <title>Lettra</title>
        <meta name="description" content="register account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid justify-items-center content-center">
        <div className="grid border-2 border-purple-200 rounded-md p-8 w-96 shadow-md shadow-sky-400">
          <form className="flex max-w-md flex-col gap-4">
            <h2 className="text-center font-semibold text-4xl text-sky-500">
              register
            </h2>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="username" />
              </div>
              <TextInput
                id="name"
                placeholder="username"
                required
                value={payload?.name}
                onChange={(event) =>
                  setPayload({ ...payload, name: event.target.value })
                }
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dob" value="Date of Birth" />
              </div>
              <Datepicker
                required
                onSelectedDateChanged={payload?.dob}
                onChange={(event) =>
                  setPayload({ ...payload, dob: event.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="phone number" />
              </div>
              <TextInput
                id="phone"
                required
                value={payload?.phone}
                onChange={(event) =>
                  setPayload({ ...payload, phone: event.target.value })
                }
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="hobby" value="hobby" />
              </div>
              <TextInput
                id="hobby"
                required
                value={payload?.hobby}
                onChange={(event) =>
                  setPayload({ ...payload, hobby: event.target.value })
                }
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@flowbite.com"
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
                register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
