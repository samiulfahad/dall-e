import { useState, useEffect } from "react";
import { Card, Loader, FormField } from "../components";

const RenderCards = ({data, notFoundMsg}) =>{
  if(data.length > 0) {
    return data.map(post => {
      <Card key={post._id} {...post} />
    })
  }
  return <h2 className="text-[20px] font-bold text-center mt-8 text-black">{notFoundMsg}</h2>
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[25px] mt-4 text-black">DALL-E API by OpenAI</h1>
        <p className="text-[15px] text-gray-700">Generate image from descriptive text, powered by OpenAI</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {search && 
            <p className="text-[15x] text-black">
              Showing search result for <span className="font-bold text-gray-800 italic">{search}</span>
            </p>
          }
          {/* grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 */}
          <div className="flex justify-center items-center">
            {search ? <RenderCards data={[]} notFoundMsg="No Search Result Found"/> : <RenderCards data={posts} notFoundMsg="No Post found"/>}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
