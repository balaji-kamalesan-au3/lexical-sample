import React  from "react";
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, LexicalEditor } from "lexical";
import './EditorMain.css'
import { Carousel } from "../../Nodes/CarouselNode";
import CarouselPlugin from "../../Commands/CarouselCommand";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import Heading from "../Heading";


export default class EditorMain extends React.Component{

    editorOnChange(editorState:EditorState,editor:LexicalEditor){
        console.log(editor);

    }   
    render(): React.ReactNode {
        const editorConfig = {
            namespace : "New Editor",
            theme :{},
            onError : function(){console.log()},
            nodes : [
                Carousel
            ]
        }
        return(
            <LexicalComposer initialConfig={editorConfig}>
                <Heading />
                <RichTextPlugin contentEditable={<ContentEditable className="content-editable" />} placeholder="" />
                <OnChangePlugin onChange={this.editorOnChange} />  
                <HistoryPlugin />        
                <CarouselPlugin />
            </LexicalComposer>

        )
    }
}