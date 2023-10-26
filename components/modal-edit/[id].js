import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const ModalEdit = ({ id }) => {
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    description: "",
  });

  const { data: posts, mutate: mutation } = useSWR(
    [
      `https://paace-f178cafcae7b.nevacloud.io/api/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    ],
    ([url, token]) => fetcher(url, token)
  );

  useEffect(() => {
    if (posts) {
      setPayload({
        description: posts?.data?.description,
      });
    }
  }, [posts]);

  const HandleSubmit = async () => {
    const res = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${id}`,
      method: "PATCH",
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (res?.success) {
      Swal.fire({
        icon: "success",
        text: "post has been edited",
        timer: 2000,
        confirmButtonColor: "rgb(56 189 248)",
        toast: true,
        position: "top",
      });
      onClose();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <span onClick={onOpen} className="w-full">
        edit
      </span>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <span className="font-semibold">EDIT</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
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
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => HandleSubmit()}
            >
              edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalEdit;
