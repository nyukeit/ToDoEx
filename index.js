// Import Modules
import express from 'express';
import bodyParser from 'body-parser';

// Declare server
const app = express();
const port = 3000;

// Declare module use
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// App logic variables
const toDoList = [];
const toDoWork = [];

// Add task route for Today page
app.post("/addtask", (req, res) => {
  if (req.body["list-item"] !== "") {
    toDoList.push(req.body["list-item"]);
  }
  res.redirect("/");
});

// Render Today page with tasks added
app.get("/", (req, res) => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[new Date().getDay()];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[new Date().getMonth()];
  res.render("index.ejs", { today: currentDay, month: currentMonth, toDoList: toDoList });
});

// Add task route for Work page
app.post("/addtaskwork", (req, res) => {
  if (req.body["list-item-work"] !== "") {
    toDoWork.push(req.body["list-item-work"]);
  }
  res.redirect("/work");
});

// Render Work page with tasks added
app.get("/work", (req, res) => {
  res.render("work.ejs", { toDoWork: toDoWork});
});

// Open port for app
app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});