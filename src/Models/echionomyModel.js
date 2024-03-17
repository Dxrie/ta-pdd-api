const mongoose = require("mongoose");
const echionomySchema = new mongoose.Schema(
  {
    id: {
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
  }
);

const echionomyModel = mongoose.model("Echionomy", echionomySchema);

module.exports = echionomyModel;
