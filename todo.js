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

// Upon opening the browser, if there is data saved in the local storage, 
// they will be filled directly in the table

for(let i=0; i<localStorage.length; i++){
    // Getting the data from the local storage
    let x= localStorage.getItem(`task ${task_number}`);
    let y = JSON.parse(x);
    console.log(y)
    task_number++;

    console.log(y.rowid)

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

    id_counter++; // To auto increment the id
}

// Upon clicking the add to list button:
add_todo.click(function(){

    // Condition to prevent user from leaving any empty value
    if(title.val() != "" && description.val() != ""){

        // // Coloring the border background 
        title.css("borderBlockColor", "black");
        description.css("borderBlockColor", "black");

        // Appending the added values to the array added_values
        added_values.push(id_counter)
        added_values.push(title.val());
        added_values.push(description.val());
        added_values.push(importance.val());
        added_values.push("False");
        added_values.push(new Date())
        
        // Creating new row in the table
        let new_row = document.createElement("tr");
        // Assigning an id for each row
        new_row.id = tr_id_a + tr_id_b;
        item_lists.append(new_row);

        var obj = { 
            "Title":title.val(), 
            "Description":description.val(), 
            "Importance":importance.val(),
            "Done":"False",
            "CreatedAt":new Date(),
            "rowid":new_row.id
        };

        var myJSON = JSON.stringify(obj);
        localStorage.setItem(`task ${id_counter}`, myJSON)
        console.log(myJSON)
        var x = JSON.parse(myJSON)
        console.log(x)
  
        

        // For loop to add the data into the new row
        for (let i=0;i<added_values.length;i++){
            // Creating new detail upon each iteration
            let new_task = document.createElement("td");
            new_task.append(document.createTextNode(added_values[i]));
            new_row.append(new_task);
        }
        
        // Reseting the values of the input fields + the array to fill them again
        title.val('');
        description.val('');
        id_counter++;
        added_values=[];
        tr_id_b++;

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

add_new.click(function(){
    add_section.css("display", "block")
});