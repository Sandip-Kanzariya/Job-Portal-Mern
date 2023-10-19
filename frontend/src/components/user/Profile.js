import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyApplications } from './MyApplications';


function Profile() {

    const BASE_URI = process.env.REACT_APP_API_URL;
    const authUser = localStorage.getItem("user");

  const navigate = useNavigate();

    let userId;
    let email;
    let username;
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");

    if (authUser) {
        userId = JSON.parse(authUser)._id;
        email = JSON.parse(authUser).email;
        username = JSON.parse(authUser).name;
        // setEmail(JSON.parse(authUser).email);
        // setUsername(JSON.parse(authUser).name);
    }
    const [postData, setPostData] = useState([])

    const getApplications = async () => {
        if (userId) {
            try {
                let postList = await fetch(`${BASE_URI}`, {
                    method: "get",
                });

                postList = await postList.json();

                postList.map((item, index) => {
                    if (item.applied.indexOf(userId) === -1) {
                        postList.splice(index, 1);
                    }
                });
                console.log(postList)
                setPostData(postList)
            } catch (err) {

            }
        }
    }

    useEffect(() => {
        getApplications();
        if (!authUser) {
            navigate("/signin");
          }
    }, [userId])

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 ">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Profile
                        </h2>

                        <form action="#" method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-base font-medium text-gray-900"
                                    >
                                        {" "}
                                        Username{" "}
                                    </label>{" "}

                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Username"
                                            id="username"
                                            value={username}
                                            readOnly
                                        ></input>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-base font-medium text-gray-900"
                                    >
                                        {" "}
                                        Email address{" "}
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            value={email}
                                            readOnly
                                        ></input>
                                    </div>
                                </div>
                                
                                <div>
                                    <button

                                        type="button"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"

                                    >
                                        Update
                                    </button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>

                <div className="h-full w-full">
                    <MyApplications postlist={postData} />
                </div>
            </div>
        </section>
    );
}

export default Profile;
