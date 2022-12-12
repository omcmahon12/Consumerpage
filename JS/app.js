//The URIs of the REST endpoint
IUPS = "https://prod-41.northeurope.logic.azure.com:443/workflows/61782dce5303460b8a01ab9e7bbb03af/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jToPRp5TPHslruQ1ChR4C5fu8-xSgqvYFsjfI40nGzg";
RAI = "https://prod-40.northeurope.logic.azure.com:443/workflows/4c0f0853bb4941a0bd076cd9557bc808/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fwMLTtyxRwX4NQYJrT8Wd4r3fd8bM4Xe7JvTE1ZuUyE";
BLOB_ACCOUNT = "https://omgshredb00778120.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();

  });
});


// A function to submit a new asset to the REST endpoint
function submitNewAsset(){

    //Create a form data object
  submitData = new FormData();
  
  //Get form variables and append them to the form data object
  submitData.append('Title', $('#Title').val());
  submitData.append('Genre', $('#Genre').val());
  submitData.append('Producer', $('#Producer').val());
  submitData.append('Publisher', $('#Publisher').val());
  submitData.append('Age', $('#Age').val());
  submitData.append('File', $("#UpFile")[0].files[0]);
  
  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){

    }
 });

}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  
  $.getJSON(RAI, function( data ) {
    
    //Create an array to hold all the retrieved assets
    var items = [];
    
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {
      items.push( "<hr />");
      items.push("<video src='" +BLOB_ACCOUNT + val["filePath"] + "' width='400' controls autoplay muted></video><br />")
      items.push( "Movie Title: " + val["Title"] + "<br />");
      items.push( "Age Rating: " + val["Age"] + "<br />");
      items.push( "Genre: " + val["Genre"] + "<br />");
      items.push( "Producer: " + val["Producer"] + " (Publisher: "+val["Publisher"]+")<br />");
      items.push( "<hr />");

  });
    //Clear the assetlist div
    $('#ImageList').empty();
    
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#ImageList" );
  });
}


