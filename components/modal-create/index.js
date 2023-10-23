"use client";
import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useState } from "react";
import { BsPen } from "react-icons/bs";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Create() {
  const { mutate } = useMutation();
  const router = useRouter();
  const [openModal, setOpenModal] = useState();
  const [payload, setPayload] = useState({
    description: "",
  });
  const props = { openModal, setOpenModal, payload, setPayload };

  const HandleSubmit = async () => {
    const res = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/post",
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (res?.success) {
      Swal.fire({
        icon: "success",
        text: "post has been added",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
        toast: true,
        position: "top",
      });
      router.reload();
    }
  };

  return (
    <>
      <Button
        onClick={() => props.setOpenModal("form-elements")}
        gradientDuoTone="purpleToBlue"
        className="rounded-full"
      >
        <BsPen size={28} />
      </Button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <div className="grid border-2 border-purple-200 rounded-md shadow-md shadow-sky-400">
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" />
                </div>
                <Textarea
                  id="description"
                  type="text"
                  placeholder="what's happening ..."
                  required
                  value={payload?.description}
                  onChange={(event) =>
                    setPayload({ ...payload, description: event.target.value })
                  }
                  className="focus:ring-sky-400"
                />
              </div>
              <div className="flex w-full place-content-end">
                <Button
                  onClick={() => HandleSubmit()}
                  gradientDuoTone="purpleToBlue"
                >
                  post
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
