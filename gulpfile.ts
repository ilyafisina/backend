const gulp = require('gulp')
const through = require('through2')
import { compile } from 'json-schema-to-typescript'
const fs = require('fs')
const endName = "schema.ts"
const routes = `./routes/**/*.spec/*${endName}`
function path(str: string) : string
{
   let base = str
   if(base.lastIndexOf(endName) != -1)
     base = base.substring(0, base.lastIndexOf(endName))
   return base
}
gulp.task('schema', () => {
  return gulp.src(routes)
    .pipe(through.obj((chunk: any, enc: any, cb: any) => {
      const filename = chunk.path
      import(filename).then(schema => { // dynamic import
        console.log('Converting', filename)
        compile(schema.default, `IDTO`)
          .then(ts => {
            //console.log(path(filename).concat('d.ts'), ts)
            fs.writeFileSync(path(filename).concat('d.ts'), ts)
          })
        })
      cb(null, chunk)
    }))
})
// watch service
const { watch, series } = require('gulp')
exports.default = function() {
  watch(routes, series('schema'))
}