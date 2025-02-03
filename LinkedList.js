// Necessary Imports (you will need to use this)
const { Student } = require("./Student");

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data; // Student
  next; // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head; // Object
  tail; // Object
  length; // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO

    this.head = null; // The first node in the linkedlist. Initially null.
    this.tail = null; // The last node in the linkedlist.  Initially null.
    this.length = 0; // Track the number of node (size) in the linkedlist. Incrementally increases as students are added
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO

    const newNode = new Node(newStudent); // Create a new Node instance to hold the new student

    if (!this.head) {
      // Check if the LinkedList is empty (no head exists)
      // Case 1: LinkedList is empty
      this.head = newNode; // // Since this is the only node, it is also the tail
      this.tail = newNode;
    } else {
      // Case 2: LinkedList has at least one node
      this.tail.next = newNode; // Attach the new node to the tail
      this.tail = newNode; // Update the tail to the new node
    }

    this.length++; // Increment the size of the list
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // Check if the list is empty
    if (!this.head) {
      console.log("List is empty. No student to remove.");
      return false; // Return false to indicate no student was removed
    }

    // Case 1: Remove the head node
    if (this.head.data.getEmail() === email) {
      this.head = this.head.next; // Move the head to the next node
      if (!this.head) {
        this.tail = null; // If the list is now empty, update the tail to null
      }
      this.length--; // Decrement the length of the list
      return true; // Return true to indicate a student was removed
    }

    // Case 2: Remove a non-head node
    let current = this.head; // Start from the head of the list
    while (current.next !== null) {
      if (current.next.data.getEmail() === email) {
        // Check if the next node's email matches the email to remove
        current.next = current.next.next; // Bypass the node to remove
        if (!current.next) {
          this.tail = current; // If the removed node was the tail, update the tail
        }
        this.length--; // Decrement the length of the list
        return true; // Return true to indicate a student was removed
      }
      current = current.next; // Move to the next node in the list
    }
    // If no student with the given email was found, log a message and return false

    console.log(`No student with email: ${email} found.`);
    return false; // Return false to indicate no student was removed
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head; // Start from the head of the linked list
    while (current) {
      // Traverse the linked list until the end (current becomes null)
      console.log(`Checking: ${current.data.getEmail()}`); // Log the email of the current node being checked (for debugging purposes)
      if (current.data.getEmail() === email) {
        // Check if the email of the current node matches the email we're searching for
        return current.data; // If a match is found, return the student data stored in the current node
      }
      current = current.next; // Move to the next node in the linked list
    }
    // If the loop ends and no matching email is found, return -1 to indicate the student was not found
    return -1; // Student not found
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // Ensures that the linked list is empty before loading new data
    // This function resets the linked list to an empty state

    // Set the head of the linked list to null
    // This removes the reference to the first node, effectively breaking the chain
    // TODO
    this.head = null;
    // Set the tail of the linked list to null
    // This removes the reference to the last node, ensuring no nodes remain
    this.tail = null;
    // Reset the length of the linked list to 0
    // This indicates that there are no nodes in the list
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"q
   */
  displayStudents() {
    // TODO
    // Initialize an empty array to store the names of all students
    let result = [];
    // Start traversal from the head of the linked list
    let current = this.head;
    // Traverse the linked list until the end
    while (current) {
      // retrieve student's name from the current node and add it to the result's array
      result.push(current.data.getName());

      // Move to the next node in the linked list
      current = current.next;
    }
    // Join all names with ", " and return the result as a single string
    // The `join(", ")` method converts the array of student names into a string, with each name separated by a comma and a space
    return result.join(", ");
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    // Check if the linked list is empty
    if (!this.head) {
      return []; // If no students exist, return an empty array
    }

    // Store all students into an array
    const students = []; // Create an empty array to store student objects
    let current = this.head; // Start from the first node in the linked list

    while (current) {
      // Keep looping until we reach the end (current becomes null)
      students.push(current.data); // Add the student object from the current node to the array
      current = current.next; // Move to the next node in the linked list
    }

    // Sort the array alphabetically by name
    // a.getName() gives the name of student A
    // b.getName() gives the name of student B
    // localeCompare() compares both names alphabetically
    students.sort(function (a, b) {
      // Sort the students alphabetically based on their names
      return a.getName().localeCompare(b.getName()); // custom comparison function allows you to sort by the specific property. Ensures the students are sorted in proper alphabetical order
    });

    return students; // Return the sorted student array
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student objects
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    // If the linked list is empty, return an empty array
    if (!this.head) {
      return []; // No students in the list, return an empty array
    }

    // Get sorted array of all students by name
    const allStudents = this.#sortStudentsByName();

    // Filter the students based on specialization
    const filteredStudents = allStudents.filter(
      // Uses `.filter()` to create a new array with only students matching the given specialization
      (student) => student.getSpecialization() === specialization // `student.getSpecialization()` retrieves the specialization of each student
    );
    // If student's specializaton matches the provided `specialization` parameter, the student is included in the result
    // Return the filtered Student objects (not just their names)
    return filteredStudents;
  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minYear, sorted alphabetically by student name (strings)
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO
    // Check if the linked list is empty
    if (!this.head) {
      return []; // If the list is empty, return an empty array.
    }

    // Create an array to store students who meet the minYear requirement
    const selectedStudents = [];

    // Traverse through the linked list
    let current = this.head; // Start from the head (first node) of the LinkedList
    while (current !== null) {
      // Continue until the end of the list

      let studentYear = current.data.getYear(); // Retrieve the student's year

      // Check if the student is at least `minYear`
      if (studentYear >= minYear) {
        selectedStudents.push(current.data); // Add the student object to the selectedStudents array
      }

      // Move to the next node
      current = current.next;
    }

    // filter students first, then sort the final list
    const sortedStudents = this.#sortStudentsByName(selectedStudents);

    // Return only the student names (not objects)
    return sortedStudents.map((student) => student.getName()); //  map method is used to transform the array of Student objects into an array of student names
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  // saveToJson(fileName) method that writes the LinkedList to a JSON file
  async saveToJson(fileName) {
    // saves the LinkedList data (students) to a JSON file for storage.
    // TODO
    // Enables async file operations
    if (!fileName) {
      // check to ensure the fileName parameter is valid.
      console.log("Invalid file name provided."); // If no file name is provided, inform the user
      return; // Exit the function early if the file name is missing
    }

    // Import the built-in `fs` module (File System) for handling file operations asynchronously
    const fs = require("fs").promises;

    //  Check if the linked list is empty
    if (!this.head) {
      // `this.head` is `null` when the list is empty
      console.log("The LinkedList is empty. Nothing to save."); // Inform the user that there's nothing to save
      return; // Exit the function early if there's nothing to save
    }

    // Convert the linked list into an array of student objects
    const studentsArray = []; // Create an empty array to store student objects
    let current = this.head; // Start from the head of the linked list

    while (current !== null) {
      // Traverse through the linked list
      studentsArray.push({
        // Add each student's data to the array
        name: current.data.getName(), // Get and store student name
        email: current.data.getEmail(), // Get and store student email
        specialization: current.data.getSpecialization(), // Get and store specialization
        year: current.data.getYear(), // Get and store student year
      });
      current = current.next; // Move to the next node in the linked list
    }

    // Convert the student array into a JSON-formatted string
    // JSON.stringify() takes an object/array and converts it into a JSON string
    // The `null, 2` arguments make the JSON **pretty formatted** (easier to read)
    const jsonData = JSON.stringify(studentsArray, null, 2); // use JSON.stringify() to convert the students array into a JSON-formatted string

    // Write the JSON data to the specified file asynchronously
    try {
      await fs.writeFile(fileName, jsonData, "utf8"); // Write JSON data to the file in UTF-8 format.
      console.log(`LinkedList successfully saved to ${fileName}`); // Inform the user that the save was successful.
    } catch (error) {
      console.error(`Error saving LinkedList to file: ${error.message}`); // Handle file writing errors properly.
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // reads student data from a JSON file and loads it into the LinkedList. Converts JSON data back into Student objects
    // TODO

    if (!fileName) {
      console.log("Invalid file name provided.");
      return; // Exit the function early if the file name is missing
    }

    // Import the `fs` module for asynchronous file reading
    const fs = require("fs").promises; // fs (File System) module in Node.js allows reading and writing files

    try {
      //  Read the JSON file asynchronously
      // `await` is used because reading files takes time (asynchronous operation)
      const data = await fs.readFile(fileName, "utf8"); // Read the file content as a UTF-8 encoded string
      // Parse the JSON data into an array of student objects
      const studentsArray = JSON.parse(data); // 	Convert the JSON string (`data`) into a JavaScript array of objects

      this.clearStudents(); // Ensures the list is emptied before adding new students from the file

      // Convert each object back into a `Student` instance and add to the linked list
      // Loop through all students in `studentsArray` (which was loaded from the JSON file)
      for (let i = 0; i < studentsArray.length; i++) {
        let studentData = studentsArray[i];
        let student = new Student(
          studentData.name,
          studentData.email,
          studentData.specialization,
          studentData.year
        );
        this.addStudent(student); // Add the student to the linked list
      }

      // Print success message once after all students are added
      console.log(`LinkedList successfully loaded from ${fileName}`);
      // Handle any errors that occur while reading or parsing the file
    } catch (error) {
      console.error(`Error loading LinkedList from file: ${error.message}`);
    }
  }
}

// exports the LinkedList class so that it can be imported and used in other files
module.exports = { LinkedList };
