import Card from "./Card"


const Posts = (props) => {
    let postList
    if (props.list.length === 0) {
        postList =  <div className="flex justify-center items-center mx-auto w-full h-full"> <p className="text-xl text-center text-black">{props.emptyMsg}</p> </div>
    } else {
        postList = props.list.map( post => <Card key={post._id} _id={post._id} name={post.name} description={post.imageDescription} imageUrl={post.imageUrl} />)
    }
    return (<>{postList}</>)
}

export default Posts