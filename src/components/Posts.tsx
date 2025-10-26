import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";

import type { Post } from "../type";
import Form from "./Form";

const Posts = () => {
  console.log("post rendering");
  const [data, setData] = useState<Post[]>([]);
  const [updateDataApi, setUpdateDataApi] = useState<Post | null>(null);
  useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await getPost();
        // console.log(res.data);
        setData(res.data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Unknown Error", err);
        }
      }
    };
    getPostData();
  }, []);

  const handleDeletePost = async (id: number) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const updatedPosts = data.filter((curr) => curr.id !== id);
        setData(updatedPosts);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdatePost = (cur: Post) => setUpdateDataApi(cur);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((curr) => {
            const { id, body, title } = curr;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdatePost(curr)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Posts;
