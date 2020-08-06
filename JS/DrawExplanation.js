class CodeExplanation
{
    constructor(id,explanations)
    {
        this.inst=explanations;
        this.length=explanations.length;
        this.table=$("#"+id);
        this.addRow(this.length,explanations);
        this.focusedLine=-1;
        this.length=explanations.length;
    }

    addRow(amount,explanations)
    {
        for(let i=0;i<amount;++i)
        {
            this.table.append("<tr><td>---------</td><td>"+ explanations[i] +"</td></tr>");
        }
    }

    moveFocusedLine(newFocused)
    {
        let data=this.table.find("td");
        if(this.focusedLine!=-1)
        {
            let OldArrowCell=data[this.focusedLine*2];
            let OldContentCell=data[this.focusedLine*2+1];
            OldArrowCell.innerHTML="---------";
            $(OldContentCell).removeClass("focused");
        }
        this.focusedLine=newFocused;
        let ArrowCell=data[this.focusedLine*2];
        let ContentCell=data[this.focusedLine*2+1];
        ArrowCell.innerHTML=">>>>>";
        $(ContentCell).addClass("focused");
    }

    toNextLine()
    {
        if(this.focusedLine==(this.length-1)) 
        {
            End();
            return;
        }
        this.moveFocusedLine(this.focusedLine+1);
    }

    Begin()
    {
        this.moveFocusedLine(0);
    }

    End()
    {
        let data=this.table.find("td");
        let ArrowCell=data[this.focusedLine*2];
        let ContentCell=data[this.focusedLine*2+1];
        ArrowCell.innerHTML="---------";
        $(ContentCell).removeClass("focused");
    }
}