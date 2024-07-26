import render from '@/utils/render.js'
// import CardBlock from '@/blocks/auth/CardBlock'
// import FormBlock from '@/blocks/auth/FormBlock'
// import ChatView, {ChatViewData} from '@/views/ChatView'
import SigninView from '@/views/SigninView'

const view = new SigninView()
render('#app', view)
