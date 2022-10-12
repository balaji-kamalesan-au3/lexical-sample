import { DecoratorNode} from "lexical"; 

export interface IImageNode{
    src : string;
    size : string;
}

export class ImageNode extends DecoratorNode<ImageNode>{

    __src : string;
    __size : string
    constructor(data:IImageNode){
        super();
        this.__src = data.src;
        this.__size = data.size?data.size : "100px";
    }

    static getType(): string {
        return 'image';
    }

    static clone(data : IImageNode):ImageNode{
        return new ImageNode(data);
    }

    createDOM(): HTMLElement {
        console.log("Dom Created")
        return document.createElement('div');
    }
    //@ts-ignore
    decorate(){
        return <img src={this.__src} width={this.__size} />
    }
}

export function $createImageNode({src,size}:IImageNode):ImageNode{
    console.log("Executed");
    return new ImageNode({src,size});
}