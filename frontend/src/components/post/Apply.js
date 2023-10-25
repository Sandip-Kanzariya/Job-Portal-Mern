import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Apply = () => {
  const { postid } = useParams();
  const BASE_URI = process.env.REACT_APP_API_URL;

  const authUser = localStorage.getItem("user");
  const applyId = JSON.parse(authUser)._id;

  const [title, setTitle] = useState();
  const [role, setRole] = useState();
  const [error, setError] = useState("");

  const userAuth = localStorage.getItem("user");
  const userId = JSON.parse(userAuth)._id;

  const getPost = async () => {
    try {
      let result = await fetch(`${BASE_URI}/company/post/${postid}`, {
        method: "get",
      });

      result = await result.json();

      setTitle(result.title);
      setRole(result.role);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const submitData = async () => {
    try {

      let result = await fetch(`${BASE_URI}/company/post/${postid}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applied: applyId,
        }),
      });

      result = await result.json();

      if(!result.ok){
        setError(result.msg);
        return;
      }

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="">
      <div className="items-center justify-center bg-white px-4 py-4 sm:px-6 sm:py-10 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-2xl font-bold leading-tight text-black">
            Apply For Post
          </h2>
          <center className="text-red-500"> {error} </center>
          <form action="#" method="POST" className="mt-2">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Title{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="title"
                    type="text"
                    placeholder="Title"
                    readOnly={true}
                    value={title}
                  ></input>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Role{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="role"
                    type="text"
                    placeholder="Role"
                    readOnly={true}
                    value={role}
                  ></input>
                </div>
              </div>

              {/*<div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="image"
                    className="text-base font-medium text-gray-900"
                  >
                    Resume / CV{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="image"
                    type="file"
                  ></input>
                </div>
              </div>*/}

              <div>
                <button
                  type="button"
                  disabled={error ? true : false}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={submitData}
                >
                  Apply <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Apply;
