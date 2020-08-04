const CELLSIZE=20;
const INCREASE=10;
const FONT="18px Arial";
const VERTICALOFFSET=6;
const ORIZZONTALOFFSET=10;
class Memory
{
    constructor(id,height,width)
    {
        this.JCanvas=$("#"+id);

        if(width<4*CELLSIZE)
        {
            width=4*CELLSIZE;
        }
        if(height%CELLSIZE!=0)
        {
            height=height+CELLSIZE-height%CELLSIZE;
        }
        this.JCanvas.prop('width', width).prop('height',height);
        this.width=width;
        this.height=height;
        this.leftSide=width/4;
        this.rightSide=width*3/4;
    }

    Draw(memCells,variablesCells)
    {
        this.ctx=this.JCanvas[0].getContext('2d');
        this.ctx.clearRect(0,0,this.width,this.height);

        let maxSize=Math.max(memCells,variablesCells);
        let minCellSize=this.height/maxSize;

        if(minCellSize<CELLSIZE)
        {
            this.JCanvas.prop('height',maxSize*CELLSIZE);
            this.height=maxSize*CELLSIZE;
        }

        //uncomment for equal spacing
        //let memSpacing=(this.height-memCells*CellSize)/(memCells+1);
        this.memSpacing=0;
        this.varSpacing=(this.height-variablesCells*CELLSIZE)/(variablesCells+1);
        

        for(let i=0;i<variablesCells;++i)
        {
            this.ctx.beginPath();
            this.ctx.rect(this.leftSide-(CELLSIZE/2),(CELLSIZE+this.varSpacing)*i+this.varSpacing,CELLSIZE,CELLSIZE);
            this.ctx.stroke();
        }

        //for(let i=0;i<memCells;++i)
        
        this.memCount=this.height/CELLSIZE;
        for(let i=0;i<this.memCount;++i)
        {
            this.ctx.beginPath();
            this.ctx.rect(this.rightSide-(CELLSIZE/2),(CELLSIZE+this.memSpacing)*i+this.memSpacing,CELLSIZE,CELLSIZE);
            this.ctx.stroke();
        }
        this.varCount=variablesCells;
        this.lastUsedCell=0;
        this.MemContent=[];
        this.VarContent=[];
        this.Links=[];
    }

    REDO()
    {

        this.ctx.clearRect(0,0,this.width,this.height);

        let maxSize=Math.max(this.memCount,this.varCount);
        let minCellSize=this.height/maxSize;

        if(minCellSize<CELLSIZE)
        {
            this.JCanvas.prop('height',maxSize*CELLSIZE);
            this.height=maxSize*CELLSIZE;
        }

        //uncomment for equal spacing
        //let memSpacing=(this.height-memCells*CellSize)/(memCells+1);
        this.memSpacing=0;
        this.varSpacing=(this.height-this.varCount*CELLSIZE)/(this.varCount+1);
        

        for(let i=0;i<this.varCount;++i)
        {
            this.ctx.beginPath();
            this.ctx.rect(this.leftSide-(CELLSIZE/2),(CELLSIZE+this.varSpacing)*i+this.varSpacing,CELLSIZE,CELLSIZE);
            this.ctx.stroke();
        }

        //for(let i=0;i<memCells;++i)
        
        this.memCount=this.height/CELLSIZE;
        for(let i=0;i<this.memCount;++i)
        {
            this.ctx.beginPath();
            this.ctx.rect(this.rightSide-(CELLSIZE/2),(CELLSIZE+this.memSpacing)*i+this.memSpacing,CELLSIZE,CELLSIZE);
            this.ctx.stroke();
        }
    }

    AddVariableInMemory(type,actualVariable)
    {
        switch(type)
        {
            case "string":
                for(let i=0;i<actualVariable.length;++i)
                {
                    this.MemContent[this.lastUsedCell++]=actualVariable[i];
                }
            break;
            
            case "number":
                this.MemContent[this.lastUsedCell++]=actualVariable;
            break;

            case "boolean":
                this.MemContent[this.lastUsedCell++]=(actualVariable)?"T":"F";
            break;
            
            case "array":
                for(let i=0;i<actualVariable.length;++i)
                {
                    this.MemContent[this.lastUsedCell++]=actualVariable[i];
                }
            break;
            
            default:
                alert("pm390 says : there is an error");
            break;
        }
        if(this.lastUsedCell>this.memCount)
        {
            this.MemContent=this.lastUsedCell+INCREASE;
        }
        this.UpdateCanvasContent();
    }

    AddVariable(name)
    {
        this.VarContent[this.VarContent.length]=name;
        this.UpdateCanvasContent();
    }

    GetCurrentIndexes()
    {
        let couple=[];
        couple[0]=this.VarContent.length;
        couple[1]=this.MemContent.length;
        return couple;
    }

    UpdateCanvasContent()
    {
        this.REDO();
        this.ctx.font=FONT;
        this.ctx.textAlign = "center";
        for(let i=0;i<this.VarContent.length;++i)
        {
            this.ctx.fillText(this.VarContent[i]
                ,this.leftSide-(CELLSIZE/2)+ORIZZONTALOFFSET
                ,(CELLSIZE+this.varSpacing)*i+this.varSpacing+CELLSIZE/2+VERTICALOFFSET
                );
        }

        for(let i=0;i<this.MemContent.length;++i)
        {
            let content=this.MemContent[i];
            this.ctx.fillText(content
                ,this.rightSide-(CELLSIZE/2)+ORIZZONTALOFFSET
                ,(CELLSIZE+this.memSpacing)*i+this.memSpacing+CELLSIZE/2+VERTICALOFFSET
                );
        }
    
        for(let i=0;i<this.Links.length;++i)
        {
            this.ctx.beginPath();

            this.ctx.moveTo(this.leftSide+(CELLSIZE/2)
                , (CELLSIZE+this.varSpacing)*this.Links[i][0]+this.varSpacing+CELLSIZE/2);

            this.ctx.lineTo(this.rightSide-(CELLSIZE/2)
                , (CELLSIZE+this.memSpacing)*this.Links[i][1]+this.memSpacing+CELLSIZE/2);

            this.ctx.stroke();
        }
    }

    link(VarIndex,MemIndex)
    {
        this.Links[this.Links.length]=[VarIndex,MemIndex];
        this.UpdateCanvasContent();
    }

    unlink(VarIndex)
    {
        this.Links=this.Links.filter(
            function(value, index, arr)
            {
                return value[0]!=VarIndex;
            }
        )
        this.UpdateCanvasContent();
    }
    
    getVariableLocation(varName)
    {
        for(let i=0;i<this.VarContent.length;++i)
        {
            if(varName==this.VarContent[i])
            {
                return i;
            }
        }
        return -1;
    }

    getVariableLocationInMemory(varPlace)
    {
        for(let i=0;i<this.Links.length;++i)
        {
            if(this.Links[i][0]==varPlace)
            {
                return this.Links[i][1];
            }
        }
        return -1;
    }
}