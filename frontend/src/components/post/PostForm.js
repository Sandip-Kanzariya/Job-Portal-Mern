import Card from "./Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PostForm() {
  const [postData, setPostData] = useState({});
  const [isError, setIsError] = useState("");

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.id]: e.target.value.trim() });
  };

  //
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  //
  const companyAuth = localStorage.getItem("company");

  let company;
  if (companyAuth) {
    company = JSON.parse(companyAuth)._id;
  }

  const navigate = useNavigate();

  const storeImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", `${process.env.REACT_APP_PRESET}`);
    formData.append("cloud_name", `${process.env.REACT_APP_CLOUD}`);

    fetch(`${process.env.REACT_APP_CLOUD_API}`, {
      method: "post",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((d) => {
        setUrl(d.url);
        console.log("URL : " + url);
      })
      .catch((err) => console.log(err));
  };

  const handleImage = async (e) => {
    setImage(e.target.files[0]);

    await storeImage();
  };

  const storePost = async () => {
    // Image Upload
    await storeImage();

    setIsError("");
    if (
      !url ||
      !postData["title"] ||
      !postData["role"] ||
      !postData["vacancy"] ||
      !postData["description"]
    ) {
      setIsError("");
      return;
    }

    // setIsLoading(true);
    //
    const BASE_URI = process.env.REACT_APP_API_URL;

    try {
      let result = await fetch(`${BASE_URI}/company/post/add-post`, {
        method: "post",
        body: JSON.stringify({
          ...postData,
          url,
          company,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      if (result) {
        navigate("/");
      }
    } catch (err) {
      console.log();
    }
  };

  useEffect(() => {
    const companyAuth = localStorage.getItem("company");

    if (!companyAuth) {
      navigate("/company");
    }
  });

  return (
    <section className="">
      <div className="items-center justify-center bg-white px-4 py-4 sm:px-6 sm:py-10 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-2xl font-bold leading-tight text-black">
            Write Post
          </h2>

          <form action="#" method="POST" className="mt-2">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="image"
                  className="text-base font-medium text-gray-900"
                >
                  Post Image{" "}
                </label>
                {!url && <span className="text-red-500"> * </span>}

                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="image"
                    type="file"
                    onChange={handleImage}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Title{" "}
                </label>{" "}
                {!postData["title"] && (
                  <span className="text-red-500"> * </span>
                )}
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="title"
                    type="text"
                    placeholder="Title"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Role{" "}
                </label>
                {!postData["role"] && <span className="text-red-500"> * </span>}

                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="role"
                    type="text"
                    placeholder="Role"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Vacancy{" "}
                </label>
                {!postData["vacancy"] && (
                  <span className="text-red-500"> * </span>
                )}

                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="vacancy"
                    type="number"
                    placeholder="Vacancy"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Description{" "}
                </label>
                {!postData["description"] && (
                  <span className="text-red-500"> * </span>
                )}

                <div className="mt-2">
                  <textarea
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="description"
                    placeholder="Description"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={storePost}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Post <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
