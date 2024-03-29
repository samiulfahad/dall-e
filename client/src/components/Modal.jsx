import { Fragment } from "react"

const Modal = props => {

    return (
        <Fragment>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-lg z-20 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center pb-16  w-2/3 md:w-1/3 h-1/3 -mt-20 mx-auto bg-white px-10 py-4 rounded-md">
                    <p className="py-10 text-xl font-bold text-center">{props.message}</p>
                    <button onClick={props.onClose} className="button">Close</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Modal