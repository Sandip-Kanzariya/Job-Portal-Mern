import React from "react";

const CmpPost = () => {
  const [postList, setPostList] = useState([]);

  const BASE_URI = process.env.REACT_APP_API_URL;

  const getPosts = async () => {
    try {
      let result = await fetch(`${BASE_URI}/company/post/my-posts`, {
        method: "get",
        
      });
      
      result = await result.json();

      setPostList(result);
    } catch (err) {}
  };
  return <div></div>;
};

export default CmpPost;
