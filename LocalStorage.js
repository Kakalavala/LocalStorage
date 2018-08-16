// Local Storage v4.0.0
// Written by Kakalavala

/**
 * Current version of the LocalStorage API.
 * @const {string}
 */
const _lsVersion = "4.0.0";
/**
 * The maximum storage of LocalStorage in Kilobytes.
 * 10MB is the maximum imposed by Chrome, Firefox, and Opera.
 * @const {number}
 */
const maxStorage = 10000;
/**
 * The current total size of LocalStorage.
 * Cannot be set by the user. Automatically set by the API.
 */
var totalStorage = 0;

(function() {
	if (typeof(Storage) !== "undefined")
		setInterval(function() {
			totalStorage = localStorage.length;
		}, 200);
	else {
		console.error("Local Storage is not supported on your browser!");
		return false;
	}
}());

/**
 * Replaces all spaces with underscores.
 * @return {string}
 */
String.prototype._fix = function() {
	return this.split(' ').join('_');
};

/**
 * Ensures inputted Object is a valid and usable String.
 * @param {string} nm
 * @return {boolean}
 */
function _verify(nm) {
	return (typeof(nm) === "string" && nm.trim().length > 0);
}

/**
 * Stores data into the Local Storage under the name "<prefix>.<dataName>".
 * @param {string} prefix
 * @param {string} dataName
 * @param {Object} data
 */
function storeData(prefix, dataName, data) {
	if (_verify(prefix) && _verify(dataName)) {
		prefix = prefix._fix() + ".";
		dataName = dataName._fix();

		localStorage.setItem(prefix + dataName, data);
	}
}

/**
 * Removes data from Local Storage.
 * @param {string} prefix
 * @param {string} dataName
 */
function removeData(prefix, dataName) {
	if (_verify(prefix) && _verify(dataName)) {
		prefix = prefix._fix() + ".";
		dataName = dataName._fix();

		localStorage.removeItem(prefix + dataName);
	}
}

/**
 * Checks if data exists; returns true if exists, otherwise false.
 * @param {string} prefix
 * @param {string} dataName
 */
function dataExists(prefix, dataName) {
	if (_verify(prefix) && _verify(dataName)) {
		prefix = prefix._fix() + ".";
		dataName = dataName._fix();

		return (localStorage.getItem(prefix + dataName) != null);
	}
}

/**
 * Get data from local storage if it exists.
 * @param {string} prefix
 * @param {string} dataName
 * @param {boolean=} asArray
 */
function getData(prefix, dataName, asArray) {
	if (_verify(prefix) && _verify(dataName)) {
		let item = null;
		let _item = null;

		prefix = prefix._fix() + ".";
		dataName = dataName._fix();
		item = localStorage.getItem(prefix + dataName);

		if (item != null) {
			_item = item.toLowerCase();

			if (asArray)
				return item.split(",");

			switch (_item) {
				case "true":
					return true;
				case "false":
					return false;
				case "null":
					return null;
				case "undefined":
					return undefined;
				case "nan":
					return NaN;
			}

			if (!isNaN(item))
				return Number(item);
			else return item;
		}
	}
}

/**
 * Lists all data stored to a prefix.
 * Returns array of data.
 * @param {string} prefix
 * @return {Object}
 */
function getAllData(prefix) {
	if (_verify(prefix)) {
		let allData = [];
		let keys = Object.keys(localStorage);
		let vals = Object.values(localStorage);

		prefix = prefix._fix() + ".";

		for (let i = 0; i < keys.length; i += 1) {
			if (keys[i].startsWith(prefix))
				allData.push([keys[i], vals[i]]);
		}

		return allData;
	}
}

/**
 * Gets all prefixes.
 * Returns array of Strings.
 * @return {Object}
 */
function getPrefixes() {
	let keys = Object.keys(localStorage);
	let pfx = [], _pr = null;

	for (let i = 0; i < keys.length; i += 1) {
		_pr = keys[i].substr(0, keys[i].indexOf("."));

		if (!pfx.includes(_pr))
			pfx.push(_pr);
	}

	return pfx;
}
/**
 * Remove all data tied to a prefix.
 * @param {string} prefix
 * @param {boolean=} isSure
 */
function purgeDataByPrefix(prefix, isSure) {
	if (_verify(prefix)) {
		if (!isSure) 
			isSure = (window.confirm("Are you sure you want to purge all data of the prefix [" + prefix + "] ?"));

		let amt = this.getAllData(prefix).length;
		let msg = "Cleared " + amt + " stored item" + ((amt > 0) ? "s." : ".");

		prefix = prefix._fix() + ".";

		if (amt > 0) {
			let keys = Object.keys(localStorage);
			let dn = null;

			for (let i = 0; i < keys.length; i += 1) {
				dn = keys[i];

				if (dn.startsWith(prefix)) {
					dn = dn.substr(prefix.length, dn.length).trim();
					removeData(prefix.substr(0, prefix.length - 1), dn);
				}
			}

			console.warn(msg);
		}
	}
}

/**
 * Gets size (in KB) of prefix's Local Storage.
 * @param {string} prefix
 * @param {boolean=} asNum
 * @param {boolean=} putKB
 * @return {number}
 */
function getSizeByPrefix(prefix, asNum, putKB) {
	if (_verify(prefix)) {
		let _ls = 0, _xl = 0, _x = null, _sums = [], _sum = 0;
		prefix = prefix._fix() + ".";

		for (_x in localStorage) {
			if (_x.startsWith(prefix)) {
				_xl = (localStorage[_x].length + _x.length) * 2;
				_ls += _xl;
				_sums.push((_xl / 1024).toFixed(2));
			}
		}

		for (let i = 0; i < _sums.length; i += 1)
			_sum += parseFloat(_sums[i]);

		_sum = _sum.toFixed(2);

		return (asNum) ? parseFloat(_sum) : _sum + ((putKB) ? " KB" : "");
	}
}

/**
 * Gets size of all prefix's Local Storage (in KB).
 * @param {boolean=} asNum
 * @param {boolean=} putKB
 * @return {number}
 */
function getTotalSize(asNum, putKB) {
	let pfx = this.getPrefixes();
	let s = 0;

	for (let i = 0; i < pfx.length; i += 1)
		s += this.getSizeByPrefix(pfx[i], true, false);

	return (asNum) ? parseFloat(s) : s + ((putKB) ? " KB" : "");
}
