import React from "react";
import useMenu from "../../../hooks/useMenu";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold my-4">
          Upload A New <span className="text-green">Menu Item</span>
        </h2>
      </div>
    </div>
  );
};

export default ManageItems;
