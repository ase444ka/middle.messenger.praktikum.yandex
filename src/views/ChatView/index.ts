import Block from '@/abstract/Block'
import ProfileLink from '@/blocks/chat/ProfileLink'
import SearchInput from '@/blocks/chat/SearchInput'
import './style.css'
// import {ChatLinkData} from '@/blocks/chat/ChatLink'

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
  // TODO: переписать
  constructor(data: object) {
    super({...data, profileLink, searchInput})
    this._template = template
    this.init()
  }
}
