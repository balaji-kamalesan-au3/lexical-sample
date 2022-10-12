import {$insertNodes, COMMAND_PRIORITY_EDITOR, createCommand, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from "react";
import { $createCarouseNode, Carousel, IImage } from "../Nodes/CarouselNode";
import ImageModelComponent from "../Components/ImageModelComponent";
import { FaImage } from "react-icons/fa";
import { AiFillPlusCircle,AiOutlineBold,AiOutlineItalic,AiOutlineAlignCenter,AiOutlineUndo,AiOutlineRedo,AiFillMinusCircle } from "react-icons/ai";
import './carouselStyles.css'

export const INSERT_CAROUSEL_COMMAND = createCommand();

export default function CarouselPlugin(){

    const [editor] = useLexicalComposerContext();
    const [imageAdd,setImageAdd] = useState(false)
    const [imageSrc,setImageSrc]  = useState([]);

    
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

    useEffect(() => console.log(imageSrc),[imageSrc])

    function addImage(){    
        setImageAdd(!imageAdd);
    }

    function addImageToArray(newArray:{src:string,size:string}){
        setImageSrc([...imageSrc,newArray])
    }

    function removeImage(id:number){
        const newSrc = [...imageSrc];
        newSrc.splice(id,1);
        setImageSrc(newSrc);

    }
    function createnewCarouselNode(){
        console.log(imageSrc);
        if(imageSrc.length >= 1) {
            editor.dispatchCommand(INSERT_CAROUSEL_COMMAND,imageSrc);
        }
        else {
            alert("Please Insert 1 Image Atleast")
        }
        
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
            <button onClick={() => addImage()} className="btn"><AiFillPlusCircle /> </button>
            <button onClick={() => createnewCarouselNode()} className="btn"><FaImage /> </button>
           
        </div>
        <div className="imageInputs">
            {imageAdd && <ImageModelComponent addImage = {addImageToArray} id={1} removeImage={removeImage}  />}
            <div>
                {imageSrc.map((img,index )=> 
                <div>{index+1}. {img.src} 
                    <button onClick={() => removeImage(index) } className="btn"><AiFillMinusCircle /></button> 
                </div>)
                }
            </div>
        </div>
    </div>
    );
}