const url = 'https://to-do-app-olyr.onrender.com/users';




   let New_Password= document.getElementById("New_Password").value;
    let Confirm_password = document.getElementById("Confirm_password").value;
  if(New_Password===Confirm_password){
    function updatepass(event){
      event.preventDefault();

        let userid = localStorage.getItem("userId");
        console.log(userid);
    // function completeTask(TaskComid) {
      // document.getElementById("holdnone").style.display = 'none';
       // console.log(TaskComid);
   
       // Send a request to the server to delete the task
      //  const statusurl = `${url}${userid}`;
   
       fetch(url)
           .then(response => {
               if (!response.ok) {
                   throw new Error(`HTTP error! Status: ${response.status}`);
               }
               return response.json();
           })
           .then(data => {
               // Call finishtask with the retrieved data
               console.log(data)
               finishtask(data.id, data.Desc, data.Title, data.status=1, data.UserId);
           })
           .catch(error => {
               alert('Error deleting task:', error);
           });
   
   
   function finishtask(finishtaskid, finishtaskdesc, finishtasktitle, finishtaskstatus, finishtaskuserid) {
       // e.preventDefault();
       let a = finishtaskid;
       let b = finishtaskdesc;
       let c = finishtasktitle;
       let d = finishtaskstatus;
       let e = finishtaskuserid;
       console.log(e, b, c, d, a);
   
       const updatedTask = {
           Title: c,
           Desc: b,
           UserId: e,
           id: a,
           status: d,
           Date: new Date().toLocaleDateString(), // Fixed the 'date' issue
       };
   
       console.log(updatedTask);
   
       fetch(`${url}${a}`, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(updatedTask),
       })
           .then(res => {
               if (!res.ok) {
                   throw new Error(`HTTP error! Status: ${res.status}`);
               }
               // Removed the unreachable console.log and added return statement
               return res.json();
           })
           .then(data => {
               console.log(data);
               location.reload();
               // Close the edit form overlay after updating
               // document.getElementById("editOverlay").style.display = "none";
           })
           .catch(error => {
               console.error('Error updating task:', error);
           });
   }
  }
}else{
    alert("Give me correct confirm password")
  }



//   location.href = "../../Html_Pages/updatePassword.html";
//   window.location.href = '/Html_Pages/updatePassword.html';



