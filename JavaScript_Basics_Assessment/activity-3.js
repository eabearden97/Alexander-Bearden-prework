// 1.
var studentNames = ["Alexander","Carl","Henry"];

// 2. & 3.
for (let i=0; i<3; i++) {
    var name = prompt("Please enter a student's name:");
    studentNames.push(name);
}

// 4.
for (let i=0; i<studentNames.length; i++) {
    console.log(studentNames[i]);
}