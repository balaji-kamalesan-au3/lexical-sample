import { useEffect, useState } from "react"
import { AiFillMinusCircle,AiOutlinePlusCircle } from "react-icons/ai";

export default function ImageModelComponent( props:any) {
    const [imageSize,setImageSize] = useState(150)
    const [imageSrc,setImageSrc] = useState("")
    const [id,setId] = useState(props.id);

    function addnewImage(){
        const imageS = parseInt(String(imageSize));
        console.log(imageS)
        if(imageS<= 149 ||imageSrc.length < 1   || Number.isNaN(imageS)){
            alert("Add Correct Image Details");
            return;
        }
        props.addImage({size: `${imageS}px`,src:imageSrc})
    }

    useEffect(() => console.log(id),[id]);
    return(
        <div className="inputs">
            <div className="item">
             <label> Enter Image Size</label>
                <input type="number" min = "100" value={imageSize} onChange={(event) => setImageSize(Number(event.target.value))} />
            </div>
           <div className="item">
            <label> Enter Image Src</label>
            <input type="string" value={imageSrc} onChange={(event) => setImageSrc(event.target.value)} />
           </div>
            <div className="item">
            <button onClick={() => addnewImage() } className="btn"><AiOutlinePlusCircle /></button>
            </div>
            
        </div>
    )
}