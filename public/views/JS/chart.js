const socket1 = io();
console.log('inside chart js')
socket1.emit('chartWindow','sent');
var yes=0;
var no=0;
var question="None";
socket1.on('sentToChart',details=>{
    console.log(details.countNo,details.countYes);
    
    question=details.question;
    yes=details.countYes;
    no=details.countNo;
    load(yes,no,question);
});



function load (yes,no,question) {
	var chart = new CanvasJS.Chart("chartContainer",
	{
		theme: "light2",
		title:{
			text: `${question}`
		},		
		data: [
		{       
			type: "pie",
			showInLegend: true,
			toolTipContent: "{y} - #percent %",
			//yValueFormatString: "#,##0,,.## Million",
			legendText: "{indexLabel}",
			dataPoints: [
				{  y: yes, indexLabel: "yes" },
				{  y: no, indexLabel: "no" }
				
			]
		}
		]
	});
	chart.render();
}