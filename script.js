
const dropDownListContaiiner =document.getElementById("breed");
let timer ;
let deleteFirstPhotoDelay;

// function that fetchs the data from the api
async function start (){
  try{
    const breedListURL = "https://dog.ceo/api/breeds/list/all";
    const response = await fetch(breedListURL);
    const data = await response.json();
    createBreedList(data.message);
  }
  catch(e){
        console.log("There is a problem fetching the breed list");
  }
}
start();

// function to create the drop down List (the parameter from the start function contains the data)  
function createBreedList(breedsList){
 dropDownListContaiiner.innerHTML=` <select onchange="loadByBreed(this.value)">
 <option>Choose a dog breed</option>
 ${Object.keys(breedsList).map(function (breed){
     return `<option>${breed}</option>`
 }).join('')}
  </select>`
}

// function to return the pictures of the selected breed
async function loadByBreed (breed){
    if(breed != "Choose a dog breed"){
        const breedImageURL = `https://dog.ceo/api/breed/${breed}/images`;
        const response =await fetch(breedImageURL);
        const data = await response.json();
        createSlideShow(data.message);

    }
}

function createSlideShow (images){
    let currentPosition =0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);
    
    if(images.length>1){
        document.getElementById("slideshow").innerHTML=`
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide" style="background-image: url('${images[1]}');"></div>
        `
        currentPosition+=2;
        if(images.length===2) currentPosition=0;
        timer = setInterval(nextSLide,3000);

    }
    else{
        document.getElementById("slideshow").innerHTML=`
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide"></div>
        `
    }

    function nextSLide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`);
      deleteFirstPhotoDelay=  setTimeout(function(){
            document.querySelector(".slide").remove;
        },1000);
        if(currentPosition+1 >= images.length){
            currentPosition=0;
        }
        else{
            currentPosition++;
        }
    }
}

