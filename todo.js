// Declaring the required variables
let title = $("#title");
let description = $("#description");
let add_todo = $("#add-todo");
let importance = $("#importance");
let item_lists = $("#item-lists");

let add_new = $("#add-new-todo")
let add_section = $("#add-section")

let tr_id_a = "row"
let tr_id_b = 1;
let id_counter = 1;
let added_values=[];
let task_number = 1;

// Upon opening the browser, if there is data saved in the local storage, they will be filled directly in the table

for(let i=0; i<localStorage.length; i++){
    // Getting the data from the local storage
    let x= localStorage.getItem(`task ${task_number}`);
    // Checking if the task number exist or no
    // If yes,list its corresponding data
    // If no,increment the task number and decrement "i" to make sure to loop over all the tasks in the local storage
    if (x == null){
        id_counter++; // Keeping the id number as it is even if a task is deleted
        task_number++;
        i--;
    }
    else{
    let y = JSON.parse(x);

    // Putting the values of each task in the array to iterate over them for each row
    values=[id_counter,y.Title,y.Description,y.Importance,y.Done,y.CreatedAt];

    // Creating new row in the table + Filling the data in the columns
    let new_row = document.createElement("tr");
    new_row.id = tr_id_a + tr_id_b;
    item_lists.append(new_row);
    for (let i=0; i<6; i++){
        new_task = document.createElement("td");
        new_task.append(document.createTextNode(values[i]));
        new_row.append(new_task);
    }
    tr_id_b++;
    task_number++; // To go to the next task in the local storage
    id_counter++; // To auto increment the id
    }
}

//=================================================

// Upon clicking the add to list button, 1st check if all fields are filled
add_todo.click(function(){

    // Condition to prevent user from leaving any empty value
    if(title.val() != "" && description.val() != ""){

        // // Coloring the border background 
        title.css("borderBlockColor", "black");
        description.css("borderBlockColor", "black");

        // Appending the added values to the array added_values
        added_values.push(id_counter);
        added_values.push(title.val());
        added_values.push(description.val());
        added_values.push(importance.val());
        added_values.push("False");
        added_values.push(new Date());
        
        // Creating new row in the table
        let new_row = document.createElement("tr");
        // Assigning an id for each row
        new_row.id = tr_id_a + tr_id_b;
        item_lists.append(new_row);
        tr_id_b++;
        var obj = { 
            "Title":title.val(), 
            "Description":description.val(), 
            "Importance":importance.val(),
            "Done":"False",
            "CreatedAt":new Date(),
            "rowid":new_row.id
        };
        
        var myJSON = JSON.stringify(obj);
        localStorage.setItem(`task ${id_counter}`, myJSON);
        console.log(myJSON);
        var x = JSON.parse(myJSON);
        console.log(x);
  
        // For loop to add the data into the new row
        for (let i=0;i<added_values.length;i++){
            // Creating new detail upon each iteration
            let new_task = document.createElement("td");
            new_task.append(document.createTextNode(added_values[i]));
            new_row.append(new_task);
        };
        
        // Reseting the values of the input fields + the array to fill them again
        title.val('');
        description.val('');
        id_counter++;
        added_values=[];

        // Emptying the textarea fields
        add_section.css("display", "none")
        alert("Task was succefully added!")
    }
    
    else{
        // Coloring the border background of the empty input by the red color
        if (title.val() == ""){
            title.css("borderBlockColor", "red")
        }

        if (description.val() == ""){
            description.css("borderBlockColor", "red")
        }
        // Alert msg when value of title or description is "" empty.
        alert("Both, title and description must be filled");
    }

});

//=================================================

// Display the fields to add new task upon clicking the Add New ToDo button
add_new.click(function(){
    add_section.css("display", "block")
});

//=================================================

// Delete a task by entering its id number
$("#delete-old-todo").click(function(){
    let to_delete = prompt("NOTHING WILL HAPPEN IF THE NUMBER DOESN'T EXIST!!                    Insert the id number only of the row which you want to delete");
    localStorage.removeItem(`task ${to_delete}`);
    location.reload();
});

// Clear the local storage upon clicking the clear the whole todo button
$("#clear-todo").click(function(){
   let check = prompt("Enter y if you are sure if you want to clear the whole todo tasks");
   if (check == "y"){
       localStorage.clear();
       alert("List has been cleared");
       location.reload();
   }
   else{
       alert("Nothing changed; you didn't confirm clearing of the whole list");
   };
})

//=================================================