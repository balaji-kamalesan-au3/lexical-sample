import { DecoratorNode, EditorConfig } from "lexical";
import SimpleSlider from "../Components/ReactSlick";

export interface IImage{
    src : string,
    size : string
}



export class Carousel extends DecoratorNode<IImage[]>{
    __images : IImage[];


    constructor(payload:IImage[]){
        super();
        this.__images= payload;
    }

    static getType(): string {
        return 'image';
    }

    static clone(data : IImage[]):Carousel{
        return new Carousel(data);
    }

    createDOM(): HTMLElement {
        console.log("Dom Created")
        return document.createElement('div');
    }

    updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
        return true;
    }
    //@ts-ignore
    decorate(){
        if(this.__images.length === 1 ){
            return <div className="slickComponent"><img src={this.__images[0].src} width={this.__images[0].size} alt="editorimage"/></div>
        }
        return <SimpleSlider data1= {this.__images} />
    }
}

export function $createCarouseNode(payload:IImage[]):Carousel{
    return new Carousel(payload);
}