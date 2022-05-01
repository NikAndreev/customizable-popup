document.addEventListener('DOMContentLoaded', function(){

	class Popup {
		#content
		#popupEl
		#popupClasses
		#bodyClasses
		#contentClasses
		#closeClasses

		constructor(config) {
			this.#content = config.content
			this.#popupClasses = config.popupClasses || []
			this.#bodyClasses = config.bodyClasses || []
			this.#contentClasses = config.contentClasses || []
			this.#closeClasses = config.closeClasses || []

			this.#create()
			this.#setHandlers()
			this.#render()
		}

		show() {
			this.#popupEl.classList.add('active')
			document.body.classList.add('lock')
		}

		hide() {
			this.#popupEl.classList.remove('active')
			document.body.classList.remove('lock')
		}

		remove() {
			this.hide()
			this.destroy()
		}

		destroy () {
			this.#popupEl.remove()
			document.removeEventListener('keydown', this.#escKeyDownHandler)
		}

		#create() {
			const newEl = document.createElement('div')
			newEl.innerHTML = this.#getPopupHtml()
			this.#popupEl = newEl.firstElementChild
		}

		#render() {
			document.body.appendChild(this.#popupEl)
		}

		#setHandlers() {
			this.#setCloseBtnClickHandler()
			this.#setDocumentClickHandler()
			this.#setEscKeydownHandler()
		}

		#setCloseBtnClickHandler() {
			this.#popupEl.querySelector('[data-popup-close]').addEventListener('click', ()=> this.remove())
		}

		#setDocumentClickHandler() {
			this.#popupEl.addEventListener('click', event => {
				if (!event.target.closest('[data-popup-content]')) {
					this.remove()
				}
			})
		}

		#setEscKeydownHandler() {
			document.addEventListener('keydown', event => this.#escKeyDownHandler(event))
		}

		#escKeyDownHandler(event) {
			if (event.key === 'Escape' || event.key === 'Esc') {
				this.remove()
			}
		}

		#getPopupHtml() {
			return `<div class="popup ${this.#popupClasses.join(' ')}">
								<div class="popup__body ${this.#bodyClasses.join(' ')}">
									<div class="popup__content ${this.#contentClasses.join(' ')}" data-popup-content>
										${this.#content}
										<span class="popup__close ${this.#closeClasses.join(' ')}" data-popup-close></span>
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
								</div>`
		}).show()
	})
	
})
