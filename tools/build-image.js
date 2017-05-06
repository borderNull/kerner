
import { src, dest, watch, parallel, series, lastRun } from 'gulp'
import tinypng from 'gulp-tinypng-compress'

export const buildImage = () => src('./src/img/**/*.{png,jpg,jpeg}')
  .pipe(tinypng({
    key: 'Ym2L4dZGaAe3iHpFe-AcVCbUpOMD9fFb',
    sigFile: './src/img/.tinypng-sigs',
    log: true
  }))
  .pipe(dest('./build/img'))
