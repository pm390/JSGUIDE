var mem = new Memory("MemoryCanvas",300,300);
mem.Draw(7,6);
mem.AddVariableInMemory("number",10);
mem.AddVariableInMemory("string","ciao");
mem.AddVariableInMemory("boolean",true);
mem.AddVariableInMemory("array",["a","b"]);
mem.AddVariable("A");
mem.AddVariable("B");
mem.link(1,4);
mem.unlink(1);

var Execution= new CodeExecutionTable("EXECUTIONTABLE",["var A=10;","var B='ciao'"]);
Execution.Begin();
Execution.moveFocusedLine(1);