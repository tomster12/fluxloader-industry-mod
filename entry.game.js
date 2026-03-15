/** @typedef {import('../corelib/entry.game.js')} */

function tickTimer(obj, name, dt, duration) {
	if (obj[name] == null) obj[name] = 0;
	obj[name] += 1 / dt;
	if (obj[name] > duration) {
		obj[name] = 0;
		return true;
	}
	return false;
}

function getCellElement(x, y) {
	let id = corelib.exposed.raw.rf(fluxloaderAPI.gameInstance.state, x, y);
	if (id == null) return null;
	return corelib.utils.getParticleNameFromNumber(id);
}

function isRangeFullyBlocked(px, py, sx, sy) {
	for (let x = 0; x < sx; x++) {
		for (let y = 0; y < sy; y++) {
			if (corelib.exposed.raw.tf(fluxloaderAPI.gameInstance.state, px + x, py + y)) return false;
		}
	}
	return true;
}

function isRangeFullOfSingleElement(px, py, sx, sy) {
	// If every cell in a range is 1 type of element then return that
	// Otherwise return null (empty or mismatch)
	let foundId = null;
	for (let x = 0; x < sx; x++) {
		for (let y = 0; y < sy; y++) {
			const cellId = corelib.exposed.raw.rf(fluxloaderAPI.gameInstance.state, px + x, py + y);
			if (cellId == null) return null;
			if (foundId != null && foundId != cellId) return null;
			foundId = cellId;
		}
	}
	return corelib.utils.getParticleNameFromNumber(foundId);
}

fluxloaderAPI.events.on("corelib:block-compressor", (block) => {
	const tickInterval = 100;
	const ticksPerSecond = 1000 / tickInterval;
	const dt = 1 / ticksPerSecond;

	const mapping = {
		"Sand": "CompressedSand",
		"InfusedSand": "CompressedGloom"
	};

	// Do not continue if we are fully blocked
	if (isRangeFullyBlocked(block.x - 1, block.y, 1, 4)) return;

	// Do not continue if we dont have fuel
	if (getCellElement(block.x + 1, block.y) != "Gloom") return;

	// Ensure there is an input element that we can process
	const inputEl = isRangeFullOfSingleElement(block.x + 4, block.y, 4, 4);
	if (inputEl == null) return;
	if (!Object.hasOwn(mapping, inputEl)) return;
	const outputEl = mapping[inputEl];

	if (tickTimer(block, "compressionTimer", dt, 2)) {
		// Delete input, delete fuel, produce smog, produce output
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				corelib.simulation.setCell(block.x + 4 + x, block.y + y, 0);
			}
		}
		corelib.simulation.setCell(block.x + 1, block.y, 0);
		for (let y = 0; y < 4; y++) {
			if (corelib.exposed.raw.tf(fluxloaderAPI.gameInstance.state, block.x - 1, block.y + y)) {
				corelib.simulation.spawnElement({ x: block.x - 1, y: block.y + y, id: "Smog" });
			}
		}
		corelib.simulation.spawnElement({ x: block.x + 1, y: block.y + 4, id: outputEl });
	}
});

fluxloaderAPI.events.on("corelib:block-sublimator", (block) => {
	if (block.sublimatorStorage == null) block.sublimatorStorage = {};
	const tickInterval = 100;
	const ticksPerSecond = 1000 / tickInterval;
	const dt = 1.0 / ticksPerSecond;

	const mapping = { "Sand": "GaseousSand" };

	// Arbitrary amount we want to offgas each second
	let offgasPerTick = 30 / ticksPerSecond;

	if (Object.keys(block.sublimatorStorage).length > 0) {
		// Handle offgassing, considering multiple elements and >1 produced per tick
		// We want to keep going if we have luck and there is stuff to spawn
		let anyLeft = true;
		let offgasLuck = offgasPerTick;
		while (offgasLuck > 0 && anyLeft) {
			anyLeft = false;
			for (let key in block.sublimatorStorage) {
				if (block.sublimatorStorage[key] > 0) {
					// Consume the luck to try and spawn a particle
					const r = Math.random();
					offgasLuck -= r;
					if (offgasLuck > 0) {
						block.sublimatorStorage[key] -= 1;
						const dx = Math.floor(Math.random() * 4);
						const dy = Math.floor(Math.random() * 4);
						if (corelib.exposed.raw.tf(fluxloaderAPI.gameInstance.state, block.x + dx, block.y - 1 - dy)) {
							corelib.simulation.spawnElement({ x: block.x + dx, y: block.y - 1 - dy, id: key });
						}
					}
					anyLeft ||= block.sublimatorStorage[key] > 0;
				}
			}
		}
	}

	// Do not continue if we are blocked
	if (isRangeFullyBlocked(block.x, block.y - 5, 4, 4)) return;

	// Do not continue if we dont have fuel
	if (getCellElement(block.x, block.y + 1) != "Lava") return;

	// Ensure there is an input element that we can process, and we have space
	const inputEl = getCellElement(block.x + 3, block.y + 1);
	if (inputEl == null) return;
	if (!Object.hasOwn(mapping, inputEl)) return;
	const outputEl = mapping[inputEl];
	if (block.sublimatorStorage[outputEl] > 44) return;

	// Check the smog input is full
	const smogInputEl = isRangeFullOfSingleElement(block.x + 1, block.y + 3, 2, 1);
	if (smogInputEl != "Smog") return;

	// Every 2s consume lava, smog, input, and store output
	if (tickTimer(block, "sublimationTimer", dt, 2)) {
		corelib.simulation.setCell(block.x, block.y + 1, 0);
		corelib.simulation.setCell(block.x + 3, block.y + 1, 0);
		for (let x = 0; x < 2; x++) {
			corelib.simulation.setCell(block.x + 1 + x, block.y + 3, 0);
		}

		if (!Object.hasOwn(block.sublimatorStorage, outputEl)) block.sublimatorStorage[outputEl] = 0;
		block.sublimatorStorage[outputEl] += 8;
	}
});

