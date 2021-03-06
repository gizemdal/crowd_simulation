import {vec3, vec2} from 'gl-matrix';

let idCount: number = 0; // generate a unique id for each event

// This class represents each event happening in the city that would potentially
// attract or repel agents
export default class Event {

	pos: vec3; // center of the event happening
	scopeRad: number; // scope radius of the event
	keywords: Array<string>; // keywords associated with this event
	id: number; // event id
	name: string;

	// Targeted event
	constructor(pos: vec3, rad: number, keys: Array<string>, name: string) {
		this.pos = pos;
		this.scopeRad = rad;
		this.keywords = keys;
		this.id = idCount;
		this.name = name;
		idCount++;
	}

	// Relocate the event
	changePos(newPos: vec3) {
		this.pos = newPos;
	}

	// Change the scope of the event
	changeScope(newScope: number) {
		this.scopeRad = newScope;
	}

	// Add a keyword to the event (if it doesn't exist)
	addKey(key: string) {
		var idx = this.keywords.indexOf(key);
		if (idx != -1) {
			return -1; // key already exists!!!
		}
		this.keywords.push(key);
		return 1; // success!
	}

	// Remove a keyword from the event (it it exists)
	removeKey(key: string) {
		var idx = this.keywords.indexOf(key);
		if (idx == -1) {
			return -1; // key doesn't exist!!!
		}
		var last = this.keywords.length - 1;
		if (idx == last) {
			this.keywords.pop();
			return 1; // success
		} else {
			var newArr = this.keywords.slice(0, idx);
			newArr.concat(this.keywords.slice(idx + 1, last + 1));
			this.keywords = newArr;
			return 1; // success
		}
	}

};