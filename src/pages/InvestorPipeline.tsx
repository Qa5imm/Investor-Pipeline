//@ts-nocheck

import { useState } from "react";
import ListView from "../components/ListView";
import { ToggleButton } from "../components/ToggleButton";

export default function InvestorPipeline() {
  const [toggle, setToggle] = useState(false);
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
      {toggle ? <p>Board View</p> : <ListView />}
    </div>
  );
}
