import fs from 'fs'
import marked from 'marked'
import hljs from 'highlight.js'

function doBuild() {
  const mark = marked.setOptions({
    renderer: new marked.Renderer(),
    tables: true,
    gfm: true,
    highlight: function (code, language) {
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
      return hljs.highlight(validLanguage, code).value
    },
  })

  const readme = fs.readFileSync('./README.md').toString()
  const template = fs.readFileSync('./example/index.html').toString()
  if (!fs.existsSync('./example/dist')) {
    fs.mkdirSync('./example/dist')
  }
  fs.writeFileSync(
    './example/dist/index.html',
    template.replace('{README}', mark(readme))
  )
}

export default function build() {
  return {
    name: 'build',
    generateBundle() {
      doBuild()
    },
  }
}
