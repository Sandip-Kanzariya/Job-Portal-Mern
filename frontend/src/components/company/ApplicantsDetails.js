import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ApplicantsDetails() {
  const { postid } = useParams();
  const BASE_URI = process.env.REACT_APP_API_URL;
  const [applicantData, setApplicantData] = useState([]);

  const [status, setStatus] = useState("");

  const manageStatus = async (status, id) => {
    try {
      let result = await fetch(`${BASE_URI}/user/update/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      setStatus(status);
      result = await result.json();
      console.log(result);
  
    } catch (err) {
      console.log(err);
    }
  };

  const getApplicants = async () => {
    try {
      let userList = await fetch(`${BASE_URI}/company/post/users/${postid}`, {
        method: "get",
      });

      userList = await userList.json();
      setApplicantData(userList);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getApplicants();
  }, [status]);

  return (
    <section className="mx-auto w-full max-w-7xl px-8 py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">ApplicantsDetails</h2>
        </div>

        <Link to={"/"}>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Home
          </button>
        </Link>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-black md:rounded-lg">
              <table className="min-w-full divide-y divide-black">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-black">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-bold text-black"
                    >
                      <span>Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-bold text-black"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-bold text-black"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-bold text-black"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-bold text-black"
                    >
                      Manage Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black bg-white">
                  {applicantData.map((applicant) => (
                    <tr key={applicant._id} className="divide-x divide-black">
                      <td className="whitespace-nowrap px-4 py-4">
                        <center>{applicant.name}</center>
                      </td>

                      <td className="whitespace-nowrap px-12 py-4">
                        <div className="text-sm font-medium text-blue-700">
                          {applicant.email}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-black">
                        {}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className= { applicant.status == "accepted" ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5text-green-800" : "inline-flex rounded-full bg-white px-2 text-xs font-semibold leading-5 text-red-700"}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4">
                        <center>
                          <button
                            type="button"
                            className="mr-5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            value="rejected"
                            onClick={(e) =>
                              manageStatus(e.target.value, applicant._id)
                            }
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            className="ml-5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            value="accepted"
                            onClick={(e) =>
                              manageStatus(e.target.value, applicant._id)
                            }
                          >
                            Accept
                          </button>
                        </center>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full border-gray-300">
        <div className="mt-2 flex items-center justify-end">
          <div className="space-x-2">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
