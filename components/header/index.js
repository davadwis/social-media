import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed z-20 w-full top-0 border-b-2 bg-white md:hidden"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 h-[64px]">
        <div
          className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <div className="flex justify-between text-lg font-light">
            <Link href="/">
              <h1 className="font-semibold text-sky-500 text-2xl">lettra</h1>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
export default Header;
