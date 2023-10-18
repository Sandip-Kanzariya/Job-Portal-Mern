import React, { useState, useEffect } from "react";
import Apply from "./Apply";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";


export default function Card(props) {
  props = props.post;

  //
  const user = JSON.parse(localStorage.getItem("user"));
  const BASE_URI = process.env.REACT_APP_API_URL;

  const [id, setId] = useState(props._id);
  const [title, setTitle] = useState(props.title);
  const [role, setRole] = useState(props.role);
  const [desc, setDesc] = useState(props.description);
  const [vacancy, setVacancy] = useState(props.vacancy);
  const [applys, setApplys] = useState(props.applied.length);
  const [url, setUrl] = useState(props.url);

  const [company, setCompany] = useState("Company");

  const getCompany = async () => {
    try {
      let result = await fetch(`${BASE_URI}/company/${props.company}`, {
        method: "get",
      });

      result = await result.json();
      setCompany(result.cname);
    } catch (err) {}
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    // <div className="flex m-8 max-w-2xl flex-col items-center rounded-md border border-black md:flex-row">
    <div className="flex m-8 max-w-2xl flex-col items-center rounded-md border border-black md:flex-row">
      <div className="mx-3 my-3 h-full w-full md:h-[210px] md:w-[210px]">
        <img
          src={url}
          alt="Post"
          className="h-full w-full rounded-md object-cover"
        />
      </div>

      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-bold">
            {title} <Building2 className="ml-2 h-5 w-5" />{" "}
            <span className="ml-1 text-red-600"> {company} </span>
          </h1>
          <p className="mt-3 text-sm text-black ">{desc}</p>
          <div className="mt-4">
            Looking For :
            <span className="mb-2 mr-2 inline-block rounded-full px-3 py-1 text-[15px] font-semibold text-blue-700">
              {role}
            </span>
          </div>

          <div>
            <span className="inline-flex rounded-full py-1 text-[15px] font-semibold text-green-950">
              Vacancy : {vacancy}
            </span>
            <span className="inline-flex rounded-full py-1 px-5 text-[15px] font-semibold text-red-600">
              Applications For this post : {applys}
            </span>
          </div>

          <Link to={user ? "/post/" + id : "/signin"}>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Apply
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
