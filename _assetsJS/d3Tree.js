/**
 * Created by jjenkins on 8/9/2016.
 */
//defines my require js module
/**
 * @PowerOneLine
 * this is a module that creates the powerOneLine D3 graphic for the eLert POD summary page
 *
 */
define(['d3','jquery'],function (d3,$) {

    //create an pointless constructor
    var PowerOneLine = function () {
    };


    PowerOneLine.prototype = Object.create(null);
    PowerOneLine.prototype.constructor = PowerOneLine;

    /**
     * @init
     * initializes the module
     * this will return any functions that are exposed
     * todo wrap functions in the init functions and return there references
     */
    PowerOneLine.prototype.init = function init () {

        console.log('Test');

    };


   //holds the config data in an object
    var config = {
        width: window.innerWidth, // gets the width of the window
        height:window.innerHeight // gets the height of the window

    };




    // Define the div for the tooltip
    var div = d3.select(".powerOneLine").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //sets the size of the tree in the canvas
    var tree = d3.layout.tree()
        .size([config.width -100,config.height-100]);


    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);
    //zoom function

    var powerLine= d3.select(".powerOneLine").append("svg")
        .attr("width", config.width)
        .attr("height",config.height)
        .append("g").attr("transform", "translate(50,50)")
        .call(zoom);
    //get the json data from my json file and use a callback function to
    //use the data this file will live in the Niagara fileSpace

   var outerNode = d3.json("myData.json", function (data) {
        //runs the tree layour and returns all the JSON data object and returns and array
        var nodes =  tree.nodes(data);
        // links between the nodes data is stored here
        var link = tree.links(nodes);

        // create the various nodes to be displayed around the screen
        var node = powerLine.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g").attr('class', function () {
                //todo get class data to itterate for unique dom elements
                return 'node'; // creates specific classes for my nodes
            }).attr("transform", function (d) {
                // create a function that places the node object on the canvas
                //flip the x and y cordiantes to change the direction of the nodes
                  return "translate (" + d.x + "," + d.y + ")";
            }).on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.name+ " " + d.url + " " + "Out Value " +fakeData()) //playing around with passing data
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        //fake function to proof the passing of data to the tooltip
         function fakeData(){
           var data= setInterval(function () {
               return Math.random * 10;
             },1000);
             return data;
         }





        //append each node to create a circle
        // sets its radius and fill with color
        node.append('circle')
            .attr('r',10)//change circle radius here
            .attr('fill', function (d) { //todo query the data base to get the alarm data of the given element
                if (d.color === "red")
                {
                    return d.color;
                }
                else
                {
                    return 'steelblue';
                }

            })//change circle fill color here
            .attr("stroke", "green");//change circle stroke color here


        // creates the text for all the node objects
        node.append("text")
            .text(function (d) {
                return d.name; // return the name for all my nodes
            })
            .attr("y", -10)
            .attr("x", 2)//adjust the z and y value to get the text off the circle
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "#000080");

        //create the links based on the JSON data
        node.append('g:a')// appened the g dom element with an a href to create the links
            .attr("href", function(d){return d.url;})//d is an arg recieved from the data element this function sets my hyperlinks
            .append("rect")//creates a rectangle to click on
            .attr("x", -10)// makes sure the data is on the node
            .attr("y", -10)// makes sure the data is on the node
            .attr("height",30)
            .attr("width", 30)
            .style("fill", "transparent");// you have to fill it with something or want exist


        // creates the lines between the data
        // uncomment the projections method to change the lines
        var diagonal = d3.svg.diagonal();
            // .projection(function (d) {
            //     return [d.y , d.x];
            // });
        //select everything with the class of link
        var colorNum = 0;
        powerLine.selectAll(".link")
            .data(link)
            .enter()
            .append("path")
            .attr("class" , "link")
            .attr("fill", "none")
            .attr("stroke", function (l) { // todo determine a function tochange the color based on alarms present possibly assign a numerical data binding to each object in the powerone line
                colorNum++;
                if(colorNum<=2){
                    return "green";
                }
                if(colorNum<=8 && colorNum>2){
                    return "yellow";
                }
                if(colorNum>8){
                    return "red";
                }


            })
            .attr("d",diagonal)

        return node;

    });//end of data

    console.log(outerNode);


    function zoomed() {
       // outerNode.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    // return the PowerOneLine module
    return PowerOneLine;


});

