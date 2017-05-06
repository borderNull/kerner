import { src, dest, watch, parallel, series, lastRun } from 'gulp'
import plumber from 'gulp-plumber'

import stylus from 'gulp-stylus'
import sourcemaps from 'gulp-sourcemaps'
import cache from 'gulp-cached'
import remember from 'gulp-remember'
import postcss from 'gulp-postcss'
import rupture from 'rupture'
import concat from 'gulp-concat'

const dirs = {
  src: 'src',
  dest: 'build'
}

const sources = {
  pug: [`${dirs.src}/template/**/*.pug`],
  cssLayout: `${dirs.src}/css/layout/**/*.styl`,
  cssUi: `${dirs.src}/css/ui/**/*.styl`,
  css: `${dirs.src}/css/**/*.styl`
}

export const buildCss = () => src([sources.cssLayout, sources.cssUi, sources.css], {
  since: lastRun(buildCss)
})
  .pipe(plumber())
  .pipe(cache('stylus'))
  .pipe(sourcemaps.init())
  .pipe(stylus({
    import: ['rupture'],
    use: [
      rupture()
    ]
  }))
  .pipe(postcss([
    require('postcss-assets')({
      loadPaths: ['src/icons/', 'src/images/', 'src/svg']
    }),
    require('lost'),
    require('postcss-clearfix'),
    require('postcss-short'),
    require('postcss-easings'),
    require('postcss-default-unit'),
    require('postcss-merge-longhand'),
    require('postcss-center'),
    require('postcss-flexbox'),
    require('postcss-flexbugs-fixes'),
    require('postcss-flexibility'),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    require('postcss-triangle'),
    require('postcss-responsive-type')
  ]))
  .pipe(remember('stylus'))
  .pipe(concat('main.css'))
  .pipe(postcss([
    require('postcss-css-reset')
  ]))
  .pipe(dest(dirs.dest + '/css/'))
  .pipe(sourcemaps.write('./'))
