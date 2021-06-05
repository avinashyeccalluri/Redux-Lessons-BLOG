import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from "lodash"


// // working with function within function
// function (){
//   function(id){
//     return "print result"
//   }
// }

// +++++++++++++++++++++++++TO ACCESS THE ABOVE INNER FUNCTION++++++++++++++++++++++++++++
// const result = ()=>(id)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++

export const fetchPostsAndUsers =()=> async (dispatch, getState) =>{
  await dispatch(fetchPosts());
  const uniqueID = _.uniq(_.map(getState().posts, "userId"));

  uniqueID.forEach(id => dispatch(fetchUser(id)))
}

export const  fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async(dispatch)  => {

  const response = await jsonPlaceholder.get('/users/'+id);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};




// the function is implemented using the memozing
// export const fetchUser = id =>  dispatch => _fetchUser(id, dispatch);

// // memoize function
// const _fetchUser = _.memoize(async(id, dispatch)=>{
//   const response = await jsonPlaceholder.get('/users/'+id);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
