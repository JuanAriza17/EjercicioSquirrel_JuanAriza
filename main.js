const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

fetch(url).then(response => response.json()).then(data => {
    let i = 1
    let numTrue = 0;
    let numFalse = 0;
    let truePositive = [];
    let falseNegative = [];
    let events = [];
    data.forEach(element => {
        let row = document.createElement('tr');

        let row_number = document.createElement('td');
        row_number.innerHTML = i.toString();

        let row_events = document.createElement('td');
        row_events.innerHTML = element.events.toString();

        let row_squirrel = document.createElement('td');
        row_squirrel.innerHTML = element.squirrel.toString();

        row.appendChild(row_number);
        row.appendChild(row_events);
        row.appendChild(row_squirrel);

        element.events.forEach(e => {
            if(!events.includes(e)){
                events.push(e);
            }
        });

        if(element.squirrel) {
            row.style.backgroundColor = "#f9c6cb";
            numTrue++;
            element.events.forEach(e => truePositive.push(e));
        }
        else {
            numFalse++;
            element.events.forEach(e => falseNegative.push(e));
        }
    
        document.getElementById('table1').appendChild(row)
        i++;
    });
    
    let correlations = [];
    events.forEach(element => {
        const TP = truePositive.filter(x => x===element).length;
        const FN = falseNegative.filter(x => x===element).length;
        const TN = numFalse - FN;
        const FP = numTrue - TP;

        const MCC = ((TP*TN)-(FP*FN))/(Math.sqrt((TP+FP)*(TP+FN)*(TN+FP)*(TN+FN)));
        correlations.push({name:element, corrrelation:MCC});
    });

    correlations.sort(((a,b) => b.corrrelation - a.corrrelation));
    
    i = 1;
    correlations.forEach(element => {
        let row = document.createElement('tr');

        let row_number = document.createElement('td');
        row_number.innerHTML = i.toString();

        let row_events = document.createElement('td');
        row_events.innerHTML = element.name;

        let row_correlation = document.createElement('td');
        row_correlation.innerHTML = element.corrrelation;

        row.appendChild(row_number);
        row.appendChild(row_events);
        row.appendChild(row_correlation);
    
        document.getElementById('table2').appendChild(row)
        i++;
    });
        
});

const titulos = document.getElementsByTagName("h1");
for (let i = 0; i < titulos.length; i++) {
    titulos[i].style.fontWeight = "bold";  
}