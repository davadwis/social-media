const Sidebar = () => {
  return (
    <>
      <div className="flex-row hidden md:flex">
        <aside
          id="default-sidebar"
          className="top-0 left-0 z-0 w-72 h-full fixed"
          aria-label="Sidebar"
        >
          <div className="h-screen px-3 py-4 overflow-y-auto border-r-2 dark:bg-gray-800">
            <ul>
              <li>Tes</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};
export default Sidebar;
