// Local Storage [v3.0.1]
var _lsVersion = "3.0.1";

/** CHANGELOG [V3.0.1] **/
// + Added _$getSizes(asNum, putKB) method (to replace _getSizes(asNum, disLog))
// * _getSizes() to be deprecated.

/** CHANGELOG [v3.0.0] **/
// + Added maxStorage variable
// + Added _lsVersion variable
// * Made it so totalStorage is set onload, without affecting window.onload methods
// * Renamed isSupported() and verify() to support engine-naming scheme (_)
// + Added new prototype ._trimSpace()
// + Added new methods _setTotalStorage(), listKeys(), listValues(), listKeysByPrefix(),
//	   listValuesByPrefix(), listPrefixes(), listStringPrefixes(), getSizeByPrefix(), and _getLSVersion()
// + Added new Test Methods (_$)
// * Moved all debug_ methods out of the debug stage of development
// * Renamed Clear methods to Purge [purgeData() and purgeDataByPrefix()]
// * Allowed for getSize() and getSizeByPrefix() to toggle between Number and String [getSize(_asNum) | true = Number]

var totalStorage = 0;
var maxStorage = 10000;

document.addEventListener('DOMContentLoaded', function() {
	_setTotalStorage();
}, false);

function _isSupported() {
	if (typeof(Storage) !== "undefined") {
		_setTotalStorage();
		return true;
	} else {
		console.error("Local Storage is not supported on your browser!");
		return false;
	}
}

function _setTotalStorage() {
	totalStorage = localStorage.length;
}

function _getLSVersion() {
	return _lsVersion;
}

function _verify(txt) {
	return ((txt != undefined || txt != null) && txt.trim().length > 0 && typeof(txt) === "string");
}

String.prototype._trimSpace = function() {
	return this.split(' ').join('_');
};

function storeData(prefix, dataName, data) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix += ".";

		if (_verify(dataName)) {
			dataName = dataName._trimSpace();
			localStorage.setItem((prefix + dataName), data);
			_setTotalStorage();
		}
	}
}

function storeDataAsArray(prefix, dataName, data) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix += ".";

		if (_verify(dataName)) {
			dataName = dataName._trimSpace();
			localStorage.setItem((prefix + dataName), String(data).split(","));
			_setTotalStorage();
		}
	}
}

function removeData(prefix, dataName) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix += ".";

		if (_verify(dataName)) {
			dataName = dataName._trimSpace();
			localStorage.removeItem((prefix + dataName));
			_setTotalStorage();
		}
	}
}

function getData(prefix, dataName) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		var item;
		prefix += ".";

		if (_verify(dataName)) {
			dataName = dataName._trimSpace();
			item = localStorage.getItem((prefix + dataName));

			if (item != null || item != undefined) {
				if (item.toLowerCase() == "true" || item.toLowerCase() == "false")
					return (item.toLowerCase() == "true") ? true : false;
				else if (!isNaN(item)) return Number(item);
				else return item;
			} else return null;
		}
	}
}

function getDataAsArray(prefix, dataName) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		var item;
		prefix += ".";

		if (_verify(dataName)) {
			dataName = dataName._trimSpace();
			item = localStorage.getItem((prefix + dataName));

			if (item != null || item != undefined) return String(item).split(",");
			else return null;
		}
	}
}

function dataExists(prefix, dataName) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix += ".";

		if (_verify(dataName)) {
			dataName = dataName._trimSpace();
			return (localStorage.getItem((prefix + dataName)) != null);
		}
	}
}

function listData(){
	if (!_isSupported()) return null;

	var keys = Object.keys(localStorage);
	var vals = Object.values(localStorage);
	var ret = "\n";

	for (var i = 0; i < totalStorage; i += 1)
		ret += (keys[i] + " = " + vals[i] + "\n");

	return (ret + "\n");
}

function listDataByPrefix(prefix){
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix += ".";

		var keys = Object.keys(localStorage);
		var vals = Object.values(localStorage);
		var ret = "\n";

		for (var i = 0; i < keys.length; i += 1)
			if (keys[i].includes(prefix)) ret += (keys[i] + " = " + vals[i] + "\n");

		return (ret + "\n");
	}
}

function listKeys() {
	if (!_isSupported()) return null;

	var keys = Object.keys(localStorage);
	var ret = [];

	for (var i = 0; i < totalStorage; i += 1)
		ret.push(keys[i]);

	return ret;
}

function listValues() {
	if (!_isSupported()) return null;

	var vals = Object.values(localStorage);
	var ret = [];

	for (var i = 0; i < totalStorage; i += 1)
		ret.push(vals[i]);

	return ret;
}

function listKeysByPrefix(prefix) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix += ".";

		var keys = Object.keys(localStorage);
		var ret = [];

		for (var i = 0; i < keys.length; i += 1)
			if (keys[i].includes(prefix)) ret.push(keys[i]);

		return ret;
	}
}

