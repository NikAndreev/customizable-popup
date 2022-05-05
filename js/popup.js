document.addEventListener('DOMContentLoaded', function(){

	class Popup {
		constructor(config) {
			this._content = config.content || ''
			this._id = config.id || ''
			this._popupClasses = config.popupClasses || []
			this._bodyClasses = config.bodyClasses || []
			this._contentClasses = config.contentClasses || []
			this._closeClasses = config.closeClasses || []

			this._escKeyDownHandler = this._escKeyDownHandler.bind(this)
			
			this.remove = this.remove.bind(this)

			this._create()
			this._setHandlers()
			this._render()

			if (config.callback && typeof config.callback === 'function') {
				config.callback()
			}
		}

		show() {
			this._popupEl.classList.add('active')
			document.body.classList.add('lock')
		}

		hide() {
			this._popupEl.classList.remove('active')
			document.body.classList.remove('lock')
		}

		remove() {
			this.hide()
			this.destroy()
		}

		destroy() {
			this._popupEl.remove()

			this._content = null
			this._popupEl = null
			this._id = null
			this._popupClasses = null
			this._bodyClasses = null
			this._contentClasses = null
			this._closeClasses = null

			document.removeEventListener('keydown', this._escKeyDownHandler)
		}

		_create() {
			const newEl = document.createElement('div')
			newEl.innerHTML = this._getPopupHtml()
			this._popupEl = newEl.firstElementChild
		}

		_render() {
			document.body.appendChild(this._popupEl)
		}

		_setHandlers() {
			this._setCloseBtnClickHandler()
			this._setDocumentClickHandler()
			this._setEscKeydownHandler()
		}

		_setCloseBtnClickHandler() {
			this._popupEl.querySelectorAll('[data-popup-close]').forEach( btn => {
				btn.addEventListener('click',  this.remove)
			})  
		}

		_setDocumentClickHandler() {
			this._popupEl.addEventListener('click', event => {
				if (!event.target.closest('[data-popup-content]')) {
					this.remove()
				}
			})
		}

		_setEscKeydownHandler() {
			document.addEventListener('keydown', this._escKeyDownHandler)
		}

		_escKeyDownHandler(event) {
			if (event.key === 'Escape' || event.key === 'Esc') {
				this.remove()
			}
		}

		_getPopupHtml() {
			return `<div class="popup ${this._popupClasses.join(' ')}" ${this._id ? `id="${this._id}"` : ''}>
								<div class="popup__body ${this._bodyClasses.join(' ')}">
									<div class="popup__content ${this._contentClasses.join(' ')}" data-popup-content>
										${this._content}
										<button class="popup__close ${this._closeClasses.join(' ')}" data-popup-close></button>
									</div>
								</div>
							</div>`
		}
	}	

	document.querySelector('[data-open-popup]').addEventListener('click', ()=> {
		new Popup({
			content: `<div class="popup__title">Hi!</div>
								<div class="popup__text">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, aspernatur deleniti. Soluta nostrum id libero nobis possimus eveniet magni neque incidunt sunt pariatur, quisquam iste aliquid repudiandae sapiente delectus amet omnis, accusamus exercitationem. Illum voluptatem magni excepturi mollitia incidunt, enim doloremque accusamus voluptatibus distinctio facere quas corporis dolorum ipsam quae, minus tempore voluptas saepe reiciendis. Autem at voluptatem esse. Iusto deserunt rerum deleniti, quisquam dignissimos officiis debitis obcaecati repellendus quae, sit cum laboriosam maxime atque delectus saepe eveniet, a itaque eligendi quos. Asperiores, dolorem inventore doloremque maiores soluta optio iusto esse perspiciatis, provident numquam mollitia quae ratione maxime dolore quos.
								</div>
								<button data-popup-close>Close</button>`
		}).show()
	})
	
})