fluxloaderAPI.events.on("corelib:block-decompressor", (block) => {
	if (block.decompressorStorage == null) block.decompressorStorage = {};
	const tickInterval = 100;
	const ticksPerSecond = 1000 / tickInterval;
	const dt = 1.0 / ticksPerSecond;

	const mapping = {
		"CompressedSand": "Sand",
		"CompressedWetSand": "WetSand",
		"CompressedGold": "Gold",
		"CompressedSlag": "Slag",
		"CompressedSpore": "Spore",
		"CompressedWetSpore": "WetSpore",
		"CompressedGloom": "Gloom"
	};

	const slots = [
		{ x: block.x + 0, y: block.y + 1 },
		{ x: block.x + 0, y: block.y + 2 },
		{ x: block.x + 0, y: block.y + 3 },
		{ x: block.x + 1, y: block.y + 3 },
		{ x: block.x + 2, y: block.y + 3 },
		{ x: block.x + 3, y: block.y + 3 },
		{ x: block.x + 3, y: block.y + 2 },
		{ x: block.x + 3, y: block.y + 1 }
	]

	// Arbitrary amount we want to output each second
	let outputPerTick = 5 / ticksPerSecond;

	if (Object.keys(block.decompressorStorage).length > 0) {
		// Handle outputting, considering multiple elements and >1 produced per tick
		// We want to keep going if we have luck and there is stuff to spawn
		let anyLeft = true;
		let outputLuck = outputPerTick;
		while (outputLuck > 0 && anyLeft) {
			anyLeft = false;
			for (let key in block.decompressorStorage) {
				if (block.decompressorStorage[key] > 0) {
					// Consume the luck to try and spawn a particle
					const r = Math.random();
					outputLuck -= r;
					if (outputLuck > 0) {
						const slot = slots[Math.floor(Math.random() * slots.length)];
						if (corelib.exposed.raw.tf(fluxloaderAPI.gameInstance.state, slot.x, slot.y)) {
							block.decompressorStorage[key] -= 1;
							corelib.simulation.spawnElement({ x: slot.x, y: slot.y, id: key });
						}
					}
					anyLeft ||= block.decompressorStorage[key] > 0;
				}
			}
		}
	}

	// Every 1s try and consume each input slot
	if (tickTimer(block, "decompressTimer", dt, 1)) {
		for (let dx = 0; dx < 4; dx++) {
			// Ensure there is an input element that we can process, and we have space
			const inputEl = getCellElement(block.x + dx, block.y - 1);
			if (inputEl == null) continue;
			if (!Object.hasOwn(mapping, inputEl)) continue;
			const outputEl = mapping[inputEl];
			if (block.decompressorStorage[outputEl] > 34) continue;

			// Consume input and store
			corelib.simulation.setCell(block.x + dx, block.y - 1, 0);
			if (!Object.hasOwn(block.decompressorStorage, outputEl)) block.decompressorStorage[outputEl] = 0;

			if (inputEl == "CompressedGloom") block.decompressorStorage[outputEl] += 8;
			else block.decompressorStorage[outputEl] += 16;
		}
	}
});

// Manage tech and inventory
function ensureBuildingUnlocked(shouldHave, buildings) {
	const buildingIds = buildings.map(b => corelib.utils.getBlockNameFromNumber(b));

	if (!shouldHave) {
		fluxloaderAPI.gameInstance.state.store.player.buildings =
			fluxloaderAPI.gameInstance.state.store.player.buildings.filter(b => !buildingIds.includes(b));
	}
	else {
		for (const id of buildingIds) {
			if (!fluxloaderAPI.gameInstance.state.store.player.buildings.includes(id)) {
				fluxloaderAPI.gameInstance.state.store.player.buildings.push(id);
			}
		}
	}
}

fluxloaderAPI.events.on("fl:scene-loaded", (scene) => {
	if (scene == "mainmenu") return;

	const unlocked1 = Object.hasOwn(fluxloaderAPI.gameInstance.state.store.player.tech, corelib.exposed.raw.w["AdvancedRefining1"]);
	const unlocked2 = Object.hasOwn(fluxloaderAPI.gameInstance.state.store.player.tech, corelib.exposed.raw.w["AdvancedRefining2"]);

	ensureBuildingUnlocked(unlocked1, ["compressor", "decompressor"]);
	ensureBuildingUnlocked(unlocked2, ["sublimator"]);
});
