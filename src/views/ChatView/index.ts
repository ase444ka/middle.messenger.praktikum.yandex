import Block from '@/abstract/Block'
import ProfileLink from '@/blocks/chat/ProfileLink'
import SearchInput from '@/blocks/chat/SearchInput'
import CurrentChat, {CurrentChatData} from '@/blocks/chat/CurrentChat'
import ChatLink, {ChatLinkData} from '@/blocks/chat/ChatLink'
import './style.css'
// import {ChatLinkData} from '@/blocks/chat/ChatLink'

type ChatElements = {currentChat: CurrentChatData[]; chatLinks: ChatLinkData[]}
export type ChatViewData = {elements: ChatElements}

const template = /*jsx*/ `
<div class="chat-page">
  <nav class="chat-page__nav">
    {{{profileLink}}}

      {{{searchInput}}}
      {{#each chatLinks}}
        {{{this}}}
      {{/each}}
  </nav>
  {{{currentChat}}}
    </div>                                           
`
const profileLink = new ProfileLink()
const searchInput = new SearchInput()

export default class ChatView extends Block {
  constructor(data: ChatViewData) {
    super({...data, profileLink, searchInput})
    this._template = template
    this.init()
  }

  getElements(elements: ChatElements): {
    currentChat: CurrentChat[]
    chatLinks: ChatLink[]
  } {
    const currentChat: CurrentChat[] = []
    const chatLinks: ChatLink[] = []
    elements.currentChat.forEach(c => {
      currentChat.push(new CurrentChat(c))
    })
    elements.chatLinks.forEach(l => {
      chatLinks.push(new ChatLink(l))
    })
    return {currentChat, chatLinks}
  }
}
