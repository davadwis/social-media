const Footer = () => {
  return (
    <>
      <nav className="border fixed z-20 w-full bottom-0 border-t-2 backdrop-blur-sm md:hidden">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 h-[64px]">
          <div
            className="items-center w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div className="flex justify-center text-lg font-light">
              <div>
                <p className="text-center">Tes</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Footer;
