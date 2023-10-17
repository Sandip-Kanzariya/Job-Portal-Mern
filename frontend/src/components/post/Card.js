import React, { useState } from "react";
import Apply from "./Apply";

export default function Card(props) {
  props = props.post;
  
  const [id, setId] = useState(props._id);
  const [title, setTitle] = useState(props.title);
  const [role, setRole] = useState(props.role);
  const [desc, setDesc] = useState(props.description);
  const [vacancy, setVacancy] = useState(props.vacancy);
  const [url, setUrl] = useState(props.url);
  
  return (
    <div className="bg-slate-100 rounded-xl p-8 dark:bg-dark">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-0.5">
          <h2>{title}</h2>

          <img src={url} 
            className="w-24 h-24 rounded-full"
            alt="POST"
            width="150"
            height="192"/>
        </div>
        <div className="col-span-1">
          <div className="pt-6 space-y-4">
            <blockquote>
              <p className="text-lg" style={{ color: "red" }}>
                {desc}
              </p>
            </blockquote>
            <figcaption>
              <div>{role}</div>
              <div>{vacancy}</div>
            </figcaption>
          </div>
        </div>
        <div className="col-span-1">
          <button
            type="button"
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => <Apply id={id} />}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
