import { Outlet } from "react-router-dom";

export const HomeContainer = () => {
  return (
    <div className="flex flex-col items-start justify-center mt-8 max-w-3xl">
      <Outlet />
    </div>
  );
};
