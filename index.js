import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const toDoList = [];
const toDoWork = [];


// POST route for the homepage
app.post("/addtask", (req, res) => {
  const newItemToday = req.body["list-item"]
  toDoList.push(newItemToday);
  res.redirect("/");
});

// Get the rendered homepage with task list
app.get("/", (req, res) => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[new Date().getDay()];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[new Date().getMonth()];
  res.render("index.ejs", { today: currentDay, month: currentMonth, toDoList: toDoList });
});

// POST route for the Work List
app.post("/addtaskwork", (req, res) => {
  const newItemWork = req.body["list-item-work"]
  toDoWork.push(newItemWork);
  res.redirect("/work");
});

// Get the rendered work list page with task list
app.get("/work", (req, res) => {
  res.render("work.ejs", { toDoWork: toDoWork });
});

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});