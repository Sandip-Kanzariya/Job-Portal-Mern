import React, { useEffect, useState } from "react";

import Card from "../post/Card";
import { Divide, Loader } from "lucide-react";

export default function CmpPost() {

  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const companyAuth = localStorage.getItem("company");
  const company = JSON.parse(companyAuth)._id;

  //
  const BASE_URI = process.env.REACT_APP_API_URL;

  const getPosts = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      let result = await fetch(`${BASE_URI}`, {
        method: "get",
      });

      result = await result.json();
      setIsLoading(false);

      setPostList(result);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  postList.map((item, index) => { 
    if(item.company !== company){
      postList.splice(index, 1);
    }
  });

  return (
    // <div className="flex flex-wrap items-center">
    <div className="grid grid-cols-1 gap-[1px] md:grid-cols-2">
      {/* <button onClick={getPosts}>Data</button>*/}
      {isLoading && <Loader />}

      {isError ? (
        <p className="text-red-600">Something Went Wrong</p>
      ) : postList.length > 0 ? (
        postList.map((item, index) => <Card className="m-5" post={item} />)
      ) : (
        !isLoading && <h1>There is yet not any Post </h1>
      )}
    </div>
  );
}
