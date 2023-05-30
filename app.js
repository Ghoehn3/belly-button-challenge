const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
  console.log("Data: ", data);
  createchart(data, data.names[0]); 
  createMetadata(data, data.names[0]);
  createchart2(data, data.names[0]);
  //create dropdown menu
  for (let i = 0; i < data.names.length; i++) {
    var opt = data.names[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    var select = document.getElementById("selDataset");
    select.appendChild(el);
  }
});

//create chart
function createchart(data, id) {
  let samples = data.samples.filter(sample => sample.id == id)[0];
  let otu_ids = samples.otu_ids;
  let otu_labels = samples.otu_labels;
  let sample_values = samples.sample_values;
  let barData = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    type: "bar",
    orientation: "h"
  }];
  let barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };
  Plotly.newPlot("bar", barData, barLayout);

  //create bubble chart
  let bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
    }
  }];
  let bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
    margin: { t: 30}
  };
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}

//create metadata
function createMetadata(data, id) {
  let metadata = data.metadata.filter(sample => sample.id == id)[0];
  let panel = d3.select("#sample-metadata");
  panel.html("");
  Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
}


//create event handler
function optionChanged(id) {
  d3.json(url).then(function(data) {
    createchart(data, id);
    createMetadata(data, id);
    createchart2(data, id);
  });
}

function createchart2(data, id) {
  let metadata = data.metadata.filter(sample => sample.id == id)[0];
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

