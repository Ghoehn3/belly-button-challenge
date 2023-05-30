let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
  console.log("Data: ", data);
  createchart(data, data.names[0]); 
  createMetadata(data, data.names[0]);
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
  });
}

