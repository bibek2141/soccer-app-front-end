import React from "react";

const PageComments = (props) => {
  return (
    <div className="pb-5 bg-gradient">
      <h6>Comments ({props.data.length})</h6>
      {props.data !== null ? (
        props.data.map((data, key) => (
          <div key={key} className="comments">
            <h5 className="text-secondary commentsAuthor">
              {data.name} ({data.createdDate}):
            </h5>
            <p className="commentsContent">{data.comment}</p>
          </div>
        ))
      ) : (
        <p>Hello</p>
      )}
    </div>
  );
};

export default PageComments;
