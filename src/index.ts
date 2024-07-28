import render from '@/utils/render.js'
// import CardBlock from '@/blocks/auth/CardBlock'
// import FormBlock from '@/blocks/auth/FormBlock'
// import ChatView, {ChatViewData} from '@/views/ChatView'
import SignupView from '@/views/SignupView'

const view = new SignupView()
render('#app', view)
