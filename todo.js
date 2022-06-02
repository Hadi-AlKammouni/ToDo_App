// Declaring the required variables
let title = $("#title");
let description = $("#description");
let add_todo = $("#add-todo");
let importance = $("#importance");
let item_lists = $("#item-lists");

let id_counter = 1;
let added_values=[];
let task_number = 1;

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
        
        var obj = { 
            "Title":title.val(), 
            "Description":description.val(), 
            "Importance":importance.val(),
            "Done":"False",
            "CreatedAt":new Date()
        };
        var myJSON = JSON.stringify(obj);
        localStorage.setItem(`task ${id_counter}`, myJSON)
        console.log(myJSON)
        var x = JSON.parse(myJSON)
        console.log(x)
  
        // Creating new row in the table
        let new_row = document.createElement("tr");
        item_lists.append(new_row);

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