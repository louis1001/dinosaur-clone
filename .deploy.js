console.log("Starting")
let ghpages = require("gh-pages")

console.log("Publishing the project to gh-pages branch")
let thepromise = ghpages.publish("dist", {
  branch: "gh-pages"
}, () => {
  console.log("Updated!")
})