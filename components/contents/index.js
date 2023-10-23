import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import ProfileImage from "../profile-image";
import Date from "../date";

const Contents = () => {
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });
  console.log(data);
  return (
    <>
      <div className="w-full m-auto p-4 pt-24">
        {data?.data?.map((item) => (
          <>
            <div className="border-b-2 border-gray-300 py-4 p-4">
              <div className="flex">
                <div className="py-2">
                  <div className="flex justify-center items-center border-transparent rounded-full w-12 h-12 bg-sky-500 text-white text-xl font-light">
                    <ProfileImage name={item?.user?.name} />
                  </div>
                </div>
                <div className="grid grid-rows-2">
                  <div>
                    <div className="flex flex-col ml-2 font-semibold">
                      <div>
                        <span>{item?.user?.name} |</span>
                        <span className="font-light text-gray-500">
                          {item?.user?.email}
                        </span>
                      </div>
                      <div>
                        <p className="font-light">
                          <Date dateString={item?.created_at} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="font-light px-2">
                    <p>{item?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default Contents;
