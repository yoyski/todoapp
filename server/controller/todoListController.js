import db from "../model/todoList.model.js";

export const addTodoList = async (req, res) => {
  const { title } = req.body;

  console.log("Incoming title:", title);

  db.query("INSERT INTO todo (title) VALUES (?)", [title], (err, results) => {
    if (err) {
      console.error("Database Insert Error:", err); // 👈 log full error
      return res.status(500).json({ error: err.message }); // send back actual DB error
    }
    res.json({
      id: results.insertId,
      title,
    });
  });
};


export const getAllTodoList = async (req, res) => {
  db.query("SELECT * FROM todo", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const deleteTodoList = async (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM todo WHERE id =  ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ 'message': `Deleted ${result.affectedRows} row(s)`});
  });
};

export const updateTodoList = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  db.query("UPDATE todo SET title = ? WHERE id = ?", [title, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" });
    } 
    res.json({ message: "Todo updated successfully" });
  });
}
