var config = {
    apiKey: "AIzaSyBJx-GjAnflQbZDGAAq0oJGUnE4NpvG-pA",
    authDomain: "proyectocrud-82046.firebaseapp.com",
    databaseURL: "https://proyectocrud-82046.firebaseio.com",
    projectId: "proyectocrud-82046",
    storageBucket: "proyectocrud-82046.appspot.com",
    messagingSenderId: "1031255776807"
  };
  firebase.initializeApp(config);


  function getID(id){
    return document.getElementById(id).value;
  }

  function inputsTask(id,result){
    return document.getElementById(id).value=result;
  }

  function innerHTML(id,result){
    return document.getElementById(id).innerHTML+=result;
  }

  function arrayJSON(id,name,description){
    var data = {
        id: id,
        name: name,
        description: description
    };
    return data; 
  }

  function insertTask(){
      var id = getID("id");
      var name = getID("name");
      var description = getID("description");
      //console.log(name+description); 
      if(id.length==0 || name.length==0 || description.name==0){
          alert("Empty Fields")
      } else{
          var arrayData = arrayJSON(id,name,description);
          //console.log(arrayData);
          var task = firebase.database().ref("task/"+id);
          task.set(arrayData);
          alert("Saved Successfully");
          inputsTask("id","");
          inputsTask("name","");
          inputsTask("description","");
      }
  }
  function table(id,name, description){
    return '<tr>'+
      '<td>'+name+'</td>'+
      '<td>'+description+'</td>'+
      '<td><i class="fas fa-pen-square size-fas"'+' onclick="editTask('+id+','+name+','+description+')"></i></td>'+
      '<td><i class="fas fa-trash size-fas" onclick="remove('+id+')"></i></td>'+
    '</tr>';
  }

  function watchTask(){
    var task = firebase.database().ref("task/");
    task.on("child_added",function (data){
      var taskValue = data.val();
      var result = table(taskValue.id,taskValue.name,taskValue.description);
      innerHTML("loadTask",result);
    });
  }
  function editTask(id,name,description){
    inputsTask("id",id);
    inputsTask("name",name);
    inputsTask("description",description);
  }

  function remove(id){
    var task = firebase.database().ref("task/"+id);
    task.remove();
    location.reload();
  }





