//@ts-nocheck

export function ToggleButton({ toggleText, isToggled, onToggle, testId }) {
  return (
    <>
      <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isToggled}
          onChange={onToggle}
          className="sr-only"
          data-id={testId}
        />
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isToggled ? "bg-[#212b36]" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isToggled ? "translate-x-[28px]" : ""
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-lg font-medium text-black">
          {toggleText}
        </span>
      </label>
    </>
  );
}
