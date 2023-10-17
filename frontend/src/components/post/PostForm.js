import Card from "./Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [title, setTitle] = useState();
  const [role, setRole] = useState();
  const [description, setDescription] = useState();
  const [vacancy, setVacancy] = useState();
  //
  const [image, setImage] = useState();
  const [url, setUrl] = useState();

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
      })
      .catch((err) => console.log(err));

    console.log(url);
  };

  const storePost = async () => {
    // Image Upload
    await storeImage();

    // setIsLoading(true);
    //
    const BASE_URI = process.env.REACT_APP_API_URL;

    try {
      let result = await fetch(`${BASE_URI}/company/post/add-post`, {
        method: "post",
        body: JSON.stringify({ title, role, vacancy, description, url }),
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

    // setIsLoading(false);

    // Store In Browser Local Storage
    // localStorage.setItem("user", JSON.stringify(result));
  };

  return (
    <center>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(t) => setTitle(t.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="role"
            >
              Role
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              type="text"
              placeholder="Role"
              value={role}
              onChange={(r) => setRole(r.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="vacancy"
            >
              Vacancy
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vacancy"
              type="text"
              placeholder="Vacancy"
              value={vacancy}
              onChange={(v) => setVacancy(v.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="image"
            >
              Post Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(d) => setDescription(d.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={storePost}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </center>
  );
}
