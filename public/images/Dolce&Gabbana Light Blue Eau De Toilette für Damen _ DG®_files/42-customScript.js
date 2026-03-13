!function ($) {
	function checkChatTab() {
		const insideHolder = document.getElementById('inside_holder');
		if (insideHolder) {
			insideHolder.classList[$('#inside_liveChatTab').is(':visible') ? 'add' : 'remove']('chatTabVisible');
		}
	}

	function setupChatOverlap() {
		function checkChatTabOverlap() {
			const insideHolder = document.getElementById('inside_holder');
			if (insideHolder) insideHolder.classList.remove('otherTabVisible');
			/* find tabs */
			let botCont = document.querySelector("on-chat-bot-client");
			if (!botCont) return;
			if (insideHolder) insideHolder.classList.add('otherTabVisible');
			let botTab = botCont.shadowRoot.querySelector(".open-chat-button");
			if (!botTab) return;
			let chatTab = document.querySelector("#inside_liveChatTab");
			if (!chatTab || chatTab.style.display == "none") return;

			// check if they overlap
			if (doElementsOverlap(chatTab, botTab)) {
				let botRect = botTab.getBoundingClientRect();
				let chatRect = chatTab.getBoundingClientRect();
				let yoffset = botRect.top - chatRect.top - chatRect.height - 5;
				chatTab.style.transform = "translateY(" + yoffset + "px)";
			}
		}

		function doElementsOverlap(el1, el2) {
			const rect1 = el1.getBoundingClientRect();
			const rect2 = el2.getBoundingClientRect();

			return !(
				rect1.right < rect2.left ||
				rect1.left > rect2.right ||
				rect1.bottom < rect2.top ||
				rect1.top > rect2.bottom
			);
		}

		//every second, check if there's an overlap with the chat tab and the bot tab.
		let checkInt = setInterval(checkChatTabOverlap, 1000);
	}

	_insideGraph.defer(() => {
		const insideTab = document.getElementById('inside_tabs');
		const observer = new MutationObserver(checkChatTab);
		observer.observe(insideTab, {
			attributes: true,
			childList: true,
			subtree: true
		});

		checkChatTab();
		setupChatOverlap();
	}, () => {
		return document.getElementById('inside_tabs');
	});


	insideFrontInterface.chat.isOfflineTabHiddenOnThisDevice = function () {
		const device = _insideGraph.jQuery.inside.front.device;
		const settings = insideFrontInterface.chatSettings;
		if (typeof settings.offline.hideOnDevices != "undefined" && settings.offline.hideOnDevices != null) {
			if (settings.offline.hideOnDevices.indexOf(device.toString()) != -1) {
				return true;
			}
		} else if (settings.offline.hideTab) {
			return true;
		}
		return false;
	}

	let tabShown = false;
	function checkAvailableAssistants() {
		if (tabShown) return;

		const available = insideFrontInterface.getAvailableAssistants().length > 0;
		const isTabHidden = insideFrontInterface.chat.isTabHiddenOnThisDevice();
		const isOfflineEnabled = insideFrontInterface.chatSettings.offline.enabled;
		const isOfflineTabHidden = insideFrontInterface.chat.isOfflineTabHiddenOnThisDevice();

		let label = '';
		if (available && !isTabHidden) {
			label = 'Online';
		} else if (!available && isOfflineEnabled && !isOfflineTabHidden) {
			label = 'Offline';
		}

		if (label) {
			tabShown = true;
			$.inside.ga({
				category: "Inside : Chat Tab",
				action: "View",
				label: label
			});
		}
	}

	insideFrontInterface.bind("assistants", checkAvailableAssistants);
	setTimeout(checkAvailableAssistants, 2000);

}(_insideGraph.jQuery)