import { $getSelection, $insertNodes, $isRangeSelection, $isRootNode, COMMAND_PRIORITY_EDITOR, createCommand, FORMAT_TEXT_COMMAND } from "lexical";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from "react";
import { $createImageNode, IImageNode, ImageNode } from "../Nodes/ImageNode";

export const INSERT_IMAGE_COMMAND = createCommand();    

export default function ImagePlugin(){
    const [editor] = useLexicalComposerContext();
    const [imageSize,setImageSize] = useState(100)
    const [imageSrc,setImageSrc] = useState("https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg")
    useEffect(() => {
        if(!editor.hasNodes([ImageNode])){
            throw new Error("No Image Node Registered")
        }
        return editor.registerCommand(INSERT_IMAGE_COMMAND,(payload :IImageNode) => {

            const imageNode = $createImageNode(payload);
            editor.update(() => {
                $insertNodes([imageNode]);
            })
            return true;
            },
            COMMAND_PRIORITY_EDITOR)
    },[editor]);

    function createnewImageNode(){
        const payload = {
            src : imageSrc,
            imageSize : imageSize
        }
        editor.dispatchCommand(INSERT_IMAGE_COMMAND,payload);
    }
    return (
    <>
        <label> Enter Image Size</label>
        <input type="number" onChange={(event) => setImageSize(Number(event.target.value))} />
        <label> Enter Image Src</label>
        <input type="string" onChange={(event) => setImageSrc(event.target.value)} />
        <button onClick={() => createnewImageNode()}>Add Image</button>
    </>
    );
}