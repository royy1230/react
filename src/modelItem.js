import { Image, ScrollView, Text } from 'react-native';

const ModelList = ({ models, title, handleDelete }) => {
    return (
      
      <div className="model-item">
  <ScrollView style={{ flexGrow: 0.05}} horizontal>
        <h2>{ title }</h2>
        {models.map(model => (
          <div className="model-preview" key={model.model_id} style={{background: model.status=="ready"? "green":"red"}}>
            <h2>Model ID: { model.model_id }</h2>
            <p>Create on: {model.upload_time}</p>
            <p>Status: { model.status }</p>
            <button onClick={() => handleDelete(model.model_id)}>delete blog</button>
          </div>
        ))}
        </ScrollView>
      </div>
    );
  }
   
  export default ModelList;