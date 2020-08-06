let mem2 = new Memory("codeExample2",CELLSIZE*4,CELLSIZE*5);
mem2.Draw(4,1);
let flow2= new CodeExecutionTable("tableExample2",["let totale=10;"]);
let exp2=new CodeExplanation("tableExplanation2",
    ["l'interprete salva in memoria il numero 10",
    "l'interprete crea la cella di memoria con nome totale",
    "l'interprete collega la variabile alla cella di memoria contenente il numero 10"]
);

function* moveOn()
{
    mem2.AddVariableInMemory("number",10);
    flow2.Begin();
    exp2.Begin();
    yield 1;
    mem2.AddVariable("totale");
    exp2.toNextLine();
    yield 1;
    mem2.link(0,0,false);
    exp2.toNextLine();
    
}

let move2= moveOn();

function next2()
{
    let a=move2.next().value;
    if(!a)
    {
        $('#button2').prop('disabled', true);
    }
}

$("#button2").click(next2);