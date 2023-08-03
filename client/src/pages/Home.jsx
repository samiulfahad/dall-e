import { useState, useEffect } from "react";
import axios from "axios";
import { Loader, FormField, Posts } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  const url = "https://dall-e-j56l.onrender.com"
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await axios.get(url + "/api/v1/post/all")
      const posts = response.data.posts.reverse()
      setPosts(posts)
      { posts.length === 0 && <p className="text-center mt-4 text-lg font-bold">No Post yet</p> }
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleSearch = e => {
    setLoading(true)
    clearTimeout(searchTimeout)
    setSearch(old => e.target.value.trim())
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = posts.filter(post => post.name.toLowerCase().includes(search.toLowerCase()) || post.imageDescription.toLowerCase().includes(search.toLowerCase()))
        setSearchResult(searchResult)
        setLoading(false)
      }, 500)
    )
    console.log(searchResult);
  }

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[25px] mt-4 text-black">DALL-E API by OpenAI</h1>
        <p className="text-[15px] text-gray-700">Generate image from descriptive text, powered by OpenAI</p>
      </div>
      <FormField type="text" name="search" value={search} placeholder="Search post......." handleChange={handleSearch} />

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader />
        </div>
      ) : (
        <>
          {search &&
            <p className="text-[15x] mx-auto w-full text-center text-black">
              {search && searchResult.length === 0 && <p className="text-center mt-4 text-lg font-bold">Nothing found by this search</p>}
              Showing {searchResult.length} search result for <span className="font-bold text-gray-800 italic">{search}</span>
            </p>
          }
          {/* grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 */}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 mt-6">
            {search ? <Posts list={searchResult} /> : <Posts list={posts} />}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
