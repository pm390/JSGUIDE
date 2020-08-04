
class CodeExecutionTable
{
    constructor(id,instructions)
    {
        this.inst=instructions;
        this.length=instructions.length;
        this.table=$("#"+id);
        this.addRow(this.length,instructions);
        this.focusedLine=-1;
    }

    addRow(amount,instrcutions)
    {
        for(let i=0;i<amount;++i)
        {
            this.table.append("<tr><td>---------</td><td>"+ instrcutions[i] +"</td></tr>");
        }
    }

    moveFocus(newFocused)
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

    Begin()
    {
        this.moveFocus(0);
    }

}



