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

// To assign ids for each data
let td_title_a = "title"
let td_title_b = 1;
let td_description_a = "description"
let td_description_b = 1;
let td_importance_a = "importance"
let td_importance_b = 1;
let td_done_a = "done"
let td_done_b = 1;

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
    values=[id_counter,y.Title,y.Description,y.Importance,y.Done,y.CreatedAt]
    ids_of_values=["",y.titleid,y.descriptionid,y.importanceid,y.doneid,""];

    // Creating new row in the table + Filling the data in the columns
    let new_row = document.createElement("tr");
    new_row.id = tr_id_a + tr_id_b;
    item_lists.append(new_row);

    for (let i=0; i<6; i++){
        new_task = document.createElement("td");
        new_task.id =ids_of_values[i]
        new_task.append(document.createTextNode(values[i]));
        new_row.append(new_task);
    }
    td_description_b++;
    td_title_b++;
    td_importance_b++;
    td_done_b++;
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
        
        // To assign ids of each specific data
        let new_title = td_title_a + td_title_b;
        let new_description = td_description_a + td_description_b;
        let new_importance = td_importance_a + td_importance_b;
        let new_done = td_done_a + td_done_b;
        td_array_value = ["",new_title, new_description, new_importance, new_done,""]

        var obj = { 
            "Title":title.val(), 
            "Description":description.val(), 
            "Importance":importance.val(),
            "Done":"False",
            "CreatedAt":new Date(),
            "rowid":new_row.id
        };
    
        td_array_key = ["", "titleid", "descriptionid", "importanceid", "doneid", ""]

        // For loop to add the data into the new row
        for (let i=0;i<added_values.length;i++){
            // Creating new detail upon each iteration
            let new_task = document.createElement("td");
            new_task.id = td_array_value[i] // Assigning ids of each specific data
            obj[td_array_key[i]] = td_array_value[i]
            new_task.append(document.createTextNode(added_values[i]));
            new_row.append(new_task);
        };

        var myJSON = JSON.stringify(obj);
        localStorage.setItem(`task ${id_counter}`, myJSON);
        console.log(myJSON);
        var x = JSON.parse(myJSON);
        console.log(x);

        // To assign ids of each specific data
        td_description_b++;
        td_title_b++;
        td_importance_b++;
        td_done_b++;

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

// Updating feature (not working 100%)
$("#edit-old-todo").click(function(){

    let row_to_update = prompt("NOTHING WILL HAPPEN IF THE NUMBER DOESN'T EXIST!!                    Insert the id number only of the row which you want to update");
    let column_to_update = prompt("Enter: 1 to update the title / 2 to update the description / 3 to update the improtance / 4 to update the status");

    let row_values = localStorage.getItem(`task ${row_to_update}`)
    let json_row_values = JSON.parse(row_values);
    
    if(column_to_update == 1){
        let updated_title = prompt("Enter the new title");
        localStorage.setItem(`${json_row_values.Title}`, updated_title)
    }
    else if(column_to_update == 2){
        let updated_description = prompt("Enter the new description");
        localStorage.setItem(`${json_row_values.Description}`, updated_description)
    }
    else if(column_to_update == 3){
        let updated_importance = prompt("Enter the new importance");
        localStorage.setItem(`${json_row_values.Importance}`, updated_importance)
    }
    else if(column_to_update == 4){
        let updated_done = prompt("Enter the new done");
        localStorage.setItem(`${json_row_values.Done}`, updated_done)
    }
    else{
        alert("NOTHING CHANGED! You didn't enter a number between 1 and 4.")
    }
});