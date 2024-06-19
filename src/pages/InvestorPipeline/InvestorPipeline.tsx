//@ts-nocheck

import { useState } from "react";
import ListView from "./ListView";
import BoardView from "./BoardView";
import { Navbar } from "../../components/Navbar";

export default function InvestorPipeline() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="flex flex-col gap-y-12  h-screen bg-gray-100 p-4">
      <Navbar toggle={toggle} onToggle={handleToggle} />
      <p className="text-3xl font-bold">Investor Pipeline</p>
      {toggle ? <BoardView /> : <ListView />}
    </div>
  );
}
