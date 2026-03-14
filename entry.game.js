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

function isRangeBlocked(px, py, sx, sy) {
	for (let x = 0; x < sx; x++) {
		for (let y = 0; y < sy; y++) {
			if (!corelib.exposed.raw.tf(fluxloaderAPI.gameInstance.state, px + x, py + y)) return;
		}
	}
}

function getCellElement(x, y) {
	let id = corelib.exposed.raw.rf(fluxloaderAPI.gameInstance.state, x, y);
	if (id == null) return null;
	return corelib.utils.getParticleNameFromNumber(id);
}

function checkAndGetRangeCongruentElement(px, py, sx, sy) {
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

	// Do not continue if we are blocked
	if (isRangeBlocked(block.x - 2, block.y, 2, 4)) return;

	// Do not continue if we dont have fuel
	if (getCellElement(block.x + 1, block.y) != "Gloom") return;

	// Produce smog to show it is ready, and to cause issues for the user
	let smogChance = 0.2 / (8 * ticksPerSecond);
	for (let x = 0; x < 2; x++) {
		for (let y = 0; y < 4; y++) {
			if (Math.random() < smogChance) {
				corelib.simulation.spawnElement({ x: block.x - 1 - x, y: block.y + y, id: "Smog" });
			}
		}
	}

	// Check the input area has a single congruent element
	const inputEl = checkAndGetRangeCongruentElement(block.x + 4, block.y, 4, 4);
	if (inputEl == null) return;

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
		corelib.simulation.spawnParticle({ x: block.x + 1, y: block.y + 4, id: "CompressedSand" });
	}
});

fluxloaderAPI.events.on("corelib:block-sublimator", (block) => {
	if (block.sublimatorStorage == null) block.sublimatorStorage = {};
	const tickInterval = 100;
	const ticksPerSecond = 1000 / tickInterval;
	const dt = 1.0 / ticksPerSecond;

	// Arbitrary amount we want to offgas each second
	let offgasPerTick = 25 / ticksPerSecond;

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
	if (isRangeBlocked(block.x, block.y - 1, 4, 1)) return;

	// Do not continue if we dont have fuel
	if (getCellElement(block.x, block.y + 1) != "Lava") return;

	// Ensure there is an input element
	const inputEl = getCellElement(block.x + 3, block.y + 1);
	if (inputEl == null) return;

	// Check the steam input is full
	const steamInputEl = checkAndGetRangeCongruentElement(block.x + 1, block.y + 3, 2, 1);
	if (steamInputEl != "Steam") return;

	// Every 1s consume lava, steam, input, and store output
	if (tickTimer(block, "sublimationTimer", dt, 1)) {
		corelib.simulation.setCell(block.x, block.y + 1, 0);
		corelib.simulation.setCell(block.x + 3, block.y + 1, 0);
		for (let x = 0; x < 2; x++) {
			corelib.simulation.setCell(block.x + 1 + x, block.y + 3, 0);
		}
		const outputEl = "GaseousSand";
		if (!Object.hasOwn(block.sublimatorStorage, outputEl)) block.sublimatorStorage[outputEl] = 0;
		block.sublimatorStorage[outputEl] += 6;
	}
});
