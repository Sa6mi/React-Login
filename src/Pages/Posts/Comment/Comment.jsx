import { useEffect, useState } from "react";
import {
  getComments,
  getFullName,
  getPostByid,
  getSavedUser,
} from "../../../Utils/UserFunctions";
import Card from "../../../Components/Card/Card";
import { useParams } from "react-router-dom";
import "./Comment.css";
function Comment(props) {
  const [post, setPost] = useState({
    id: "",
    body: "",
    tags: [],
    comments: [],
    title: "",
  });
  var postid = useParams().id;
  useEffect(() => {
    getPostByid(postid)
      .then((res) => {
        setPost({
          id: res.id,
          body: res.body,
          tags: res.tags,
          comments: [],
          title: res.title,
        });
      })
      .then(() => {
        getComments(postid).then((res) => {
          // console.log(res);
          setPost((prevstate) => ({
            ...prevstate,
            comments:[...res] ,
          }));
        });
      });
  }, []);
  return (
    <div className="postsWrapper">
      <div className="postid" key={post.id}>
        <Card className="WrapEverything">
          <div className="Post">
            <div className="Avatar">
              <img src={getSavedUser().image}></img>
            </div>
            <div className="postColumn">
              <div className="Info">
                <div className="FullName">
                  {getSavedUser().firstName} {getSavedUser().lastName}
                </div>
                <div className="UserName">
                  <p>@{getSavedUser().username}</p>
                </div>
              </div>
              <div className="Post-title">{post.title}</div>
              <div className="Post-Content">{post.body}</div>
              <div className="Fotter">
                <div className="Comments">
                  <div className="CommentButton" id="Active">
                    Comments
                  </div>
                </div>
                <div className="Tags">
                  {post.tags.map((tag) => {
                    return (
                      <div className="Tag" key={tag}>
                        #{tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="Comments-wrapper">
            {post.comments.map((comment) => {
              // console.log(comment);
              return (
                <div className="Comment" key={comment.id}>
                  <div className="Avatar">
                    <img src={comment.user.image}></img>
                  </div>
                  <div className="Comment-Column">
                    <div className="Info">
                      <div className="FullName">{comment.user.firstName} {comment.user.lastName}</div>
                      <div className="UserName">@{comment.user.username}</div>
                    </div>
                    <div className="Comment-Content">{comment.body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      {/* <button onClick={() => console.log(post)}>Log</button> */}
    </div>
  );
}

export default Comment;
