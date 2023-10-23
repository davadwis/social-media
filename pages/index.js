import Contents from "@/components/contents";
import dynamic from "next/dynamic";

const DynamicLayout = dynamic(() => import("@/layout"));

export default function Home() {
  return (
    <>
      <DynamicLayout metaTitle="Home">
        <Contents />
      </DynamicLayout>
    </>
  );
}
