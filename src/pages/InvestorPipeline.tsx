//@ts-nocheck

import { useState } from "react";
import ListView from "../components/ListView";
import { ToggleButton } from "../components/ToggleButton";
import BoardView from "../components/BoardView";

export default function InvestorPipeline() {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div class="flex flex-col gap-y-12 m-12">
      <div className="m-auto">
        <ToggleButton
          toggleText={`${toggle ? "Board" : "List"} View`}
          onToggle={handleToggle}
          isToggled={toggle}
        />
      </div>
      {toggle ? <BoardView /> : <ListView />}
    </div>
  );
}
