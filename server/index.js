const fs = require("fs");
const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

const filePath = "../utils/niceList.json";
const giftListJSON = fs.readFileSync(filePath, "utf-8");
const giftList = JSON.parse(giftListJSON);
const t = new MerkleTree(giftList);
const MERKLE_ROOT = t.getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name, proof} = req.body;

  // TODO: prove that a name is in the list 
  let isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  console.log(isInTheList);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
