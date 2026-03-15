/** @typedef {import('../corelib/entry.electron.js')} */

corelib.elements.registerElement({
	id: "CompressedSand",
	name: "Compressed Sand",
	colors: [
		[136, 112, 84, 255], // rgb(136, 112, 84)
		[131, 111, 81, 255], // rgb(131, 111, 81)
		[116, 101, 73, 255], // rgb(116, 101, 73)
	],
	density: 200,
	interactsWithHoverText: ["☁️", "⏫ (Decompressor)"],
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
	density: 10,
	interactsWithHoverText: ["🌸 (Amethelis)"],
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
	density: 20,
	interactsWithHoverText: ["🪟 (Sublimator)"],
	matterType: "Gas",
	addToFilterList: false,
});

corelib.elements.registerElement({
	id: "CompressedWetSand",
	name: "Compressed Wet Sand",
	colors: [
		[76, 62, 44, 255], // rgb(76, 62, 44)
		[69, 61, 47, 255], // rgb(69, 61, 47)
		[64, 60, 43, 255], // rgb(64, 60, 43)
	],
	density: 200,
	interactsWithHoverText: ["↔️", "⏫ (Decompressor)"],
	matterType: "Slushy"
});

corelib.elements.registerElement({
	id: "CompressedGold",
	name: "Compressed Gold",
	colors: [
		[247, 246, 230, 255], // rgb(247, 246, 230)
		[255, 254, 218, 255], // rgb(255, 254, 218)
		[244, 239, 186, 255], // rgb(244, 239, 186)
	],
	density: 350,
	interactsWithHoverText: ["⏫ (Decompressor)"],
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
	density: 150,
	interactsWithHoverText: ["🌋", "⏫ (Decompressor)"],
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
	density: 250,
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
	density: 50,
	interactsWithHoverText: ["💧", "⏫ (Decompressor)"],
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
	density: 75,
	interactsWithHoverText: ["⏫ (Decompressor)"],
	matterType: "Solid"
});

corelib.elements.registerElement({
	id: "InfusedSand",
	name: "Infused Sand",
	colors: [
		[236, 216, 189, 220], // rgb(236, 216, 189)
		[221, 184, 234, 220], // rgb(221, 184, 234)
		[215, 192, 225, 220], // rgb(215, 192, 225)
	],
	density: 30,
	interactsWithHoverText: ["⏬ (Compressor)"],
	matterType: "Wisp"
});

corelib.elements.registerElement({
	id: "CompressedGloom",
	name: "Compressed Void Bloom",
	colors: [
		[26, 13, 36, 220], // rgb(26, 13, 36)
		[33, 15, 46, 220], // rgb(33, 15, 46)
		[35, 19, 47, 220], // rgb(35, 19, 47)
	],
	density: 40,
	interactsWithHoverText: ["⏫ (Decompressor)"],
	matterType: "Slushy"
});

corelib.blocks.register({
	sourceMod: "industrytesting",
	id: "compressor",
	name: "Compressor",
	description: "Super compresses sand, but requires a powerful fuel.",
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
	description: "Sublimates sand into a gas with intense heat and industrial pressure.",
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

corelib.blocks.register({
	sourceMod: "industrytesting",
	id: "decompressor",
	name: "Decompressor",
	description: "Slowly decompresses most materials.",
	imagePath: "assets/decompressor",
	shape: [
		[3, 3, 3, 3],
		[0, 3, 3, 0],
		[0, 3, 3, 0],
		[0, 0, 0, 0],
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
	input: "CompressedWetSand",
	outputAbove: [
		["CompressedSlag", 1]
	],
	outputBelow: [
		["CompressedGold", 0.25],
		["Gold", 1.0],
		["Gloom", 0.2]
	],
});

corelib.recipes.registerBasicRecipe({
	inputTop: "CompressedSand",
	inputBottom: "Steam",
	outputTop: "CompressedWetSand",
	outputBottom: "CompressedWetSand",
	bothWays: true
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
		["Gloom", 0.2]
	],
});

corelib.recipes.registerBasicRecipe({
	inputTop: "CompressedSpore",
	inputBottom: "Water",
	outputTop: "CompressedWetSpore",
	outputBottom: "Steam",
	bothWays: true
});

corelib.recipes.registerBasicRecipe({
	inputTop: "Petalium",
	inputBottom: "GaseousSand",
	outputTop: "InfusedSand",
	outputBottom: "InfusedSand",
	bothWays: true
});

fluxloaderAPI.setPatch("js/bundle.js", "industrytesting:interactions-1", {
	type: "replace",
	from: `name:"Sand",interactions:["💧"`,
	to: `~,"⏬ (Compressor)","🪟 (Sublimator)"`,
	token: "~"
});

fluxloaderAPI.setPatch("js/bundle.js", "industrytesting:interactions-2", {
	type: "replace",
	from: `name:"Amethelis",interactions:["🌄 (Redsand)"`,
	to: `~,"🧋 (Gaseous Sand)"`,
	token: "~"
});

fluxloaderAPI.setPatch("js/bundle.js", "industrytesting:interactions-3", {
	type: "replace",
	from: `name:"Voidbloom",interactions:["🔮 (Flux Emanator)"`,
	to: `~,"⏬ (Compressor)"`,
	token: "~"
});

corelib.tech.register({
	id: "AdvancedRefining1",
	name: "Advanced Refining 1",
	description: "Unlocks the Compressor and Decompressor.",
	parent: "Refining4",
	cost: 10e3,
	unlocks: { structures: [ "d.compressor", "d.decompressor" ] }
});

corelib.tech.register({
	id: "AdvancedRefining2",
	name: "Advanced Refining 2",
	description: "Unlocks the Sublimator.",
	parent: "AdvancedRefining1",
	cost: 15e3,
	unlocks: { structures: [ "d.sublimator" ] }
});
