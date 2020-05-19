const attributes = {
	block_id: {
		type: "string"
	},
	question: {
		type: "string",
		default: "What is FAQ?"
	},
	answer: {
		type: "string",
		default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
	},
	icon: {
		type: "string",
		default: "fas fa-plus"
	},
	iconActive: {
		type: "string",
		default: "fas fa-minus"
	},
	layout : {
		type: "string",
		default: "accordion"
	}

}

export default attributes
