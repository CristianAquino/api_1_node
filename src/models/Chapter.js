const { Schema, model } = require("mongoose");

const chapterSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: 25,
    },
    images: [
      {
        type: String,
      },
    ],
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
  },
  { timestamps: true, versionKey: false }
);

// reemplazamos '_id' por 'id'
chapterSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

const chapter = model("Chapter", chapterSchema);
module.exports = chapter;
