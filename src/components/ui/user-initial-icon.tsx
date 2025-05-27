const UserInitialIcon = ({ username = "", size = 40 }) => {
   const initial = username.charAt(0).toUpperCase();
   return (
      <div
         className="flex items-center justify-center rounded-full bg-blue-200 text-primary"
         style={{ width: size, height: size, fontSize: size / 2 }}
      >
         {initial}
      </div>
   );
};

export default UserInitialIcon;
