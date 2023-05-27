import Comments from "./comments/Comment"

const CommemtsList = ({editComment, checkParent, deleteCommentFirst, comments,  userPhoto}) => {

   return(
      <>
         {comments.length !== 0 && comments.map((comment, index) => 
            <Comments editComment={editComment} checkParent={checkParent} key={comment._id} deleteCommentFirst={deleteCommentFirst} comment={comment} userPhoto={userPhoto}/>) }
      </>
   )
}

export default CommemtsList