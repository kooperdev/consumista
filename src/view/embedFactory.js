module.exports.embedFactory = function(title
    , color, 
    site, authorName = undefined, 
    autorIcon = undefined, 
    autorSite = undefined, 
    description = undefined,
    thumbnailUrlImage = undefined,
    fields = undefined,
    imageUrl = undefined,
    footerText= undefined,
    footerIcon)  {
    return {
	color,
	title,
	url: site,
	author: {
		name: authorName,
		icon_url: autorIcon,
		url: autorSite,
	},
	description: description,
	thumbnail: {
		url: thumbnailUrlImage,
	},
	fields,
	image: {
		url: imageUrl,
	},
	timestamp: undefined,
	footer: {
		text: footerText,
		icon_url: footerIcon,
	},
    }
};