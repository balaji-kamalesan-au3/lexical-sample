import { useEffect, useState } from "react"
import { AiFillMinusCircle,AiOutlinePlusCircle } from "react-icons/ai";

export default function ImageModelComponent( props:any) {
    const [imageSize,setImageSize] = useState(0)
    const [imageSrc,setImageSrc] = useState("")
    const [id,setId] = useState(props.id);

    function addnewImage(){
        if(imageSize <= 0 ||imageSrc.length < 1 ){
            alert("Add Correct Image Details");
            return;
        }
        props.addImage({size: `${imageSize}px`,src:imageSrc})
    }

    useEffect(() => console.log(id),[id]);
    return(
        <div className="inputs">
            <div className="item">
             <label> Enter Image Size</label>
                <input type="number" value={imageSize} onChange={(event) => setImageSize(Number(event.target.value))} />
            </div>
           <div className="item">
            <label> Enter Image Src</label>
            <input type="string" value={imageSrc} onChange={(event) => setImageSrc(event.target.value)} />
           </div>
            <div className="item">
                
            <button onClick={() => props.removeImage(id)} className="btn"><AiFillMinusCircle /></button>
            <button onClick={() => addnewImage() } className="btn"><AiOutlinePlusCircle /></button>
            </div>
            
        </div>
    )
}