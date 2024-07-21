import render from './utils/render.js'
import ErrorView from '/views/ErrorView/ErrorView.js'

const errorPage = new ErrorView({
  status: 600,
  message: 'Все хорошо, прекрасная маркиза!',
})
// app —3 это class дива в корне DOM
render('#app', errorPage)
