import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { preview } from "../assets"
import { FormField, Loader } from "../components";
import { randomImageDescription } from "../utils"
import Modal from "../components/modal";


const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", imageDescription: "", image: "", resolution: "mid" })
  const [sharing, setSharing] = useState(false)
  const [generatingImage, setGeneratingImage] = useState(false)
  const [modal, setModal] = useState({ hasError: false, message: "" })

  const shareImage = async (e) => {
    e.preventDefault()
    if (form.image === "") {
      setModal({ hasError: true, message: "Please generate an image first" })
      return
    }
    try {
      if (form.image && form.imageDescription && form.name) {
        setSharing(true)
        const response = await axios.post("https://dall-e-j56l.onrender.com/api/v1/post/add", form)
        if (response.status === 201) {
          navigate("/")
        }
      }
    }
    catch (err) {
      console.log(err);
      setModal({ hasError: true, message: "Something went wrong" })
    }
    finally {
      setSharing(false)
    }

  }

  const generateImage = async (e) => {
    e.preventDefault()
    try {
      if (form.name && form.imageDescription) {
        setGeneratingImage(true)
        const response = await axios.post("https://dall-e-j56l.onrender.com/api/v1/dall-e/generate", {
          imageDescription: form.imageDescription
        })
        setForm({ ...form, image: `data:image/jpeg;base64,${response.data.image}` })

      } else {
        if (form.name.trim() === "") {
          setModal({ hasError: true, message: "Please enter your name" })
        } else {
          setModal({ hasError: true, message: "Please write image description" })
        }
      }
    } catch (e) {
      console.log(e);
      setModal({ hasError: true, message: "Sorry, this request could not be completed" })
    } finally {
      setGeneratingImage(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form);
  }

  const handleExample = (e) => {
    const imageDescription = randomImageDescription(form.imageDescription)
    setForm({ ...form, imageDescription: imageDescription })
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <section>
      {modal.hasError && <Modal onClose={closeModal} message={modal.message} />}
      <form onSubmit={shareImage}>
        <div className="flex flex-col items-start justify-start space-y-4 mt-10">
          <FormField
            label="Your Name" type="text" name="name"
            placeholder="Enter your name" value={form.name} handleChange={handleChange}
          />

          <FormField
            label="Write Image Description" type="text" name="imageDescription"
            placeholder="A plush toy robot sitting against a yellow wall" value={form.imageDescription} handleChange={handleChange}
            example handleExample={handleExample}

          />
          <div className="flex space-x-4 justify-center items-center w-full mx-auto">
            <p className="font-bold text-indigo-500">Resolution: </p>
            <select name="resolution" onChange={handleChange} value={form.resolution} className="outline-none border-2 border-indigo-500 rounded-lg">
              <option value="high">1024x1024</option>
              <option value="mid">512x512</option>
              <option value="low">256x256</option>
            </select>
          </div>

        </div>

        <div className="relative mx-auto bg-gray-50 border border-gray-300 mt-4 text-sm rounded-lg w-60 h-60 p-3 flex justify-center item-center">
          {form.image ?
            <img src={form.image} alt={form.imageDescription} className="w-full h-full object-contain" />
            : <img src={preview} alt="Preview" className="w-9/12 h-9/12 object-contain opacity-40" />}
          {generatingImage &&
            <div className="absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.5)] z-0">
              <Loader />
            </div>
          }
        </div>
        <div className="flex flex-col space-y-4 justify-center items-center mb-[80px]">
          {/* <div className="flex justify-center items-center space-x-4 mt-8">
            <p className="font-bold text-indigo-500">Resolution: </p>
            <select name="resolution" onChange={handleChange} value={form.resolution} className="outline-none border-2 border-indigo-500 rounded-lg">
              <option value="high">1024x1024</option>
              <option value="mid">512x512</option>
              <option value="low">256x256</option>
            </select>
          </div> */}
          {
            !sharing &&
            <button className="button" onClick={generateImage}>
              {generatingImage ? "Generating....." : "Generate Image"}
            </button>
          }
          {
            !generatingImage &&
            <button className="button" onClick={shareImage}> {sharing ?
              <div className="flex justify-center items-center space-x-4">
                <p>Sharing</p>
                <div className="ml-auto inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"> </div>
              </div>
              : "Share with community"}
            </button>
          }
        </div>
      </form>
    </section>
  )
}


export default CreatePost