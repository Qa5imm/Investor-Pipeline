//@ts-nocheck
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function InternetProvider({ children }) {
  let isOnline = useOnlineStatus();
  return (
    <>
      {!isOnline && (
        <p className="w-full bg-yellow-200 text-center p-1.5 ">
          You have lost internet connetion, please try again.
        </p>
      )}
      {children}
    </>
  );
}
