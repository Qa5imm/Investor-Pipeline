//@ts-nocheck
import ToggleSwitch from "./ToggleSwitch";

export const Navbar = ({ toggle, onToggle }) => {
  return (
    <div className="flex justify-between align-baseline border-b-2 p-4">
      <p className="text-2xl text-black font-extrabold">metal.</p>
      <ToggleSwitch isToggled={toggle} onToggle={onToggle} />
    </div>
  );
};
