import React from "react";

const NewComp = () => {
  const courseName = "Course Name";
  const courseStatus = "in-progress";
  const registrations = [
    {
      profile_img: "",
      username: "John Doe",
      email: "john@example.com",
      id: 1,
      status: "pending",
      registrationId: 101,
    },
    {
      profile_img: "",
      username: "Jane Smith",
      email: "jane@example.com",
      id: 2,
      status: "approved",
      registrationId: 102,
    },
  ];
  const statusColorMap = {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  };
  const headerList = ["Name", "Email", "Profile", "Status", "Actions"];

  return (
    <div className="my-12 flex flex-col gap-y-8 md:text-base md:mx-0 mx-4 relative h-screen">
      <div className="flex gap-y-0.5 justify-between md:items-center">
        <h1 className="font-bold text-lg md:text-xl">{courseName}</h1>
        <div className="flex flex-col-reverse items-center gap-y-2 md:flex-row md:gap-x-2">
          <button
            type="button"
            className="px-2 py-1 h-fit whitespace-nowrap w-fit rounded-lg text-white bg-green-500 hover:opacity-90 md:px-3 md:py-2"
          >
            Mark as Complete
          </button>
          <button
            type="button"
            className="px-2 py-1 h-fit whitespace-nowrap w-fit rounded-lg text-white bg-red-500 hover:opacity-90 md:px-3 md:py-2"
          >
            Cancel Course
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 gap-x-4 md:flex-row md:justify-between md:flex-wrap md:items-center">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            className="w-full rounded focus:ring-0 border-1 border-gray-200 bg-transparent"
            placeholder="Find a student by name..."
          />
        </div>
        <div className="flex items-center gap-x-4 flex-wrap gap-y-2">
          <select className="rounded py-1 bg-gray-100 border-1 border-gray-200 hover:opacity-9 cursor-pointer focus:border-none">
            <option className="hidden" value="None">
              Type
            </option>
          </select>
          <select className="rounded py-1 bg-gray-100 border-1 border-gray-200 hover:opacity-9 cursor-pointer focus:border-none">
            <option className="hidden" value="None">
              Sort
            </option>
          </select>
        </div>
        <div className="flex justify-between">
          <p className="whitespace-nowrap">
            Total: <span className="ml-2">{registrations.length}</span>
          </p>
        </div>
      </div>
      <div className="overflow-x-auto md:overflow-hidden">
        <table className="w-full gap-y-4">
          <thead className="h-12 border-b-2">
            <tr className="mb-4">
              {headerList.map((header, index) => (
                <th
                  key={index}
                  className={`${
                    index === headerList.length - 1
                      ? "text-center"
                      : "text-left"
                  } font-normal text-gray-500`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-x-4 mr-4 md:mr-0">
                    <div className="h-8 w-10 md:h-16 md:w-16">
                      <img
                        className="h-full w-full rounded object-cover object-top"
                        src={
                          registration.profile_img !== ""
                            ? registration.profile_img
                            : "/default.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <p className="whitespace-nowrap">{registration.username}</p>
                  </div>
                </td>
                <td>
                  <p className="w-full break-words mr-4 md:mr-0">
                    {registration.email}
                  </p>
                </td>
                <td>
                  <a
                    href="#"
                    className="w-full break-words mr-4 md:mr-0 text-blue-500 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Click here
                  </a>
                </td>
                <td>
                  <p
                    className={`bg-gray-100 px-2 py-1.5 w-fit mr-5 md:mr-0 rounded-lg`}
                  >
                    {registration.status}
                  </p>
                </td>
                <td>
                  <div className="flex flex-col gap-y-2 text-end text-white md:flex-row md:justify-end gap-x-2">
                    {registration.status === "pending" && (
                      <>
                        <button className="bg-green-500 px-3 py-1 rounded hover:opacity-80">
                          Approve
                        </button>
                        <button className="bg-red-500 px-3 py-1 rounded hover:opacity-80">
                          Reject
                        </button>
                      </>
                    )}
                    {registration.status !== "pending" && (
                      <p className="text-gray-500 mx-auto">No actions</p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute text-white top-1/2 left-1/3 translate-x-1/2 text-sm px-4 py-3 text-center bg-red-500 hover:opacity-90 focus:ring-4 font-medium rounded-lg cursor-pointer">
        Error Occurred
      </div>
    </div>
  );
};

export default NewComp;
