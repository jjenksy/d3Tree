/**
 * Created by jjenkins on 9/23/2016.
 */
define(['jquery'],function ($) {

    //drag and drop
    var dragged;

    console.log("test");

    /* Events fired on the drag target */
    document.addEventListener("dragstart", function(event) {
        console.log("dragstart");
        // Set the drag's format and data. Use the event target's id for the data
        event.dataTransfer.setData("text/plain", event.target.id);
    });

    document.addEventListener("drag", function(event) {
        //console.log("drag");
        document.getElementById("demo").innerHTML = "The p element is being dragged";
    });

    /* Events fired on the drop target */
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
        //console.log("dragover");
    });

    document.addEventListener("drop", function(event) {
        event.preventDefault();
        // Get the data, which is the id of the drop target
        var data = event.dataTransfer.getData("text");
        console.log(data);
        // Clear the drag data cache (for all formats/types)
        event.dataTransfer.clearData();
        if ( event.target.className == "droptarget" ) {
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
            document.getElementById("demo").innerHTML = "The p element was dropped";
        }
    });



});
