const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  taskname: String,
  status: { type: "String", enum: ["pending", "done"], default:'pending' },
  tag: { type: "String", enum: ["personal", "official", "family"] },
  userId: {type: Schema.Types.ObjectId, ref:'user'},
});

const todoModel = model("todo", todoSchema);

module.exports = todoModel;
