// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&APPID=7d1d2ec3dc343e525cf61b9be863f9c5";

// Get date and convert it to UTC standard
const date = new Date();
  const newDate = date.toDateString();

//const zipData = document.getElementById('zip').value;
const feeLings = document.getElementById("feelings").value;

const getData = async url => {
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

const postData = async (url, postData) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       
    },
    body: JSON.stringify(postData)
  });
  try {
    if (res.ok) {
      const myData = await res.json();
      return myData;
    }
  } catch(error) {
    console.log("error", 'Bad request!');
  }
}
  


const updateUI = updateData => {
  document.getElementById("temp").innerHTML = getResult.main.temp;
  document.getElementById("content").innerHTML = updateData.name;
  document.getElementById("feeling").innerHTML = updateData.feelings;
  document.getElementById("date").innerHTML = newDate;

};

document.getElementById("generate").addEventListener("click", async () => {
  const zipData = document.getElementById('zip').value;

  const feelingValue = document.getElementById("feelings").value;

  const getResult = await getData(baseURL + zipData + apiKey);
  //console.log(getResult.main.temp, "   ", getResult.name ," ",feelingValue);
  document.getElementById("temp").innerHTML = "Temperatue:"+" "+ getResult.main.temp + "&deg;C";
  document.getElementById("content").innerHTML = "City name:"+" "+getResult.name;
  document.getElementById("feeling").innerHTML = "The feeling:"+" "+ feelingValue;
  ;
  document.getElementById("date").innerHTML = "Today's date is: "+newDate ;


const anObject = {
    temperature: getResult.main.temp,
    city: getResult.name,
    Feeling: feelingValue
  };
  let responsePost = await postData("/api", anObject);
  console.log(responsePost);
  let responseGet = await getData("/addData");
  console.log(responseGet);
  updateUI(responseGet);
});
