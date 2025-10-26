import React, { useEffect, useState } from "react";
import type { Post } from "../type";
import { postData, updateData } from "../api/PostApi";

type FormProps<T> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  updateDataApi: T | null;
  setUpdateDataApi: React.Dispatch<React.SetStateAction<T | null>>;
};

const Form = ({
  data,
  setData,
  updateDataApi,
  setUpdateDataApi,
}: FormProps<Post>) => {
  console.log("Form Rendering");
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = updateDataApi === null ? true : false;

  useEffect(() => {
    console.log("effect");
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddData({
      ...addData,
      [name]: value,
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    // console.log(res);
    if (res.status === 201) {
      // console.log(res.data);
      res.data.userId = res.data.id;
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    } else {
      console.log("Failed to add post", res.status);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi!.id, addData);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curr) => {
            return curr.id === res.data.id ? res.data : curr;
          });
        });
        setAddData({ title: "", body: "" });
        setUpdateDataApi(null);
      } else {
        console.log("Failed to update post", res.status);
      }
    } catch (err) {
      console.log("Failed to update post");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const action = btn?.value;
    action === "Add" ? addPostData() : updatePostData();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default React.memo(Form);
