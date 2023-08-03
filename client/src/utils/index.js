import FileSaver from "file-saver"
import { surpriseMePrompts } from "../constants"

export function randomImageDescription (imageDescription) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length - 1)
    const randomDescription = surpriseMePrompts[randomIndex]
    if (randomDescription === imageDescription) randomImageDescription(imageDescription)
    return randomDescription
}

export async function downloadImage (_id, imageUrl) {
    FileSaver.saveAs(imageUrl, `download-${_id}.jpg`)
} 