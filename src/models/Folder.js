const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    image: {
      url: String,
      public_id: String,
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

// reemplazamos '_id' por 'id'
folderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

folderSchema.index({ name: "text" });
folderSchema.plugin(mongoosePaginate);

const folder = model("Folder", folderSchema);
module.exports = folder;
