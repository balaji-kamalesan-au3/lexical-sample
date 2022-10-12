import {$insertNodes, COMMAND_PRIORITY_EDITOR, createCommand, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from "react";
import { $createCarouseNode, Carousel, IImage } from "../Nodes/CarouselNode";
import ImageModelComponent from "../Components/ImageModelComponent";
import { FaImage } from "react-icons/fa";
import { AiFillPlusCircle,AiOutlineBold,AiOutlineItalic,AiOutlineAlignCenter,AiOutlineUndo,AiOutlineRedo } from "react-icons/ai";
import './carouselStyles.css'

export const INSERT_CAROUSEL_COMMAND = createCommand();

export default function CarouselPlugin(){

    const [editor] = useLexicalComposerContext();
    const [imageSize,setImageSize] = useState(0)
    const [imageSrc,setImageSrc]  = useState([]);
    const [imageComponent,setImageComponent] = useState([])
    
    useEffect(() => {
        if(!editor.hasNodes([Carousel])){
            throw new Error("No Image Node Registered")
        }
        return editor.registerCommand(INSERT_CAROUSEL_COMMAND,(payload :IImage[]) => {

            const carouselNode = $createCarouseNode(payload);
            editor.update(() => {
                $insertNodes([carouselNode]);
            })
            return true;
            },COMMAND_PRIORITY_EDITOR)
    },[editor]);

    useEffect(() => addImageComponent(),[imageSize]);

    function addImage(){
    
        setImageSize((imageSize) => imageSize+1);

    }

    function addImageToArray(newArray:{src:string,size:string}){
        setImageSrc([...imageSrc,newArray])
    }

    function removeImage(id:number){
        const newSrc = [...imageSrc];
        const imgncomp = [...imageComponent];

        newSrc.splice(id,1);
        setImageSrc(newSrc);

        imgncomp.splice(id,1);
        setImageComponent(imgncomp);
        setImageSize((imageSize) => imageSize-1);

    }
    function addImageComponent(){
        const newImgComp = [...imageComponent];
        for(let i=0;i<imageSize;i++){
            newImgComp.push(<ImageModelComponent addImage = {addImageToArray} id={imageSize} removeImage={removeImage}  />);
            setImageComponent(newImgComp);
        }
    }

    function createnewCarouselNode(){
        editor.dispatchCommand(INSERT_CAROUSEL_COMMAND,imageSrc);
        
    }

    function returnull(){
        return;
    }
    return (
    <div className="imageInputContainer">
       
        <div className="imageButtonContainer">
        <button
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND,returnull());
        }}
        className="btn"
        aria-label="Undo"
      >
        <AiOutlineUndo />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND,returnull());
        }}
        className="btn"
        aria-label="Redo"
      ><AiOutlineRedo /></button>
            <button onClick={() => {editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");}} className="btnText">
                <AiOutlineBold />
            </button> 

            <button onClick={() => {editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");}} className="btnText">
                <AiOutlineItalic />
            </button>
            
            <button onClick={() => {editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");}} className="btn">
                 <AiOutlineAlignCenter />
            </button>
            <button onClick={addImage} className="btn"><AiFillPlusCircle /> </button>
            <button onClick={() => createnewCarouselNode()} className="btn"><FaImage /> </button>
           
        </div>
        <div className="imageInputs">
            {imageSize > 0 && imageComponent.map(elem => elem)}
        </div>
    </div>
    );
}