let mem = new Memory("codeExample1",CELLSIZE*4,CELLSIZE*5);
mem.Draw(4,1);
let flow= new CodeExecutionTable("tableExample1",["let totale;","totale=10;"]);
let exp=new CodeExplanation("tableExplanation1",
    ["l'interprete crea la cella di memoria",
    "l'interprete salva in memoria il numero 10",
    "l'interprete collega la variabile alla cella di memoria contenente il numero 10"]
);

function* moveOn()
{
    mem.AddVariable("totale");
    flow.Begin();
    exp.Begin();
    yield 1;
    mem.AddVariableInMemory("number",10);
    flow.toNextLine();
    exp.toNextLine();
    yield 1;
    mem.link(0,0,false);
    exp.toNextLine();
    
}

let move= moveOn();

function next()
{
    let a=move.next().value;
    if(!a)
    {
        $('#button1').prop('disabled', true);
    }
}

$("#button1").click(next);