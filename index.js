// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require("./Student");
const readline = require("readline");

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList(); // Initializing and creating a new LinkedList instance to store students

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file save [fileName.js]
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  //  declares asynchronous function called handleCommand
  const [operation, ...args] = command.trim().split(" ");

  switch (
    operation // A switch statement used to handle different commands
  ) {
    case "add":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
      console.log("Adding student...");
      const [name, year, email, specialization] = args; // Extract user input arguments from `args` array
      // --------> WRITE YOUR CODE BELOW

      // Validate inputs
      if (!name || !year || !email || !specialization) {
        console.log(
          "Invalid input. Usage: add [name] [year] [email] [specialization]"
        );
        break; //  Exit the case if any argument is missing
      }

      // Create a new `Student` instance using extracted input values
      const newStudent = new Student(name, Number(year), email, specialization); // `Number(year)` ensures `year` is stored as a **number** instead of a string

      // Add the student to the linked list
      studentManagementSystem.addStudent(newStudent); // calls the addStudent() method from the LinkedList class & adds the newStudent to the linked list

      // Display success message after student is added
      console.log("Student added successfully!");

      // Display the updated list of students
      console.log(studentManagementSystem.displayStudents()); // Calls `displayStudents()`, which returns a **comma-separated string** of all students in the list

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "remove":
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log("Removing student...");
      // --------> WRITE YOUR CODE BELOW

      const [removeEmail] = args;

      // Validate input: Ensure the user provided an email
      if (!removeEmail) {
        console.log("Invalid input. Usage: remove [email]");
        break; // Exit early if no email is provided
      }

      console.log(`Attempting to remove student with email: ${removeEmail}`); // Log the email being processed for debugging and clarity

      // Call removeStudent and store the result
      const wasRemoved = studentManagementSystem.removeStudent(removeEmail); // `removeStudent()` should return **true** if the student was removed, **false** if not found

      // Print success message only if student was found and removed
      if (wasRemoved) {
        console.log("Student removed successfully!");
      }

      // Display the updated list
      console.log(studentManagementSystem.displayStudents());

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "display":
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log("Displaying students...");
      // --------> WRITE YOUR CODE BELOW

      // Retrieve all students as a formatted string
      const studentsList = studentManagementSystem.displayStudents();
      // Calls `displayStudents()` to return a string of student names
      // If no students exist, it returns an empty string (`""`)

      // Check if the student list is empty before displaying
      if (studentsList && studentsList.length > 0) {
        console.log(studentsList); // Print the student names if the list is not empty
      } else {
        console.log("The list is empty."); // Print message if no students exist
      }

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "find":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log("Finding student...");
      // --------> WRITE YOUR CODE BELOW

      const [findEmail] = args;

      // Validate input to ensure an email is provided
      if (!findEmail) {
        // checks if findEmail is empty or undefined
        console.log("Invalid input. Usage: find [email]"); // Print an error message if no email was provided
        break; // Exit the `switch` statement to prevent further execution
      }

      // Find the student by email
      const foundStudent = studentManagementSystem.findStudent(findEmail); // calls findStudent(email) from the LinkedList class
      // Calls `findStudent(email)` method from the LinkedList class.
      //  Returns the `Student` object if found, otherwise returns `-1` if not found.

      // Check if a student was found and display the appropriate message
      if (foundStudent !== -1) {
        // If findStudent(email) found a student, `foundStudent` will be a `Student` object, this condition is true
        // Calls `getString()` to display the student's details in a formatted way
        console.log(foundStudent.getString());
      } else {
        console.log(`No student with email: ${findEmail} found.`);
        // If `findStudent(email)` returned `-1`, it means no student was found.
        //  Prints an error message informing the user that the student does not exist.
      }

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "save":
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log("Saving data...");
      // --------> WRITE YOUR CODE BELOW

      const [saveFileName] = args;
      // Extracts the first argument from `args`, which is expected to be the file name

      if (!saveFileName) {
        console.log("Invalid input. Usage: save [fileName]");
        // Checks if a file name was provided.
        // If no file name was provided, prints an error message.
        break; // Exits the switch case early to prevent further execution
      }

      // Ensure file name has .json extension
      const validatedFileName = saveFileName.endsWith(".json")
        ? saveFileName
        : `${saveFileName}.json`;

      // If `saveFileName` already ends with `.json`, use it as is.
      // Otherwise, append `.json` to ensure the file is saved with the correct format.

      await studentManagementSystem.saveToJson(validatedFileName);
      // Calls the `saveToJson()` method from `LinkedList` to save the student data to a JSON file.
      // Uses `await` because `saveToJson()` is an asynchronous function.

      console.log(`Data saved to ${validatedFileName}`);
      // Displays a confirmation message indicating that the data was successfully saved
      // --------> WRITE YOUR CODE ABOVE
      break;
    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log("Loading data...");
      // --------> WRITE YOUR CODE BELOW

      const [loadFileName] = args; // Extracts the first argument from `args`, which should be the file name

      if (!loadFileName) {
        console.log("Invalid input. Usage: load [fileName]");
        // Checks if a file name was provided.
        // If no file name is given, prints an error message.
        break; // Exits the switch case early to prevent further execution
      }

      // Ensure file name has .json extension
      const fileName = loadFileName.endsWith(".json")
        ? loadFileName
        : `${loadFileName}.json`;

      // If `loadFileName` already ends with `.json`, use it as is.
      // Otherwise, append `.json` to enforce the correct file format.

      await studentManagementSystem.loadFromJSON(fileName);
      // Calls the `loadFromJSON()` method from `LinkedList` to load student data from the specified file.
      // Uses `await` because `loadFromJSON()` is an asynchronous function.

      console.log("Data loaded successfully!");
      // Displays a success message indicating that the data was successfully loaded
      console.log(studentManagementSystem.displayStudents());
      // Calls `displayStudents()` to print all students in the loaded linked list

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "clear":
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log("Clearing data...");
      // --------> WRITE YOUR CODE BELOW

      // Check if the list is already empty
      if (studentManagementSystem.displayStudents().length === 0) {
        console.log("The list is already empty.");
        // Calls `displayStudents()` to check if there are any students.
        // If the list is empty, prints a message and exits early.
        break;
      }

      // Clear the linked list
      studentManagementSystem.clearStudents();
      // Calls `clearStudents()` method from `LinkedList`, which removes all students from the list

      // Display the updated list
      console.log("Data cleared successfully!");
      // Prints confirmation that the list was successfully cleared
      console.log(studentManagementSystem.displayStudents()); // calls the clearStudents() method from the LinkedList class returns names as strings. Expected output: "Data cleared successfully!"
      // Calls `displayStudents()`, which prints the names of all students in the linked list.
      //  Since the list was just cleared, it should now return an empty string or a default message.

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "q":
      console.log("Exiting...");
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log("Welcome to the Student Management System!");
main();
rl.on("line", async (input) => {
  if (input.trim().toLowerCase() === "help") {
    main();
  } else {
    await handleCommand(input);
  }
});
rl.on("close", () => {
  console.log("Goodbye!");
});