function listValuesByPrefix(prefix) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix += ".";

		var keys = Object.keys(localStorage);
		var vals = Object.values(localStorage);
		var ret = [];

		for (var i = 0; i < vals.length; i += 1)
			if (keys[i].includes(prefix)) ret.push(vals[i]);

		return ret;
	}
}

function listPrefixes() {
	if (!_isSupported()) return null;

	var keys = Object.keys(localStorage);
	var pfx = [], pr;

	for (var i = 0; i < totalStorage; i += 1) {
		pr = keys[i].substring(0, keys[i].indexOf("."));

		if (!pfx.includes(pr)) pfx.push(pr);
	}

	return pfx;
}

function listStringPrefixes() {
	if (!_isSupported()) return null;

	var keys = Object.keys(localStorage);
	var pfx = [], pr;

	for (var i = 0; i < totalStorage; i += 1) {
		pr = keys[i].substring(0, keys[i].indexOf("."));

		if (!pfx.includes(pr)) pfx.push(pr);
	}

	pr = "\n";

	for (var i = 0; i < pfx.length; i += 1)
		pr += pfx[i] + "\n";

	return pr + "\n";
}

function getTotalByPrefix(prefix) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		prefix = (prefix + ".");
		var keys = Object.keys(localStorage);
		var cnt = 0;

		for(var i = 0; i < keys.length; i += 1)
			if(keys[i].includes(prefix)) cnt += 1;

		return cnt;
	}
}

function purgeData(_isSure) {
	if (!_isSupported()) return null;

	var msg = ("Cleared " + totalStorage + " stored item");

	if (_isSure) {
		if (totalStorage > 0) {
			if (totalStorage > 1) msg += "s";

			console.log(msg);

			localStorage.clear();
			_setTotalStorage();
		}
	}
}

function purgeDataByPrefix(prefix, _isSure) {
	if (!_isSupported()) return null;

	if (_isSure) {
		if (_verify(prefix)) {
			var amt = getTotalByPrefix(prefix);
			var msg = ("Cleared " + amt + " stored item");

			if (amt > 0) {
				if (amt > 1) msg += "s";

				prefix += ".";

				var keys = Object.keys(localStorage);
				var dataName = null;

				console.log(msg);

				for (var i = 0; i < keys.length; i += 1) {
					dataName = keys[i];

					if(dataName.startsWith(prefix)) {
						dataName = dataName.substring(prefix.length, dataName.length).trim();
						removeData(prefix.substring(0, (prefix.length - 1)), dataName);
					}
				}
			}
		}
	}
}

/** @deprecated Use _$getSizes() instead. **/
function getSizes(asNum, disLog) {
	if (!_isSupported()) return null;

	var _lsTotal = 0, _xLen, _x;

	for (_x in localStorage) {
		_xLen = ((localStorage[_x].length + _x.length) * 2);
		_lsTotal += _xLen;

		if (disLog) console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
	}

	return (asNum) ? Number.parseFloat(((_lsTotal / 1024)).toFixed(2)) : ((_lsTotal / 1024)).toFixed(2) + " KB";
}

function _$getSizes(asNum, putKB) {
	if (!_isSupported()) return null;

	let _sizes = []; // [Prefix, SizeKB]
	let _s = 0;

	for (let i = 0; i < listPrefixes().length; i += 1)
		_sizes.push([listPrefixes()[i], parseFloat(getSizeByPrefix(listPrefixes()[i]).substr(0, getSizeByPrefix(listPrefixes()[i]).indexOf(" KB")))]);

	for (let i = 0; i < _sizes.length; i += 1)
		_s += _sizes[i][1];

	_s = _s.toFixed(2);

	return (asNum) ? parseFloat(_s) : _s + ((putKB) ? " KB" : "");
}

function getSizeByPrefix(prefix, asNum) {
	if (!_isSupported()) return null;

	if (_verify(prefix)) {
		var _lsTotal = 0, _xLen, _x, _sums = [], _sum = 0;

		for (_x in localStorage) {
			if (_x.startsWith(prefix)) {
				_xLen = ((localStorage[_x].length + _x.length) * 2);
				_lsTotal += _xLen;

				_sums.push((_xLen / 1024).toFixed(2));
			}
		}

		for (var i = 0; i < _sums.length; i += 1)
			_sum += Number.parseFloat(_sums[i]);

		return (asNum) ? Number.parseFloat(_sum.toFixed(2)) : _sum.toFixed(2) + " KB";
	}
}

function _$createTestStorage(n) {
	var pf = "LS_TEST", _s = 0, _cur = Number.parseInt(listValuesByPrefix(pf)[listValuesByPrefix(pf).length - 1]);

	if (n == undefined || n < 0) n = 30;
	if (n > 400) n = 400;
	if (isNaN(_cur)) _cur = 0;

	for (var i = 1; i < n + 1; i += 1) {
		storeData(pf, "TEST-" + (_cur + 1), _cur);

		_cur += 1;
		_s += 1;
	}

	console.log("Created " + _s + " Test Storages");
}

function _$purgeTestStorage(_b) {
	var pf = "LS_TEST";
	purgeDataByPrefix(pf, _b);
}
