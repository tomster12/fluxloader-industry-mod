/** @typedef {import('../corelib/entry.electron.js')} */

corelib.elements.registerElement({
	id: "CompressedSand",
	name: "Compressed Sand",
	colors: [
		[100, 80, 57, 255], // rgb(100, 80, 57)
		[82, 74, 50, 255], // rgb(82, 74, 50)
		[69, 63, 44, 255], // rgb(69, 63, 44)
	],
	density: 600,
	interactsWithHoverText: ["↔️"],
	matterType: "Slushy"
});

corelib.elements.registerElement({
	id: "GaseousSand",
	name: "Gaseous Sand",
	colors: [
		[164, 129, 86, 180], // rgb(164, 129, 86)
		[190, 150, 100, 180], // rgb(190, 150, 100)
		[173, 133, 83, 180], // rgb(173, 133, 83)
	],
	density: 20,
	interactsWithHoverText: ["🚫"],
	matterType: "Gas",
	addToFilterList: false,
});

corelib.elements.registerElement({
	id: "Smog",
	name: "Smog",
	colors: [
		[23, 23, 23, 150], // rgb(23, 23, 23)
		[39, 39, 37, 150], // rgb(39, 39, 37)
		[34, 34, 33, 150], // rgb(34, 34, 33)
		[35, 35, 35, 150], // rgb(35, 35, 35)
	],
	density: 30,
	interactsWithHoverText: ["🫧"],
	matterType: "Gas",
	addToFilterList: false,
});

corelib.elements.registerElement({
	id: "CompressedGold",
	name: "Compressed Gold",
	colors: [
		[247, 244, 204, 255], // rgb(247, 246, 230)
		[255, 254, 199, 255], // rgb(248, 247, 170)
		[233, 226, 140, 255], // rgb(248, 241, 169)
	],
	density: 350,
	interactsWithHoverText: ["🚫"],
	matterType: "Solid"
});

corelib.elements.registerElement({
	id: "CompressedSlag",
	name: "Compressed Slag",
	colors: [
		[188, 219, 238, 255], // rgb(188, 219, 238)
		[132, 186, 220, 255], // rgb(132, 186, 220)
		[162, 205, 232, 255], // rgb(162, 205, 232)
		[152, 215, 255, 255], // rgb(152, 215, 255)
	],
	density: 400,
	interactsWithHoverText: ["🌋"],
	matterType: "Solid"
});

corelib.elements.registerElement({
	id: "CompressedMeltedSlag",
	name: "Compressed Melted Slag",
	colors: [
		[46, 71, 85, 255], // rgb(46, 71, 85)
		[47, 57, 62, 255], // rgb(47, 57, 62)
		[27, 33, 37, 255], // rgb(27, 33, 37)
	],
	density: 500,
	interactsWithHoverText: ["⬇️"],
	matterType: "Slushy"
});

corelib.elements.registerElement({
	id: "CompressedSpore",
	name: "Compressed Spore",
	colors: [
		[110, 212, 90, 255], // rgb(128, 215, 111)
		[138, 235, 118, 255], // rgb(138, 235, 118)
		[133, 239, 112, 255], // rgb(133, 239, 112)
	],
	density: 450,
	interactsWithHoverText: ["💧"],
	matterType: "Solid"
});

corelib.elements.registerElement({
	id: "CompressedWetSpore",
	name: "Compressed Wet Spore",
	colors: [
		[86, 154, 72, 255], // rgb(86, 134, 76)
		[74, 121, 65, 255], // rgb(74, 121, 65)
		[66, 104, 59, 255], // rgb(76, 116, 69)
	],
	density: 550,
	interactsWithHoverText: ["🚫"],
	matterType: "Solid"
});


corelib.blocks.register({
	sourceMod: "industrytesting",
	id: "compressor",
	name: "Compressor",
	description: "Compresses sand to a superdense form, requires a powerful fuel.",
	imagePath: "assets/compressor",
	shape: [
		[3, 0, 0, 3],
		[3, 3, 3, 3],
		[3, 3, 3, 3],
		[3, 0, 0, 3],
	],
	angles: [0],
	singleBuild: true,
	hasConfigMenu: false,
	unlockedByDefault: true,
	tickInterval: 100
});

corelib.blocks.register({
	sourceMod: "industrytesting",
	id: "sublimator",
	name: "Sublimator",
	description: "Sublimates sand into a gaseous state using intense heat and industrial pressure.",
	imagePath: "assets/sublimator",
	shape: [
		[3, 3, 3, 3],
		[0, 3, 3, 0],
		[3, 3, 3, 3],
		[3, 0, 0, 3],
	],
	angles: [0],
	singleBuild: true,
	hasConfigMenu: false,
	unlockedByDefault: true,
	tickInterval: 100
});

corelib.recipes.registerShakerAllows("CompressedGold");
corelib.recipes.registerShakerAllows("Gloom");

corelib.recipes.registerShakerRecipe({
	input: "CompressedSand",
	outputAbove: [
		["CompressedSlag", 1]
	],
	outputBelow: [
		["CompressedGold", 0.25],
		["Gold", 1.0],
		["Gloom", 0.1]
	],
});

corelib.recipes.registerBasicRecipe({
	inputTop: "CompressedSlag",
	inputBottom: "Lava",
	outputTop: "CompressedMeltedSlag",
	outputBottom: "Empty",
	bothWays: true
});

corelib.recipes.registerPressRecipe({
	input: "CompressedMeltedSlag",
	outputs: [
		["Lava", 1],
		["CompressedSpore", 1],
		["CompressedGold", 1],
		["Gloom", 0.1]
	],
});

corelib.recipes.registerBasicRecipe({
	inputTop: "CompressedSpore",
	inputBottom: "Water",
	outputTop: "CompressedWetSpore",
	outputBottom: "Steam",
	bothWays: true
});

corelib.recipes.registerPressRecipe({
	input: "CompressedGold",
	outputs: [
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
		["Gold", 1],
	],
});
