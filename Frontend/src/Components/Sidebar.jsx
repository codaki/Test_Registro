function Sidebar() {
  return (
    <div className="bg-neutral-100 h-screen w-1/6 shadow-md">
      <div className="flex flex-col items-center">
        <div className="p-4"></div>
        <div className="text-black text-2xl">Menu</div>
        <div className="flex flex-col items-center text-black">
          <a href="#" className="p-4 hover:bg-gray-700 w-full">
            Home
          </a>
          <a href="#" className="p-4 hover:bg-gray-700 w-full">
            Camera
          </a>
          <a href="#" className="p-4 hover:bg-gray-700 w-full">
            Users
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
