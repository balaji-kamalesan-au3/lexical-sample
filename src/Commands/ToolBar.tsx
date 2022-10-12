import React from "react";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from "lexical";
import { AiOutlineBold,AiOutlineItalic } from "react-icons/ai";

export default function ToolBar (){
        const [editor] = useLexicalComposerContext();
        return(
            <>
                <div className="toolbarmain">
                    <button onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }} className="btnText"><AiOutlineBold /></button> 
                    <button onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }} className="btnText"><AiOutlineItalic /></button>
                </div>
            </>
        )
    
}