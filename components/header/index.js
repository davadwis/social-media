const Header = () => {
  return (
    <>
      <nav className="border fixed z-20 w-full top-0 border-b-2 backdrop-blur-sm md:hidden">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 h-[64px]">
          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div className="flex justify-between text-lg font-light">
              <div>
                <h1 className="font-semibold text-sky-500">brand</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
