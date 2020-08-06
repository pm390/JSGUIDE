let mem3 = new Memory("codeExample3",CELLSIZE*4,CELLSIZE*5);
mem3.Draw(4,1);
let flow3= new CodeExecutionTable("tableExample3",["let totale=10;"]);
let exp3=new CodeExplanation("tableExplanation3",
    ["l'interprete salva in memoria il numero 10",
    "l'interprete crea la cella di memoria con nome totale",
    "l'interprete collega la variabile alla cella di memoria contenente il numero 10"]
);

function* moveOn()
{
    mem3.AddVariableInMemory("number",10);
    flow3.Begin();
    exp3.Begin();
    yield 1;
    mem3.AddVariable("totale");
    exp3.toNextLine();
    yield 1;
    mem3.link(0,0,true);
    exp3.toNextLine();
    
}

let move3= moveOn();

function next3()
{
    let a=move3.next().value;
    if(!a)
    {
        $('#button3').prop('disabled', true);
    }
}

$("#button3").click(next3);