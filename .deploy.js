console.log("Starting")
let ghpages = require("gh-pages")

console.log("Publishing the project to gh-pages branch")
ghpages.publish("dist", {
  branch: "gh-pages"
}, () => {
  console.log("Updated!")
})