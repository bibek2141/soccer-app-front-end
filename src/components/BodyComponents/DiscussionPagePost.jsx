import React from "react";

const DiscussionPagePost = (props) => {
  return (
    <>
      {props.data.map((data, key) => (
        <div key={key}>
          <h5 className="pb-2">Discussion</h5>
          <h5 className="text-secondary">
            {data.name} . {data.createdDate}
          </h5>
          <h2>{data.title}</h2>
          <p className="fst-italic">{data.descriptions}</p>
        </div>
      ))}
    </>
  );
};

export default DiscussionPagePost;
