let ghpages = require("gh-pages")

ghpages.publish("dist", {
  dest: "gh-pages"
})