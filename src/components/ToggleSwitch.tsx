// @ts-nocheck

const ToggleSwitch = ({ isToggled, onToggle }) => {
  return (
    <div test-id="toggle-switch">
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1">
        <input
          type="checkbox"
          className="sr-only"
          checked={isToggled}
          onChange={onToggle}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isToggled ? "text-primary bg-[#f4f7ff]" : "bg-white"
          }`}
        >
          List View
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isToggled ? "text-primary bg-[#f4f7ff]" : "bg-white"
          }`}
        >
          Board View
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
