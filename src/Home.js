import { useEffect, useState } from "react";
import ModelList from "./modelItem";
import { Image, ScrollView, Text } from 'react-native';


const Home = () => {
    const [models, setModels] = useState(null)

  function getModels () {
    const Http = new XMLHttpRequest();
    const url='http://localhost:9876/api/models';
    Http.open("GET", url);
    Http.withCredentials = false;
    Http.send();
    

    Http.onreadystatechange = (e) => {
        var jsonResponse = JSON.parse(Http.responseText);
        setModels(jsonResponse);
    }
  }


//   setInterval(function() {
//     getModels();
//  }, 5000);

    // useEffect(() => {
    //     console.log("new effcet");
    //     getModels();
    // },[])


    const time = 600;

    useEffect(() => {
      const interval = setInterval(() => {
        getModels();
      }, time );
    
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
    
  const handleDelete = (id) => {
      console.log("item with id "+ id+ "is deleted" );
      const Http = new XMLHttpRequest();
      const url='http://localhost:9876/api/model?model_id='+ id;
      Http.open("DELETE", url);
      Http.setRequestHeader("Access-Control-Allow-Origin", "*")
      Http.send();
      
      Http.onreadystatechange = (e) => {
          if(Http.status == 200){
        const newModels = models.filter(model => model.model_id !== id);
        setModels(newModels);
          }
        }
  }

  const click= ()=>{
      console.log("updatE!");
       const Http = new XMLHttpRequest();
       const url='http://localhost:9876/api/model?model_type=hybrid';
      Http.open("POST", url);
      Http.setRequestHeader("Content-Type", "application/json");
      // Http.withCredentials = false;
       var prams = {"air_speed":[5,6,7], "lalala":[6,7,8]};
       Http.send(JSON.stringify(prams));
  
      
  }
  return (
    <div className="models">
      <button onClick={() => getModels()}>update!</button>
      <button onClick={()=> click()}>postReq</button>
           {models && <ModelList models={models} title="Models List" handleDelete={handleDelete} /> }
    </div>
  );
}
 
export default Home;