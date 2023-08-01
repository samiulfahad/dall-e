
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { preview } from "../assets"
import { FormField, Loader } from "../components";
import { randomImageDescription } from "../utils"


const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", imageDescription: "", photo: "" })
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [generatingImage, setGeneratingImage] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

  }

  const generateImage = () => {

  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = (e) => {
    const imageDescription = randomImageDescription(form.imageDescription)
    setForm({ ...form, imageDescription: imageDescription })
  }

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[22px] mt-4 font-bold text-black">Create</h1>
        <p className="text-[15px] text-gray-700">Create stunning images from text through Dall-E will API offered by OpenAI</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start space-y-4">
          <FormField
            label="Your Name" type="text" name="name"
            placeholder="Enter your name" value={form.name} handleChange={handleChange}
          />

          <FormField
            label="Write Image Description" type="text" name="imageDescription"
            placeholder="A plush toy robot sitting against a yellow wall" value={form.imageDescription} handleChange={handleChange}
            surpriseMe handleSurpriseMe={handleSurpriseMe}

          />

        </div>

        <div className="relative mx-auto bg-gray-50 border border-gray-300 mt-4 text-sm rounded-lg w-60 h-60 p-3 flex justify-center item-center">
          {form.photo ?
            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            : <img src={preview} alt="Preview" className="w-9/12 h-9/12 object-contain opacity-40" />}
          {generatingImage &&
            <div className="absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.5)] z-0">
              <Loader />
            </div>
          }
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center mb-[80px]">
          <button className="button" onClick={generateImage}> {generatingImage ? "Generating Image......" : "Generate"} </button>
          <button className="button"> {sharing ? "Sharing Image......" : "Share with community"} </button>
        </div>


      </form>

    </section>

  )
}


export default CreatePost