const attributes = {
	block_id: {
		type: "string"
	},
	align: {
		type: "string",
	},
	src:{
		type: "string"
	},
	imgSize:{
		type: "string",
		default: "thumbnail",
	},
	borderStyle : {
		type: "string",
		default: "none"
	},
	borderWidth : {
		type: "number",
		default: 0
	},
	borderRadius : {
		type: "number"
	},
	borderColor : {
		type: "string"
	},
	vPadding: {
		type: "number",
		default:0 
	},
	hPadding: {
		type: "number",
		default:0 
	},
	paddingType :{
		type: "string",
		default: "px",
	},
	marginType :{
		type: "string",
		default: "px",
	},
	vMargin: {
		type: "number",
	},
	hMargin: {
		type: "number",
	},
	backgroundColor: {
		type: "string",
	},
}

export default attributes
