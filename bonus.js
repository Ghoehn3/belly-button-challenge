
//read in the json file
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    console.log(data);
    //filter the metadata for the object with the desired sample number
    let dataset = d3.select("#selDataset").node().value;
    let metadata = data.metadata.filter(sample => sample.id == dataset)[0];
    console.log(metadata);
    //create chart
    createchart(data, dataset);





//create chart
function createchart(data, id) {
    let dataset = d3.select("#selDataset").node().value;
    let metadata = data.metadata.filter(sample => sample.id == dataset)[0];
    console.log(metadata);
    //read in the wfreq value for the gauge chart

    let wfreq = metadata.wfreq;
    console.log(wfreq);
    //create the gauge chart
    let gaugeData = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
            { range: [0, 1], color: "rgb(255, 255, 217)" },
            { range: [1, 2], color: "rgb(237, 248, 217)" },
            { range: [2, 3], color: "rgb(199, 233, 180)" },
            { range: [3, 4], color: "rgb(127, 205, 187)" },
            { range: [4, 5], color: "rgb(65, 182, 196)" },
            { range: [5, 6], color: "rgb(29, 145, 192)" },
            { range: [6, 7], color: "rgb(34, 94, 168)" },
            { range: [7, 8], color: "rgb(37, 52, 148)" },
            { range: [8, 9], color: "rgb(8, 29, 88)" }
            ]
        }
        }
    ];
    let gaugeLayout = {
        width: 600,
        height: 500,
        margin: { t: 0, b: 0 }
    };
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    };



});

//update the charts when a new sample is selected
function optionChanged() {
    d3.json("samples.json").then(function(data) {
        let dataset = d3.select("#selDataset").node().value;
        createchart(data, dataset);
        createMetadata(data, dataset);
    });
}