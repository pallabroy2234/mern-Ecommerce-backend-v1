const {Schema, model} = require("mongoose");

const bannerSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		link: {
			type: String,
			required: true,
		},
		banner: {
			type: String,
			required: true,
		},
	},
	{timestamps: true},
);

const BannerModal = model("banners", bannerSchema);

module.exports = BannerModal;
