const mongoose = require("mongoose");
const echionomySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    tipe: {
      type: String,
    },
    keterangan: {
      type: String,
    },
    jumlah: {
      type: Number,
    },
    no: {
      type: Number,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const echionomyModel = mongoose.model("Echionomy", echionomySchema);

module.exports = echionomyModel;
