import View from "../../core/models/View.js";
import {TemplatesRegistry} from "../../core/modules/Registry.js";

export default class NotFoundView extends View {
	constructor() {
		super(null, TemplatesRegistry.NotFound);
		this.setTitle("Not Found");
		this.render();
	}
}
